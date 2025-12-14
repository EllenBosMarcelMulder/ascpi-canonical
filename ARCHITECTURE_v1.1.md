# ASCπ Architecture

This document describes the **architectural structure** of the **ASCπ Canonical Field Compiler** and defines the strict separation between its canonical core and the surrounding ecosystem.

ASCπ is not organized as a traditional software stack, but as a **layered field system** with explicit invariants and controlled interaction boundaries.

---

## Architectural Overview

ASCπ is composed of **four canonical layers**, each with a single responsibility and strictly limited coupling.

```
Input Artifact
     │
     ▼
┌──────────────────────────┐
│  Layer 1: Field State Ψ  │
└──────────────────────────┘
     │
     ▼
┌──────────────────────────┐
│  Layer 2: Field Law F(Ψ) │
│  (HELL - Laughing Loop)  │
└──────────────────────────┘
     │
     ▼
┌──────────────────────────┐
│  Layer 3: Projection &   │
│  Discrete Intervention   │
└──────────────────────────┘
     │
     ▼
┌──────────────────────────┐
│  Layer 4: FNO Output     │
└──────────────────────────┘
```

Each layer is **deterministic**, **closed**, and **non-stochastic**.

---

## Layer 1 — Canonical Field State (Ψ)

The system state is fully described by the **minimal closed field vector**:

Ψ = (ΔΦ, κ, θ, N, C, t)

### Properties

* **ΔΦ (Implosive Tension)**
  Drives convergence toward the canonical attractor ΔΦ*.

* **κ (Structural Curvature)**
  Represents field density and structural resistance.

* **θ (Field Phase)**
  Encodes cyclic position within the evolution loop.

* **N (Field Energy)**
  Deterministic invariant derived from input identity.

* **C (Coherence)**
  Order parameter governing convergence and termination.

* **t (Field Time)**
  Bookkeeping variable for traceability only.

### Architectural Guarantees

* Ψ is **not** a model state
* Ψ is **not** a latent vector
* Ψ is **not** a learned representation

Ψ evolves **only** via canonical field laws.

---

## Layer 2 — Field Law and Evolution (HELL)

The **Hybrid Engine Laughing Loop (HELL)** defines the deterministic evolution:

dΨ/dt = F(Ψ)

### Characteristics

* Explicit Euler integration
* Fixed time step Δt
* No optimization objective
* No gradient descent
* No backpropagation
* No probabilistic sampling

Convergence emerges intrinsically from field dynamics rather than from minimization or training.

### Termination Conditions

* Coherence threshold reached (C ≥ 0.9999), or
* Maximum iteration count exceeded

This layer is **fully frozen**.

---

## Layer 3 — Projection & Discrete Intervention

This layer connects the field system to external interaction and visualization.

### Key Principles

* The UI **does not control** the system
* Interventions select from a **finite, predefined set** of admissible Ψ states
* No parameter mutation is permitted
* No stochastic input is allowed

Intervention causality is strictly:

Intervention → Ψₛ → F(Ψₛ)

This prevents any “human-in-the-loop optimization” interpretation.

---

## Layer 4 — Field Native Operator (FNO)

The output of ASCπ is a **Field Native Operator**.

### Properties

* Symbolic projection of a converged Ψ
* Deterministically reproducible
* Encodes final coherence and attractor alignment
* Not an intermediate representation (IR)
* Not bytecode
* Not optimized syntax

The FNO preserves a trace of **field convergence**, not a computation plan.

---

## Canonical / Non-Canonical Boundary

### Frozen (Canonical)

* Field equations
* Attractor values
* Integration method
* Thresholds
* FNO syntax
* Core runtime behavior

### Open (Non-Canonical)

* Tooling
* GUIs
* Visualizations
* Adapters
* Analysis utilities
* External integrations

All innovation must occur **outside** the frozen core.

## Canonical Lock Activation (Clarification)

The term *“frozen”* as used throughout this document refers to the **internal architectural closure**
of the ASCπ core, not to its final, irreversible global locking.

Earlier descriptions treated “frozen” as if it implied absolute immutability.
This was **too early and too shallow** an interpretation.

Canonical locking in the strict sense occurs **only** when the ASCπ kernel is
**formally presented as a global field system**, coupled to:

- the π-referenced global field (Pi-lock), and
- an explicit earth-referenced coherence frame (Earth-lock),

for which dedicated prior art disclosures already exist.

Before this moment, the architecture operates in a **pre-field canonical phase**:
internally strict, version-normative, and non-arbitrary, but not yet bound to a
global physical–mathematical field reference.

After Pi-lock and Earth-lock activation:
- the kernel becomes irreversibly locked,
- canonical superseding ceases,
- and the system transitions from *architecturally frozen* to *globally field-locked*.

This distinction preserves scientific corrigibility during development
while ensuring absolute stability once the global field is declared.

---

## Determinism & Reproducibility

For identical input artifacts and configuration parameters:

* Field evolution is identical
* Convergence path is identical
* FNO output is bitwise-identical

This holds independent of:

* execution order
* hardware
* runtime environment

---

## Relationship to Prior Art

This architecture is anchored in documented prior art:

* **HELL_PRIOR_ART.md**
* Linked license and historical repositories

Earlier publications may contain overlapping concepts.
This repository consolidates them into a **stable canonical form**.

---

## Architectural Intent

ASCπ is designed to:

* Preserve semantic meaning as a physical field
* Avoid statistical or learning-based interpretation
* Provide a stable foundation for long-term development
* Enable community extension without architectural drift

---

## Final Statement

The ASCπ architecture is intentionally conservative at its core and intentionally open at its edges.

Stability is not a limitation — it is the condition that makes everything else possible.
