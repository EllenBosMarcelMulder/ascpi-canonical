<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hexagonale Isomorfe Veldprojectie — Structureel Correct</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            overflow: hidden; 
            background: #030308; 
            font-family: 'Segoe UI', system-ui, sans-serif; 
            color: #e8e6e3; 
        }
        canvas { display: block; }
        
        /* HUD Overlay */
        .hud { position: fixed; pointer-events: none; z-index: 100; }
        .panel { 
            background: rgba(5, 5, 12, 0.85); 
            backdrop-filter: blur(12px); 
            border: 1px solid rgba(212, 165, 116, 0.15); 
            padding: 1.25rem; 
            border-radius: 0.75rem;
        }
        
        /* Top Left - System State */
        .hud-tl { top: 1.5rem; left: 1.5rem; width: 280px; }
        .sys-title { 
            font-size: 0.65rem; 
            font-weight: 600; 
            letter-spacing: 0.15em; 
            text-transform: uppercase; 
            color: rgba(212, 165, 116, 0.6); 
            margin-bottom: 1rem; 
        }
        
        /* Vertex Display */
        .vertex-ring {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            width: 140px;
            height: 140px;
            margin: 0 auto 1rem;
        }
        .vertex-node {
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.6rem;
            font-weight: 600;
            font-family: 'Consolas', monospace;
            transition: all 0.4s ease;
            border: 2px solid transparent;
        }
        .vertex-node.active {
            transform: scale(1.3);
            box-shadow: 0 0 20px currentColor;
        }
        .vertex-node.mirror {
            border-color: rgba(124, 58, 237, 0.8);
            box-shadow: 0 0 15px rgba(124, 58, 237, 0.5);
        }
        .vertex-center {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(78, 205, 196, 0.4) 0%, transparent 70%);
        }
        .mirror-line {
            position: absolute;
            height: 1px;
            background: rgba(124, 58, 237, 0.3);
            transform-origin: left center;
            transition: opacity 0.4s ease;
        }
        .mirror-line.active {
            background: rgba(124, 58, 237, 0.8);
            box-shadow: 0 0 8px rgba(124, 58, 237, 0.6);
        }
        
        /* 18-Cycle Display */
        .cycle-container { margin-top: 1rem; }
        .cycle-label { 
            font-size: 0.6rem; 
            text-transform: uppercase; 
            letter-spacing: 0.1em; 
            color: rgba(255,255,255,0.4); 
            margin-bottom: 0.5rem; 
        }
        .cycle-track {
            display: flex;
            gap: 3px;
            margin-bottom: 0.75rem;
        }
        .cycle-slot {
            flex: 1;
            height: 6px;
            border-radius: 2px;
            background: rgba(255,255,255,0.08);
            transition: all 0.3s ease;
        }
        .cycle-slot.filled { background: var(--slot-color); }
        .cycle-slot.active { 
            background: var(--slot-color); 
            box-shadow: 0 0 8px var(--slot-color);
        }
        .cycle-slot[data-cycle="A"] { --slot-color: #ff6b6b; }
        .cycle-slot[data-cycle="B"] { --slot-color: #48dbfb; }
        .cycle-slot[data-cycle="C"] { --slot-color: #a855f7; }
        
        .phase-labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.55rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .phase-label { opacity: 0.4; transition: all 0.3s ease; }
        .phase-label.active { opacity: 1; }
        .phase-label[data-phase="A"] { color: #ff6b6b; }
        .phase-label[data-phase="B"] { color: #48dbfb; }
        .phase-label[data-phase="C"] { color: #a855f7; }
        
        /* Bottom Left - Language Projection */
        .hud-bl { bottom: 1.5rem; left: 1.5rem; width: 320px; }
        .lang-title {
            font-size: 0.55rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: rgba(255,255,255,0.3);
            margin-bottom: 0.75rem;
        }
        .lang-output {
            font-size: 0.85rem;
            line-height: 1.6;
            min-height: 4em;
        }
        .lang-output .init { color: #ff6b6b; }
        .lang-output .dyn { color: #48dbfb; }
        .lang-output .close { color: #a855f7; }
        
        /* Right Side - Metrics */
        .hud-tr { top: 1.5rem; right: 1.5rem; text-align: right; }
        .metric-group { margin-bottom: 1rem; }
        .metric-label { 
            font-size: 0.55rem; 
            text-transform: uppercase; 
            letter-spacing: 0.1em; 
            color: rgba(255,255,255,0.4); 
            margin-bottom: 0.25rem;
        }
        .metric-value {
            font-family: 'Consolas', monospace;
            font-size: 1.5rem;
            color: #4ecdc4;
            text-shadow: 0 0 15px rgba(78, 205, 196, 0.5);
        }
        .metric-value.low { color: #6b7280; text-shadow: none; }
        .metric-sub {
            font-size: 0.6rem;
            color: rgba(255,255,255,0.5);
            margin-top: 0.25rem;
        }
        
        /* Bottom Right - Navigation */
        .hud-br { bottom: 1.5rem; right: 1.5rem; }
        .nav-info {
            font-size: 0.65rem;
            color: rgba(255,255,255,0.5);
            text-align: right;
        }
        .nav-pos {
            font-family: 'Consolas', monospace;
            font-size: 0.75rem;
            color: #d4a574;
            margin-top: 0.25rem;
        }
        
        /* Center - Crosshair */
        .crosshair {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 50;
        }
        .crosshair-ring {
            width: 60px;
            height: 60px;
            border: 1px solid rgba(212, 165, 116, 0.3);
            border-radius: 50%;
            position: relative;
        }
        .crosshair-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 4px;
            height: 4px;
            background: rgba(212, 165, 116, 0.6);
            border-radius: 50%;
        }
    </style>
</head>
<body>

    <!-- Crosshair -->
    <div class="crosshair">
        <div class="crosshair-ring">
            <div class="crosshair-dot"></div>
        </div>
    </div>

    <!-- HUD: Top Left - System State -->
    <div class="hud hud-tl">
        <div class="panel">
            <div class="sys-title">Hexagonale Veldprojectie</div>
            
            <!-- Hexagonal Vertex Ring -->
            <div class="vertex-ring" id="vertexRing">
                <div class="vertex-center"></div>
                <!-- 6 vertices + 3 mirror lines generated by JS -->
            </div>
            
            <!-- 18-Cycle -->
            <div class="cycle-container">
                <div class="cycle-label">18-Voudige Cyclus</div>
                <div class="cycle-track" id="cycleTrack">
                    <!-- 18 slots generated by JS -->
                </div>
                <div class="phase-labels">
                    <span class="phase-label" data-phase="A" id="phaseA">A: Initiatie</span>
                    <span class="phase-label" data-phase="B" id="phaseB">B: Dynamiek</span>
                    <span class="phase-label" data-phase="C" id="phaseC">C: Sluiting</span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- HUD: Top Right - Metrics -->
    <div class="hud hud-tr">
        <div class="panel">
            <div class="metric-group">
                <div class="metric-label">Asymmetrie Index</div>
                <div class="metric-value" id="asymValue">0.000</div>
            </div>
            <div class="metric-group">
                <div class="metric-label">Veldenergie</div>
                <div class="metric-value" id="energyValue">0.000</div>
            </div>
            <div class="metric-group">
                <div class="metric-label">Cycluspositie</div>
                <div class="metric-value" id="cycleValue">1</div>
                <div class="metric-sub" id="cycleSub">van 18</div>
            </div>
        </div>
    </div>
    
    <!-- HUD: Bottom Left - Language Projection -->
    <div class="hud hud-bl">
        <div class="panel">
            <div class="lang-title">Taalprojectie (Isomorf)</div>
            <div class="lang-output" id="langOutput">
                <span class="init">Veld in rust.</span>
                <span class="dyn"> Geen gradiënt waarneembaar.</span>
                <span class="close"> Wachtend op verstoring.</span>
            </div>
        </div>
    </div>
    
    <!-- HUD: Bottom Right - Navigation -->
    <div class="hud hud-br">
        <div class="panel">
            <div class="nav-info">Positie in Lattice</div>
            <div class="nav-pos" id="navPos">[0, 0, 0]</div>
            <div class="nav-info" style="margin-top: 0.5rem;">Cel Index</div>
            <div class="nav-pos" id="cellIndex">—</div>
        </div>
    </div>

    <script>
    // ================================================================
    // HEXAGONAL ISOMORPHIC FIELD PROJECTION
    // Structurally Correct Implementation
    // 
    // The hexagonal structure is canonical and immutable.
    // Everything rendered is a PROJECTION of this structure.
    // ================================================================

    // --- CANONICAL HEXAGONAL STRUCTURE ---
    // This is the SOURCE. It cannot be modified, only observed.
    class HexagonalStructure {
        constructor() {
            // The 6 vertices exist in ratio-space, not coordinate-space
            // Initial state: perfect equilibrium (all ratios = 1)
            this.vertices = [1, 1, 1, 1, 1, 1];
            
            // Target ratios (system moves toward these)
            this.targets = [1, 1, 1, 1, 1, 1];
            
            // Structural constants (immutable)
            this.VERTEX_COUNT = 6;
            this.CYCLE_LENGTH = 18; // 6 × 3 phases
            this.MIRROR_OFFSET = 3; // Opposite vertex
            
            // Emergent state (derived, not set)
            this.dominantVertex = -1;
            this.mirrorVertex = -1;
            this.cyclePosition = 0; // 0-17, emergent from accumulated phase
            this.accumulatedPhase = 0;
            this.cyclesCompleted = 0;
            
            // Phase thresholds (when does cycle advance?)
            // This emerges from energy dissipation, not time
            this.phaseThreshold = 0.1;
            
            // Colors for projection (not part of structure)
            this.vertexColors = [
                0xff6b6b, 0xfeca57, 0x48dbfb,
                0x1dd1a1, 0x5f27cd, 0xff9ff3
            ];
        }
        
        // --- PERTURBATION ---
        // External influence enters the system
        perturb(vertexIndex, magnitude) {
            // Validate
            if (vertexIndex < 0 || vertexIndex >= 6) return;
            
            // Apply to target (system will move toward this)
            this.targets[vertexIndex] += magnitude;
            
            // MIRROR ACTIVATION: Automatic, structural, not computed
            // The opposite vertex MUST respond - this is geometry, not logic
            const mirrorIndex = (vertexIndex + this.MIRROR_OFFSET) % 6;
            this.targets[mirrorIndex] -= magnitude * 0.5;
            
            // Record which vertices are implicated
            this.dominantVertex = vertexIndex;
            this.mirrorVertex = mirrorIndex;
            
            // Normalize to maintain conservation
            this.normalizeTargets();
        }
        
        normalizeTargets() {
            const sum = this.targets.reduce((a, b) => a + b, 0);
            if (sum > 0) {
                const factor = 6 / sum;
                this.targets = this.targets.map(v => v * factor);
            }
        }
        
        // --- STEP ---
        // Time evolution of the system
        step(dt = 0.016) {
            const speed = 0.03;
            const damping = 0.008;
            
            // Move vertices toward targets
            for (let i = 0; i < 6; i++) {
                const diff = this.targets[i] - this.vertices[i];
                this.vertices[i] += diff * speed;
            }
            
            // Damping toward equilibrium
            for (let i = 0; i < 6; i++) {
                this.targets[i] += (1 - this.targets[i]) * damping;
            }
            
            // Circulation: neighbors influence each other
            const newTargets = [...this.targets];
            for (let i = 0; i < 6; i++) {
                const prev = (i + 5) % 6;
                const next = (i + 1) % 6;
                newTargets[i] += (this.targets[prev] - 1) * 0.015;
                newTargets[i] += (this.targets[next] - 1) * 0.015;
            }
            this.targets = newTargets;
            this.normalizeTargets();
            
            // --- EMERGENT CYCLE ADVANCEMENT ---
            // The cycle advances based on accumulated asymmetry change
            const energy = this.getEnergy();
            const asymmetry = this.getAsymmetry();
            
            // Phase accumulates based on how much the system is "working"
            // This is emergent: active system = faster cycle
            this.accumulatedPhase += energy * dt * 2;
            
            // When enough phase accumulates, advance cycle position
            if (this.accumulatedPhase >= this.phaseThreshold) {
                this.accumulatedPhase = 0;
                this.cyclePosition = (this.cyclePosition + 1) % 18;
                
                if (this.cyclePosition === 0) {
                    this.cyclesCompleted++;
                }
            }
            
            // Update dominant/mirror based on current state
            const maxVal = Math.max(...this.vertices);
            const maxIdx = this.vertices.indexOf(maxVal);
            if (maxVal > 1.02) {
                this.dominantVertex = maxIdx;
                this.mirrorVertex = (maxIdx + 3) % 6;
            } else {
                this.dominantVertex = -1;
                this.mirrorVertex = -1;
            }
        }
        
        // --- DERIVED QUANTITIES ---
        getEnergy() {
            return this.vertices.reduce((sum, v) => sum + Math.abs(v - 1), 0);
        }
        
        getAsymmetry() {
            let asym = 0;
            for (let i = 0; i < 3; i++) {
                asym += Math.abs(this.vertices[i] - this.vertices[i + 3]);
            }
            return asym / 3;
        }
        
        isEquilibrium() {
            return this.getEnergy() < 0.02;
        }
        
        getCycleName() {
            if (this.cyclePosition < 6) return 'A';
            if (this.cyclePosition < 12) return 'B';
            return 'C';
        }
        
        getPhaseDescription() {
            const cycle = this.getCycleName();
            if (cycle === 'A') return 'Initiatie';
            if (cycle === 'B') return 'Dynamiek';
            return 'Sluiting';
        }
        
        // --- LANGUAGE PROJECTION ---
        // Language is NOT generated, it is PROJECTED from state
        // The same structural truth expressed in linguistic form
        projectLanguage() {
            const energy = this.getEnergy();
            const asym = this.getAsymmetry();
            const cycle = this.getCycleName();
            const dominant = this.dominantVertex;
            const mirror = this.mirrorVertex;
            
            let init = '', dyn = '', close = '';
            
            if (this.isEquilibrium()) {
                // Perfect balance - complete 18-structure statement
                init = 'Veld in rust.';
                dyn = ' Alle richtingen equivalent.';
                close = ' Symmetrie behouden.';
            } else if (cycle === 'A') {
                // Initiation: What is this? Where? Why?
                init = dominant >= 0 
                    ? `Verstoring waargenomen in V${dominant}.`
                    : 'Asymmetrie detecteerbaar.';
                dyn = ` Energie ${energy.toFixed(2)} in het veld.`;
                close = mirror >= 0 
                    ? ` Spiegelpositie V${mirror} geactiveerd.`
                    : ' Spiegelrespons in voorbereiding.';
            } else if (cycle === 'B') {
                // Dynamics: What changes? Where is tension?
                init = `Circulatie actief.`;
                dyn = ` Gradiënt ${(asym * 100).toFixed(1)}% tussen tegenposities.`;
                close = ' Propagatie volgt hexagonale wet.';
            } else {
                // Closure: What does this mean? Integration, rest
                init = 'Systeem nadert sluiting.';
                dyn = ` Restenergie ${energy.toFixed(3)} dissipeert.`;
                close = ' Equilibrium keert terug.';
            }
            
            return { init, dyn, close };
        }
        
        // --- PROJECTION TO 3D COORDINATES ---
        // The hexagon exists in ratio-space; this projects to visual space
        projectVertex3D(index, baseRadius = 5) {
            const angle = (index * Math.PI / 3) - Math.PI / 2;
            const ratio = this.vertices[index];
            const r = baseRadius * ratio;
            
            return new THREE.Vector3(
                Math.cos(angle) * r,
                0,
                Math.sin(angle) * r
            );
        }
    }

    // --- 3D HEXAGONAL LATTICE ---
    // A proper hexagonal lattice in 3D space
    // Each cell contains the canonical 6-vertex structure
    class HexagonalLattice {
        constructor(scene, hexStructure) {
            this.scene = scene;
            this.hex = hexStructure;
            
            // Lattice parameters
            this.cellRadius = 8;
            this.layerHeight = 6;
            this.gridExtent = 3; // cells in each direction
            
            // Storage
            this.cells = [];
            this.cellMeshes = [];
            this.connectionLines = [];
            
            this.buildLattice();
        }
        
        // Axial to cube coordinates for hex grid
        axialToCube(q, r) {
            const x = q;
            const z = r;
            const y = -x - z;
            return { x, y, z };
        }
        
        // Cube to world position
        cubeToWorld(x, y, z, layer = 0) {
            // Hexagonal grid spacing
            const size = this.cellRadius;
            const horiz = size * 1.5;
            const vert = size * Math.sqrt(3);
            
            const worldX = x * horiz;
            const worldZ = (z + x * 0.5) * vert;
            const worldY = layer * this.layerHeight;
            
            return new THREE.Vector3(worldX, worldY, worldZ);
        }
        
        buildLattice() {
            const extent = this.gridExtent;
            
            // Create cells in a hex pattern across multiple layers
            for (let layer = -1; layer <= 1; layer++) {
                for (let q = -extent; q <= extent; q++) {
                    for (let r = -extent; r <= extent; r++) {
                        // Skip cells too far from center (hex shape)
                        const cube = this.axialToCube(q, r);
                        if (Math.abs(cube.x) + Math.abs(cube.y) + Math.abs(cube.z) > extent * 2) continue;
                        
                        const worldPos = this.cubeToWorld(cube.x, cube.y, cube.z, layer);
                        this.createCell(worldPos, { q, r, layer });
                    }
                }
            }
            
            // Create inter-cell connections
            this.createConnections();
        }
        
        createCell(position, coords) {
            const group = new THREE.Group();
            group.position.copy(position);
            group.userData = { coords, basePosition: position.clone() };
            
            // Hexagonal ring for this cell
            const ringGeo = new THREE.RingGeometry(
                this.cellRadius * 0.8, 
                this.cellRadius * 0.85, 
                6
            );
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0xd4a574,
                transparent: true,
                opacity: 0.15,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = -Math.PI / 2;
            group.add(ring);
            
            // 6 vertex markers
            const vertices = [];
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI / 3) - Math.PI / 2;
                const r = this.cellRadius * 0.8;
                
                const sphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
                const sphereMat = new THREE.MeshBasicMaterial({
                    color: this.hex.vertexColors[i],
                    transparent: true,
                    opacity: 0.6
                });
                const sphere = new THREE.Mesh(sphereGeo, sphereMat);
                sphere.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
                sphere.userData = { vertexIndex: i };
                vertices.push(sphere);
                group.add(sphere);
            }
            
            // Center glow
            const centerGeo = new THREE.SphereGeometry(0.5, 16, 16);
            const centerMat = new THREE.MeshBasicMaterial({
                color: 0x4ecdc4,
                transparent: true,
                opacity: 0.2
            });
            const center = new THREE.Mesh(centerGeo, centerMat);
            group.add(center);
            
            // Store references
            group.userData.ring = ring;
            group.userData.vertices = vertices;
            group.userData.center = center;
            
            this.scene.add(group);
            this.cells.push(group);
            this.cellMeshes.push(group);
        }
        
        createConnections() {
            const lineMat = new THREE.LineBasicMaterial({
                color: 0x4ecdc4,
                transparent: true,
                opacity: 0.1
            });
            
            // Connect cells to their neighbors
            for (let i = 0; i < this.cells.length; i++) {
                const cellA = this.cells[i];
                const posA = cellA.position;
                
                for (let j = i + 1; j < this.cells.length; j++) {
                    const cellB = this.cells[j];
                    const posB = cellB.position;
                    
                    const dist = posA.distanceTo(posB);
                    
                    // Connect if close enough (neighbors)
                    if (dist < this.cellRadius * 2.5) {
                        const geo = new THREE.BufferGeometry().setFromPoints([posA, posB]);
                        const line = new THREE.Line(geo, lineMat.clone());
                        this.scene.add(line);
                        this.connectionLines.push(line);
                    }
                }
            }
        }
        
        // Find the cell closest to a world position
        getCellAt(worldPos) {
            let closest = null;
            let minDist = Infinity;
            
            for (const cell of this.cells) {
                const dist = cell.position.distanceTo(worldPos);
                if (dist < minDist) {
                    minDist = dist;
                    closest = cell;
                }
            }
            
            return { cell: closest, distance: minDist };
        }
        
        // Update cells based on hexagonal structure state
        update(cameraPos) {
            const { cell: activeCell, distance } = this.getCellAt(cameraPos);
            
            for (const cell of this.cells) {
                const isActive = cell === activeCell && distance < this.cellRadius * 1.5;
                const distToCamera = cell.position.distanceTo(cameraPos);
                const proximity = Math.max(0, 1 - distToCamera / (this.cellRadius * 5));
                
                // Update ring opacity
                cell.userData.ring.material.opacity = isActive ? 0.4 : 0.1 + proximity * 0.1;
                
                // Update vertices based on hex structure
                const vertices = cell.userData.vertices;
                for (let i = 0; i < 6; i++) {
                    const v = vertices[i];
                    const ratio = this.hex.vertices[i];
                    const baseRadius = this.cellRadius * 0.8;
                    
                    // Position modulated by structure ratio
                    const angle = (i * Math.PI / 3) - Math.PI / 2;
                    const r = baseRadius * (isActive ? ratio : 1);
                    v.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
                    
                    // Scale and opacity based on state
                    const isActivated = i === this.hex.dominantVertex || i === this.hex.mirrorVertex;
                    const scale = isActive ? (isActivated ? 1.5 : 1) * ratio : 0.8;
                    v.scale.setScalar(scale);
                    v.material.opacity = isActive ? 0.8 : 0.3 + proximity * 0.2;
                    
                    // Mirror vertex special coloring
                    if (isActive && i === this.hex.mirrorVertex) {
                        v.material.color.setHex(0x7c3aed); // Purple for mirror
                    } else {
                        v.material.color.setHex(this.hex.vertexColors[i]);
                    }
                }
                
                // Center pulse based on energy
                const energy = this.hex.getEnergy();
                cell.userData.center.material.opacity = isActive ? 0.3 + energy * 0.3 : 0.1;
                cell.userData.center.scale.setScalar(isActive ? 1 + energy * 0.5 : 0.5);
            }
            
            // Update connection lines
            for (const line of this.connectionLines) {
                const midpoint = new THREE.Vector3()
                    .addVectors(
                        line.geometry.attributes.position.array.slice(0, 3),
                        line.geometry.attributes.position.array.slice(3, 6)
                    )
                    .multiplyScalar(0.5);
                // This is simplified; would need proper vector handling
                line.material.opacity = 0.05 + this.hex.getEnergy() * 0.1;
            }
            
            return activeCell;
        }
    }

    // --- PARTICLE FIELD ---
    // Ambient particles that respond to the hexagonal field
    class FieldParticles {
        constructor(scene, hexStructure, count = 3000) {
            this.scene = scene;
            this.hex = hexStructure;
            this.count = count;
            
            this.geometry = new THREE.BufferGeometry();
            this.positions = new Float32Array(count * 3);
            this.colors = new Float32Array(count * 3);
            this.velocities = [];
            
            // Initialize positions
            for (let i = 0; i < count; i++) {
                this.positions[i * 3] = (Math.random() - 0.5) * 80;
                this.positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
                this.positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
                
                this.velocities.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ));
                
                this.colors[i * 3] = 0.2;
                this.colors[i * 3 + 1] = 0.3;
                this.colors[i * 3 + 2] = 0.4;
            }
            
            this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
            this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
            
            const material = new THREE.PointsMaterial({
                size: 0.15,
                transparent: true,
                opacity: 0.6,
                vertexColors: true,
                blending: THREE.AdditiveBlending
            });
            
            this.points = new THREE.Points(this.geometry, material);
            this.scene.add(this.points);
        }
        
        update(cameraPos, time) {
            const energy = this.hex.getEnergy();
            const asym = this.hex.getAsymmetry();
            const dominant = this.hex.dominantVertex;
            
            for (let i = 0; i < this.count; i++) {
                const px = this.positions[i * 3];
                const py = this.positions[i * 3 + 1];
                const pz = this.positions[i * 3 + 2];
                
                // Move particles
                this.positions[i * 3] += this.velocities[i].x;
                this.positions[i * 3 + 1] += this.velocities[i].y;
                this.positions[i * 3 + 2] += this.velocities[i].z;
                
                // Wrap around
                if (Math.abs(this.positions[i * 3]) > 40) this.positions[i * 3] *= -0.9;
                if (Math.abs(this.positions[i * 3 + 1]) > 20) this.positions[i * 3 + 1] *= -0.9;
                if (Math.abs(this.positions[i * 3 + 2]) > 40) this.positions[i * 3 + 2] *= -0.9;
                
                // Color based on proximity to camera and hex state
                const distToCamera = Math.sqrt(
                    Math.pow(px - cameraPos.x, 2) +
                    Math.pow(py - cameraPos.y, 2) +
                    Math.pow(pz - cameraPos.z, 2)
                );
                
                const influence = Math.exp(-distToCamera * 0.1) * energy;
                
                // Color influenced by dominant vertex
                if (dominant >= 0 && influence > 0.1) {
                    const col = new THREE.Color(this.hex.vertexColors[dominant]);
                    this.colors[i * 3] = col.r * influence + 0.1;
                    this.colors[i * 3 + 1] = col.g * influence + 0.15;
                    this.colors[i * 3 + 2] = col.b * influence + 0.2;
                } else {
                    this.colors[i * 3] = 0.1 + influence * 0.2;
                    this.colors[i * 3 + 1] = 0.2 + influence * 0.3;
                    this.colors[i * 3 + 2] = 0.3 + influence * 0.4;
                }
            }
            
            this.geometry.attributes.position.needsUpdate = true;
            this.geometry.attributes.color.needsUpdate = true;
        }
    }

    // --- MAIN APPLICATION ---
    class Application {
        constructor() {
            // Three.js setup
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(
                70, window.innerWidth / window.innerHeight, 0.1, 1000
            );
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            document.body.appendChild(this.renderer.domElement);
            
            // Canonical hexagonal structure
            this.hex = new HexagonalStructure();
            
            // Build lattice and particles
            this.lattice = new HexagonalLattice(this.scene, this.hex);
            this.particles = new FieldParticles(this.scene, this.hex);
            
            // Camera movement
            this.cameraTarget = new THREE.Vector3(0, 5, 20);
            this.cameraLookAt = new THREE.Vector3(0, 0, 0);
            this.time = 0;
            
            // Auto-perturbation timer
            this.lastPerturbation = 0;
            this.perturbationInterval = 3; // seconds
            
            // Initialize UI
            this.initUI();
            
            // Events
            window.addEventListener('resize', () => this.onResize());
            window.addEventListener('click', (e) => this.onClick(e));
            
            // Start
            this.animate();
        }
        
        initUI() {
            // Create vertex ring display
            const ring = document.getElementById('vertexRing');
            const radius = 55;
            
            // Create mirror lines first (behind vertices)
            for (let i = 0; i < 3; i++) {
                const line = document.createElement('div');
                line.className = 'mirror-line';
                line.id = `mirror-${i}`;
                
                const angle1 = (i * Math.PI / 3) - Math.PI / 2;
                const angle2 = ((i + 3) * Math.PI / 3) - Math.PI / 2;
                
                const x1 = 70 + Math.cos(angle1) * radius;
                const y1 = 70 + Math.sin(angle1) * radius;
                const x2 = 70 + Math.cos(angle2) * radius;
                const y2 = 70 + Math.sin(angle2) * radius;
                
                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                const angle = Math.atan2(y2 - y1, x2 - x1);
                
                line.style.width = length + 'px';
                line.style.left = x1 + 'px';
                line.style.top = y1 + 'px';
                line.style.transform = `rotate(${angle}rad)`;
                
                ring.appendChild(line);
            }
            
            // Create vertex nodes
            const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd', '#ff9ff3'];
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI / 3) - Math.PI / 2;
                const x = 70 + Math.cos(angle) * radius - 12;
                const y = 70 + Math.sin(angle) * radius - 12;
                
                const node = document.createElement('div');
                node.className = 'vertex-node';
                node.id = `vertex-${i}`;
                node.style.left = x + 'px';
                node.style.top = y + 'px';
                node.style.backgroundColor = colors[i];
                node.style.color = '#000';
                node.textContent = i;
                
                ring.appendChild(node);
            }
            
            // Create cycle slots
            const track = document.getElementById('cycleTrack');
            for (let i = 0; i < 18; i++) {
                const slot = document.createElement('div');
                slot.className = 'cycle-slot';
                slot.id = `slot-${i}`;
                slot.dataset.cycle = i < 6 ? 'A' : i < 12 ? 'B' : 'C';
                track.appendChild(slot);
            }
        }
        
        onClick(e) {
            // Perturb a random vertex on click
            const vertex = Math.floor(Math.random() * 6);
            const strength = 0.5 + Math.random() * 0.5;
            this.hex.perturb(vertex, strength);
        }
        
        updateUI() {
            // Update vertex display
            for (let i = 0; i < 6; i++) {
                const node = document.getElementById(`vertex-${i}`);
                const ratio = this.hex.vertices[i];
                
                node.classList.remove('active', 'mirror');
                
                if (i === this.hex.dominantVertex) {
                    node.classList.add('active');
                } else if (i === this.hex.mirrorVertex) {
                    node.classList.add('mirror');
                }
                
                // Scale based on ratio
                const scale = 0.8 + (ratio - 1) * 0.5;
                node.style.transform = `scale(${Math.max(0.6, Math.min(1.5, scale))})`;
            }
            
            // Update mirror lines
            for (let i = 0; i < 3; i++) {
                const line = document.getElementById(`mirror-${i}`);
                const isActive = 
                    (this.hex.dominantVertex === i && this.hex.mirrorVertex === i + 3) ||
                    (this.hex.dominantVertex === i + 3 && this.hex.mirrorVertex === i);
                line.classList.toggle('active', isActive);
            }
            
            // Update cycle display
            const pos = this.hex.cyclePosition;
            for (let i = 0; i < 18; i++) {
                const slot = document.getElementById(`slot-${i}`);
                slot.classList.remove('filled', 'active');
                if (i < pos) slot.classList.add('filled');
                if (i === pos) slot.classList.add('active');
            }
            
            // Update phase labels
            const cycle = this.hex.getCycleName();
            document.getElementById('phaseA').classList.toggle('active', cycle === 'A');
            document.getElementById('phaseB').classList.toggle('active', cycle === 'B');
            document.getElementById('phaseC').classList.toggle('active', cycle === 'C');
            
            // Update metrics
            const asym = this.hex.getAsymmetry();
            const energy = this.hex.getEnergy();
            
            document.getElementById('asymValue').textContent = asym.toFixed(3);
            document.getElementById('asymValue').classList.toggle('low', asym < 0.05);
            
            document.getElementById('energyValue').textContent = energy.toFixed(3);
            document.getElementById('energyValue').classList.toggle('low', energy < 0.05);
            
            document.getElementById('cycleValue').textContent = this.hex.cyclePosition + 1;
            
            // Update language projection
            const lang = this.hex.projectLanguage();
            document.getElementById('langOutput').innerHTML = 
                `<span class="init">${lang.init}</span>` +
                `<span class="dyn">${lang.dyn}</span>` +
                `<span class="close">${lang.close}</span>`;
            
            // Update navigation
            document.getElementById('navPos').textContent = 
                `[${this.camera.position.x.toFixed(1)}, ${this.camera.position.y.toFixed(1)}, ${this.camera.position.z.toFixed(1)}]`;
        }
        
        onResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        animate() {
            requestAnimationFrame(() => this.animate());
            
            const dt = 0.016;
            this.time += dt;
            
            // Auto-perturbation
            if (this.time - this.lastPerturbation > this.perturbationInterval) {
                if (this.hex.isEquilibrium()) {
                    const vertex = Math.floor(Math.random() * 6);
                    this.hex.perturb(vertex, 0.3 + Math.random() * 0.4);
                    this.lastPerturbation = this.time;
                }
            }
            
            // Update hexagonal structure
            this.hex.step(dt);
            
            // Move camera through lattice
            const pathRadius = 15;
            const pathSpeed = 0.1;
            this.cameraTarget.x = Math.sin(this.time * pathSpeed) * pathRadius;
            this.cameraTarget.z = Math.cos(this.time * pathSpeed) * pathRadius + 10;
            this.cameraTarget.y = 5 + Math.sin(this.time * pathSpeed * 2) * 2;
            
            this.camera.position.lerp(this.cameraTarget, 0.02);
            
            // Look toward center with slight lag
            this.cameraLookAt.lerp(new THREE.Vector3(0, 0, 0), 0.05);
            this.camera.lookAt(this.cameraLookAt);
            
            // Update lattice (returns active cell)
            const activeCell = this.lattice.update(this.camera.position);
            
            // Update cell index display
            if (activeCell) {
                const coords = activeCell.userData.coords;
                document.getElementById('cellIndex').textContent = 
                    `[${coords.q}, ${coords.r}, ${coords.layer}]`;
            }
            
            // Update particles
            this.particles.update(this.camera.position, this.time);
            
            // Update UI
            this.updateUI();
            
            // Render
            this.renderer.render(this.scene, this.camera);
        }
    }

    // --- START ---
    window.addEventListener('load', () => {
        new Application();
    });
    </script>
</body>
</html>
