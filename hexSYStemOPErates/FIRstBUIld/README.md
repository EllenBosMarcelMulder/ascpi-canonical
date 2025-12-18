# hexSYStemOPErates

**A field-native projection engine for structural visualization without decision-making**

## Core Principle

This system **does not decide**, **does not optimize**, and **does not control**.  
It only makes structural relationships visible through pure mathematical projection.

## Architecture

```
┌─────────────────────────────┐
│  LAYER 4 — PRESENTATION     │  (SVG / Canvas / Text)
├─────────────────────────────┤
│  LAYER 3 — PROJECTORS       │  (Adapters, no logic)
├─────────────────────────────┤
│  LAYER 2 — FIELD STATE      │  (JSON, descriptive)
├─────────────────────────────┤
│  LAYER 1 — CANONICAL CORE   │  (Math + Invariants)
└─────────────────────────────┘
```

## Quick Start

```bash
# Verify installation
python verifier/hexsys_verifier.py .

# Run runtime
open runtime/runtime.html
```

## Core Function

```javascript
function project(field) {
  if (!field || field.topology !== "hexagonal") return null;
  
  const out = { nodes: field.nodes, relations: [] };
  
  for (let i = 0; i < field.nodes.length; i++) {
    for (let j = i + 1; j < field.nodes.length; j++) {
      const a = field.nodes[i];
      const b = field.nodes[j];
      const d = (Math.abs(a.q - b.q) + 
                 Math.abs(a.q + a.r - b.q - b.r) + 
                 Math.abs(a.r - b.r)) / 2;
      
      if (d <= D_MAX) {
        const visibility = d < 40 ? "high" : d < 80 ? "mid" : "low";
        out.relations.push({ a: a.id, b: b.id, visibility });
      }
    }
  }
  
  return out;
}
```

## Canonical Invariants

- **P1**: Non-decisional (no if/else optimization)
- **P2**: No optimization (no "better/worse")  
- **P3**: No time authority (time only for repetition)
- **P4**: Idempotent (P(P(H)) = P(H))
- **P5**: Crossed-link neutral (external activation only)
- **P6**: Structurally correspondent (Math ≡ Code)

## Repository Structure

```
hexSYStemOPErates/
├─ core/                    # Mathematical definitions
├─ schema/                  # JSON validation schemas  
├─ runtime/                 # Executable implementation
├─ verifier/                # Compliance checking
├─ tests/                   # Sample data
├─ HASH.txt                 # Content verification
├─ PRIOR_ART.md            # Authorship record
├─ NON_DECISIONAL_NOTICE.md # Legal classification
└─ README.md               # This file
```

## Verification

```bash
# Python verifier
python verifier/hexsys_verifier.py runtime/

# JavaScript verifier (browser console)
hexSystemVerifier.verifyRuntime()
```

## What This System Can Do

- Visualize text as structural relationships
- Map code dependencies without interpretation
- Display data patterns without judgment
- Make any structure transparently visible

## What This System Cannot Do

- Make decisions or recommendations  
- Optimize or improve anything
- Learn or adapt behavior
- Execute actions beyond visualization
- Be misused for control or manipulation

## Theoretical Foundation

Based on Plasma Dynamica theory: π = ΔΦ / ΔΘ

Interference patterns between expansive (f+) and implosive (f-) fields create stable structural projections without requiring decision-making logic.

## Author

Marcel van der Meer  
Theoretical foundation: Plasma Dynamica  
Implementation: 2024-2025

## License

See individual files for licensing. Core mathematical definitions are established as prior art.

---

**This system exists to make structure visible, not to make decisions.**