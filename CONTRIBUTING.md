# Contributing to ASCπ Canonical Field Compiler

Thank you for your interest in contributing to the **ASCπ Canonical Field Compiler**.

This project is intentionally structured around a **frozen canonical core** and an **open extension ecosystem**.
Contributions are welcome — **within clearly defined boundaries**.

Please read this document carefully before opening an issue or pull request.

---

## Core Principle

**The canonical core is not open for modification.**

This repository exists to preserve:

* determinism
* reproducibility
* prior-art integrity
* architectural clarity

Contributions must **respect the separation** between:

* **Canonical Core** (frozen)
* **Extensions & Ecosystem** (open)

---

## What You MAY Contribute

You are welcome to contribute to:

### 🧩 Extensions (Preferred)

* New tooling built *around* the core
* Visualization layers
* GUIs and projectors
* Debugging or inspection tools
* Adapters and integrations
* Documentation and tutorials

These should live in:

* `/runtime/`
* `/tools/`
* `/demos/`
* `/docs/` (if added)

---

### 🧪 Tests

* Additional **non-invasive** tests
* Regression tests
* Determinism or reproducibility checks

Tests must:

* Not redefine core behavior
* Not reinterpret field semantics
* Only validate against canonical expectations

---

### 📚 Documentation

* Clarifications
* Usage examples
* Architectural explanations
* Community guides

Documentation must not:

* Reframe ASCπ as AI / ML
* Introduce learning-based interpretations
* Suggest probabilistic behavior

---

## What You MAY NOT Contribute

The following are **explicitly prohibited**:

❌ Changes to canonical field equations
❌ Modifications of numerical integration behavior
❌ Alteration of attractor values or thresholds
❌ Introduction of randomness or stochasticity
❌ Machine learning, optimization, or training logic
❌ Reinterpretation of Ψ as a latent vector or model state
❌ Reframing ASCπ as AI, ML, or cognitive architecture

Pull requests violating these constraints will be closed.

---

## Frozen Canonical Components

The following are **read-only by design**:

* `/core/ascpi_field_compiler_v1.0.js`
* Canonical constants and invariants
* The Hybrid Engine Laughing Loop (HELL)
* Field Native Operator (FNO) syntax
* Canonical tests validating the above

These components are part of **defensive prior art**.

---

## Prior Art Notice

Some concepts and files may have appeared in **earlier repositories or documents**.

Contributing to this repository does **not** grant ownership over:

* the underlying concepts
* previously published material
* prior-art claims

Please see:

* [https://github.com/EllenBosMarcelMulder/.-hexLICences-](https://github.com/EllenBosMarcelMulder/.-hexLICences-).
* [https://github.com/EllenBosMarcelMulder/hexEGYptOS](https://github.com/EllenBosMarcelMulder/hexEGYptOS)

---

## Contribution Workflow

1. Fork the repository
2. Create a feature branch
3. Keep changes **strictly outside the canonical core**
4. Add or update tests where applicable
5. Open a Pull Request with a **clear explanation**

Pull requests should explain:

* What is added
* Why it does not alter the core
* How it respects determinism

---

## Community Conduct

This project values:

* Technical clarity
* Respectful discussion
* Precise language
* Honest disagreement

It does **not** tolerate:

* Misrepresentation of the system
* Bad-faith reframing
* Hype-driven reinterpretation

---

## Final Note

ASCπ is shared so others can **build responsibly** on a stable foundation.

If you are unsure whether your idea fits:

* open an issue
* describe your intent
* ask before coding

We prefer clarity **before** pull requests.

Welcome — and build carefully.