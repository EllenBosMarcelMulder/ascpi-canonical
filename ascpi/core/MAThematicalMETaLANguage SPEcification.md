## Mathematical Meta-Language Specification

### Base Symbols (Primitives)

Ψ truth (inaccessible)
Π projection
θ phase (∈ ℤ₆)
χ viewing curve
○ closure
∅ no closure
⊥ type disjunction
* invariance marker

---

### Structural Relators (Not Operations)

⟼ structural projection (Ψ ⟼ Π)
↯ phase binding (θ ↯ Π)
≔ positional anchor
⟷ equivalence within type
├ closure verification
⊭ forbidden path

Relators do not cause effects; they only position or constrain.

---

### Syntax Rules (Type Enforcement)

#### Valid Constructions

Ψ ⟼ Π[θᵢ]  projection with phase index
Π[θᵢ] ⟷ Π[θⱼ] projection equivalence
χ : θ ↯ Π  viewing-curve binding
∃○ : [expr] ├ closure closure test
Π* ≔ memory invariance positioning

---

#### Forbidden Constructions

Π ⟼ Ψ    ⊭ upward causation
Ψ(t)    ⊭ temporal parameter
f(Π) → Π′  ⊭ functional transformation
Π ← agent  ⊭ agency
∫ Π dt   ⊭ temporal integration

These constructions are not merely forbidden; they are **not formulable** within the language.

---

### Decision Notation

decision ≔ ○[Π*]

where:

○[x] ├ structural stability
∧ cross-phase invariance

A decision is not a choice and not an action, but the recognition of closure.

---

### Interface Constraints

GUI : θ-manipulator
GUI ⊭ Ψ-access
GUI ├ θ ↯ Π[θ′]

The interface manipulates phase only, never truth.

---

### Memory Definition

memory ≔ Π[θᵢ]* ∩ Π[θⱼ]*

where:

i ≠ j
∧ ∃ invariant

Memory is cross-phase invariance, not storage and not a temporal structure.

---

### Type Verification Operator

⊢ expr : type
⊢ Ψ : truth
⊢ Π : projection
⊢ Ψ ⊥ Π : disjoint_types

Type checking is a design property of the notation, not a derivation process.

---

### Closure Predicate

closure(X) ≔
∃ θᵢ, θⱼ :
X[θᵢ] ⟷ X[θⱼ]
∧ X[θᵢ] ├ structural_stability

---

### Meta-Language Grammar (BNF-like)

statement ::= positioning | verification | constraint

positioning ::= symbol ≔ expression

verification ::= expression ├ predicate

constraint ::= expression ⊭ forbidden_path

expression ::= symbol | relation | closure_test

relation ::= symbol relator symbol

closure_test ::= ○[expression]

---

### Distinguishing Properties

* No conjugation or grammatical tense
* All statements are positional anchors or constraint verifications
* Syntax renders temporal and causal constructions syntactically invalid
* Type checking is built into the notation
* Meta-recursion: the language describes its own constraint system

---

### Validation

This notation makes it impossible to formulate canonical violations **within** the meta-language itself.