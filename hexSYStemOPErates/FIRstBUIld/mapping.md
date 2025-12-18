# hexSYStemOPErates - Mechanische Mapping

## Core = P ∘ M

waar:
- M = mechanische mapping (wiskunde → drager)
- P = pure projectie

## Mapping Regels

### Wiskundige Structuur → Code Equivalent

| Wiskunde | Code | Eigenschap |
|----------|------|------------|
| Hexagonale topologie H | `generateTopology()` | Isomorf |
| Afstandsfunctie d(a,b) | `hexDistance()` | Exact |
| Relatie R[i,j] = 1 | `distance <= D_MAX` | Geen persistentie |
| Zichtbaarheid V(d) | `visibilityMap[]` | Non-decisional |
| Projectie P: H → DOM | `project()` | Idempotent |

## Verboden Mappings

- Wiskunde → interpretatie
- Wiskunde → optimalisatie  
- Wiskunde → beslissing
- Wiskunde → verbetering

## Toegestane Mappings

- Wiskunde → directe correspondentie
- Wiskunde → structurele projectie
- Wiskunde → mechanische executie

## Verificatie

Voor elke mapping M:
```
Mathematical_behavior(input) = Code_behavior(input)
```

**Afwijking = mapping ongeldig**