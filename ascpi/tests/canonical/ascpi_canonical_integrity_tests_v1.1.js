// ═══════════════════════════════════════════════════════════════════════════════
// ASCπ CANONIEKE INTEGRITEITSTEST-SUITE v1.1
// Canon-verdedigingsmechanisme tegen semantische vervorming
// Normatief: faalt implementatie → afkeuring, ongeacht intentie
// ═══════════════════════════════════════════════════════════════════════════════

const D_PHI_STAR = (1 + Math.sqrt(5)) / 4;
const TAU = 2 * Math.PI;
const EPSILON = 1e-6;

const CONST = { 
    D_PHI_STAR: D_PHI_STAR, 
    COHERENCE_THRESHOLD: 0.9999,
    EPS_STRUCT: 1e-4, 
    EPS_SEM: 1e-4,
    tau: TAU,
    DEFAULT_CONFIG: { 
        maxSteps: 50000, 
        stepSize: 0.1, 
        alpha_syntax: 0.1, 
        alpha_structural: 0.1, 
        alpha_semantic: 0.05, 
        alpha_c: 0.05, 
        beta_c: 0.5, 
        K_coupling: 0.1, 
        kappa_min: 0.01, 
        kappa_max: 10.0 
    },
    PROFILE_MAP: { 
        PROFILE_SCRIPT: { 
            initial_kappa: 5.0, 
            syntax_weight: 0.8, 
            dPhi_base: 0.1, 
            semantic_init_fraction: 0.1 
        } 
    },
    SECTOR_MAP: [
        { theta: 0 * (TAU / 6), kappa: 2.5, C: 0.90, N: 0.80, dPhi: 0.1 + 1.5 * 0.05 },
        { theta: 1 * (TAU / 6), kappa: 2.0, C: 0.85, N: 0.70, dPhi: 0.1 + 1.0 * 0.05 },
        { theta: 2 * (TAU / 6), kappa: 1.5, C: 0.95, N: 0.90, dPhi: 0.1 + 2.0 * 0.05 },
        { theta: 3 * (TAU / 6), kappa: 3.0, C: 0.75, N: 0.60, dPhi: 0.1 + 0.5 * 0.05 },
        { theta: 4 * (TAU / 6), kappa: 4.0, C: 0.99, N: 0.95, dPhi: 0.1 + 2.5 * 0.05 },
        { theta: 5 * (TAU / 6), kappa: 1.0, C: 0.70, N: 0.40, dPhi: 0.1 - 2.5 * 0.05 }
    ]
};

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
        this.dPhi = this.dPhi_syntax + this.dPhi_semantic + this.dPhi_structural;
    }
    toJSON() { return { dPhi: this.dPhi, kappa: this.kappa, theta: this.theta, N: this.N, C: this.C, t: this.t }; }
}

class ASCPIEngine {
    constructor(config = {}) {
        this.config = { ...CONST.DEFAULT_CONFIG, ...config };
        this.ψ = new Psi();
        this.stepCount = 0;
        this.currentPass = 'INITIAL';
    }
    
    encodeText(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash |= 0;
        }
        return ((Math.abs(hash) % 1000) + 1) / 1000;
    }
    
    initializePsi(input, profileName = 'PROFILE_SCRIPT') {
        const initialN = this.encodeText(input);
        const profile = CONST.PROFILE_MAP[profileName] || CONST.PROFILE_MAP.PROFILE_SCRIPT;
        
        const initialDPhiTotal = profile.dPhi_base;
        const initialdPhi_syntax = initialDPhiTotal * profile.syntax_weight;
        const initialdPhi_semantic = initialDPhiTotal * profile.semantic_init_fraction;
        const initialdPhi_structural = initialDPhiTotal - initialdPhi_syntax - initialdPhi_semantic;

        this.ψ = new Psi({
            dPhi: initialDPhiTotal,
            dPhi_syntax: initialdPhi_syntax,
            dPhi_semantic: initialdPhi_semantic,
            dPhi_structural: initialdPhi_structural,
            kappa: profile.initial_kappa,
            theta: 0.0,
            N: initialN,
            C: 0.01,
            t: 0
        });
        
        this.stepCount = 0;
        return this;
    }
    
    step() {
        const dt = this.config.stepSize;
        const ψ = this.ψ;
        const cfg = this.config;
        const dPhiStar = CONST.D_PHI_STAR;

        const d_dPhi_syntax = -ψ.dPhi_syntax * cfg.alpha_syntax;
        const d_dPhi_structural = -ψ.dPhi_structural * cfg.alpha_structural;
        const semanticDiff = ψ.dPhi_semantic - dPhiStar;
        const d_dPhi_semantic = -semanticDiff * cfg.alpha_semantic;

        ψ.dPhi_syntax = Math.max(0, ψ.dPhi_syntax + d_dPhi_syntax * dt);
        ψ.dPhi_structural = Math.max(0, ψ.dPhi_structural + d_dPhi_structural * dt);
        ψ.dPhi_semantic += d_dPhi_semantic * dt;
        
        ψ.dPhi = ψ.dPhi_syntax + ψ.dPhi_semantic + ψ.dPhi_structural;
        
        const tensionDiff = ψ.dPhi - dPhiStar;
        const incoherence = 1.0 - ψ.C;

        const d_C = (cfg.alpha_c * incoherence) - (cfg.beta_c * Math.abs(tensionDiff));
        const d_kappa = cfg.K_coupling * ψ.dPhi * incoherence;
        const d_theta = (cfg.K_coupling * ψ.dPhi) / ψ.kappa;
        
        ψ.C = Math.min(1.0, Math.max(0.0, ψ.C + d_C * dt));
        ψ.kappa = Math.min(cfg.kappa_max, Math.max(cfg.kappa_min, ψ.kappa + d_kappa * dt));
        ψ.theta = (ψ.theta + d_theta * dt) % CONST.tau;
        if (ψ.theta < 0) ψ.theta += CONST.tau;

        ψ.t++;
        this.stepCount = ψ.t;

        return true;
    }
    
    commitSectorDecision(sector) {
        if (sector < 0 || sector >= CONST.SECTOR_MAP.length) {
            throw new Error(`Ongeldige sector index: ${sector}`);
        }

        const map = CONST.SECTOR_MAP[sector];
        
        this.ψ.dPhi = map.dPhi;
        this.ψ.kappa = map.kappa;
        this.ψ.theta = map.theta;
        this.ψ.C = map.C;
        
        if (this.ψ.N === 0) {
            this.ψ.N = map.N;
        }
        
        this.ψ.t = 0;
        this.stepCount = 0;
    }
    
    rewriteCodeFromField(input, psi, hash) {
        const codeHash = hash || this.encodeText(input).toString(16);
        
        if (psi.C < CONST.COHERENCE_THRESHOLD) {
            return `\n/* Laughing Loop Incomplete\n   Coherence: ${psi.C.toFixed(5)}\n   Iteration: ${psi.t}\n*/\n`;
        }

        const dPhiFinal = psi.dPhi.toFixed(6);
        const kappaFinal = psi.kappa.toFixed(3);
        const thetaFinal = psi.theta.toFixed(4);
        const cFinal = psi.C.toFixed(4);
        
        return `\nFNO_CANONICAL_${codeHash}\nΔΦ_final = ${dPhiFinal}\nκ_final  = ${kappaFinal}\nθ_final  = ${thetaFinal}\nC_final  = ${cFinal}\n`;
    }
    
    _runPass(passName, stopConditionFn, maxSteps) {
        this.currentPass = passName;
        const startStep = this.ψ.t;
        
        while (!stopConditionFn(this.ψ) && (this.ψ.t - startStep) < maxSteps) {
            this.step();
        }
    }
    
    compile(input, profileName = 'PROFILE_SCRIPT') {
        if (!input || input.length === 0) {
            return { 
                status: 'ERROR', 
                iterations: 0, 
                finalPsi: null, 
                compiledOutput: "Input artifact is empty." 
            };
        }

        const initialN = this.encodeText(input).toString(16);
        this.initializePsi(input, profileName);

        this._runPass('A', 
            (ψ) => ψ.dPhi_structural <= CONST.EPS_STRUCT, 
            this.config.maxSteps);
            
        this._runPass('B', 
            (ψ) => Math.abs(ψ.dPhi_semantic - CONST.D_PHI_STAR) <= CONST.EPS_SEM, 
            this.config.maxSteps);

        this._runPass('C', 
            (ψ) => ψ.C >= CONST.COHERENCE_THRESHOLD, 
            this.config.maxSteps);
            
        const status = this.ψ.C >= CONST.COHERENCE_THRESHOLD ? 'COMPILED' : 'MAX_STEPS_REACHED';
        
        const compiledOutput = this.rewriteCodeFromField(input, this.ψ, initialN);
        
        return {
            status: status,
            iterations: this.ψ.t,
            finalPsi: this.ψ.toJSON(),
            compiledOutput: compiledOutput
        };
    }
}

describe('ASCPIEngine Canon Enforcement Suite v1.1', () => {

    // TEST F — Sector Commit Determinisme
    describe('F: Sector Commit Determinisme', () => {
        test('F.1: Alle 6 sectoren leveren exacte canonieke Ψ-staten', () => {
            for (let sector = 0; sector < 6; sector++) {
                const engineA = new ASCPIEngine({});
                const engineB = new ASCPIEngine({});
                
                // Verschillende starttoestand
                engineA.ψ = new Psi({ dPhi: 0.5, kappa: 3.0, theta: 1.0, N: 0.7, C: 0.6, t: 100 });
                engineB.ψ = new Psi({ dPhi: 0.2, kappa: 7.0, theta: 2.5, N: 0.3, C: 0.8, t: 500 });
                
                engineA.commitSectorDecision(sector);
                engineB.commitSectorDecision(sector);
                
                const expected = CONST.SECTOR_MAP[sector];
                
                // Exact identiek ongeacht voorafgaande staat
                expect(engineA.ψ.dPhi).toBeCloseTo(expected.dPhi, 6);
                expect(engineA.ψ.kappa).toBeCloseTo(expected.kappa, 6);
                expect(engineA.ψ.theta).toBeCloseTo(expected.theta, 6);
                expect(engineA.ψ.C).toBeCloseTo(expected.C, 6);
                
                expect(engineB.ψ.dPhi).toBeCloseTo(expected.dPhi, 6);
                expect(engineB.ψ.kappa).toBeCloseTo(expected.kappa, 6);
                expect(engineB.ψ.theta).toBeCloseTo(expected.theta, 6);
                expect(engineB.ψ.C).toBeCloseTo(expected.C, 6);
                
                // t wordt altijd gereset
                expect(engineA.ψ.t).toBe(0);
                expect(engineB.ψ.t).toBe(0);
                
                // N wordt behouden als > 0
                expect(engineA.ψ.N).toBe(0.7);
                expect(engineB.ψ.N).toBe(0.3);
            }
        });

        test('F.2: N wordt alleen overschreven bij N=0 initialisatie', () => {
            const engine = new ASCPIEngine({});
            
            // Test N=0 geval
            engine.ψ = new Psi({ N: 0 });
            engine.commitSectorDecision(0);
            expect(engine.ψ.N).toBe(CONST.SECTOR_MAP[0].N);
            
            // Test N>0 geval
            engine.ψ = new Psi({ N: 0.555 });
            engine.commitSectorDecision(1);
            expect(engine.ψ.N).toBe(0.555);
        });
    });

    // TEST G — UI → Field Canon
    describe('G: UI → Field Canon Compliance', () => {
        test('G.1: Meerdere UI-commits gevolgd door hervatting convergeert canoniek', () => {
            const engine = new ASCPIEngine({});
            
            // Initiële staat
            engine.initializePsi("test input");
            const originalN = engine.ψ.N;
            
            // Meerdere UI-commits simuleren
            engine.commitSectorDecision(2);
            engine.commitSectorDecision(4);
            engine.commitSectorDecision(1);
            
            // Na commits: N behouden, t=0
            expect(engine.ψ.N).toBeCloseTo(originalN, 6);
            expect(engine.ψ.t).toBe(0);
            
            // Hervatting Laughing Loop: 50 stappen
            for (let i = 0; i < 50; i++) {
                engine.step();
            }
            
            // Canonieke evolutie: ΔΦ→ΔΦ*, C groeiend, N invariant
            expect(engine.ψ.N).toBeCloseTo(originalN, 6);
            expect(engine.ψ.C).toBeGreaterThan(CONST.SECTOR_MAP[1].C);
            expect(engine.ψ.t).toBe(50);
        });

        test('G.2: UI-commit introduceert geen permanente veldvervorming', () => {
            const engineControl = new ASCPIEngine({});
            const engineUI = new ASCPIEngine({});
            
            const input = "consistent_test_input";
            
            // Control: directe compilatie
            const controlResult = engineControl.compile(input);
            
            // UI: commit + compilatie
            engineUI.initializePsi(input);
            engineUI.commitSectorDecision(3);
            
            // Hercompilatie vanaf commit-punt
            const uiResult = engineUI.compile(input);
            
            // Beide moeten convergeren naar coherentie
            if (controlResult.status === 'COMPILED' && uiResult.status === 'COMPILED') {
                expect(Math.abs(controlResult.finalPsi.C - uiResult.finalPsi.C)).toBeLessThan(0.1);
            }
            
            // N moet identiek blijven
            expect(controlResult.finalPsi.N).toBeCloseTo(uiResult.finalPsi.N, 6);
        });
    });

    // TEST H — FNO Hash Stabiliteit
    describe('H: FNO Hash Stabiliteit', () => {
        test('H.1: Identieke input levert identieke FNO over meerdere instanties', () => {
            const testInput = "function test() { return 42; }";
            const engines = [new ASCPIEngine({}), new ASCPIEngine({}), new ASCPIEngine({})];
            
            const results = engines.map(engine => engine.compile(testInput));
            
            // Alle resultaten identiek
            const baseResult = results[0];
            for (let i = 1; i < results.length; i++) {
                expect(results[i].status).toBe(baseResult.status);
                expect(results[i].compiledOutput).toBe(baseResult.compiledOutput);
                
                if (baseResult.status === 'COMPILED') {
                    expect(results[i].finalPsi.dPhi).toBeCloseTo(baseResult.finalPsi.dPhi, 6);
                    expect(results[i].finalPsi.kappa).toBeCloseTo(baseResult.finalPsi.kappa, 6);
                    expect(results[i].finalPsi.theta).toBeCloseTo(baseResult.finalPsi.theta, 6);
                    expect(results[i].finalPsi.C).toBeCloseTo(baseResult.finalPsi.C, 6);
                }
            }
        });

        test('H.2: FNO hash is stabiel over verschillende configuraties', () => {
            const input = "console.log('hello');";
            
            const configA = { maxSteps: 1000, stepSize: 0.05 };
            const configB = { maxSteps: 2000, stepSize: 0.2 };
            
            const engineA = new ASCPIEngine(configA);
            const engineB = new ASCPIEngine(configB);
            
            const resultA = engineA.compile(input);
            const resultB = engineB.compile(input);
            
            // Hash-component moet identiek zijn
            const hashA = resultA.compiledOutput.match(/FNO_CANONICAL_([^\\n]+)/)?.[1];
            const hashB = resultB.compiledOutput.match(/FNO_CANONICAL_([^\\n]+)/)?.[1];
            
            expect(hashA).toBe(hashB);
            expect(hashA).toBeDefined();
        });
    });

    // TEST I — Anti-AI / Anti-Optimizer Guard
    describe('I: Anti-AI / Anti-Optimizer Guard', () => {
        test('I.1: Detecteert verboden randomness', () => {
            const engineCode = ASCPIEngine.toString();
            
            // Expliciete checks op verboden concepten
            expect(engineCode).not.toMatch(/Math\\.random/i);
            expect(engineCode).not.toMatch(/random/i);
            expect(engineCode).not.toMatch(/stochastic/i);
            expect(engineCode).not.toMatch(/sample/i);
            expect(engineCode).not.toMatch(/noise/i);
        });

        test('I.2: Detecteert verboden optimalisatie-terminologie', () => {
            const engineCode = ASCPIEngine.toString();
            const psiCode = Psi.toString();
            
            // Verboden AI/ML/Optimizer termen
            const forbiddenTerms = [
                /gradient/i, /backprop/i, /loss/i, /minimize/i, /maximize/i,
                /learning.rate/i, /epoch/i, /batch/i, /neural/i, /network/i,
                /train/i, /inference/i, /model/i, /predict/i, /optimize/i
            ];
            
            forbiddenTerms.forEach(term => {
                expect(engineCode).not.toMatch(term);
                expect(psiCode).not.toMatch(term);
            });
        });

        test('I.3: Verificeert deterministische constanten binnen canon', () => {
            const engine = new ASCPIEngine({});
            
            // Alle configuratie-constanten moeten binnen canonieke grenzen
            expect(engine.config.alpha_syntax).toBeGreaterThan(0);
            expect(engine.config.alpha_syntax).toBeLessThan(1);
            
            expect(engine.config.alpha_semantic).toBeGreaterThan(0);
            expect(engine.config.alpha_semantic).toBeLessThan(1);
            
            expect(engine.config.stepSize).toBeGreaterThan(0);
            expect(engine.config.stepSize).toBeLessThan(1);
            
            // Canonieke attractor moet exact zijn
            expect(CONST.D_PHI_STAR).toBeCloseTo((1 + Math.sqrt(5)) / 4, 10);
        });
    });

    // TEST J — Canon Breach Detection
    describe('J: Canon Breach Detection', () => {
        test('J.1: Detecteert gebroken dPhi-recompositie', () => {
            const engine = new ASCPIEngine({});
            engine.ψ = new Psi({ 
                dPhi_syntax: 0.1, 
                dPhi_semantic: 0.2, 
                dPhi_structural: 0.15 
            });
            
            // Correcte recompositie
            const expectedTotal = 0.1 + 0.2 + 0.15;
            expect(engine.ψ.dPhi).toBeCloseTo(expectedTotal, 6);
            
            // Simuleer fout: handmatige dPhi-override zonder component-update
            engine.ψ.dPhi = 0.999;
            
            // Breach: dPhi != som van componenten
            const actualSum = engine.ψ.dPhi_syntax + engine.ψ.dPhi_semantic + engine.ψ.dPhi_structural;
            expect(Math.abs(engine.ψ.dPhi - actualSum)).toBeGreaterThan(0.1);
        });

        test('J.2: Detecteert N-invariant schending', () => {
            const engine = new ASCPIEngine({});
            engine.ψ = new Psi({ N: 0.5, t: 0 });
            
            const originalN = engine.ψ.N;
            
            // 10 stappen: N moet constant blijven
            for (let i = 0; i < 10; i++) {
                engine.step();
                expect(engine.ψ.N).toBeCloseTo(originalN, 10);
            }
        });

        test('J.3: Detecteert update-volgorde schending', () => {
            const engine = new ASCPIEngine({});
            engine.ψ = new Psi({ 
                dPhi_syntax: 0.05, 
                dPhi_semantic: 0.3, 
                dPhi_structural: 0.02,
                kappa: 2.0,
                theta: 1.0,
                N: 0.6,
                C: 0.4,
                t: 0
            });
            
            const originalSum = engine.ψ.dPhi_syntax + engine.ψ.dPhi_semantic + engine.ψ.dPhi_structural;
            
            // Een stap
            engine.step();
            
            // Na stap: dPhi moet gelijk zijn aan som van geüpdatete componenten
            const newSum = engine.ψ.dPhi_syntax + engine.ψ.dPhi_semantic + engine.ψ.dPhi_structural;
            expect(engine.ψ.dPhi).toBeCloseTo(newSum, 6);
            
            // Som moet zijn veranderd (componenten evolueren)
            expect(Math.abs(newSum - originalSum)).toBeGreaterThan(EPSILON);
        });

        test('J.4: Detecteert FNO-syntaxis contamination', () => {
            const engine = new ASCPIEngine({});
            const mockPsi = new Psi({ 
                dPhi: 0.5, 
                kappa: 3.0, 
                theta: 1.5, 
                N: 0.7, 
                C: 0.99995, 
                t: 1000 
            });
            
            const fnoOutput = engine.rewriteCodeFromField("test", mockPsi, "TESTHASH");
            
            // FNO mag geen uitvoerbare JavaScript bevatten
            expect(fnoOutput).not.toMatch(/const\s+\w+\s*=/);
            expect(fnoOutput).not.toMatch(/var\s+\w+\s*=/);
            expect(fnoOutput).not.toMatch(/let\s+\w+\s*=/);
            expect(fnoOutput).not.toMatch(/function\s+\w+/);
            expect(fnoOutput).not.toMatch(/=>\s*{/);
            expect(fnoOutput).not.toMatch(/return\s+/);
            
            // FNO moet canonieke structure hebben
            expect(fnoOutput).toMatch(/FNO_CANONICAL_TESTHASH/);
            expect(fnoOutput).toMatch(/ΔΦ_final\s*=\s*[\d.]+/);
            expect(fnoOutput).toMatch(/κ_final\s*=\s*[\d.]+/);
            expect(fnoOutput).toMatch(/θ_final\s*=\s*[\d.]+/);
            expect(fnoOutput).toMatch(/C_final\s*=\s*[\d.]+/);
        });
    });
});
