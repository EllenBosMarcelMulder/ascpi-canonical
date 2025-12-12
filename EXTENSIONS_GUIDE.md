# Extensions Guide — ASCπ

This document explains **how to extend ASCπ safely** without modifying the canonical core.

---

## Guiding Rule

> **The canonical core is immutable.  
> Extensions must orbit the core, never penetrate it.**

---

## What Counts as an Extension

Valid extensions include:

- Visualization layers
- GUIs and projectors
- Adapters and bridges
- Analysis tools
- Debugging or inspection utilities
- External system integrations
- Educational or demonstrative tooling

---

## Where Extensions Live

Recommended locations:

- `/runtime/`
- `/tools/`
- `/demos/`
- Separate repositories referencing this one

Extensions must **not** modify files in `/core/`.

---

## Allowed Interaction with the Core

Extensions may:

- Read Ψ state
- Invoke `ASCPIEngine.step()`
- Invoke `compile()`
- Use `commitSectorDecision()`
- Consume FNO output

Extensions may **not**:

- Modify field equations
- Change constants or thresholds
- Introduce randomness
- Inject learning or optimization logic
- Alter integration behavior

---

## UI and Interaction Rules

User interfaces must obey:

- Discrete interaction only
- Finite predefined intervention states
- No continuous control over parameters
- No stochastic input paths

UI causality must remain:

Intervention → Ψₛ → F(Ψₛ)

---

## Recommended Extension Patterns

Good patterns include:

- Observer / Inspector UIs
- Read-only dashboards
- Deterministic adapters
- Replay and trace tools
- Visualization of convergence paths

---

## Prohibited Extension Patterns

Do not build:

- Optimizers wrapped around the core
- Feedback systems altering convergence
- Learning layers influencing Ψ
- Probabilistic wrappers

These violate canonical constraints.

---

## Versioning Extensions

Extensions should:

- Declare compatibility with a specific core version
- Avoid assumptions about future core changes
- Fail safely if incompatibilities arise

---

## Final Advice

If you are unsure whether an idea qualifies as a valid extension:

- Open an issue
- Describe the intent
- Ask before implementing

Careful design is always preferred over retroactive correction.