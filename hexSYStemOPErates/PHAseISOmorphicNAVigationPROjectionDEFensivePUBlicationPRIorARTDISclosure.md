### Phase-Isomorphic Navigation & Projection

### Defensive Publication / Prior Art Disclosure

**Status:** PUBLIC · DEFENSIVE · NON-NORMATIVE  
**Author:** Marcel Mulder  
**Date:** 18-12-2025 
**Related System:** ASCπ / hexSYStemOPErates

---

### 1. Purpose of This Publication

This document constitutes an **explicit defensive publication and prior-art disclosure** of a **phase-isomorphic navigation and projection method** over a static hexagonal field.

Its sole purpose is to:

- establish **public disclosure and temporal precedence**,

- prevent **exclusive appropriation or patent claims** on the disclosed structural method,

- clarify that the disclosed material is **descriptive, not normative or applicative**.

This publication does **not** describe a product, application, or user workflow.

---

### 2. Scope of Disclosure

This disclosure covers **only** the following structural elements:

- a **static, invariant hexagonal field** F defined by axial coordinates,

- **navigation implemented exclusively as reparameterization of a continuous phase space** Φ,

- a **pure projector** P mapping (F, Φ) to a visible representation,

- **perceptual depth and movement effects** arising solely from phase variation,

- **crosslink relations** derived from projection, not from field mutation.

No other functionality is claimed or implied.

---

### 3. Core Principle

The central disclosed principle is:

> **Navigation is not movement within the field, but continuous reparameterization of projection phase variables.**

Formally:

- The field F is static and invariant.

- All apparent motion, depth, rotation, zoom, or traversal effects arise from changes in Φ.

- The projector P performs a deterministic, idempotent mapping:
  
  P : (F, Φ) → ℝ²

There is **no temporal state, no decision logic, no optimization, and no semantic interpretation**.

---

### 4. Explicit Exclusions

This publication explicitly **does not** disclose or claim:

- semantic interpretation of field elements,

- selection logic or editing workflows,

- application-specific user interfaces,

- object manipulation semantics,

- learning, adaptation, or optimization mechanisms,

- domain-specific uses such as image editing, video editing, or data analysis.

All such elements are **outside the scope** of this disclosure.

---

### 5. Implementation Reference

An accompanying **HTML reference implementation** is provided solely as a **demonstrative embodiment** of the disclosed structural principles.

The implementation:

- does not introduce additional claims,

- does not imply product readiness,

- serves only to show **one possible realization** of the disclosed method.

The HTML code is included **verbatim** as an appendix or linked artifact.

---

### 6. Legal and Interpretive Statement

This document is intended to function as **prior art** within the meaning of international patent law, including but not limited to:

- WIPO / PCT procedures,

- EPO novelty and inventive-step assessments,

- USPTO prior-art considerations.

No license is granted or implied by this publication.



## Appendix A — Reference Implementation

The reference implementation is provided as:

phase_isomorphic_projector_v6_1.html

This file forms part of this defensive publication.

```
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hexSYStemOPErates — Fase-Isomorfe Projector v6.1</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
            width: 100%; height: 100%;
            background: #000; color: #fff;
            overflow: hidden; font-family: ui-monospace, SFMono-Regular, monospace;
        }
        #field-container { position: relative; width: 100vw; height: 100vh; cursor: crosshair; }
        canvas { position: absolute; inset: 0; display: block; }
        #layer-base { z-index: 10; }
        #layer-resonance { z-index: 20; pointer-events: none; mix-blend-mode: screen; }

        .interface {
            position: absolute; top: 1.5rem; left: 1.5rem;
            pointer-events: none; z-index: 100;
            text-transform: uppercase; letter-spacing: 0.2em;
        }
        .nav-status {
            position: absolute; bottom: 1.5rem; right: 1.5rem;
            font-size: 9px; opacity: 0.4; text-align: right;
            pointer-events: none;
        }
    </style>
</head>
<body>

    <div class="interface">
        <h1 class="text-[10px] font-bold opacity-40">hexSYStemOPErates</h1>
        <div id="stats" class="text-[9px] mt-4 space-y-1 opacity-25">
            <div>Veld F: <span class="text-green-400">STATISCH</span></div>
            <div>Fase Φ: <span id="fase-label">CONTINU</span></div>
            <div>Projectie: Isomorf</div>
        </div>
    </div>

    <div class="nav-status">
        [PAN: SLEEP] [ZOOM: SCROLL] [TILT/ROTATIE: SHIFT+SLEEP]<br>
        Φ_p: <span id="val-tilt">0.00</span> | Φ_s: <span id="val-zoom">1.00</span>
    </div>

    <div id="field-container">
        <canvas id="layer-base"></canvas>
        <canvas id="layer-resonance"></canvas>
    </div>

    <script>
        /* =====================================================
           CANONIEK VELD (F)
           n = (q, r) ∈ ℤ². Invariant en statisch.
           Hernoemd naar CanonicalField om naamgevingsconflicten te voorkomen.
        ===================================================== */
        const CanonicalField = {
            nodes: [
                { q: 0, r: 0, v: 1.0 },
                { q: 1, r: -1, v: 0.7 },
                { q: -1, r: 1, v: 0.7 },
                { q: 0, r: 1, v: 0.5 },
                { q: 1, r: 0, v: 0.5 }
            ]
        };

        /* =====================================================
           FASE-RUIMTE (Φ)
           Parameters voor de projector P.
        ===================================================== */
        const PhaseSpace = {
            offset: { x: 0, y: 0 },
            zoom: 1.0,
            tilt: 0.5,     // φ_p (perspectief)
            rotation: 0,   // φ_r (rotatie)
            intensity: 1.0 // φ_v (zichtbaarheid)
        };

        /* =====================================================
           PROJECTOR (P)
           P : (F, φ) -> ℝ². Herprojectie zonder verplaatsing.
        ===================================================== */
        const Projector = {
            // Canoniek hex naar pixel (voor-fase)
            hexToAxial(q, r, size) {
                return {
                    x: size * (3/2 * q),
                    y: size * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r)
                };
            },

            // De isomorfe transformatie-lens
            project(x, y, φ, cw, ch) {
                // 1. Schaling (φ_s)
                let tx = x * φ.zoom;
                let ty = y * φ.zoom;

                // 2. Rotatie-interferentie (φ_r)
                const cosR = Math.cos(φ.rotation);
                const sinR = Math.sin(φ.rotation);
                const rx = tx * cosR - ty * sinR;
                const ry = tx * sinR + ty * cosR;

                // 3. Perspectivische Tilt (φ_p)
                const cosT = Math.cos(φ.tilt);
                const sinT = Math.sin(φ.tilt);

                // Projectie naar 2D met diepte-isomorfisme
                const finalX = rx;
                const finalY = ry * cosT;

                // Schaling op basis van diepte (samplen van de laag)
                const depth = 1 / (1 - (ry * sinT / 800));

                return {
                    x: (cw / 2) + φ.offset.x + (finalX * depth),
                    y: (ch / 2) + φ.offset.y + (finalY * depth),
                    d: depth // Projectie-diepte
                };
            },

            render(ctx, resCtx, field, φ) {
                const cw = ctx.canvas.width;
                const ch = ctx.canvas.height;
                ctx.clearRect(0, 0, cw, ch);
                resCtx.clearRect(0, 0, cw, ch);

                const size = 60;
                // Bereken dynamisch bereik o.b.v. zoom
                const range = Math.ceil(10 / (φ.zoom * 0.5));

                // Teken het Topologische Rooster (Beschikbaarheid)
                ctx.lineWidth = 0.5;
                for (let q = -range; q <= range; q++) {
                    for (let r = -range; r <= range; r++) {
                        const axial = this.hexToAxial(q, r, size);
                        const p = this.project(axial.x, axial.y, φ, cw, ch);

                        if (p.x < -100 || p.x > cw+100 || p.y < -100 || p.y > ch+100) continue;

                        const rSize = size * φ.zoom * p.d;
                        ctx.strokeStyle = `rgba(255,255,255,${0.03 * p.d})`;
                        this.drawHex(ctx, p.x, p.y, rSize);
                    }
                }

                // Projecteer Nodes in F
                field.nodes.forEach(node => {
                    const axial = this.hexToAxial(node.q, node.r, size);
                    const p = this.project(axial.x, axial.y, φ, cw, ch);
                    this.drawNode(ctx, resCtx, p.x, p.y, size * φ.zoom * p.d, node, p.d);
                });
            },

            drawHex(ctx, x, y, r) {
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = i * Math.PI / 3 + Math.PI/6;
                    ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
                }
                ctx.closePath();
                ctx.stroke();
            },

            drawNode(ctx, resCtx, x, y, r, node, depth) {
                const alpha = node.v * Math.min(1, depth);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, 4 * depth, 0, Math.PI * 2);
                ctx.fill();

                // Crosslink Resonantie (Fase-as)
                const resX = x + (r * 0.5 * depth);
                const resY = y - (r * 0.4 * depth);

                resCtx.strokeStyle = `rgba(0, 255, 255, ${0.15 * depth})`;
                resCtx.beginPath();
                resCtx.moveTo(x, y);
                resCtx.lineTo(resX, resY);
                resCtx.stroke();

                resCtx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.8})`;
                resCtx.beginPath();
                resCtx.arc(resX, resY, 2 * depth, 0, Math.PI * 2);
                resCtx.fill();
            }
        };

        /* =====================================================
           INPUT & NAVIGATIE (N : Φ → Φ)
           Geen beweging in F, alleen herparameterisatie van φ.
        ===================================================== */
        const UI = {
            lastMouse: { x: 0, y: 0 },
            isPanning: false,
            isFasing: false,

            init() {
                const container = document.getElementById('field-container');

                container.addEventListener('mousedown', e => {
                    this.lastMouse = { x: e.clientX, y: e.clientY };
                    if (e.shiftKey) this.isFasing = true;
                    else this.isPanning = true;
                });

                window.addEventListener('mousemove', e => {
                    const dx = e.clientX - this.lastMouse.x;
                    const dy = e.clientY - this.lastMouse.y;

                    if (this.isPanning) {
                        PhaseSpace.offset.x += dx;
                        PhaseSpace.offset.y += dy;
                    } else if (this.isFasing) {
                        // Verander de fase φ_p en φ_r
                        PhaseSpace.tilt = Math.max(0, Math.min(Math.PI/2.05, PhaseSpace.tilt + dy * 0.005));
                        PhaseSpace.rotation += dx * 0.005;
                    }

                    this.lastMouse = { x: e.clientX, y: e.clientY };
                    this.updateLabels();
                });

                window.addEventListener('mouseup', () => {
                    this.isPanning = this.isFasing = false;
                });

                container.addEventListener('wheel', e => {
                    e.preventDefault();
                    const factor = e.deltaY > 0 ? 0.92 : 1.08;
                    PhaseSpace.zoom = Math.max(0.05, Math.min(20, PhaseSpace.zoom * factor));
                    this.updateLabels();
                }, { passive: false });
            },

            updateLabels() {
                document.getElementById('val-tilt').textContent = PhaseSpace.tilt.toFixed(2);
                document.getElementById('val-zoom').textContent = PhaseSpace.zoom.toFixed(2);
            }
        };

        /* =====================================================
           STARTUP
        ===================================================== */
        function start() {
            const canvas = document.getElementById('layer-base');
            const resCanvas = document.getElementById('layer-resonance');
            const ctx = canvas.getContext('2d');
            const resCtx = resCanvas.getContext('2d');

            window.addEventListener('resize', () => {
                canvas.width = resCanvas.width = window.innerWidth;
                canvas.height = resCanvas.height = window.innerHeight;
            });
            window.dispatchEvent(new Event('resize'));

            UI.init();

            function loop() {
                Projector.render(ctx, resCtx, CanonicalField, PhaseSpace);
                requestAnimationFrame(loop);
            }
            loop();
        }

        start();
    </script>
</body>
</html>
```
