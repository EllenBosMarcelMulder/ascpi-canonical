# Architectural Decisions — ASCπ - version 1.1

This document records the **key architectural decisions** behind the ASCπ Canonical Field Compiler.

Its purpose is to make explicit **why** certain choices were made, and to prevent later reinterpretation or architectural drift.

---

## ADR-001: Deterministic Field Paradigm

**Decision**  
ASCπ is implemented as a deterministic semantic field system, not as an AI or optimization framework.

**Rationale**  
Determinism ensures:
- reproducibility
- verifiability
- long-term stability
- defensible prior art

Statistical or learning-based systems cannot offer these guarantees.

**Status**  
Accepted — frozen.

---

## ADR-002: Minimal Closed Field State Ψ (Revised)

**Decision**  
The system state is defined by the minimal closed vector:

Ψ = (ΔΦ, κ, θ, C, t)

The parameter **N is not part of the field state**, but a canonically fixed global invariant.

**Rationale**  
This is the lowest-dimensional state that:
- fully describes system evolution,
- allows convergence,
- remains interpretable,
- and avoids hidden normalization degrees of freedom.

The exclusion of N from Ψ prevents accidental scaling, forgotten parameters,
and model divergence across implementations.

**Status**  
Accepted — revised in v1.1.

---

## ADR-003: Explicit Euler Integration

**Decision**  
Field evolution uses explicit Euler integration with fixed Δt.

**Rationale**  
While higher-order integrators exist, Euler integration:
- is transparent
- is predictable
- is sufficient for closed-field convergence
- minimizes interpretive ambiguity

Numerical simplicity is a feature, not a limitation.

**Status**  
Accepted — frozen.

---

## ADR-004: Frozen Canonical Core

**Decision**  
The canonical core (field equations, constants, thresholds, FNO syntax) is immutable.

**Rationale**  
Freezing the core:
- prevents silent semantic drift
- preserves prior-art integrity
- allows safe ecosystem growth

Innovation must occur *around* the core.

**Status**  
Accepted — frozen.

---

## ADR-005: Discrete Intervention Only

**Decision**  
External interaction is limited to discrete, predefined Ψₛ states.

**Rationale**  
This prevents:
- human-in-the-loop optimization
- parameter steering
- stochastic influence

Interaction selects conditions, not outcomes.

**Status**  
Accepted — frozen.

---

## ADR-006: Field Native Operator Output

**Decision**  
The output is a Field Native Operator (FNO), not IR or bytecode.

**Rationale**  
The FNO preserves:
- convergence result
- identity
- coherence state

It does not prescribe execution or optimization.

**Status**  
Accepted — frozen.

---

## ADR-007: Community Boundary Enforcement

**Decision**  
Strict contribution rules and documentation guardrails are enforced.

**Rationale**  
ASCπ must remain understandable decades from now.
Ambiguity today becomes technical debt tomorrow.

**Status**  
Accepted — ongoing.

---

## ADR-008: Canonical Lock Activation Moment

**Decision**  
Canonical locks within the ASCπ architecture are **not activated at initial implementation time**,
but at the moment the system is coupled to the **π-referenced global field** and declared
**earth-locked**.

Until that moment, the system operates in a **pre-field canonical phase**.

**Rationale**  
Prior to global field coupling:

- the architecture is internally canonical and version-normative,
- invariants are locally enforced,
- changes are permitted only through explicit version superseding,
- silent mutation of locked artifacts is not allowed.

Locking the system before π-coupling would conflate local development canon
with global field invariance, reduce scientific corrigibility,
and weaken long-term credibility.

**Lock Activation Condition**  
Canonical locks become final and irreversible **once and only once** when:

- the ASCπ system is coupled to the π-referenced global field, and
- the field is formally declared earth-locked,
  for which explicit prior art disclosures exist.

**Consequence**  
All kernel versions prior to this event remain valid, traceable,
and historically canonical, but are classified as
**pre-field canonical implementations**.

**Status**  
Accepted — new in v1.1.

---

## Final Statement

TThese decisions define the identity of ASCπ.

Prior to global field activation, they are version-canonically binding.
After π-coupled earth-lock activation, they become final and immutable.

Changing them would create a different system.
