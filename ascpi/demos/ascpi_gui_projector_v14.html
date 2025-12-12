<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASCπ GUI-Projector v14 (Canoniek)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --bg: #0a0a0f;
            --surface: #12121a;
            --text: #e8e8f0;
            --kappa: #2a9d8f;
            --theta: #9b5de5;
            --coherence: #7fff00;
            --energy: #00d4ff;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg);
            color: var(--text);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            flex-direction: column;
        }

        .container {
            display: flex;
            gap: 24px;
            padding: 24px;
            border-radius: 12px;
            background: var(--surface);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            max-width: 90vw;
            width: 800px;
        }

        #fieldCanvas {
            border-radius: 8px;
            background: #000;
            cursor: crosshair;
            flex-grow: 1;
            height: 400px; /* Vaste hoogte voor de canvas */
            width: 100%;
        }

        .info-panel {
            width: 250px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .status-box {
            background: var(--surface);
            border: 1px solid var(--kappa);
            border-radius: 6px;
            padding: 12px;
        }

        .param-line {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-weight: 500;
        }
        .param-line span { font-weight: 300; }
        .param-label { width: 50px; }
        .param-value { text-align: right; }
    </style>
</head>
<body>

<div class="container">
    <canvas id="fieldCanvas" width="450" height="450"></canvas>

    <div class="info-panel">
        <h2 class="text-xl font-bold mb-2 text-center text-gray-200">ASCπ Veldtoestand ($\Psi$)</h2>
        
        <div class="status-box" id="psiDisplay">
            <!-- Ψ parameters worden hier dynamisch ingevoegd -->
            <div class="param-line" style="color:var(--kappa)">
                <span class="param-label">κ</span>
                <span id="display-kappa" class="param-value">0.000</span>
            </div>
            <div class="param-line" style="color:var(--theta)">
                <span class="param-label">θ</span>
                <span id="display-theta" class="param-value">0.000</span>
            </div>
            <div class="param-line mt-3" style="color:var(--coherence)">
                <span class="param-label">C</span>
                <span id="display-C" class="param-value">0.000</span>
            </div>
            <div class="param-line" style="color:var(--energy)">
                <span class="param-label">N</span>
                <span id="display-N" class="param-value">0.000</span>
            </div>
            <div class="param-line mt-3 text-gray-400">
                <span class="param-label">ΔΦ</span>
                <span id="display-dPhi" class="param-value">0.000</span>
            </div>
            <div class="param-line text-gray-400">
                <span class="param-label">t</span>
                <span id="display-t" class="param-value">0</span>
            </div>
        </div>

        <div class="text-xs text-gray-500 mt-4 p-2 rounded bg-gray-900 border border-gray-800">
            **Projector V14 Modus:**
            1. **Geen Tijd (t=0):** Interne animatie verwijderd.
            2. **Determinisme:** $\Psi$ verandert *alleen* door externe muis-input.
            3. **Canoniek:** Muis X/Y stuurt $\theta/\kappa$.
            4. **C/N Concessie:** Coherentie (C) en Energie (N) worden *tijdelijk* door de GUI afgeleid van de afstand tot het midden (als demonstratieprojectie).
        </div>
    </div>
</div>

<script>
    // ═══════════════════════════════════════════════════════════════════════════════
    // CANONIEKE CONTEXT
    // ═══════════════════════════════════════════════════════════════════════════════
    
    const CONST = Object.freeze({
        tau: 2 * Math.PI,                   // τ = 2π
        kappa_max: 5.0,                     // Maximale kromming (K)
        kappa_min: 0.1,                     // Minimale kromming (K)
        dphi_base: 0.1,                     // Basis ΔΦ (Implosieve Spanning)
    });

    // De toestand van het Veld (Ψ)
    let mutablePsi = {
        dPhi: CONST.dphi_base, // Implosieve Spanning (nu statisch, geleverd door Engine)
        kappa: 0.5,            // Kromming (0.1 tot 5.0)
        theta: 0.0,            // Fase (0 tot τ)
        N: 0.5,                // Energie (0 tot 1)
        C: 0.5,                // Coherentie (0 tot 1)
        t: 0                   // Tijd (statisch, alleen voor weergave)
    };

    const canvas = document.getElementById('fieldCanvas');
    const ctx = canvas.getContext('2d');
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // CORE CANONIEKE PROJECTIE (DRAW)
    // ═══════════════════════════════════════════════════════════════════════════════

    /**
     * Tekent de Hexagoon Projectie op basis van de huidige Ψ toestand.
     * Dit is een zuiver deterministische functie: f(Ψ) -> Beeld
     */
    function drawPsi() {
        // Zorg ervoor dat de canvasgrootte correct is
        const W = canvas.width;
        const H = canvas.height;
        const center = { x: W / 2, y: H / 2 };
        const radius = Math.min(W, H) * 0.4;

        // 1. Wis Canvas
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, W, H);
        
        const { kappa, theta, N, C, dPhi } = mutablePsi;

        // Bepaal de grootte en kleur van de veldweergave
        const coreRadius = radius * (0.2 + N * 0.4); // Grotere N = grotere kern
        const alpha = 0.5 + C * 0.5;                // Grotere C = hogere dekking
        
        // 2. Trek het Veld (Hexagoon)
        ctx.beginPath();
        const sides = 6;
        for (let i = 0; i < sides; i++) {
            // Hoek berekening, met theta als globale faseverschuiving
            const angle = i * CONST.tau / sides + theta;
            const x = center.x + coreRadius * Math.cos(angle);
            const y = center.y + coreRadius * Math.sin(angle);
            
            // De kromming (kappa) beïnvloedt de straal dynamisch (de projectie)
            const dynamicRadius = coreRadius * (1 + 0.1 * Math.sin(kappa * i)); 
            const dx = center.x + dynamicRadius * Math.cos(angle);
            const dy = center.y + dynamicRadius * Math.sin(angle);

            if (i === 0) {
                ctx.moveTo(dx, dy);
            } else {
                ctx.lineTo(dx, dy);
            }
        }
        ctx.closePath();

        // 3. Veldstyling (kleur is een projectie van de toestand)
        // HSL kleursysteem voor Theta (Fase)
        const hue = (theta / CONST.tau * 360) % 360;
        
        // Vulling: kleur op basis van Fase (Theta)
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${alpha})`;
        ctx.fill();

        // Rand: kleur op basis van Coherentie (C)
        ctx.strokeStyle = `hsla(120, 70%, 70%, ${C})`; // Groen/Geel tint voor coherentie
        ctx.lineWidth = 4 * C; // Dikker bij hogere C
        ctx.stroke();
        
        // 4. Update de GUI display
        updatePsiDisplay();
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // EXTERNE INPUT (Veld-Native Besturing)
    // ═══════════════════════════════════════════════════════════════════════════════

    /**
     * Wijzigt de mutablePsi toestand op basis van muis-input.
     * Dit simuleert de externe input (X/Y) op de veldparameters (θ/κ).
     * @param {MouseEvent} event 
     */
    function updatePsiFromMouse(event) {
        const rect = canvas.getBoundingClientRect();
        const W = canvas.width;
        const H = canvas.height;
        const center = { x: W / 2, y: H / 2 };

        // Muiscoördinaten relatief aan canvas, gecorrigeerd voor schaling
        const mouseX = (event.clientX - rect.left) * (W / rect.width);
        const mouseY = (event.clientY - rect.top) * (H / rect.height);

        // A. Bepaal Veldparameters uit Muispositie (Canoniek Goed)
        
        // 1. X -> Theta (Fase: 0 tot τ)
        // X-positie (0 tot W) mapt naar 0 tot 2π (τ)
        mutablePsi.theta = (mouseX / W) * CONST.tau;

        // 2. Y -> Kappa (Kromming: van min tot max)
        // Y-positie (0 tot H) mapt naar CONST.kappa_max tot CONST.kappa_min (omgekeerd)
        const normalizedY = 1.0 - (mouseY / H); // 0 (boven) tot 1 (onder) -> 1 (hoog K) tot 0 (laag K)
        mutablePsi.kappa = CONST.kappa_min + normalizedY * (CONST.kappa_max - CONST.kappa_min);
        mutablePsi.kappa = Math.max(CONST.kappa_min, Math.min(CONST.kappa_max, mutablePsi.kappa));
        
        // B. Bepaal Projectie-Parameters (De Tijdelijke Concessie)
        
        // Afstand tot het midden beïnvloedt N en C
        const dx = mouseX - center.x;
        const dy = mouseY - center.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(W, H) / 2;
        const normalizedDist = Math.min(1.0, dist / maxDist); // 0 (midden) tot 1 (rand)
        
        // N en C simuleren veldinteractie
        // Hogere afstand (rand) -> Lagere Coherentie (C), Hogere Energie (N)
        mutablePsi.C = 1.0 - (normalizedDist * 0.7); // C: 1.0 (midden) tot 0.3 (rand)
        mutablePsi.N = 0.2 + (normalizedDist * 0.8); // N: 0.2 (midden) tot 1.0 (rand)
        
        // 3. Trigger Redraw (requestAnimationFrame als zuiver mechanisme)
        requestAnimationFrame(drawPsi);
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // HULPFUNCTIES
    // ═══════════════════════════════════════════════════════════════════════════════

    function updatePsiDisplay() {
        document.getElementById('display-kappa').textContent = mutablePsi.kappa.toFixed(3);
        document.getElementById('display-theta').textContent = (mutablePsi.theta / Math.PI).toFixed(3) + ' π';
        document.getElementById('display-C').textContent = mutablePsi.C.toFixed(3);
        document.getElementById('display-N').textContent = mutablePsi.N.toFixed(3);
        document.getElementById('display-dPhi').textContent = mutablePsi.dPhi.toFixed(3);
        document.getElementById('display-t').textContent = mutablePsi.t.toString();
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // INITIALISATIE
    // ═══════════════════════════════════════════════════════════════════════════════

    window.onload = () => {
        // Zorg ervoor dat de canvasgrootte correct is in de DOM
        const W = 450;
        const H = 450;
        canvas.width = W;
        canvas.height = H;

        // 1. Voeg de muis-listener toe
        canvas.addEventListener('mousemove', updatePsiFromMouse);
        canvas.addEventListener('click', updatePsiFromMouse); // Reageer ook op klikken voor de initiële toestand

        // 2. Eerste canonieke, deterministische tekening
        drawPsi();
    };

</script>
</body>
</html>