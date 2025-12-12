# Architectural Decisions — ASCπ

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

## ADR-002: Minimal Closed Field State Ψ

**Decision**  
The system state is defined by the minimal closed vector:

Ψ = (ΔΦ, κ, θ, N, C, t)

**Rationale**  
This is the lowest-dimensional state that:
- fully describes system evolution
- allows convergence
- remains interpretable and invariant

No additional hidden variables are permitted.

**Status**  
Accepted — frozen.

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

## Final Statement

These decisions are not accidental.
They define the identity of ASCπ.

Changing them would create a *different system*.