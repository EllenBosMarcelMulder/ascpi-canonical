# [ .:: hexPIXelWAVe3D ::. ]

## Axiomatic Definition — Pixel as Implosion Point in a Phase-Deformed Field

---

## 0. Scope

This document defines the **pixel** not as a discrete surface element, but as a **projective implosion point** of a higher-order phase field.

The definition is **structural, deterministic, non-decisional**, and **independent of implementation**.

---

## 1. Projective Domain

Let Ω ⊂ R² be the **projection domain**.

Ω is not a grid of discrete elements.
Ω is a continuous domain of projection coordinates.

---

## 2. Underlying Field

Let the underlying field Ψ be defined as:

Ψ : R² × Z × Φ → R

where:

* (x, y) ∈ R² are projection coordinates
* z ∈ Z is a non-exploded depth dimension
* φ ∈ Φ is a cyclic phase parameter, Φ = [0, 2π)

Ψ contains **structural degrees of freedom that are not necessarily visible**.

---

## 3. Projector

Define a projector P as a surjective mapping:

P : (x, y, z, φ) → (x, y)

with the property:

∂P / ∂z = 0

Thus, explicit depth coordinates are **not directly projected**.

---

## 4. Pixel (Redefinition)

A pixel p ∈ Ω is defined as:

p = P(Γ)

where Γ ⊂ R² × Z × Φ is a **non-trivial field trajectory**.

A pixel is therefore:

* not an area element
* not a discrete unit
* not a container of color

A pixel is the **implosion point** of a field trajectory.

---

## Axiom I — Implosion Axiom

For every pixel p ∈ Ω there exists a set Γₚ such that:

Γₚ = { (x, y, z, φ) | P(x, y, z, φ) = p }

The information contained in Γₚ **need not be visible** to be **structurally present**.

---

## Axiom II — Non-Visible Depth

For all z₁, z₂ ∈ Z:

P(x, y, z₁, φ) = P(x, y, z₂, φ)

but, in general:

Ψ(x, y, z₁, φ) ≠ Ψ(x, y, z₂, φ)

Thus:

* depth exists structurally
* depth influences the field
* depth is not geometrically exploded

---

## 5. Phase Field

Define the projected phase field:

φ : Ω → Φ

φ(x, y) is the **collapsed phase information** of Γₚ.

---

## 6. Phase Gradient

∇φ(x, y) = ( ∂φ/∂x , ∂φ/∂y )

This represents local phase variation on the projection domain.

---

## 7. Phase Curvature

Define phase curvature:

κ(x, y) = ∂²φ/∂x² + ∂²φ/∂y²

κ expresses local field bending after implosion.

---

## Axiom III — Light as a Field Derivative

Light intensity L is defined as:

L(x, y) = A · |∇φ(x, y)|²

where A > 0 is a scale constant.

There are **no light sources** in the system.
Light is a **direct consequence of field structure**.

---

## Axiom IV — Visibility

Visibility (alpha) α is defined as:

α(x, y) = exp( −β · |κ(x, y)| )

where β > 0 is a field resistance constant.

Consequences:

* flat field → vanishing visibility
* high curvature → strong presence

Visibility is **not a stylistic choice**, but a structural outcome.

---

## Axiom V — Diffusion (Blur)

Define the diffusion parameter σ:

σ(x, y) = γ / ( |∇φ(x, y)| + ε )

where:

* γ > 0 is a scale constant
* ε > 0 prevents singularity

---

## Axiom VI — Color as Phase Encoding

Color is defined directly from phase:

H(x, y) = φ(x, y) / (2π)

or equivalently:

RGB(x, y) = (
cos(φ),
cos(φ + 2π/3),
cos(φ + 4π/3)
)

Color is **not an object attribute**, but a phase representation.

---

## Axiom VII — Crossed-Link Neutrality

Let C be a crossed-link state with:

C ∈ {available, inactive}

Then:

* Γₚ may exist in available
* Γₚ need not be visible
* no internal operation activates additional depth layers

Visibility requires **external projection**, never internal selection.

---

## Theorem 1 — Depth Without Geometry

There exists a non-empty depth space Z such that:

* depth is structurally present
* depth influences phase and curvature
* depth does not appear as geometry

∎

---

## Theorem 2 — 3D Perception Without a 3D Model

The combination of:

L(x, y) = |∇φ|²
α(x, y) = exp(−β|κ|)
σ(x, y) = γ/(|∇φ|+ε)

is sufficient to induce depth perception without explicit z-projection.

∎

---

## Canonical Conclusion

In **hexPIXelWAVe3D**:

* a pixel is **not** a primitive
* a pixel is an **implosion of field structure**
* depth exists without visibility
* visibility is a property of the projector, not the field

> Structure exists independently of whether it is shown.
