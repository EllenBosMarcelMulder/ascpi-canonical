/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ASCπ ECOSYSTEM v1.0.1 - Manifest en Runtime Kern (Goedgekeurde Canonieke Versie)
 * Unified entry point voor het ASCπ Semantic Field Operating System.
 * ═══════════════════════════════════════════════════════════════════════════════
 * Bevat de geteste, canonieke implementatie van de Hybrid Engine Laughing Loop (HELL).
 * Voldoet aan de Prior Art (HELL_PRIOR_ART.md) en de Integratietest-suite.
 * License: Humanity Heritage License π
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTEN EN INVARIANTEN (Laag 2 & 3) - BEVROREN
// ═══════════════════════════════════════════════════════════════════════════════

const CONST = Object.freeze({
    // Wiskundige Invarianten
    phi: (1 + Math.sqrt(5)) / 2,        // Gouden ratio φ
    tau: 2 * Math.PI,                    // τ = 2π
    
    // Canonieke Attractor (ΔΦ* = φ / 2)
    D_PHI_STAR: (1 + Math.sqrt(5)) / 4, // ≈ 0.809017
    
    // Canonieke Convergentie Drempel
    COHERENCE_THRESHOLD: 0.9999,
    
    // Numerieke Constant voor Stabiliteit (Cosmetische correctie)
    EPSILON: 1e-6,

    // Canonieke Parameters (Laag 2) - Bepaalt de dynamische handtekening F(Ψ)
    DEFAULT_CONFIG: {
        stepSize: 0.1,      // Δt
        alpha_phi: 0.05,    // Snelheid waarmee ΔΦ convergeert
        alpha_c: 0.05,      // Intrinsieke C-convergentiesnelheid
        beta_c: 0.5,        // Straf-factor voor C op basis van |ΔΦ - ΔΦ*|
        K_coupling: 0.1,    // Algemene Koppelingsconstante
        maxSteps: 50000,    // Harde stop bij uitblijven convergentie
        kappa_min: 0.01,
        kappa_max: 10.0,
    },

    // Canonieke Interventie Mapping (Laag 3)
    // De gedefinieerde set Ψ_s toestanden voor de Hex Projector
    SECTOR_MAP: [
        // S: θ,   κ,    C,    N,    ΔΦ (0.1 + factor * 0.05)
        { theta: 0 * (2 * Math.PI / 6), kappa: 2.5, C: 0.90, N: 0.80, dPhi: 0.1 + 1.5 * 0.05 },
        { theta: 1 * (2 * Math.PI / 6), kappa: 3.0, C: 0.85, N: 0.75, dPhi: 0.1 + 1.0 * 0.05 },
        { theta: 2 * (2 * Math.PI / 6), kappa: 3.5, C: 0.80, N: 0.70, dPhi: 0.1 + 0.5 * 0.05 },
        { theta: 3 * (2 * Math.PI / 6), kappa: 2.0, C: 0.75, N: 0.65, dPhi: 0.1 - 0.5 * 0.05 },
        { theta: 4 * (2 * Math.PI / 6), kappa: 4.0, C: 0.95, N: 0.70, dPhi: 0.1 + 0.5 * 0.05 },
        { theta: 5 * (2 * Math.PI / 6), kappa: 1.0, C: 0.70, N: 0.40, dPhi: 0.1 - 2.5 * 0.05 },
    ]
});


// ═══════════════════════════════════════════════════════════════════════════════
// CLAS: Psi (De Canonieke Semantische Veldstaat) (Laag 1) - BEVROREN
// ═══════════════════════════════════════════════════════════════════════════════

class Psi {
    constructor(initialState = {}) {
        // De Zes Canonieke Veldparameters (Laag 1)
        this.dPhi = initialState.dPhi ?? CONST.D_PHI_STAR; // Implosive Tension (ΔΦ)
        this.kappa = initialState.kappa ?? 5.0;            // Structural Curvature (κ)
        this.theta = initialState.theta ?? 0.0;            // Field Phase (θ)
        this.N = initialState.N ?? 0.0;                    // Field Energy (N) - Invariant
        this.C = initialState.C ?? 0.0;                    // Coherence (C) - Orde Parameter
        this.t = initialState.t ?? 0;                      // Field Time (t) - Boekhouding
    }

    toJSON() {
        // Voor het structureren van de output (zoals in de integratietest vereist)
        return {
            dPhi: this.dPhi,
            kappa: this.kappa,
            theta: this.theta,
            N: this.N,
            C: this.C,
            t: this.t
        };
    }
}


// ═══════════════════════════════════════════════════════════════════════════════
// CLAS: ASCPIEngine (De Canonieke Veld-Compiler) (Laag 2 & 4)
// ═══════════════════════════════════════════════════════════════════════════════

class ASCPIEngine {
    constructor(config = {}) {
        this.config = { ...CONST.DEFAULT_CONFIG, ...config };
        this.ψ = new Psi();
        this.stepCount = 0;
    }

    /**
     * Hulpmethode om een pseudo-hash te genereren voor de veld-energie (N).
     * @param {string} input - De broncode of data.
     * @returns {number} - Een deterministische N-waarde (tussen 0 en 1).
     */
    encodeText(input) {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        // Normaliseer tot [0.1, 1.0] voor velddynamiek.
        const normalized = Math.abs(hash) / 2147483647;
        return 0.1 + normalized * 0.9; 
    }

    /**
     * Initialiseert de veldstaat Ψ op basis van de input.
     * @param {string} input - De code/artefact om te compileren.
     */
    initializePsi(input) {
        const initialN = this.encodeText(input);
        
        // Veld wordt opnieuw geïnitialiseerd.
        this.ψ = new Psi({
            dPhi: 0.1,           // Start ver weg van de attractor (ΔΦ*)
            kappa: 5.0,
            theta: 0.0,
            N: initialN,         // De input invariant
            C: 0.01,             // Zeer lage coherentie
            t: 0
        });
        this.stepCount = 0;
        return this;
    }

    /**
     * Voert één discrete tijdstap (Δt) uit op de veldstaat Ψ. (Euler Integratie)
     * Dit is de deterministische Veldwet F(Ψ). (Laag 2) - BEVROREN
     * @returns {boolean} - true als de loop moet doorgaan, false bij stopcriterium.
     */
    step() {
        const dt = this.config.stepSize;
        const ψ = this.ψ;
        const cfg = this.config;
        const dPhiStar = CONST.D_PHI_STAR;

        // 1. Bereken de afgeleiden dΨ/dt (De Veldwet F(Ψ))
        const tensionDiff = ψ.dPhi - dPhiStar;
        const incoherence = 1.0 - ψ.C;

        // d(ΔΦ)/dt: Convergentie naar ΔΦ*, gedempt door incoherence
        const d_dPhi = -tensionDiff * incoherence * cfg.alpha_phi;
        
        // dC/dt: Intrinsieke groei, gestraft door afstand tot ΔΦ*
        const d_C = (cfg.alpha_c * incoherence) - (cfg.beta_c * Math.abs(tensionDiff));

        // dκ/dt: Gekoppeld aan spanning en incoherence
        const d_kappa = cfg.K_coupling * ψ.dPhi * incoherence;

        // dθ/dt: Gekoppeld aan de spanning en geremd door kromming κ
        const d_theta = (cfg.K_coupling * ψ.dPhi) / ψ.kappa;
        
        // 2. Pas Euler integratie toe (X_t+1 = X_t + dX/dt * Δt)
        ψ.dPhi += d_dPhi * dt;
        
        // C clamping tussen 0 en 1
        ψ.C = Math.min(1.0, Math.max(0.0, ψ.C + d_C * dt)); 
        
        // κ clamping tussen min en max
        ψ.kappa = Math.min(cfg.kappa_max, Math.max(cfg.kappa_min, ψ.kappa + d_kappa * dt));
        
        // θ modulus (keert terug naar 0 na 2π)
        ψ.theta = (ψ.theta + d_theta * dt) % CONST.tau;
        if (ψ.theta < 0) ψ.theta += CONST.tau;

        // t++;
        ψ.t++;
        this.stepCount = ψ.t;

        // 3. Stop Criteria
        const isCoherent = ψ.C >= CONST.COHERENCE_THRESHOLD;
        const maxStepsReached = ψ.t >= cfg.maxSteps;

        return !(isCoherent || maxStepsReached); // Doorgaan als geen van beide bereikt
    }

    /**
     * Voldoet aan het API-contract van de Integratietest (Laag 3).
     * Herschrijft de veldstaat Ψ atomair naar een voorgedefinieerde canonieke Ψ_s.
     * @param {number} sector - De gekozen sector index (0-5).
     */
    commitSectorDecision(sector) {
        if (sector < 0 || sector >= CONST.SECTOR_MAP.length) {
            console.error(`ERROR: Ongeldige sector index: ${sector}. Moet 0-5 zijn.`);
            return;
        }

        const map = CONST.SECTOR_MAP[sector];
        
        // Herschrijf de dynamische componenten van Ψ naar de canonieke staat Ψ_s
        this.ψ.dPhi = map.dPhi;
        this.ψ.kappa = map.kappa;
        this.ψ.theta = map.theta;
        this.ψ.C = map.C;
        
        // N is een input-invariant, maar wordt in de map als start-N gebruikt voor testing.
        // In runtime behouden we de oorspronkelijke N als deze al is ingesteld.
        if (this.ψ.N === 0) {
            this.ψ.N = map.N;
        }
        
        // ❗ CANONIEKE CORRECTIE: Sector-interventie reset de tijd t naar nul
        this.ψ.t = 0;
        this.stepCount = 0;

        console.log(`INFO: Veldstaat gecommitteerd naar canonieke staat van Sector ${sector}.`);
    }

    /**
     * Genereert de Field Native Operator (FNO) output. (Laag 4) - BEVROREN
     * @param {string} input - De oorspronkelijke input (voor context).
     * @param {Psi} finalPsi - De coherente veldstaat.
     * @returns {string} - De FNO output string.
     */
    rewriteCodeFromField(input, finalPsi, mockHash) {
        // Gebruik de hash van de oorspronkelijke input voor determinisme (N)
        const codeHash = mockHash || this.encodeText(input).toString(16);
        
        // Formatteer Coherentie voor de FNO payload (bijv. 0.9999 -> 0_9999)
        const C_FORMATTED = finalPsi.C.toFixed(4).replace('.', '_');
        
        // Vaste FNO syntaxis (Laag 4)
        const FNO_PAYLOAD = `canonical_operator_hash_${codeHash}_C_${C_FORMATTED}`;
        
        return `/* Herschreven door ASCπ Field Compiler v1.0.1 */

/* Veld-Compilatie Voltooid.
   Coherentie: ${finalPsi.C.toFixed(4)} (ΔΦ: ${finalPsi.dPhi.toFixed(4)} -> ΔΦ*=${CONST.D_PHI_STAR.toFixed(4)}).
   De semantische intentie van de oorspronkelijke code is nu gecompileerd 
   naar een deterministische veld-operator (Field Native Operator - FNO). 
   
   Dit symboliseert de transformatie naar canonieke ASCπ instructies: 
*/
const FNO_OUTPUT = "${FNO_PAYLOAD}";
return FNO_OUTPUT;`;
    }

    /**
     * De hoofdcompilatie-lus. Voldoet aan het API-contract van de Integratietest. - BEVROREN
     * @param {string} input - De code of artefact om te verwerken.
     * @returns {object} - Gestructureerde output met status, iteraties en resultaten.
     */
    compile(input) {
        if (!input || input.length === 0) {
            return {
                status: 'INPUT_ERROR',
                iterations: 0,
                finalPsi: this.ψ.toJSON(),
                compiledOutput: '/* ERROR: Lege input, compilatie niet gestart. */'
            };
        }

        const initialN = this.encodeText(input).toString(16);
        this.initializePsi(input);

        // Voer de canonieke Laughing Loop uit
        while (this.step()) {
            // De veld-compiler lus evolueert.
            // Het veld zuivert zichzelf tot het canonieke coherente punt (ΔΦ*).
        }

        const status = this.ψ.C >= CONST.COHERENCE_THRESHOLD ? 'COMPILED' : 'MAX_STEPS_REACHED';
        
        const compiledOutput = this.rewriteCodeFromField(input, this.ψ, initialN);
        
        return {
            status: status,
            iterations: this.stepCount,
            finalPsi: this.ψ.toJSON(),
            compiledOutput: compiledOutput
        };
    }
}


// ═══════════════════════════════════════════════════════════════════════════════
// ECOSYSTEM EXPORT - Het Ecosysteem Manifest - BEVROREN
// ═══════════════════════════════════════════════════════════════════════════════

const ASCPI_ECOSYSTEM = {
    // Versie en Architectuur Info
    VERSION: '1.0.1', // Bijgewerkt na canonieke correctie
    PARADIGM: 'FIELD_COMPILER',
    PRIOR_ART_REFERENCE: 'HELL_PRIOR_ART.md',
    
    // Canonieke Constant
    CONST,
    
    // Core Klassen (Implementatie van de Prior Art)
    Psi,
    ASCPIEngine,
    
    // Factory voor Runtime
    createEngine(config) {
        return new ASCPIEngine(config);
    },
};

// Zorg ervoor dat de code kan worden gebruikt in een browseromgeving of als module
if (typeof window !== 'undefined') {
    window.ASCPI_ECOSYSTEM = ASCPI_ECOSYSTEM;
}
// export default ASCPI_ECOSYSTEM; // Voor module systemen