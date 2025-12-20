# White Paper

hexDETerministicHEXagonalSTRucturalKERnelJSOnCONtractPROjectionARChitectureWHItePAPer
hexDETHEXSTRKERJSOCONPROARCWHIPAP
hexdethexstrkerjsoconproarcwhipap
DETerministicHEXagonalSTRucturalKERnelJSOnCONtractPROjectionARChitectureWHItePAPer
DETHEXSTRKERJSOCONPROARCWHIPAP
dethexstrkerjsoconproarcwhipap

**Deterministic Hexagonal Structural Computing with Canonical Kernel–Projector Separation**

---

## 1. Introduction

This white paper presents a deterministic structural computing architecture based on hexagonal topology, canonical separation of responsibilities, and lossless data exchange. The system establishes a strict distinction between structural truth and visual representation, ensuring reproducibility, reversibility, and architectural clarity.

The approach described herein is designed to prevent the introduction of semantic assumptions, heuristic inference, probabilistic reasoning, or artificial intelligence–based interpretation at the structural level. Instead, it defines a system in which order is derived solely from topology and mathematical invariants.

---

## 2. Motivation

Modern visualization and simulation systems frequently combine structural definition, rendering logic, camera behavior, depth estimation, and user interaction into a single computational layer. This results in systems that are difficult to audit, impossible to sandbox cleanly, and incapable of guaranteeing deterministic outcomes.

The motivation for this work is to define a system in which:

* Structural topology is canonical and immutable.
* Visualization is explicitly non-authoritative.
* All transformations are reversible.
* Data exchange is lossless and circular.
* Legal and technical responsibility boundaries are unambiguous.

---

## 3. Architectural Overview

The architecture consists of three formally separated components:

1. A deterministic hexagonal structural kernel.
2. A canonical JavaScript Object Notation contract.
3. One or more projection layers.

Each component has a strictly limited scope and is prohibited from performing the functions of the others.

---

## 4. Deterministic Hexagonal Structural Kernel

### 4.1 Purpose

The structural kernel is responsible exclusively for generating and maintaining hexagonal topology. It is the sole authority on structural truth within the system.

### 4.2 Coordinate System

The kernel uses axial hexagonal coordinates defined by ordered integer pairs `(q, r)`. Each node occupies exactly one coordinate position in this space.

Hexagonal distance between two nodes is defined as:

```
hex_distance(q1, r1, q2, r2) =
(|q1 − q2| + |r1 − r2| + |q1 + r1 − q2 − r2|) / 2
```

This distance metric is invariant and defines adjacency and neighborhood structure.

### 4.3 Kernel Operations

The kernel performs the following operations only:

* Generation of nodes within a bounded hexagonal radius.
* Assignment of stable node identifiers.
* Determination of adjacency relations based on hexagonal distance.
* Construction of relation pairs between adjacent nodes.

The kernel does not perform any form of rendering, projection, buffering, depth calculation, or semantic interpretation.

### 4.4 Determinism and Purity

The kernel is fully deterministic. Given identical input parameters, it always produces identical output. It does not depend on time, randomness, external state, or environment-specific features.

This property allows the kernel to be executed in sandboxed environments without side effects.

---

## 5. Canonical JavaScript Object Notation Contract

### 5.1 Role of the Contract

The JavaScript Object Notation contract defines the sole interface between the structural kernel and any consuming layer. It establishes a canonical representation of structural truth.

### 5.2 Contract Structure

The contract consists of:

* A schema identifier.
* A topology declaration.
* A coordinate system declaration.
* A list of nodes.
* A list of relations.
* Optional non-canonical metadata.

### 5.3 Nodes

Each node includes:

* A stable identifier.
* An axial coordinate `q`.
* An axial coordinate `r`.

Optional properties may be included but have no semantic authority and may not alter canonical behavior.

### 5.4 Relations

Each relation defines a connection between two node identifiers. For every relation, the hexagonal distance between the referenced nodes is exactly one.

Relations define topology only and do not encode direction, weight, visibility, or meaning.

### 5.5 Prohibited Data

The contract explicitly forbids inclusion of:

* Depth values.
* Screen coordinates.
* Camera parameters.
* Visibility or opacity values.
* Semantic labels.
* Selection states.
* Time-based data.

Any structure containing such data is not considered kernel output.

---

## 6. Projection Layers

### 6.1 Purpose

Projection layers consume the canonical contract and generate visual or navigable representations. They are non-authoritative and disposable.

### 6.2 Responsibilities

Projection layers may perform:

* Coordinate projection into two-dimensional or three-dimensional space.
* Depth calculation for visualization.
* Buffering and navigation management.
* User interaction handling.
* Rendering to screen or other output devices.

### 6.3 Restrictions

Projection layers must not:

* Modify node coordinates.
* Add or remove relations.
* Introduce new canonical structure.
* Write projection artifacts back into the canonical contract.

### 6.4 Reversibility

All projection operations must be reversible such that the original structural data can be recovered without loss, within numerical tolerance.

---

## 7. Deterministic Structural Depth Extension

Three-dimensional representations may be derived from structural properties alone. Acceptable inputs include:

* Node degree.
* Local density.
* Relational cohesion.
* Structural symmetry or tension.

Depth values derived from these properties are deterministic and reproducible. They do not replace structural topology and do not alter adjacency or identity.

---

## 8. Buffering and Navigation

Buffering strategies and navigation anticipation operate entirely within projection layers. Structural data remains invariant regardless of navigation state or buffering decisions.

Buffers may be discarded or regenerated without affecting canonical truth.

---

## 9. Circular Data Integrity

The system guarantees circular integrity:

```
Kernel output → Projection → Re-export
```

The re-exported structural data must match the original kernel output exactly for nodes and relations.

Projection artifacts must never contaminate canonical data.

---

## 10. Sandbox and Security Properties

Because the kernel does not access external state, time, or user interfaces, it can be safely executed in isolated environments such as sandboxed iframes, Web Workers, or server-side runtimes.

Projection layers may be sandboxed independently.

---

## 11. Novelty and Contribution

The contribution of this work lies in the explicit and enforceable separation between structural canon and visualization, the definition of a single immutable data contract, and the prohibition of semantic or heuristic inference at the structural level.

This approach differs fundamentally from systems that embed meaning, inference, or optimization into their core representation.

---

## 12. Applications

The technique applies to:

* Educational visualization systems.
* Structural simulation environments.
* Interactive exploratory interfaces.
* Data organization and restructuring tools.
* Entertainment systems requiring reproducible spatial logic.

---

## 13. Conclusion

This white paper defines a deterministic structural computing architecture based on hexagonal topology and strict separation of concerns. By enforcing canonical structure, lossless data exchange, and non-authoritative projection, the system enables reproducible, auditable, and legally unambiguous spatial computation.

The architecture establishes order without interpretation and enables navigation without imposing meaning.