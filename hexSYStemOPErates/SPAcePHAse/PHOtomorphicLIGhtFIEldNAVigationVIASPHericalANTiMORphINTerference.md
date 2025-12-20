# PRIOR ART DISCLOSURE

## Photo-Morphic Light-Field Navigation via Spherical Anti-Morph Interference

**Publication date:** 2025  
**Author:** Marcel Mulder  
**Status:** Defensive prior art disclosure  
**Field:** Computational optics, image geometry, light-field navigation, interferometric rendering  
**Non-patent intent:** This document is published explicitly to establish prior art and prevent exclusive patent claims by third parties.

---

## Abstract

This document discloses a deterministic method for navigating a single photographic image as a **continuous, physically constrained light-field**, without reconstructing objects, estimating depth maps, or employing statistical inference or machine learning.

The method maps each pixel of a photograph onto a **spherical projection domain**, interprets pixel intensities as **directional optical rays**, and enables navigation through viewpoint, orientation, and depth-phase by means of **phase-coherent interferometric recombination**, including a formally defined **anti-morphic mirrored field**.

The system explicitly avoids semantic reconstruction and produces only those visual configurations that are physically inferable from the recorded optical field.

---

## 1. Technical Field

The invention relates to:

- optical image geometry

- spherical projection of photographic data

- light-field navigation

- interferometric phase modelling

- non-reconstructive 3D perception from single images

The method is distinct from:

- neural depth estimation

- structure-from-motion

- photogrammetry

- stereo or multi-view capture

- plenoptic camera reconstruction

---

## 2. Problem Statement

Conventional methods attempting “3D from a single photo” rely on:

- heuristic depth inference

- trained statistical models

- object recognition

- artificial hallucination of unseen geometry

Such methods **violate physical determinism** and produce visually plausible but non-verifiable results.

The problem addressed is:

> How to allow navigable perception of depth, orientation, and parallax **without inventing geometry**, using only information physically encoded in a single photographic exposure.

---

## 3. Core Insight

A photograph is not a flat image, but a **compressed recording of an optical field**:

- Each pixel corresponds to a **ray direction**

- The camera lens introduces **known spherical distortion**

- Light arrives with **wavelength-dependent phase relationships**

- The image plane is a **projection**, not the field itself

By restoring the correct geometric and phase relationships, one can navigate the **perceptual field** without reconstructing objects.

---

## 4. Method Overview

### 4.1 Spherical Projection Mapping

Each pixel (x, y) is mapped to a spherical direction using known or adjustable lens parameters:

- focal length f

- radial distortion coefficients k₁, k₂, …

Normalized coordinates:

u = (x − cx) / f  
v = (y − cy) / f

Spherical arc length:

θ = atan2(√(u² + v²), 1)  
s = θ · f

This establishes a **projective sphere** onto which the photograph is mapped.

---

### 4.2 Optical Phase Attribution

For each pixel, an optical phase is computed:

φ(λ) = (2π / λ) · s

where λ is the wavelength associated with pixel color components.

This converts color and position into **phase-bearing optical rays**.

---

### 4.3 Hexagonal Neighborhood Coupling

Pixels are not treated independently.

Instead, each pixel interacts with a **hexagonally sampled neighborhood**, where neighbor selection depends on navigation orientation.

This creates:

- direction-dependent interference

- spatial coherence

- rotationally consistent parallax effects

---

### 4.4 Anti-Morph Field Construction

For every optical ray, an **anti-morphic counterpart** is generated:

- mirrored spatial position

- inverted direction vector

- amplitude modulated by incidence angle and phase mismatch

This anti-morph represents the **physically constrained unknown region** behind the image plane.

It is not a reconstruction, but a **boundary condition**.

---

### 4.5 Interferometric Rendering

Visible intensity is computed via complex wave summation:

E_total = Σ (Aᵢ · e^(iφᵢ))

Final intensity:

I = |E_total|

Only **constructively interfering configurations** remain visible.

Destructive interference naturally removes impossible viewpoints.

---

## 5. Navigation Parameters

The system allows continuous navigation via:

- θ : azimuth (horizontal orientation)

- φ : elevation (vertical orientation)

- t : depth-phase (optical time / arc modulation)

- ψ : anti-morph phase offset

Navigation does not alter geometry, only **which phase-coherent slice of the field is visible**.

---

## 6. Key Properties

### 6.1 Deterministic

- No random processes

- No learning

- No probabilistic inference

### 6.2 Non-Reconstructive

- No object meshes

- No depth maps

- No inferred hidden surfaces

### 6.3 Physically Constrained

- Visibility limited by interference stability

- Impossible viewpoints naturally vanish

- No invented information

---

## 7. Distinction from Prior Art

This method differs fundamentally from:

- Neural radiance fields (NeRF)

- Light-field reconstruction via multi-view capture

- Monocular depth estimation

- 2.5D parallax effects

Because it:

- uses a **single image**

- does not reconstruct geometry

- relies on **phase physics**, not statistics

- includes an explicit **anti-morphic boundary field**

---

## 8. Applications

- forensic image analysis

- scientific visualization

- perceptual research

- non-hallucinatory image navigation

- verification of optical plausibility

---

## 9. Publication Intent

This document is published as **defensive prior art**.

No exclusive rights are claimed.  
Any party may implement, study, or extend this method.

However, no party may validly claim novelty over the principles disclosed herein.

---

## 10. Concluding Statement

The disclosed method demonstrates that meaningful navigable depth perception can be achieved from a single photograph **without reconstructing the world**, but by correctly respecting the physical structure of the optical field already present in the image.

---
