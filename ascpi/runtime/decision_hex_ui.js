// ═══════════════════════════════════════════════════════════════════════════════
// DISCRETE HEXAGONAL DECISION INTERFACE - Corrected JavaScript
// ═══════════════════════════════════════════════════════════════════════════════

// Add sector mapping state
let hoveredSector = -1;
let lastHoveredSector = -1;
let committedSector = -1;
let visualRotation = 0; // GUI rotation, separate from Ψ.theta

// Calculate which hexagon sector the mouse is in (0-5, or -1 for center)
function getSectorFromMouse(mouseX, mouseY) {
    const W = canvas.width;
    const H = canvas.height;
    const center = { x: W / 2, y: H / 2 };
    
    const dx = mouseX - center.x;
    const dy = mouseY - center.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = Math.min(W, H) * 0.4;
    
    // If too close to center, no sector
    if (dist < radius * 0.15) return -1;
    
    // Calculate angle (-π to π)
    let angle = Math.atan2(dy, dx);
    if (angle < 0) angle += GUI_CONST.tau;
    
    // Map to 6 sectors (0-5)
    const sector = Math.floor((angle / GUI_CONST.tau) * 6);
    return sector % 6;
}

// Map sector to deterministic Ψ changes
function commitSectorDecision(sector) {
    if (sector < 0 || sector > 5) return;
    
    committedSector = sector;
    
    // Each sector maps to specific Ψ parameters
    // dPhi varies per sector to create tension differential
    const sectorMappings = [
        { theta: 0.0 * Math.PI / 3, kappa: 2.5, C: 0.9, N: 0.8, dPhi: GUI_CONST.dphi_base + 1.5 * 0.05 }, // Sector 0
        { theta: 1.0 * Math.PI / 3, kappa: 1.5, C: 0.75, N: 0.6, dPhi: GUI_CONST.dphi_base - 0.5 * 0.05 }, // Sector 1
        { theta: 2.0 * Math.PI / 3, kappa: 3.5, C: 0.85, N: 0.9, dPhi: GUI_CONST.dphi_base + 2.5 * 0.05 }, // Sector 2
        { theta: 3.0 * Math.PI / 3, kappa: 2.0, C: 0.65, N: 0.5, dPhi: GUI_CONST.dphi_base - 1.5 * 0.05 }, // Sector 3
        { theta: 4.0 * Math.PI / 3, kappa: 4.0, C: 0.95, N: 0.7, dPhi: GUI_CONST.dphi_base + 0.5 * 0.05 }, // Sector 4
        { theta: 5.0 * Math.PI / 3, kappa: 1.0, C: 0.7, N: 0.4, dPhi: GUI_CONST.dphi_base - 2.5 * 0.05 }  // Sector 5
    ];
    
    const mapping = sectorMappings[sector];
    mutablePsi.theta = mapping.theta;
    mutablePsi.kappa = mapping.kappa;
    mutablePsi.C = mapping.C;
    mutablePsi.N = mapping.N;
    mutablePsi.dPhi = mapping.dPhi;
    
    drawPsi();
}

// Modified drawPsi to show sector divisions and highlight
function drawPsi() {
    const W = canvas.width;
    const H = canvas.height;
    const center = { x: W / 2, y: H / 2 };
    const radius = Math.min(W, H) * 0.4;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);
    
    const { kappa, N, C } = mutablePsi;
    const coreRadius = radius * (0.2 + N * 0.4);
    const alpha = 0.5 + C * 0.5;
    
    // Draw 6 sectors separately
    for (let s = 0; s < 6; s++) {
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        
        const startAngle = s * GUI_CONST.tau / 6 + visualRotation;
        const endAngle = (s + 1) * GUI_CONST.tau / 6 + visualRotation;
        
        // Draw sector arc
        for (let i = 0; i <= 20; i++) {
            const angle = startAngle + (endAngle - startAngle) * (i / 20);
            const dynamicRadius = coreRadius * (1 + 0.1 * Math.sin(kappa * s));
            const dx = center.x + dynamicRadius * Math.cos(angle);
            const dy = center.y + dynamicRadius * Math.sin(angle);
            ctx.lineTo(dx, dy);
        }
        ctx.closePath();
        
        // Color based on sector state
        const hue = (s * 60) % 360;
        let sectorAlpha = alpha * 0.6;
        
        if (s === committedSector) {
            sectorAlpha = alpha; // Full brightness for committed
        } else if (s === hoveredSector) {
            sectorAlpha = alpha * 0.8; // Medium brightness for hover
        }
        
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${sectorAlpha})`;
        ctx.fill();
        
        // Sector borders
        ctx.strokeStyle = `hsla(120, 70%, 70%, ${C * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Draw sector dividers
    ctx.strokeStyle = `hsla(0, 0%, 100%, 0.3)`;
    ctx.lineWidth = 1;
    for (let s = 0; s < 6; s++) {
        const angle = s * GUI_CONST.tau / 6 + visualRotation;
        const outerRadius = coreRadius * 1.2;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(
            center.x + outerRadius * Math.cos(angle),
            center.y + outerRadius * Math.sin(angle)
        );
        ctx.stroke();
    }
    
    updatePsiDisplay();
}

// Modified mouse handler: HOVER only, no commit
function updatePsiFromMouse(event) {
    const rect = canvas.getBoundingClientRect();
    const W = canvas.width;
    const H = canvas.height;

    const mouseX = (event.clientX - rect.left) * (W / rect.width);
    const mouseY = (event.clientY - rect.top) * (H / rect.height);

    hoveredSector = getSectorFromMouse(mouseX, mouseY);
    
    // Redraw only if hover state changed
    if (hoveredSector !== lastHoveredSector) {
        lastHoveredSector = hoveredSector;
        requestAnimationFrame(drawPsi);
    }
}

// Click handler: COMMIT decision
function commitPsiFromClick(event) {
    const rect = canvas.getBoundingClientRect();
    const W = canvas.width;
    const H = canvas.height;

    const mouseX = (event.clientX - rect.left) * (W / rect.width);
    const mouseY = (event.clientY - rect.top) * (H / rect.height);

    const sector = getSectorFromMouse(mouseX, mouseY);
    if (sector >= 0) {
        commitSectorDecision(sector);
    }
}

// Modified initialization
window.onload = () => {
    canvas.width = 450;
    canvas.height = 450;
    canvas.addEventListener('mousemove', updatePsiFromMouse);
    canvas.addEventListener('click', commitPsiFromClick);
    drawPsi();
};