/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ASCπ UI AUDIT MODEL v1.2
 * Forensic audit trail for UI-canon enforcement
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const crypto = require('crypto');

// Permitted UI Action IDs (canonical enumeration)
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

// Forbidden actions for detection
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
 * Immutable audit record for UI actions
 */
class UIAuditRecord {
    constructor(actionId, sector, psiStateBefore, psiStateAfter, metadata = {}) {
        // Validate action ID
        if (!Object.values(UI_ACTION_IDS).includes(actionId)) {
            throw new Error(`Invalid UI action ID: ${actionId}`);
        }

        // Check for forbidden actions
        if (FORBIDDEN_ACTIONS.includes(actionId)) {
            throw new Error(`Forbidden UI action attempted: ${actionId}`);
        }

        this.timestamp = new Date().toISOString();
        this.actionId = actionId;
        this.sector = sector;
        this.psiStateBefore = this._deepFreeze(this._sanitizePsi(psiStateBefore));
        this.psiStateAfter = this._deepFreeze(this._sanitizePsi(psiStateAfter));
        
        // Canonical checks
        this.nInvariantCheck = this._verifyNInvariant();
        this.canonCheck = this._verifyCanonCompliance();
        this.forensicHash = this._generateForensicHash();
        
        // Additional metadata
        this.metadata = Object.freeze(metadata);
        
        // Make record immutable
        Object.freeze(this);
    }

    /**
     * Verify N invariant (energy conservation)
     */
    _verifyNInvariant() {
        // N can only change during initialization
        if (this.actionId === UI_ACTION_IDS.UI_RESET_ENGINE) {
            return true; // Initialization allowed to change N
        }

        const nBefore = this.psiStateBefore.N;
        const nAfter = this.psiStateAfter.N;
        const tolerance = 1e-10;

        return Math.abs(nBefore - nAfter) < tolerance;
    }

    /**
     * Verify canonical compliance
     */
    _verifyCanonCompliance() {
        // Verify sector actions reset t to 0
        if (this.actionId.startsWith('UI_SECTOR_')) {
            if (this.psiStateAfter.t !== 0) {
                return false;
            }
            
            // Verify sector mapping correctness
            const expectedSector = parseInt(this.actionId.slice(-1));
            if (this.sector !== expectedSector) {
                return false;
            }
        }

        // Verify read-only actions don't modify state
        if (this.actionId === UI_ACTION_IDS.UI_READ_PSI) {
            return this._statesEqual(this.psiStateBefore, this.psiStateAfter);
        }

        return true;
    }

    /**
     * Generate forensic hash of complete state transition
     */
    _generateForensicHash() {
        const hashData = {
            timestamp: this.timestamp,
            actionId: this.actionId,
            sector: this.sector,
            psiStateBefore: this.psiStateBefore,
            psiStateAfter: this.psiStateAfter,
            nInvariantCheck: this.nInvariantCheck,
            canonCheck: this.canonCheck
        };

        const hashString = JSON.stringify(hashData, Object.keys(hashData).sort());
        return crypto.createHash('sha256').update(hashString).digest('hex');
    }

    /**
     * Sanitize Psi state for audit (remove functions, ensure serializable)
     */
    _sanitizePsi(psi) {
        if (!psi) return null;
        
        return {
            dPhi: Number(psi.dPhi) || 0,
            kappa: Number(psi.kappa) || 0,
            theta: Number(psi.theta) || 0,
            N: Number(psi.N) || 0,
            C: Number(psi.C) || 0,
            t: Number(psi.t) || 0,
            // Include CTEP-1 components if available
            dPhi_syntax: Number(psi.dPhi_syntax) || 0,
            dPhi_semantic: Number(psi.dPhi_semantic) || 0,
            dPhi_structural: Number(psi.dPhi_structural) || 0
        };
    }

    /**
     * Deep freeze object to ensure immutability
     */
    _deepFreeze(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        Object.keys(obj).forEach(key => {
            this._deepFreeze(obj[key]);
        });

        return Object.freeze(obj);
    }

    /**
     * Check if two Psi states are equal within tolerance
     */
    _statesEqual(state1, state2) {
        if (!state1 || !state2) return false;
        
        const tolerance = 1e-10;
        const fields = ['dPhi', 'kappa', 'theta', 'N', 'C', 't'];
        
        return fields.every(field => 
            Math.abs(state1[field] - state2[field]) < tolerance
        );
    }

    /**
     * Export audit record for external verification
     */
    export() {
        return {
            timestamp: this.timestamp,
            actionId: this.actionId,
            sector: this.sector,
            psiStateBefore: this.psiStateBefore,
            psiStateAfter: this.psiStateAfter,
            nInvariantCheck: this.nInvariantCheck,
            canonCheck: this.canonCheck,
            forensicHash: this.forensicHash,
            metadata: this.metadata
        };
    }
}

/**
 * UI Audit Trail Manager
 */
class UIAuditTrail {
    constructor() {
        this.records = [];
        this.isSealed = false;
    }

    /**
     * Add audit record to trail
     */
    addRecord(actionId, sector, psiStateBefore, psiStateAfter, metadata = {}) {
        if (this.isSealed) {
            throw new Error('Audit trail is sealed and cannot be modified');
        }

        const record = new UIAuditRecord(actionId, sector, psiStateBefore, psiStateAfter, metadata);
        
        // Verify canonical compliance before adding
        if (!record.canonCheck || !record.nInvariantCheck) {
            throw new Error(`Canon violation detected in action ${actionId}: canonCheck=${record.canonCheck}, nInvariantCheck=${record.nInvariantCheck}`);
        }

        this.records.push(record);
        return record;
    }

    /**
     * Seal audit trail to prevent further modifications
     */
    seal() {
        this.isSealed = true;
        Object.freeze(this.records);
        Object.freeze(this);
    }

    /**
     * Verify entire audit trail integrity
     */
    verifyIntegrity() {
        // Check all records are valid
        for (let i = 0; i < this.records.length; i++) {
            const record = this.records[i];
            
            if (!record.canonCheck) {
                return { valid: false, error: `Record ${i}: Canon violation`, record };
            }
            
            if (!record.nInvariantCheck) {
                return { valid: false, error: `Record ${i}: N invariant violation`, record };
            }

            // Verify hash integrity
            const expectedHash = record._generateForensicHash();
            if (record.forensicHash !== expectedHash) {
                return { valid: false, error: `Record ${i}: Hash mismatch`, record };
            }
        }

        // Check temporal consistency
        for (let i = 1; i < this.records.length; i++) {
            const prev = this.records[i - 1];
            const curr = this.records[i];
            
            if (new Date(prev.timestamp) > new Date(curr.timestamp)) {
                return { valid: false, error: `Record ${i}: Temporal inconsistency`, record: curr };
            }
        }

        return { valid: true };
    }

    /**
     * Export complete audit trail
     */
    export() {
        return {
            records: this.records.map(record => record.export()),
            isSealed: this.isSealed,
            recordCount: this.records.length,
            integrity: this.verifyIntegrity()
        };
    }

    /**
     * Get audit statistics
     */
    getStatistics() {
        const actionCounts = {};
        const sectorCounts = {};
        let canonViolations = 0;
        let nInvariantViolations = 0;

        this.records.forEach(record => {
            // Count action types
            actionCounts[record.actionId] = (actionCounts[record.actionId] || 0) + 1;
            
            // Count sector selections
            if (record.sector !== null) {
                sectorCounts[record.sector] = (sectorCounts[record.sector] || 0) + 1;
            }
            
            // Count violations
            if (!record.canonCheck) canonViolations++;
            if (!record.nInvariantCheck) nInvariantViolations++;
        });

        return {
            totalRecords: this.records.length,
            actionCounts,
            sectorCounts,
            canonViolations,
            nInvariantViolations,
            isSealed: this.isSealed
        };
    }
}

/**
 * Canon Breach Exception
 */
class CanonBreachError extends Error {
    constructor(code, action, details = '') {
        super(`Canon breach detected: ${code} in action ${action}`);
        this.name = 'CanonBreachError';
        this.code = code;
        this.action = action;
        this.timestamp = new Date().toISOString();
        this.details = details;
    }
}

// Export classes and constants
module.exports = {
    UIAuditRecord,
    UIAuditTrail,
    CanonBreachError,
    UI_ACTION_IDS,
    FORBIDDEN_ACTIONS
};

// Browser compatibility
if (typeof window !== 'undefined') {
    window.ASCPIUIAudit = {
        UIAuditRecord,
        UIAuditTrail,
        CanonBreachError,
        UI_ACTION_IDS,
        FORBIDDEN_ACTIONS
    };
}
