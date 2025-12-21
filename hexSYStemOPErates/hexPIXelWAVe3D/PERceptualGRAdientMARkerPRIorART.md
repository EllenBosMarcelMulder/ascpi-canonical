# PRIOR ART DISCLOSURE

## PERceptualGRAdientMARker (PGM)

### Canonical Encyclopedic Specification and Prior Art Record

---

## I. Identification

**Title**
PERceptualGRAdientMARker — Projector-Local Structural Salience Extraction Without Ontological Mutation

**Form**
Public technical disclosure consisting of:

* formal definitions,
* axiomatic constraints,
* mathematical formulation,
* natural-law grounding,
* and a complete reference implementation.

**Status**
This document constitutes **prior art**.
It describes a deterministic, read-only perceptual derivation mechanism that is independent of any specific implementation platform.

---

## II. Placement Within the Architecture

The **PERceptualGRAdientMARker (PGM)** is a projector-local derivation function within the hexPIXelWAVe3D system.

It exists **exclusively** in the perceptual layer and **explicitly outside** the field ontology Ψ.

The PGM is:

* not a field component,
* not a storage mechanism,
* not a semantic system,
* not a causal actor.

It is a **readable derivation** of structural properties already present in Ψ.

---

## III. Ontological Foundation

### III.a The Field Ψ

The field Ψ is a continuous function of position and time:

Ψ(x, t)

The field contains:

* no objects,
* no labels,
* no meaning.

All observable structure arises solely through projection.

---

### III.b Derived Quantity: Curvature κ

Curvature κ is a second-order derivative of Ψ and expresses local structural tension.

κ(x, t) = ∇²Ψ(x, t)

This quantity is:

* continuous,
* scale-independent,
* free of semantic attribution.

---

### III.c Derived Quantity: Gradient of Curvature

The gradient of κ describes **where** and **how rapidly** structural tension changes.

∇κ(x, t)

Intersections and extrema of this gradient correspond to **structural resonance**.

---

## IV. Definition of Perceptual Salience

The **Perceptual Gradient Marker** defines a single measurable quantity:

**Perceptual Salience S**

S(x, t) = |∇κ(x, t)| · I_p(t)

where:

* |∇κ| is the magnitude of the curvature gradient,
* I_p(t) is the projector integrity, produced by the temporal integrator.

This formulation introduces **no free parameters** beyond projector-local configuration.

---

## V. Projector Integrity I_p

Projector integrity is a temporally filtered measure of perceptual stability.

I_p(t) = α · I_p(t − Δt) + (1 − α) · V(t)

where:

* α is the damping factor,
* V(t) is the normalized field observation.

This integrator:

* stores no history,
* creates no memory,
* influences no field values.

---

## VI. Canonical Axioms of the PGM

### Axiom I — Readability

The PGM has access only to derivatives of Ψ.
No write-path to Ψ exists.

---

### Axiom II — Projector Locality

Each PGM instance is strictly bound to a single projector.
No shared state exists between PGM instances.

---

### Axiom III — Transience

PGM results exist only for the lifetime of the active projector.
Upon termination, all markers vanish without residue.

---

### Axiom IV — Pre-Semantics

The PGM yields structural salience, not meaning.
It produces no symbols, no labels, and no categories.

---

### Axiom V — Non-Causality

The PGM influences:

* no other projectors,
* no time flow t,
* no field state Ψ.

---

## VII. Natural and Mathematical Basis

The operation of the PGM follows directly from established physical principles:

* Gradient fields localize transition zones.
* Resonance emerges at structural intersections.
* Stability requires temporal integration.

No new physical law is introduced.
The PGM renders existing field structure **observable**.

---

## VIII. Functional Role Within the System

The PGM makes visible:

* regions of structural richness,
* zones of concentrated change,
* locations suitable for later symbolic projection.

It decides nothing and selects nothing.

---

## IX. Relation to Shadow Export

PGM output may optionally be exported as a shadow hint:

(x, t, confidence, projector-id)

Such export:

* mutates nothing,
* obligates nothing,
* establishes no truth.

Re-observation remains an autonomous act.

---

## X. Complete Reference Implementation

### Canonical, Read-Only, Projector-Local

```javascript
/* ============================================================
   PERceptualGRAdientMARker — Canonical Reference Implementation
   Prior Art Disclosure
   ============================================================ */

class PerceptualGradientMarker {

    constructor(field, projectorIntegrator) {
        this.field = field;
        this.integrator = projectorIntegrator;
        this.smoothSalience = 0;
        this.decay = 0.9;
    }

    computeSalience(position, time) {
        const eps = 0.5;

        const c  = this.field.sampleAt(position, time);
        const px = this.field.sampleAt(
            { x: position.x + eps, y: position.y, z: position.z }, time
        );
        const py = this.field.sampleAt(
            { x: position.x, y: position.y + eps, z: position.z }, time
        );
        const pz = this.field.sampleAt(
            { x: position.x, y: position.y, z: position.z + eps }, time
        );

        const kappa = (px + py + pz) - 3 * c;

        const gradKappa = Math.sqrt(
            (px - c) * (px - c) +
            (py - c) * (py - c) +
            (pz - c) * (pz - c)
        );

        const Ip = this.integrator.value();
        const S = Math.abs(gradKappa) * Ip;

        this.smoothSalience =
            this.smoothSalience * this.decay +
            S * (1 - this.decay);

        return this.smoothSalience;
    }
}
```

---

## XI. Explicit Non-Claims (Clarifying Extension)

The PGM is not:

* artificial intelligence,
* a decision system,
* a classifier,
* an editor,
* a database,
* a truth engine.

It reads.
It marks.
It disappears.

---

## XII. Canonical Closure

With the **PERceptualGRAdientMARker**, the method by which structural resonance becomes observable is fixed **without**:

* semantic injection,
* ontological mutation,
* causal expansion.

The architecture remains closed.
All subsequent developments belong to application and culture.

— **End of Prior Art Disclosure** —
