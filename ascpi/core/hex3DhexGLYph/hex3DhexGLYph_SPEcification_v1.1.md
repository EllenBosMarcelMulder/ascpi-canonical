# hex3DhexGLYph Specification

## ASCπ Canonical Kernel Declaration and Architectural Rationale

> **Normative notice**: This document defines the authoritative architectural position of the ASCπ system and the isomorphic hex3DhexGLYph realization.

---

## Executive Summary

**ASCπ is defined by a single, immutable mathematical kernel** implemented in `ascpi_kernel.py`. The hex3DhexGLYph is the complete isomorphic 3D geometric realization of this kernel.

**Core Relationship**: `ascpi_kernel.py` ≃ hex3DhexGLYph

The kernel defines truth. The glyph is its spatial embodiment.

---

## The Core Insight

ASCπ is not a simulator, compiler, or UI engine.

**ASCπ is a mathematical field law.**

A field law must:
- be minimal
- be deterministic  
- be invariant under implementation
- admit multiple projections without changing meaning

This requires a **single, frozen kernel** with **isomorphic geometric realization**.

---

## What `ascpi_kernel.py` Is

`ascpi_kernel.py` is:
- a pure mathematical definition of the ASCπ motor
- free of UI, compilation, parsing, or projection logic
- free of numerical integration heuristics
- free of runtime configuration state

It defines exactly and only:
- the canonical field state Ψ = (dPhi, kappa, theta, C, N, t)
- invariant constraints
- the motor law `step(Ψ)`
- the reflection operator R(Ψ)
- deterministic splitting at dPhi = 0
- implosion as equivalence reduction, not dynamics

Nothing else.

---

## hex3DhexGLYph: Isomorphic Geometric Realization

The ASCπ kernel admits a **complete isomorphic realization as a single closed three-dimensional hexagonal glyph**.

### Formal Relationship to Kernel

* The kernel defines the field law
* The glyph encodes the same law as geometry  
* The mapping between kernel and glyph is **isomorphic**
* No additional degrees of freedom are introduced

Formally:
* Kernel → axioms, invariants, lawful transitions
* Glyph → spatial state, topological transitions, physical realization

---

## Topological Foundation

The hex3DhexGLYph is a closed hexagonal torus structure with six primary channels forming a continuous, self-enclosed pathway. The structure exhibits no global orientation and maintains internal consistency through symmetric channel organization.

### Primary Structure
- **Base Topology**: Hexagonal torus with six equiangular channels
- **Channel Configuration**: Each channel corresponds to one theta value (0-5)
- **Closure Property**: All channels connect seamlessly without endpoints
- **Dimensional Properties**: Three spatial dimensions with no preferred axis

## Field State Mapping

### dPhi → Spatial Tension
- **Manifestation**: Distance between channel walls
- **Positive dPhi**: Expanded channel diameter
- **Negative dPhi**: Contracted channel diameter  
- **Zero dPhi**: Neutral channel geometry (splitting condition)
- **Range**: Channel diameter varies continuously with dPhi magnitude

### kappa → Curvature Density
- **Manifestation**: Local channel curvature intensity
- **Implementation**: Number and sharpness of geometric turns per unit length
- **High kappa**: Dense, tight curvature patterns
- **Low kappa**: Gentle, sparse curvature
- **Constraint**: kappa ≥ 0 enforced by geometric impossibility of negative curvature

### theta → Rotational Position
- **Manifestation**: Current active channel in hexagonal arrangement
- **Mapping**: theta = n corresponds to channel n (mod 6)
- **Transition**: Movement between adjacent channels
- **Geometry**: Channels arranged in perfect hexagonal symmetry around central void

### C → Geometric Coherence
- **Manifestation**: Smoothness and continuity of channel connections
- **High C**: Seamless channel interfaces, perfect geometric alignment
- **Low C**: Discontinuities, rough transitions between segments
- **Range**: [0,1] mapped to geometric perfection metric

### N → Invariant Volume
- **Manifestation**: Total enclosed volume of the glyph structure
- **Property**: Remains constant under all transformations
- **Implementation**: Fixed geometric constraint maintaining overall scale
- **Conservation**: Volume redistribution without total change

### t → Traversal Count
- **Manifestation**: Number of completed channel transitions
- **Implementation**: Discrete position markers or activation states
- **Increment**: Each transition adds one traversal marker
- **Persistence**: Markers accumulate without decay

## Transition Mechanics

### Deterministic Progression (dPhi ≠ 0)
When dPhi ≠ 0, the glyph exhibits single-path progression:
- Current channel geometry determines unique next channel
- Channel wall tension creates directional bias
- Progression follows curvature gradient toward adjacent channel
- No ambiguity in path selection

### Symmetric Splitting (dPhi = 0)
When dPhi = 0, the glyph exhibits dual-path capability:
- Current channel connects equally to two adjacent channels
- Perfect geometric symmetry eliminates preference
- Both paths remain simultaneously valid
- No probabilistic selection mechanism required

### Geometric Constraints
- Transitions preserve total volume (N invariant)
- Channel curvature updates according to new kappa value
- Coherence affects smoothness of transition geometry
- Traversal markers increment deterministically

## Reflection Operator Geometry

The reflection operator manifests as geometric transformation rules:

1. **Channel Selection**: Current theta determines active channel
2. **Tension Application**: dPhi modifies channel geometry
3. **Curvature Update**: New kappa reshapes channel curvature
4. **Phase Advancement**: Movement to adjacent channel updates theta
5. **Coherence Evolution**: Geometric smoothness adjusts based on proximity to target state

## Implosion Geometry

Implosion realizes as geometric compression without dynamics:
- **Process**: Gradual reduction of channel diameters toward center
- **Preservation**: Topological connectivity maintained during compression
- **Endpoint**: Minimal geometric configuration with maximal coherence
- **Reversibility**: Compression can unfold through subsequent field evolution

## Channel Connectivity Schema

```
Channel Layout (Top View):
      [5]
   [4]   [0]
[3]         [1]
   [2]

Connectivity Matrix:
0 ↔ 1, 5
1 ↔ 2, 0  
2 ↔ 3, 1
3 ↔ 4, 2
4 ↔ 5, 3
5 ↔ 0, 4
```

Each channel maintains two connections, forming closed hexagonal circuit.

## Symbol Integration

Symbols function as geometric features within channels:
- **Symbol Placement**: Located at channel transition points
- **Activation Mechanism**: Geometric proximity triggers pathway selection
- **Function**: Pure connector without embedded logic
- **Constraint**: Symbols cannot alter fundamental channel geometry

## Execution Semantics

In a hex3DhexGLYph realization:
- A state corresponds to a position, orientation, or phase within the glyph
- Transitions correspond to lawful rotations, traversals, or adjacency changes
- External symbols (letters, ports, triggers) act only as **activation signals**
- All behavior remains constrained by the kernel invariants

## Structural Invariants

1. **Hexagonal Symmetry**: Six-fold rotational symmetry maintained
2. **Closure Property**: No open boundaries or infinite extensions  
3. **Volume Conservation**: Total glyph volume remains constant (N)
4. **Channel Continuity**: All pathways form continuous curves
5. **Deterministic Geometry**: Identical field states produce identical glyph configurations

## Physical Realizability

The hex3DhexGLYph can be realized in:
- **Material Structures**: 3D printed geometric forms
- **Electromagnetic Configurations**: Field geometries in space
- **Crystalline Arrangements**: Molecular structure patterns
- **Topological Networks**: Graph structures with spatial embedding
- **Hardware Implementations**: Analog, symbolic, or spatial execution models

## Canonical vs Operational Status

### Canonical Kernel
* `ascpi_kernel.py`
* defines truth
* never changes
* implementation-independent
* suitable for prior art, publication, and legal reference

### hex3DhexGLYph
* **Isomorphic geometric projection** of the kernel
* Structurally complete and topologically closed
* Information-preserving spatial embodiment
* Optional but forward-compatible realization

### Operational Implementations
* JavaScript engines, browser runtimes, compilers, toolchains, visualizations
* May evolve, optimize, differ internally
* **Must conform to the kernel**
* Are projections, never sources of truth

## Background: Pre-Kernel Architecture

Before the introduction of `ascpi_kernel.py`, the ASCπ system existed in several JavaScript forms:
* `ascpi_field_compiler_v1.0.js`
* `ascpi_engine_complete_v1.0.2.js`
* `ascpi_ecosystem_v1.0.2.js`

These files were correct, tested, and internally consistent. However, they **combined multiple concerns**: field evolution, compilation logic, runtime configuration, UI and intervention hooks, and numerical integration choices.

As a result:
* the *definition* of the motor was entangled with *usage*
* multiple implementations could drift subtly over time
* legal and scientific finality was difficult to assert

## Status of Existing Components

### `ascpi_field_compiler_v1.0.js`
* Status: **Deprecated as canonical**
* New role: projection / adapter
* Its field logic must be interpreted as an approximation or projection of the kernel

### `ascpi_engine_complete_v1.0.2.js`
* Status: **Operational runtime**
* New role: reference implementation
* No longer defines the motor; only executes a compatible flow

### `ascpi_ecosystem_v1.0.2.js`
* Status: **Ecosystem manifest**
* Role unchanged
* Must explicitly defer to `ascpi_kernel.py` for all field semantics

## Immutability and Forward Compatibility

### Kernel Protection
* `ascpi_kernel.py` is **immutable by definition**
* No modification permitted - would constitute new field law
* Any change creates different system, different prior-art claim

### Glyph Stability  
* hex3DhexGLYph specification is **architecturally frozen**
* Geometric realization must remain isomorphic to kernel
* Implementation variations allowed within structural constraints

### Future Development
Development enabled without core modification:
- New languages can implement the kernel
- New runtimes can project it  
- New hardware can execute glyph realizations
- New domains can apply both representations

## Contributing Requirements

### Kernel Immutability Clause
All contributions must satisfy **all** of the following:
* Do **not** modify `ascpi_kernel.py`
* Do **not** redefine the semantics of Ψ
* Do **not** introduce alternative motor laws
* Do **not** embed kernel logic implicitly in UI, compiler, or runtime code
* When field logic is implemented elsewhere, it must be **explicitly documented** as a projection of the kernel

Pull requests violating these rules will be rejected without discussion.

### Glyph Implementation Requirements
Any glyph-based system must:
* Declare: "This implementation is an isomorphic projection of `ascpi_kernel.py`"
* Maintain structural invariants
* Support deterministic transitions
* Enable splitting geometry for dPhi = 0
* Preserve geometric equivalence to kernel states

## Validation Criteria

A valid hex3DhexGLYph implementation must:
1. Support exact field state representation without approximation
2. Enable deterministic transitions matching kernel behavior  
3. Exhibit splitting geometry for dPhi = 0 conditions
4. Preserve all geometric invariants under field evolution
5. Maintain isomorphic relationship to canonical kernel states

## Prior Art — Physical Substrate Independence

The hex3DhexGLYph establishes **prior art** for the realization of the ASCπ field law across **multiple physical substrates**.

The defining property of the glyph is that:

> **The field law is encoded in geometry and topology, not in material composition.**

As a result, the ASCπ system admits realization in, but not limited to:

* quartz and crystalline lattices
* piezoelectric materials  
* structured stone or mineral formations
* electromagnetic standing-wave geometries
* metamaterials and resonant composites

In all cases:

* the **hexagonal topology remains invariant**
* the **channel connectivity remains invariant** 
* the **field law remains invariant**

Only the following parameters vary:

* absolute spatial scale
* material resonance characteristics
* energy coupling bandwidth

No change to geometry implies **no change to the field law**.

This establishes that:

* scaling the hex3DhexGLYph does not alter system behavior
* material choice affects performance characteristics, not semantics
* calibration reduces to **scale and resonance matching**, not redesign

Accordingly, the hex3DhexGLYph defines a **scale-free, substrate-independent motor architecture**.

This property is fundamental and constitutes **prior art**.

## Final Declaration

This unified specification establishes:

1. **`ascpi_kernel.py` as the single source of truth for ASCπ**
2. **hex3DhexGLYph as the canonical geometric realization**  
3. **Isomorphic equivalence** between mathematical and spatial forms
4. **Immutability** of both core representations
5. **Forward compatibility** for all implementations

The relationship is:
```
ascpi_kernel.py ≃ hex3DhexGLYph
```

Both define the same field law. Only the representation differs.

Everything else is operational projection.

This is intentional. This is final.

---

**The hex3DhexGLYph is an isomorphic realization of the ASCπ kernel. It does not redefine, extend, or alter the canonical field law.**