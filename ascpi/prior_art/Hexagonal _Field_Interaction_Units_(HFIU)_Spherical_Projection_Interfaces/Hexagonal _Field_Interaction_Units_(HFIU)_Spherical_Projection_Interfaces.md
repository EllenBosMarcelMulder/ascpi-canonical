# PRIOR ART DECLARATION

## Hexagonal Field Interaction Units (HFIU) & Spherical Projection Interfaces

**ASCπ Semantic Field Computing Framework**

**Author:** Marcel Christian Mulder
**Date of public disclosure:** 2025
**Status:** Public Prior Art — Non-exclusive, defensive disclosure
**License:** Humanity Heritage License π (HHL-π)

---

## 1. Scope of This Prior Art

This document establishes prior art for a **field-native human–machine interaction paradigm** based on:

* continuous spherical semantic fields,
* discrete hexagonal decision manifolds,
* coherence-gated interaction,
* deterministic coupling constraints.

The disclosure applies to **software interfaces, hardware interfaces, projection systems, and hybrid physical–digital interaction units**, regardless of implementation medium (2D displays, 3D projection, AR/VR, holography, or physical devices).

---

## 2. Fundamental Concept

Meaning, control, and computation **emerge from field dynamics**, not from menus, sliders, or parameter panels.

Interaction is structured as three **inseparable components**:

1. **A continuous spherical field** (Field Sphere)
2. **A discrete hexagonal decision surface** (Hexagonal Manifold)
3. **A projection interface binding both to human perception**

---

## 3. The Field Sphere (Continuous Domain)

### 3.1 Definition

The **Field Sphere** represents the total semantic state space Ψ containing:

* semantic tension ΔΦ
* curvature κ
* phase θ
* coherence C
* conserved energy N

The sphere is continuous, non-discrete, and **not directly controllable** by the user.

### 3.2 Properties

* The user never edits field parameters directly.
* Navigation occurs only via:

  * rotation (phase),
  * zoom (depth),
  * focus shift (brandpunt).
* Visual representations may include volumetric fields, light fields, shading, animation, or implicit background projection.

---

## 4. The Hexagonal Decision Manifold (Discrete Domain)

### 4.1 Definition

The **Hexagonal Manifold** is a six-fold discrete projection surface intersecting the spherical field.

It is the **only legitimate decision interface**.

Each vertex corresponds to an **extremal coupling direction**.

### 4.2 Properties

* Exactly **six discrete decision sectors**.
* No sliders, knobs, or continuous controls.
* Interaction consists only of:

  * select sector,
  * commit,
  * disengage.

### 4.3 Strongest–Weakest Principle

The hexagon encodes **strongest and weakest couplings** as the only valid switching extremes.

There are **no intermediate switching states**.

---

## 5. Coherence-Gated Interaction

### 5.1 Constraint

All coupling is subject to the hard condition:

C ≥ C_min

### 5.2 Consequences

* Below threshold:

  * coupling impossible,
  * fixation blocked,
  * exploration only.
* Above threshold:

  * coupling allowed,
  * semantic structures may be fixed.

This applies universally to text, drawing, audio, video, and multimodal composition.

---

## 6. Interaction Grammar

The interaction grammar is **strictly limited** to:

1. rotate (θ)
2. zoom (depth)
3. focus shift
4. click / commit
5. disengage (no action)

There is **no continuous parameter dragging**.

This ensures determinism, auditability, and resistance to manipulation.

---

## 7. Field Rest State (“Field Off”)

The system defines a **true rest state**:

* no background computation,
* no standby behavior,
* no hidden evolution.

Visually and computationally the field stabilizes to neutral equilibrium.

This rest state is intentional, visible, psychologically stabilizing, and ethically significant.

---

## 8. Hexagonal Modularity

All components obey **hexagonal modularity**:

* main field interface,
* settings,
* analysis,
* state inspection,
* compilation,
* control.

Modules:

* are hexagonal,
* obey the same coherence law,
* can be enabled or disabled,
* never bypass the central field logic.

---

## 9. Hardware Interaction Units

This prior art explicitly includes:

* 3D hexagonal interaction units,
* spherical or volumetric projection systems,
* devices where a hexagon is embedded in or projected from a sphere,
* round or spherical computing devices implementing this model.

Form follows **field law**, not aesthetics.

---

## 10. Non-Claimed Scope

This document does **not** claim exclusivity or patent rights.

It establishes that the described interaction model, geometry, coherence gating, and constraints were **publicly disclosed** and **cannot be claimed as novel** by third parties.

---

## 11. Summary Statement

* Sphere = continuous semantic domain
* Hexagon = discrete decision interface
* Coherence governs all binding
* Rest is real
* Form follows physical and semantic necessity

---

# DIAGRAM DESCRIPTION (Canonical)

## Diagram A — Full-Screen Hexagonal Interaction Surface

* Hexagon occupies maximal screen area.
* Flat sides aligned top and bottom.
* Four corner regions are non-interactive.
* All interaction occurs inside the hexagon.

## Diagram B — Strongest–Weakest Axis

* Top vertex = strongest coupling.
* Bottom vertex = weakest coupling.
* Only valid commit extrema.

## Diagram C — Discrete Sector Domain

* Six discrete sectors.
* Selection is binary.
* No continuous adjustment.

## Diagram D — Spherical Projection (Conceptual)

* Hexagon is the intersection plane of:

  * inner sphere (focus),
  * outer sphere (context).
* Appears flat, is mathematically curved.

## Diagram E — Degrees of Freedom

Exactly five:

* rotate
* zoom
* focus shift
* commit
* disengage

## Diagram F — Coherence Gate

* Below threshold: no coupling.
* Above threshold: coupling allowed.

## Diagram G — Modular Ecosystem

All modules are hexagonal and field-governed.

## Diagram H — Rest State

* No glow.
* No motion.
* No background activity.

---

# SVG + COORDINATE GEOMETRY SPECIFICATION

## Coordinate System

* Origin at screen center.
* x ∈ [−W/2, +W/2]
* y ∈ [−H/2, +H/2]

## Hexagon Radius

R = min(W, H) / 2

## Hexagon Vertices (flat-top)

For i ∈ {0..5}
angle_i = π/6 + i·π/3

x_i = R·cos(angle_i)
y_i = R·sin(angle_i)

Strong axis: y = +R
Weak axis: y = −R

---

# MATHEMATICAL FIELD MODEL

## Canonical State Vector

Ψ = (ΔΦ, κ, θ, N, C, t)

### Idle State

ΔΦ = (1 + √5) / 4
κ ≈ 1
θ = 0
N ≈ 0.5
C ≈ 0.5
t = 0

### Coupling Gate

Commit allowed iff C ≥ C_min
Else: commit → null

### Commit Rule

θ := k·π/3
t := 0

All other parameters evolve **only via field law**.

---

# MACHINE-READABLE JSON SPECIFICATION (Single Canonical Version)

```json
{
  "ascpi_hexagonal_field_spec": {
    "version": "1.0",
    "geometry": {
      "surface": "hexagon",
      "orientation": "flat_top",
      "projection": "spherical_intersection"
    },
    "state_vector": ["dPhi", "kappa", "theta", "N", "C", "t"],
    "idle_state": {
      "dPhi": "(1+sqrt(5))/4",
      "kappa": 1.0,
      "theta": 0.0,
      "N": 0.5,
      "C": 0.5,
      "t": 0
    },
    "interaction": {
      "rotate": "theta = k*(pi/3)",
      "zoom": "rho in [0,1]",
      "focus_shift": "spherical_depth",
      "commit": {
        "condition": "C >= C_min",
        "effect": "theta = k*(pi/3); t = 0"
      },
      "disengage": "null"
    },
    "constraints": {
      "no_sliders": true,
      "no_direct_parameter_edit": true,
      "discrete_only": true,
      "true_off_state": true
    }
  }
}
```
