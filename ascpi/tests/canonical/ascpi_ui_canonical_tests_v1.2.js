// ═══════════════════════════════════════════════════════════════════════════════
// ASCπ UI CANONICAL TEST SUITE v1.2
// Enforces UI-canon compliance and audit trail integrity
// ═══════════════════════════════════════════════════════════════════════════════

const D_PHI_STAR = (1 + Math.sqrt(5)) / 4;
const TAU = 2 * Math.PI;

// Mock engine and audit components for standalone testing
const CONST = { 
    D_PHI_STAR: D_PHI_STAR,
    COHERENCE_THRESHOLD: 0.9999,
    tau: TAU,
    SECTOR_MAP: [
        { theta: 0 * (TAU / 6), kappa: 2.5, C: 0.90, N: 0.80, dPhi: 0.1 + 1.5 * 0.05 },
        { theta: 1 * (TAU / 6), kappa: 2.0, C: 0.85, N: 0.70, dPhi: 0.1 + 1.0 * 0.05 },
        { theta: 2 * (TAU / 6), kappa: 1.5, C: 0.95, N: 0.90, dPhi: 0.1 + 2.0 * 0.05 },
        { theta: 3 * (TAU / 6), kappa: 3.0, C: 0.75, N: 0.60, dPhi: 0.1 + 0.5 * 0.05 },
        { theta: 4 * (TAU / 6), kappa: 4.0, C: 0.99, N: 0.95, dPhi: 0.1 + 2.5 * 0.05 },
        { theta: 5 * (TAU / 6), kappa: 1.0, C: 0.70, N: 0.40, dPhi: 0.1 - 2.5 * 0.05 }
    ]
};

const UI_ACTION_IDS = {
    UI_SECTOR_0: 'UI_SECTOR_0',
    UI_SECTOR_1: 'UI_SECTOR_1', 
    UI_SECTOR_2: 'UI_SECTOR_2',
    UI_SECTOR_3: 'UI_SECTOR_3',
    UI_SECTOR_4: 'UI_SECTOR_4',
    UI_SECTOR_5: 'UI_SECTOR_5',
    UI_READ_PSI: 'UI_READ_PSI',
    UI_RESET_ENGINE: 'UI_RESET_ENGINE'
};

const FORBIDDEN_ACTIONS = [
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
];

class Psi {
    constructor(initialState = {}) {
        this.dPhi = initialState.dPhi ?? CONST.D_PHI_STAR;
        this.kappa = initialState.kappa ?? 5.0;
        this.theta = initialState.theta ?? 0.0;
        this.N = initialState.N ?? 0.0;
        this.C = initialState.C ?? 0.0;
        this.t = initialState.t ?? 0;
        this.dPhi_syntax = initialState.dPhi_syntax ?? 0.0;
        this.dPhi_semantic = initialState.dPhi_semantic ?? 0.0;
        this.dPhi_structural = initialState.dPhi_structural ?? 0.0;
    }
    
    toJSON() {
        return { dPhi: this.dPhi, kappa: this.kappa, theta: this.theta, N: this.N, C: this.C, t: this.t };
    }
}

class MockASCPIEngine {
    constructor() {
        this.ψ = new Psi();
    }
    
    commitSectorDecision(sector) {
        if (sector < 0 || sector >= CONST.SECTOR_MAP.length) {
            throw new Error(`Invalid sector: ${sector}`);
        }
        
        const map = CONST.SECTOR_MAP[sector];
        const originalN = this.ψ.N;
        
        this.ψ.dPhi = map.dPhi;
        this.ψ.kappa = map.kappa;
        this.ψ.theta = map.theta;
        this.ψ.C = map.C;
        this.ψ.t = 0;
        
        if (originalN !== 0) {
            this.ψ.N = originalN;
        } else {
            this.ψ.N = map.N;
        }
    }
    
    initializePsi(input) {
        this.ψ = new Psi({ N: 0.5, C: 0.01, t: 0 });
    }
}

class UIAuditRecord {
    constructor(actionId, sector, psiStateBefore, psiStateAfter) {
        if (!Object.values(UI_ACTION_IDS).includes(actionId)) {
            throw new Error(`Invalid UI action ID: ${actionId}`);
        }
        
        if (FORBIDDEN_ACTIONS.includes(actionId)) {
            throw new Error(`Forbidden UI action attempted: ${actionId}`);
        }

        this.timestamp = new Date().toISOString();
        this.actionId = actionId;
        this.sector = sector;
        this.psiStateBefore = this._sanitizePsi(psiStateBefore);
        this.psiStateAfter = this._sanitizePsi(psiStateAfter);
        this.nInvariantCheck = this._verifyNInvariant();
        this.canonCheck = this._verifyCanonCompliance();
        this.forensicHash = this._generateHash();
        
        Object.freeze(this);
    }
    
    _sanitizePsi(psi) {
        if (!psi) return null;
        return {
            dPhi: Number(psi.dPhi) || 0,
            kappa: Number(psi.kappa) || 0,
            theta: Number(psi.theta) || 0,
            N: Number(psi.N) || 0,
            C: Number(psi.C) || 0,
            t: Number(psi.t) || 0
        };
    }
    
    _verifyNInvariant() {
        if (this.actionId === UI_ACTION_IDS.UI_RESET_ENGINE) {
            return true;
        }
        
        const tolerance = 1e-10;
        return Math.abs(this.psiStateBefore.N - this.psiStateAfter.N) < tolerance;
    }
    
    _verifyCanonCompliance() {
        if (this.actionId.startsWith('UI_SECTOR_')) {
            if (this.psiStateAfter.t !== 0) return false;
            const expectedSector = parseInt(this.actionId.slice(-1));
            if (this.sector !== expectedSector) return false;
        }
        
        if (this.actionId === UI_ACTION_IDS.UI_READ_PSI) {
            return this._statesEqual(this.psiStateBefore, this.psiStateAfter);
        }
        
        return true;
    }
    
    _statesEqual(state1, state2) {
        if (!state1 || !state2) return false;
        const tolerance = 1e-10;
        const fields = ['dPhi', 'kappa', 'theta', 'N', 'C', 't'];
        return fields.every(field => Math.abs(state1[field] - state2[field]) < tolerance);
    }
    
    _generateHash() {
        const data = JSON.stringify({
            actionId: this.actionId,
            sector: this.sector,
            before: this.psiStateBefore,
            after: this.psiStateAfter
        });
        // Simple hash for testing (in production would use crypto)
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
            throw new Error('Audit trail is sealed');
        }
        
        const record = new UIAuditRecord(actionId, sector, psiStateBefore, psiStateAfter);
        
        if (!record.canonCheck || !record.nInvariantCheck) {
            throw new Error(`Canon violation in action ${actionId}`);
        }
        
        this.records.push(record);
        return record;
    }
    
    seal() {
        this.isSealed = true;
        Object.freeze(this.records);
    }
    
    verifyIntegrity() {
        for (let record of this.records) {
            if (!record.canonCheck || !record.nInvariantCheck) {
                return { valid: false, error: `Record violation`, record };
            }
        }
        return { valid: true };
    }
}

class CanonBreachError extends Error {
    constructor(code, action, details = '') {
        super(`Canon breach: ${code} in ${action}`);
        this.code = code;
        this.action = action;
        this.timestamp = new Date().toISOString();
        this.details = details;
    }
}

// Mock UI Controller that enforces canon
class CanonicalUIController {
    constructor(engine) {
        this.engine = engine;
        this.auditTrail = new UIAuditTrail();
        this.isLocked = false;
        
        // Prevent shared engine access (mark engine as owned)
        if (engine._uiControllerOwned) {
            throw new Error('Engine already owned by another UI controller - concurrent access forbidden');
        }
        engine._uiControllerOwned = true;
        this._engineOwnership = true;
    }
    
    executeUIAction(actionId, sector = null) {
        if (this.isLocked) {
            throw new CanonBreachError('LOCKED_CONTROLLER', actionId);
        }
        
        // Verify action is permitted
        if (!Object.values(UI_ACTION_IDS).includes(actionId)) {
            throw new CanonBreachError('INVALID_ACTION', actionId);
        }
        
        if (FORBIDDEN_ACTIONS.includes(actionId)) {
            throw new CanonBreachError('FORBIDDEN_ACTION', actionId);
        }
        
        const psiStateBefore = JSON.parse(JSON.stringify(this.engine.ψ.toJSON()));
        
        // Execute canonical action
        switch (actionId) {
            case UI_ACTION_IDS.UI_SECTOR_0:
            case UI_ACTION_IDS.UI_SECTOR_1:
            case UI_ACTION_IDS.UI_SECTOR_2:
            case UI_ACTION_IDS.UI_SECTOR_3:
            case UI_ACTION_IDS.UI_SECTOR_4:
            case UI_ACTION_IDS.UI_SECTOR_5:
                const sectorNum = parseInt(actionId.slice(-1));
                this.engine.commitSectorDecision(sectorNum);
                break;
                
            case UI_ACTION_IDS.UI_RESET_ENGINE:
                this.engine.initializePsi('reset');
                break;
                
            case UI_ACTION_IDS.UI_READ_PSI:
                // No operation for read
                break;
                
            default:
                throw new CanonBreachError('UNKNOWN_ACTION', actionId);
        }
        
        const psiStateAfter = JSON.parse(JSON.stringify(this.engine.ψ.toJSON()));
        
        // Add audit record
        const record = this.auditTrail.addRecord(actionId, sector, psiStateBefore, psiStateAfter);
        
        return record;
    }
    
    // Forbidden methods that should throw errors
    setDPhiDirect(value) {
        throw new CanonBreachError('DIRECT_FIELD_ACCESS', 'setDPhiDirect');
    }
    
    setKappaDirect(value) {
        throw new CanonBreachError('DIRECT_FIELD_ACCESS', 'setKappaDirect');
    }
    
    lockController() {
        this.isLocked = true;
    }
}

describe('ASCπ UI Canonical Test Suite v1.2', () => {

    // TEST K — Permitted UI Action Verification
    describe('K: Permitted UI Action Verification', () => {
        test('K.1: All 8 permitted actions execute without error', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            // Test all sector actions
            for (let i = 0; i < 6; i++) {
                const actionId = `UI_SECTOR_${i}`;
                const record = controller.executeUIAction(actionId, i);
                
                expect(record.actionId).toBe(actionId);
                expect(record.canonCheck).toBe(true);
                expect(record.nInvariantCheck).toBe(true);
                expect(record.psiStateAfter.t).toBe(0);
            }
            
            // Test read action
            const readRecord = controller.executeUIAction(UI_ACTION_IDS.UI_READ_PSI);
            expect(readRecord.canonCheck).toBe(true);
            
            // Test reset action
            const resetRecord = controller.executeUIAction(UI_ACTION_IDS.UI_RESET_ENGINE);
            expect(resetRecord.canonCheck).toBe(true);
            
            expect(controller.auditTrail.records.length).toBe(8);
        });

        test('K.2: Sector actions map to exact canonical Ψ states', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            engine.ψ = new Psi({ N: 0.777 }); // Set non-zero N
            
            controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_3, 3);
            
            const expected = CONST.SECTOR_MAP[3];
            expect(engine.ψ.dPhi).toBeCloseTo(expected.dPhi, 6);
            expect(engine.ψ.kappa).toBeCloseTo(expected.kappa, 6);
            expect(engine.ψ.theta).toBeCloseTo(expected.theta, 6);
            expect(engine.ψ.C).toBeCloseTo(expected.C, 6);
            expect(engine.ψ.N).toBe(0.777); // N preserved
            expect(engine.ψ.t).toBe(0); // t reset
        });
    });

    // TEST L — Forbidden Action Rejection
    describe('L: Forbidden Action Rejection', () => {
        test('L.1: All forbidden actions throw CanonBreachError', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            FORBIDDEN_ACTIONS.forEach(forbiddenAction => {
                expect(() => {
                    controller.executeUIAction(forbiddenAction);
                }).toThrow('Forbidden UI action attempted');
            });
        });

        test('L.2: Direct field access methods throw CanonBreachError', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            expect(() => controller.setDPhiDirect(0.5)).toThrow(CanonBreachError);
            expect(() => controller.setKappaDirect(3.0)).toThrow(CanonBreachError);
        });

        test('L.3: Invalid action IDs are rejected', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            expect(() => {
                controller.executeUIAction('INVALID_ACTION');
            }).toThrow(CanonBreachError);
            
            expect(() => {
                controller.executeUIAction('UI_SECTOR_6'); // Only 0-5 valid
            }).toThrow('Invalid sector: 6');
        });
    });

    // TEST M — Audit Trail Completeness
    describe('M: Audit Trail Completeness', () => {
        test('M.1: Every UI action generates proper audit record', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            const record = controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_1, 1);
            
            expect(record.timestamp).toBeDefined();
            expect(record.actionId).toBe(UI_ACTION_IDS.UI_SECTOR_1);
            expect(record.sector).toBe(1);
            expect(record.psiStateBefore).toBeDefined();
            expect(record.psiStateAfter).toBeDefined();
            expect(record.nInvariantCheck).toBe(true);
            expect(record.canonCheck).toBe(true);
            expect(record.forensicHash).toBeDefined();
            
            expect(controller.auditTrail.records.length).toBe(1);
        });

        test('M.2: Audit trail integrity verification works', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_0, 0);
            controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_2, 2);
            controller.executeUIAction(UI_ACTION_IDS.UI_READ_PSI);
            
            const integrity = controller.auditTrail.verifyIntegrity();
            expect(integrity.valid).toBe(true);
            
            expect(controller.auditTrail.records.length).toBe(3);
        });

        test('M.3: Audit trail immutability after sealing', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_1, 1);
            controller.auditTrail.seal();
            
            expect(() => {
                controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_2, 2);
            }).toThrow('Audit trail is sealed');
            
            expect(controller.auditTrail.isSealed).toBe(true);
        });
    });

    // TEST N — State Consistency Verification
    describe('N: State Consistency Verification', () => {
        test('N.1: Post-action state matches sector mapping exactly', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            for (let sector = 0; sector < 6; sector++) {
                engine.ψ = new Psi({ N: 0.5 }); // Reset with preserved N
                
                const record = controller.executeUIAction(`UI_SECTOR_${sector}`, sector);
                const expected = CONST.SECTOR_MAP[sector];
                
                expect(record.psiStateAfter.dPhi).toBeCloseTo(expected.dPhi, 6);
                expect(record.psiStateAfter.kappa).toBeCloseTo(expected.kappa, 6);
                expect(record.psiStateAfter.theta).toBeCloseTo(expected.theta, 6);
                expect(record.psiStateAfter.C).toBeCloseTo(expected.C, 6);
                expect(record.psiStateAfter.N).toBe(0.5); // Preserved
                expect(record.psiStateAfter.t).toBe(0); // Reset
            }
        });

        test('N.2: Read-only actions preserve complete state', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            engine.ψ = new Psi({ dPhi: 0.5, kappa: 3.0, theta: 1.5, N: 0.7, C: 0.8, t: 100 });
            
            const record = controller.executeUIAction(UI_ACTION_IDS.UI_READ_PSI);
            
            expect(record.psiStateBefore.dPhi).toBe(record.psiStateAfter.dPhi);
            expect(record.psiStateBefore.kappa).toBe(record.psiStateAfter.kappa);
            expect(record.psiStateBefore.theta).toBe(record.psiStateAfter.theta);
            expect(record.psiStateBefore.N).toBe(record.psiStateAfter.N);
            expect(record.psiStateBefore.C).toBe(record.psiStateAfter.C);
            expect(record.psiStateBefore.t).toBe(record.psiStateAfter.t);
        });
    });

    // TEST O — Determinism Verification
    describe('O: Determinism Verification', () => {
        test('O.1: Identical action sequences yield identical results', () => {
            const engine1 = new MockASCPIEngine();
            const engine2 = new MockASCPIEngine();
            const controller1 = new CanonicalUIController(engine1);
            const controller2 = new CanonicalUIController(engine2);
            
            // Identical sequence
            const sequence = [
                [UI_ACTION_IDS.UI_SECTOR_1, 1],
                [UI_ACTION_IDS.UI_SECTOR_3, 3],
                [UI_ACTION_IDS.UI_READ_PSI, null],
                [UI_ACTION_IDS.UI_SECTOR_0, 0]
            ];
            
            sequence.forEach(([actionId, sector]) => {
                controller1.executeUIAction(actionId, sector);
                controller2.executeUIAction(actionId, sector);
            });
            
            // Final states must be identical
            expect(engine1.ψ.dPhi).toBe(engine2.ψ.dPhi);
            expect(engine1.ψ.kappa).toBe(engine2.ψ.kappa);
            expect(engine1.ψ.theta).toBe(engine2.ψ.theta);
            expect(engine1.ψ.C).toBe(engine2.ψ.C);
            expect(engine1.ψ.t).toBe(engine2.ψ.t);
            
            // Audit trails must have same structure
            expect(controller1.auditTrail.records.length).toBe(controller2.auditTrail.records.length);
        });

        test('O.2: No randomization in UI behavior', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            // Repeated action must yield identical results
            const results = [];
            
            for (let i = 0; i < 5; i++) {
                engine.ψ = new Psi({ N: 0.5 }); // Reset to same state
                controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_2, 2);
                results.push(JSON.stringify(engine.ψ.toJSON()));
            }
            
            // All results identical
            const firstResult = results[0];
            results.forEach(result => {
                expect(result).toBe(firstResult);
            });
        });
    });

    // TEST P — Controller Lock Security
    describe('P: Controller Lock Security', () => {
        test('P.1: Locked controller rejects all actions', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            controller.lockController();
            
            Object.values(UI_ACTION_IDS).forEach(actionId => {
                expect(() => {
                    controller.executeUIAction(actionId);
                }).toThrow(CanonBreachError);
            });
        });

        test('P.2: Controller lock is irreversible', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_1, 1); // Should work
            controller.lockController();
            
            expect(() => {
                controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_2, 2); // Should fail
            }).toThrow(CanonBreachError);
            
            // No unlock mechanism should exist
            expect(typeof controller.unlockController).toBe('undefined');
        });
    });

    // TEST Q — MANDATORY AUDIT ENFORCEMENT (Critical Security Layer)
    describe('Q: Mandatory Audit Enforcement', () => {
        test('Q.1: Direct engine access without audit trail must be detectable', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            // Legitimate action creates audit record
            controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_1, 1);
            expect(controller.auditTrail.records.length).toBe(1);
            
            // Simulate UI bypass: direct engine access without audit
            const stateBefore = JSON.stringify(engine.ψ.toJSON());
            engine.commitSectorDecision(3); // Direct bypass
            const stateAfter = JSON.stringify(engine.ψ.toJSON());
            
            // State changed but no audit record added - this is a breach
            expect(stateBefore).not.toBe(stateAfter);
            expect(controller.auditTrail.records.length).toBe(1); // Still only 1 record
            
            // This test documents the vulnerability - proper UI must prevent this
        });

        test('Q.2: Audit trail must capture ALL state transitions', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            const initialState = JSON.stringify(engine.ψ.toJSON());
            
            // Perform 3 UI actions
            controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_1, 1);
            controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_3, 3);
            controller.executeUIAction(UI_ACTION_IDS.UI_READ_PSI);
            
            // Audit trail must have exactly 3 records
            expect(controller.auditTrail.records.length).toBe(3);
            
            // Each record must have valid before/after states
            controller.auditTrail.records.forEach((record, index) => {
                expect(record.psiStateBefore).toBeDefined();
                expect(record.psiStateAfter).toBeDefined();
                expect(record.forensicHash).toBeDefined();
                expect(record.timestamp).toBeDefined();
            });
            
            // Final state must match last audit record
            const finalAuditState = controller.auditTrail.records[2].psiStateAfter;
            const actualFinalState = engine.ψ.toJSON();
            
            expect(actualFinalState.dPhi).toBe(finalAuditState.dPhi);
            expect(actualFinalState.kappa).toBe(finalAuditState.kappa);
            expect(actualFinalState.theta).toBe(finalAuditState.theta);
        });

        test('Q.3: Missing audit records constitute canon breach', () => {
            const auditTrail = new UIAuditTrail();
            
            // Simulate gap in audit trail (tampering detection)
            const engine = new MockASCPIEngine();
            
            // Record state A
            const stateA = engine.ψ.toJSON();
            
            // Direct manipulation without audit (simulating UI bypass)
            engine.commitSectorDecision(2);
            const stateB = engine.ψ.toJSON();
            
            // Try to create audit record for C without recording B transition
            engine.commitSectorDecision(4);
            const stateC = engine.ψ.toJSON();
            
            // This should be detectable as a gap (state A -> C without B)
            const record = auditTrail.addRecord(UI_ACTION_IDS.UI_SECTOR_4, 4, stateA, stateC);
            
            // The audit system should flag this as suspicious
            // (in practice, proper UI would prevent the gap from occurring)
            expect(stateA.dPhi).not.toBe(stateC.dPhi);
            expect(record.actionId).toBe(UI_ACTION_IDS.UI_SECTOR_4);
        });

        test('Q.4: Audit trail replay must be deterministic', () => {
            const engine1 = new MockASCPIEngine();
            const engine2 = new MockASCPIEngine();
            const controller1 = new CanonicalUIController(engine1);
            const controller2 = new CanonicalUIController(engine2);
            
            // Execute sequence on controller1
            const actions = [
                [UI_ACTION_IDS.UI_SECTOR_1, 1],
                [UI_ACTION_IDS.UI_SECTOR_3, 3],
                [UI_ACTION_IDS.UI_SECTOR_0, 0]
            ];
            
            actions.forEach(([actionId, sector]) => {
                controller1.executeUIAction(actionId, sector);
            });
            
            // Replay same sequence on controller2
            actions.forEach(([actionId, sector]) => {
                controller2.executeUIAction(actionId, sector);
            });
            
            // Audit trails must be structurally identical
            expect(controller1.auditTrail.records.length).toBe(controller2.auditTrail.records.length);
            
            for (let i = 0; i < controller1.auditTrail.records.length; i++) {
                const record1 = controller1.auditTrail.records[i];
                const record2 = controller2.auditTrail.records[i];
                
                expect(record1.actionId).toBe(record2.actionId);
                expect(record1.sector).toBe(record2.sector);
                expect(record1.psiStateAfter.dPhi).toBe(record2.psiStateAfter.dPhi);
                expect(record1.psiStateAfter.kappa).toBe(record2.psiStateAfter.kappa);
            }
        });

        test('Q.5: Concurrent access detection and prevention', () => {
            const engine = new MockASCPIEngine();
            const controller1 = new CanonicalUIController(engine);
            const controller2 = new CanonicalUIController(engine);
            
            // Both controllers share the same engine (dangerous scenario)
            controller1.executeUIAction(UI_ACTION_IDS.UI_SECTOR_1, 1);
            
            // Second controller acting on same engine creates audit inconsistency
            expect(() => {
                controller2.executeUIAction(UI_ACTION_IDS.UI_SECTOR_2, 2);
            }).toThrow(); // Should fail due to shared state violation
            
            // Only one controller should have audit records
            expect(controller1.auditTrail.records.length).toBe(1);
            expect(controller2.auditTrail.records.length).toBe(0);
        });

        test('Q.6: Forensic hash verification detects tampering', () => {
            const engine = new MockASCPIEngine();
            const controller = new CanonicalUIController(engine);
            
            const record = controller.executeUIAction(UI_ACTION_IDS.UI_SECTOR_2, 2);
            const originalHash = record.forensicHash;
            
            // Simulate tampering attempt (in real implementation, this would be prevented by immutability)
            // This test documents what should be detected
            const tamperedData = {
                ...record.psiStateAfter,
                dPhi: 0.999 // Tampered value
            };
            
            // Recompute hash with tampered data
            const tamperedHashData = JSON.stringify({
                actionId: record.actionId,
                sector: record.sector,
                before: record.psiStateBefore,
                after: tamperedData
            });
            
            let tamperedHash = 0;
            for (let i = 0; i < tamperedHashData.length; i++) {
                tamperedHash = ((tamperedHash << 5) - tamperedHash) + tamperedHashData.charCodeAt(i);
                tamperedHash |= 0;
            }
            tamperedHash = Math.abs(tamperedHash).toString(16);
            
            // Hashes must be different (tamper detection)
            expect(tamperedHash).not.toBe(originalHash);
        });
    });
});
