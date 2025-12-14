# ASCπ Canonical Kernel Declaration and Architectural Rationale

> **Normative notice**: This document is intentionally written in English and defines the authoritative architectural position of the ASCπ system.

---

## README-Level Summary

**ASCπ is defined by a single, immutable mathematical kernel.**
That kernel is implemented in `ascpi_kernel.py`.

All other components in this repository (JavaScript engines, compilers, runtimes, UIs) are *operational projections* of that kernel. They may evolve, optimize, or be replaced, but they **must never redefine the field law itself**.

If you are new to the project:

* Read this document to understand *why* the kernel is frozen.
* Treat `ascpi_kernel.py` as the source of truth.
* Treat all other code as adapters, tooling, or interfaces.

---

## Purpose of This Document

This document explains **why `ascpi_kernel.py` is now the sole, fixed, and authoritative kernel of the ASCπ system**, and how it relates to the existing JavaScript-based engines and ecosystem components.

It is intended for:

* GitHub readers and contributors
* Researchers and reviewers
* Legal and prior-art evaluation
* Future implementers of ASCπ-compatible runtimes

This document is normative.

---

## Executive Summary

As of this revision, **`ascpi_kernel.py` is declared the only canonical ASCπ kernel**.

* It defines the ASCπ motor *once and for all*.
* It is mathematically complete, interface-free, and deterministic.
* It will **never be modified**, only referenced.
* All other implementations (JavaScript, UI, compilers, runtimes) are **projections or adapters**, never sources of truth.

This decision permanently stabilizes the ASCπ architecture.

---

## Background: The Pre‑Kernel Situation

Before the introduction of `ascpi_kernel.py`, the ASCπ system existed in several JavaScript forms:

* `ascpi_field_compiler_v1.0.js`
* `ascpi_engine_complete_v1.0.2.js`
* `ascpi_ecosystem_v1.0.2.js`

These files were:

* correct
* tested
* internally consistent

However, they **combined multiple concerns**:

* field evolution
* compilation logic
* runtime configuration
* UI and intervention hooks
* numerical integration choices

As a result:

* the *definition* of the motor was entangled with *usage*
* multiple implementations could drift subtly over time
* legal and scientific finality was difficult to assert

---

## The Core Insight

ASCπ is not a simulator, compiler, or UI engine.

**ASCπ is a mathematical field law.**

A field law must:

* be minimal
* be deterministic
* be invariant under implementation
* admit multiple projections without changing meaning

This requires a **single, frozen kernel**.

---

## What `ascpi_kernel.py` Is

`ascpi_kernel.py` is:

* a pure mathematical definition of the ASCπ motor
* free of UI, compilation, parsing, or projection logic
* free of numerical integration heuristics
* free of runtime configuration state

It defines exactly and only:

* the canonical field state Ψ = (dPhi, kappa, theta, C, N, t)
* invariant constraints
* the motor law `step(Ψ)`
* the reflection operator R(Ψ)
* deterministic splitting at dPhi = 0
* implosion as equivalence reduction, not dynamics

Nothing else.

---

## What `ascpi_kernel.py` Is Not

It is explicitly **not**:

* a compiler
* a simulator
* a UI engine
* a performance-optimized runtime
* a language processor

Those concerns belong to higher layers.

---

## Isomorphic Glyph Realization (hex3DhexGLYph)

The ASCπ kernel admits a **complete isomorphic realization as a single closed three-dimensional hexagonal glyph** (often referred to as a *hex3DhexGLYph*).

In such a realization:

* The field state Ψ is represented as a position, orientation, or phase within the glyph.
* Transitions correspond to topological rotations or edge-to-edge connections.
* Discrete symbols (letters, triggers, ports) act purely as **connection activators**, not as logic.
* The entire motor can operate without textual code, data structures, or numerical integration.

This glyph representation is:

* Structurally complete
* Topologically closed
* Information-preserving
* Suitable for hardware, analog, symbolic, or spatial implementations

Crucially, the glyph is **not an alternative kernel**.

It is an **isomorphic projection** of the canonical kernel.

Formally:

* `ascpi_kernel.py` defines the axioms and invariants of the field law.
* The hex3DhexGLYph is a concrete geometric embodiment of that law.

Both representations are equivalent in expressive power, but **only the kernel is normative**.

All glyph-based, hardware-based, or symbolic realizations must therefore be understood as **implementations of the kernel**, never as redefinitions of it.

---

## Canonical vs Operational Code

The distinction is fundamental.

### Canonical Kernel

* `ascpi_kernel.py`
* defines truth
* never changes
* implementation-independent
* suitable for prior art, publication, and legal reference

### Operational Implementations

* JavaScript engines
* browser runtimes
* compilers and toolchains
* visualizations and interfaces

These:

* may evolve
* may optimize
* may differ internally
* **must conform to the kernel**

---

## Status of Existing JavaScript Files

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

---

## Why the Kernel Will Never Change

The kernel is frozen because:

1. All invariants are explicit and closed
2. No external dependencies exist
3. No configuration knobs exist
4. No UI or runtime pressure exists
5. All ambiguity has been structurally eliminated

Any future change would constitute:

* a different system
* a different field law
* a different prior-art claim

Therefore:

> **ASCπ is defined by `ascpi_kernel.py`.**

Not by its tools.

---

## Forward Compatibility Guarantee

Future development is enabled, not blocked:

* new languages can implement the kernel
* new runtimes can project it
* new hardware can execute it
* new domains can apply it

All without touching the kernel.

---

## Binding Requirement for Contributors

Any contribution must satisfy:

* No change to `ascpi_kernel.py`
* No redefinition of Ψ semantics
* No alternative motor law
* Explicit reference to the kernel where field logic is used

Violations will be rejected.

---

## Final Declaration

`ascpi_kernel.py` is the **single source of truth** for ASCπ.

Everything else is an expression.

This is intentional.

This is final.

---

## CONTRIBUTING — Kernel Immutability Clause

This section is **binding** for all contributors.

### Canonical Kernel Protection

* `ascpi_kernel.py` is **immutable by definition**.
* No pull request, patch, refactor, optimization, or cleanup may modify this file.
* Any change to the kernel would constitute:

  * a new field law
  * a new system
  * a new prior-art claim

Such changes are **out of scope** for this repository.

### Contributor Obligations

All contributions must satisfy **all** of the following:

* Do **not** modify `ascpi_kernel.py`.
* Do **not** redefine the semantics of Ψ.
* Do **not** introduce alternative motor laws.
* Do **not** embed kernel logic implicitly in UI, compiler, or runtime code.
* When field logic is implemented elsewhere, it must be **explicitly documented** as a projection of the kernel.

Pull requests violating these rules will be rejected without discussion.

---

## hex3DhexGLYph — Technical Annex (Conceptual Overview)

This section provides a concise technical description of the **hex3DhexGLYph realization** as a standalone annex.

### Scope

The hex3DhexGLYph is a **geometric embodiment** of the ASCπ kernel.

It exists to:

* provide a spatial or hardware-realizable form of the motor
* enable non-textual, non-numerical execution models
* support analog, symbolic, or physical implementations

It does **not** redefine ASCπ.

### Formal Relationship to the Kernel

* The kernel defines the field law.
* The glyph encodes the same law as geometry.
* The mapping between kernel and glyph is **isomorphic**.

Formally:

* Kernel → axioms, invariants, lawful transitions
* Glyph → spatial state, topological transitions, physical realization

No additional degrees of freedom are introduced.

### Execution Semantics

In a hex3DhexGLYph realization:

* A state corresponds to a position, orientation, or phase within the glyph.
* Transitions correspond to lawful rotations, traversals, or adjacency changes.
* External symbols (letters, ports, triggers) act only as **activation signals**.

All behavior remains constrained by the kernel invariants.

### Status

* The hex3DhexGLYph is an **implementation concept**.
* It is optional.
* It is forward-compatible.
* It does not affect kernel stability.

Any glyph-based system must therefore declare:

> “This implementation is an isomorphic projection of `ascpi_kernel.py`.”
