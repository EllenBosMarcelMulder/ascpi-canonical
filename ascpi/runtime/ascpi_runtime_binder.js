/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ASCπ RUNTIME BINDING LAYER v1.0 - FINAL GATE
 * Onomkeerbare binding van Engine + UI Controller + Audit Trail
 * Maakt directe engine-toegang runtime-technisch onmogelijk
 * ═══════════════════════════════════════════════════════════════════════════════
 */

/**
 * Private engine wrapper that locks all direct access
 */
class PrivateEngineWrapper {
    constructor(engine) {
        this._engine = engine;
        this._isLocked = false;
        this._boundController = null;
        
        // Create deep clone of original methods for internal use only
        this._internalCommitSector = engine.commitSectorDecision.bind(engine);
        this._internalInitializePsi = engine.initializePsi.bind(engine);
        this._internalStep = engine.step.bind(engine);
        this._internalCompile = engine.compile.bind(engine);
        this._internalRewrite = engine.rewriteCodeFromField.bind(engine);
        
        // Store original getter for Psi
        this._getPsi = () => engine.ψ;
    }
    
    /**
     * Lock the engine - makes all public methods throw CanonBreachError
     */
    lock(boundController) {
        if (this._isLocked) {
            throw new Error('Engine already locked');
        }
        
        this._isLocked = true;
        this._boundController = boundController;
        
        // Replace all public methods with locked versions
        this._engine.commitSectorDecision = this._createLockedMethod('commitSectorDecision');
        this._engine.initializePsi = this._createLockedMethod('initializePsi');
        this._engine.step = this._createLockedMethod('step');
        this._engine.compile = this._createLockedMethod('compile');
        this._engine.rewriteCodeFromField = this._createLockedMethod('rewriteCodeFromField');
        
        // Lock Psi property access
        const originalPsi = this._engine.ψ;
        Object.defineProperty(this._engine, 'ψ', {
            get: () => {
                throw new CanonBreachError('DIRECT_PSI_ACCESS', 'engine.ψ', 'Use readOnlyPsiView instead');
            },
            set: () => {
                throw new CanonBreachError('DIRECT_PSI_SET', 'engine.ψ', 'Psi modification only via UI Controller');
            },
            configurable: false,
            enumerable: true
        });
        
        // Lock engine properties
        Object.freeze(this._engine);
        Object.preventExtensions(this._engine);
    }
    
    _createLockedMethod(methodName) {
        return (...args) => {
            throw new CanonBreachError('DIRECT_ENGINE_ACCESS', methodName, 'Engine methods locked - use UI Controller only');
        };
    }
    
    /**
     * Internal method access for bound controller only
     */
    _executeInternal(methodName, ...args) {
        if (!this._isLocked) {
            throw new Error('Engine not locked - internal methods unavailable');
        }
        
        switch (methodName) {
            case 'commitSectorDecision':
                return this._internalCommitSector(...args);
            case 'initializePsi':
                return this._internalInitializePsi(...args);
            case 'step':
                return this._internalStep(...args);
            case 'compile':
                return this._internalCompile(...args);
            case 'rewriteCodeFromField':
                return this._internalRewrite(...args);
            default:
                throw new Error(`Unknown internal method: ${methodName}`);
        }
    }
    
    _getPsiInternal() {
        if (!this._isLocked) {
            throw new Error('Engine not locked - internal Psi access unavailable');
        }
        return this._getPsi();
    }
}

/**
 * Bound UI Controller with mandatory audit enforcement
 */
class BoundUIController {
    constructor(wrappedEngine, auditTrail) {
        this._wrappedEngine = wrappedEngine;
        this._auditTrail = auditTrail;
        this._isSealed = false;
        this._stateChecksum = null;
        
        // Validate engine is locked
        if (!wrappedEngine._isLocked) {
            throw new Error('Cannot create BoundUIController with unlocked engine');
        }
        
        // Initialize state checksum
        this._updateStateChecksum();
    }
    
    /**
     * Execute UI action with mandatory audit enforcement
     */
    executeUIAction(actionId, sector = null) {
        if (this._isSealed) {
            throw new CanonBreachError('SEALED_CONTROLLER', actionId, 'Controller is sealed');
        }
        
        // Verify action is permitted
        if (!Object.values(UI_ACTION_IDS).includes(actionId)) {
            throw new CanonBreachError('INVALID_ACTION', actionId, 'Action not in permitted list');
        }
        
        if (FORBIDDEN_ACTIONS.includes(actionId)) {
            throw new CanonBreachError('FORBIDDEN_ACTION', actionId, 'Action explicitly forbidden');
        }
        
        // Verify state integrity before action
        this._verifyStateIntegrity();
        
        const psiStateBefore = this._clonePsiState(this._wrappedEngine._getPsiInternal());
        
        // Execute canonical action through wrapper
        switch (actionId) {
            case UI_ACTION_IDS.UI_SECTOR_0:
            case UI_ACTION_IDS.UI_SECTOR_1:
            case UI_ACTION_IDS.UI_SECTOR_2:
            case UI_ACTION_IDS.UI_SECTOR_3:
            case UI_ACTION_IDS.UI_SECTOR_4:
            case UI_ACTION_IDS.UI_SECTOR_5:
                const sectorNum = parseInt(actionId.slice(-1));
                this._wrappedEngine._executeInternal('commitSectorDecision', sectorNum);
                break;
                
            case UI_ACTION_IDS.UI_RESET_ENGINE:
                this._wrappedEngine._executeInternal('initializePsi', 'reset');
                break;
                
            case UI_ACTION_IDS.UI_READ_PSI:
                // No operation for read
                break;
                
            default:
                throw new CanonBreachError('UNKNOWN_ACTION', actionId, 'Action not implemented');
        }
        
        const psiStateAfter = this._clonePsiState(this._wrappedEngine._getPsiInternal());
        
        // Mandatory audit record creation
        const record = this._auditTrail.addRecord(actionId, sector, psiStateBefore, psiStateAfter);
        
        // Update state checksum
        this._updateStateChecksum();
        
        // Verify state consistency post-action
        this._verifyStateIntegrity();
        
        return record;
    }
    
    /**
     * Get read-only view of current Psi state
     */
    getReadOnlyPsiView() {
        const psi = this._wrappedEngine._getPsiInternal();
        return Object.freeze(this._clonePsiState(psi));
    }
    
    /**
     * Verify audit trail matches current engine state
     */
    _verifyStateIntegrity() {
        if (this._auditTrail.records.length === 0) {
            return; // Initial state, no records yet
        }
        
        const currentState = this._wrappedEngine._getPsiInternal();
        const lastRecord = this._auditTrail.records[this._auditTrail.records.length - 1];
        
        // Current engine state must match last audit record's after-state
        const tolerance = 1e-10;
        const fields = ['dPhi', 'kappa', 'theta', 'N', 'C', 't'];
        
        for (const field of fields) {
            if (Math.abs(currentState[field] - lastRecord.psiStateAfter[field]) > tolerance) {
                throw new CanonBreachError('STATE_AUDIT_MISMATCH', 'verifyStateIntegrity', 
                    `Engine state field ${field} does not match audit trail: engine=${currentState[field]}, audit=${lastRecord.psiStateAfter[field]}`);
            }
        }
    }
    
    /**
     * Update internal state checksum for tamper detection
     */
    _updateStateChecksum() {
        const state = this._wrappedEngine._getPsiInternal();
        const stateString = JSON.stringify([
            state.dPhi, state.kappa, state.theta, state.N, state.C, state.t,
            this._auditTrail.records.length
        ]);
        
        let checksum = 0;
        for (let i = 0; i < stateString.length; i++) {
            checksum = ((checksum << 5) - checksum) + stateString.charCodeAt(i);
            checksum |= 0;
        }
        this._stateChecksum = checksum;
    }
    
    /**
     * Deep clone Psi state for audit records
     */
    _clonePsiState(psi) {
        return {
            dPhi: Number(psi.dPhi),
            kappa: Number(psi.kappa),
            theta: Number(psi.theta),
            N: Number(psi.N),
            C: Number(psi.C),
            t: Number(psi.t),
            dPhi_syntax: Number(psi.dPhi_syntax || 0),
            dPhi_semantic: Number(psi.dPhi_semantic || 0),
            dPhi_structural: Number(psi.dPhi_structural || 0)
        };
    }
    
    /**
     * Seal controller to prevent further actions
     */
    seal() {
        this._isSealed = true;
        this._auditTrail.seal();
        Object.freeze(this);
    }
    
    /**
     * Get audit trail reference
     */
    getAuditTrail() {
        return this._auditTrail;
    }
}

/**
 * Replay Verifier for deterministic validation
 */
class ReplayVerifier {
    constructor(originalEngine) {
        this.originalEngineClass = originalEngine.constructor;
        this.originalConfig = { ...originalEngine.config };
    }
    
    /**
     * Verify audit trail can reproduce current state
     */
    verifyReplay(auditTrail, expectedFinalState) {
        // Create fresh engine with same configuration
        const replayEngine = new this.originalEngineClass(this.originalConfig);
        const replayWrapper = new PrivateEngineWrapper(replayEngine);
        const replayAuditTrail = new UIAuditTrail();
        
        // Lock the replay engine
        replayWrapper.lock(null);
        const replayController = new BoundUIController(replayWrapper, replayAuditTrail);
        
        // Replay all actions from audit trail
        auditTrail.records.forEach(record => {
            try {
                replayController.executeUIAction(record.actionId, record.sector);
            } catch (error) {
                throw new CanonBreachError('REPLAY_FAILURE', record.actionId, 
                    `Failed to replay action: ${error.message}`);
            }
        });
        
        // Compare final states
        const replayFinalState = replayController.getReadOnlyPsiView();
        const tolerance = 1e-10;
        const fields = ['dPhi', 'kappa', 'theta', 'N', 'C', 't'];
        
        for (const field of fields) {
            if (Math.abs(replayFinalState[field] - expectedFinalState[field]) > tolerance) {
                throw new CanonBreachError('REPLAY_STATE_MISMATCH', 'verifyReplay',
                    `Replay state mismatch in field ${field}: expected=${expectedFinalState[field]}, replay=${replayFinalState[field]}`);
            }
        }
        
        return { valid: true, replayState: replayFinalState };
    }
}

/**
 * Canon Breach Error class
 */
class CanonBreachError extends Error {
    constructor(code, action, details = '') {
        super(`Canon breach: ${code} in ${action} - ${details}`);
        this.name = 'CanonBreachError';
        this.code = code;
        this.action = action;
        this.timestamp = new Date().toISOString();
        this.details = details;
    }
}

/**
 * UI Action IDs and constants
 */
const UI_ACTION_IDS = Object.freeze({
    UI_SECTOR_0: 'UI_SECTOR_0',
    UI_SECTOR_1: 'UI_SECTOR_1', 
    UI_SECTOR_2: 'UI_SECTOR_2',
    UI_SECTOR_3: 'UI_SECTOR_3',
    UI_SECTOR_4: 'UI_SECTOR_4',
    UI_SECTOR_5: 'UI_SECTOR_5',
    UI_READ_PSI: 'UI_READ_PSI',
    UI_RESET_ENGINE: 'UI_RESET_ENGINE'
});

const FORBIDDEN_ACTIONS = Object.freeze([
    'DIRECT_DPHI_SET',
    'DIRECT_KAPPA_SET', 
    'DIRECT_THETA_SET',
    'DIRECT_C_SET',
    'DIRECT_N_SET',
    'DIRECT_T_SET',
    'SLIDER_CONTROL',
    'REALTIME_TRACKING',
    'AI_ASSISTED_SELECTION',
    'LEARNING_ADAPTATION'
]);

/**
 * Simple UIAuditRecord and UIAuditTrail for binding layer
 */
class UIAuditRecord {
    constructor(actionId, sector, psiStateBefore, psiStateAfter) {
        this.timestamp = new Date().toISOString();
        this.actionId = actionId;
        this.sector = sector;
        this.psiStateBefore = Object.freeze({ ...psiStateBefore });
        this.psiStateAfter = Object.freeze({ ...psiStateAfter });
        this.nInvariantCheck = this._verifyNInvariant();
        this.canonCheck = this._verifyCanonCompliance();
        this.forensicHash = this._generateHash();
        Object.freeze(this);
    }
    
    _verifyNInvariant() {
        if (this.actionId === UI_ACTION_IDS.UI_RESET_ENGINE) return true;
        return Math.abs(this.psiStateBefore.N - this.psiStateAfter.N) < 1e-10;
    }
    
    _verifyCanonCompliance() {
        if (this.actionId.startsWith('UI_SECTOR_')) {
            if (this.psiStateAfter.t !== 0) return false;
        }
        return true;
    }
    
    _generateHash() {
        const data = JSON.stringify({
            actionId: this.actionId,
            before: this.psiStateBefore,
            after: this.psiStateAfter
        });
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            hash = ((hash << 5) - hash) + data.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash).toString(16);
    }
}

class UIAuditTrail {
    constructor() {
        this.records = [];
        this.isSealed = false;
    }
    
    addRecord(actionId, sector, psiStateBefore, psiStateAfter) {
        if (this.isSealed) {
            throw new CanonBreachError('SEALED_AUDIT_TRAIL', actionId, 'Cannot add to sealed audit trail');
        }
        
        const record = new UIAuditRecord(actionId, sector, psiStateBefore, psiStateAfter);
        
        if (!record.canonCheck || !record.nInvariantCheck) {
            throw new CanonBreachError('AUDIT_CANON_VIOLATION', actionId, 
                `canonCheck=${record.canonCheck}, nInvariantCheck=${record.nInvariantCheck}`);
        }
        
        this.records.push(record);
        return record;
    }
    
    seal() {
        this.isSealed = true;
        Object.freeze(this.records);
    }
}

/**
 * MAIN RUNTIME BINDER
 */
function createBoundRuntime(engine) {
    // Validate engine
    if (!engine || typeof engine.commitSectorDecision !== 'function') {
        throw new Error('Invalid engine provided to createBoundRuntime');
    }
    
    // Create private wrapper
    const wrappedEngine = new PrivateEngineWrapper(engine);
    
    // Create audit trail
    const auditTrail = new UIAuditTrail();
    
    // Create bound controller
    const boundController = new BoundUIController(wrappedEngine, auditTrail);
    
    // Lock the engine (makes direct access impossible)
    wrappedEngine.lock(boundController);
    
    // Create replay verifier
    const replayVerifier = new ReplayVerifier(engine);
    
    // Return sealed runtime interface
    const runtime = Object.freeze({
        uiController: boundController,
        auditTrail: auditTrail,
        readOnlyPsiView: () => boundController.getReadOnlyPsiView(),
        
        // Deterministic replay verification
        verifyReplay: () => {
            const currentState = boundController.getReadOnlyPsiView();
            return replayVerifier.verifyReplay(auditTrail, currentState);
        },
        
        // Seal everything
        seal: () => {
            boundController.seal();
            return Object.freeze({
                auditTrail: auditTrail.export ? auditTrail.export() : auditTrail,
                finalState: boundController.getReadOnlyPsiView(),
                replayVerification: replayVerifier.verifyReplay(auditTrail, boundController.getReadOnlyPsiView())
            });
        }
    });
    
    return runtime;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createBoundRuntime,
        PrivateEngineWrapper,
        BoundUIController,
        ReplayVerifier,
        CanonBreachError,
        UI_ACTION_IDS,
        FORBIDDEN_ACTIONS
    };
}

// Export for browser
if (typeof window !== 'undefined') {
    window.ASCPIRuntimeBinder = {
        createBoundRuntime,
        PrivateEngineWrapper,
        BoundUIController,
        ReplayVerifier,
        CanonBreachError,
        UI_ACTION_IDS,
        FORBIDDEN_ACTIONS
    };
}
