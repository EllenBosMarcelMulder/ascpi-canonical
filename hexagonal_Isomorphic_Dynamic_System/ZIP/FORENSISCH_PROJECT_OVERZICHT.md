# FORENSISCH PROJECT OVERZICHT: hexMHS / ASCπ SYSTEEM

## METAGEGEVENS

| Eigenschap | Waarde |
|------------|--------|
| **Totaal bestanden** | 53 |
| **Totale grootte** | 671KB |
| **Projectnaam** | hexMHS (Hex Module Handling System) |
| **Canon Versie** | hexMHS v1 |
| **Canon Status** | FROZEN (juridisch, technisch, conceptueel bevroren) |
| **Primaire talen** | JavaScript (Node.js), Python 3, Custom .os DSL |

---

## ARCHITECTUUR HIËRARCHIE

### LAAG 1: CANONIEKE KERN (BEVROREN)

#### Module Runtime Systeem
| Bestand | Grootte | Functie |
|---------|---------|---------|
| `module_runtime.js` | 9.5KB | Runtime engine: ModuleRuntime, ModuleContract, ModuleRegistry klassen |
| `module_lang_compiler.js` | 11KB | Compiler voor .os domein-specifieke taal |
| `orchestrator.js` | 3.0KB | Module registry en sequentiële executie |

#### Python Kernel
| Bestand | Grootte | Functie |
|---------|---------|---------|
| `ascpi_kernel_v1_1.py` | 8.0KB | Canonieke ASCπ veld-motor met N-invariantie (N=1.0 constant) |

#### Veldstaat Definitie (Ψ)
```
Ψ = (dPhi, kappa, theta, C, t)

dPhi:   Differentiaal/onderscheiding (-∞, +∞)
kappa:  Kromming/weerstand [0, +∞)
theta:  Fase [0, 2π) modulair
C:      Coherentie [0, 1]
t:      Discrete stap teller
N:      KLASSE-ATTRIBUUT = 1.0 (onveranderlijk)
```

#### Mathematische Constanten
```python
PHI = (1 + √5) / 2  # Gulden snede ≈ 1.618
DPHI_STAR = PHI / 2  # Doel differentiaal
TAU = 2π             # Volledige cirkel
```

---

### LAAG 2: HEX OPERATING SYSTEM

#### Hoofd OS Bestand
| Bestand | Grootte | Functie |
|---------|---------|---------|
| `hexMHS_with_invariants.os` | 25KB | Complete bevroren canon met 9 modules en 1 program |

#### OS Modules (9 canonieke modules)

| Module | Inputs | Outputs | Functie |
|--------|--------|---------|---------|
| **CoreClock** | - | tick, stepCount | Discrete tijd-bron |
| **ContextField** | step | state, version | Veld-context beheer |
| **HexTopology** | field | nodes[7], neighbors | 7-node hex-structuur (1 center + 6 ring) |
| **ModuleRegistry** | layout, runlist, moduleUpdates | allocation, executionPolicy | Module-naar-node mapping |
| **Scheduler** | topology, version | runlist, policy | Ring-gebaseerde scheduling |
| **MigrationPlanner** | topology, executionPolicy, version | migrationPlan | Observeert en plant migraties |
| **MigrationExecutor** | migrationPlan, topology, version | appliedMigrations, moduleUpdates | Voert migraties uit |
| **HexInvariantMonitor** | allocation, topology | ringBalance, occupancyDegree, migrationPressure, invariantMetrics | Observationele monitoring |
| **OSInspector** | 7 inputs | 7 outputs | Aggregatie en rapportage |

#### Hex Topologie Structuur
```
Node 0: center (q=0, r=0, ring=0)
Node 1: ring 1  (q=1, r=0)
Node 2: ring 1  (q=0, r=1)
Node 3: ring 1  (q=-1, r=1)
Node 4: ring 1  (q=-1, r=0)
Node 5: ring 1  (q=0, r=-1)
Node 6: ring 1  (q=1, r=-1)
```

---

### LAAG 3: EXPERIMENTELE SCHEIDING

#### Grens-Interface Bestanden
| Bestand | Grootte | Functie |
|---------|---------|---------|
| `canon_experimental_boundary.os` | 8.0KB | Read-only export canon → experimenteel |
| `experimental_minimal_proof.os` | 5.0KB | Proof-of-concept experimentele modules |

#### Grens Modules
- **CanonExperimentalBoundary**: Kopieert canon outputs naar EXP_ namespace
- **CanonIsolationGuard**: Detecteert experimentele interferentie-pogingen
- **ExperimentalMetaObserver**: Rapporteert over scheiding zelf
- **EXP_MinimalProof**: Leest canon, maakt voorstellen, geen impact
- **EXP_CanonNonInterference**: Bewijst non-interferentie

---

### LAAG 4: MODULE PIPELINE

#### Pipeline Modules
| Bestand | Input Type | Output Type | Functie |
|---------|------------|-------------|---------|
| `module_file_to_math.js` | file | math_field | Bestand → numerieke velden (SHA256, entropy, complexity) |
| `module_math_to_energy.js` | math_field | energy_state | Roept Python kernel aan |
| `module_energy_to_svg.js` | energy_state | svg_state | Deterministisch SVG generatie |

#### Pipeline Flow
```
bestand → Module 1 → Module 2 → Module 3 → SVG
          (math)      (kernel)   (visual)
```

---

### LAAG 5: VISUALISATIE & ADAPTERS

#### Adapter Systeem
| Bestand | Grootte | Functie |
|---------|---------|---------|
| `adapter_api.js` | 8.0KB | Express.js API server |
| `adapter_config.js` | 4.5KB | Configuratie beheer |
| `adapter_index.js` | 8.0KB | Adapter hoofdentry |
| `adapter_runtime.js` | 7.5KB | Runtime wrapper |

#### Visualisatie Systeem
| Bestand | Grootte | Functie |
|---------|---------|---------|
| `vis_svg_adapter.js` | 5.0KB | SVG rendering |
| `vis_timeline_buffer.js` | 2.5KB | Timeline snapshot buffer |
| `vis_timeline_runtime.js` | 3.0KB | Timeline executie |
| `vis_config.js` | 3.5KB | Visualisatie configuratie |
| `hexmhs_visualizer.js` | 5.0KB | hexMHS state → SVG/hexBYE structuur |

---

### LAAG 6: hexBYE INSTRUMENT

#### Hoofd HTML Bestanden
| Bestand | Grootte | Functie |
|---------|---------|---------|
| `index.html` | 7.5KB | hexBYE instrument interface |
| `hexBYE_2D.html` | 65KB | 2D visualisatie |
| `hexBYE_2D_enhanced.html` | 66KB | Verbeterde 2D visualisatie |
| `hexBYE_2D_recombined.html` | 45KB | Gerecombineerde versie |
| `ASCpi_OS.html` | 58KB | ASCπ OS interface |

#### Core JavaScript
| Bestand | Grootte | Functie |
|---------|---------|---------|
| `hexBYE_core.js` | 6.5KB | Kern extractie logica |
| `main.js` | 17KB | Applicatie hoofdlogica |
| `visualization.js` | 17KB | Visualisatie engine |
| `structure-extractor.js` | 15KB | Structuur extractie |
| `invariance-tester.js` | 14KB | Invariantie testing |
| `visibility-mapper.js` | 14KB | Zichtbaarheid mapping |
| `image-handler.js` | 15KB | Image verwerking |
| `comparison.js` | 15KB | Structuur vergelijking |
| `snapshots.js` | 17KB | Snapshot opslag |

#### hexBYE API Interface
```javascript
window.hexBYE = {
  extract(imageData, width, height, options),
  processImage(imageSrc),
  getState(),
  getStructure(),
  verify(imageData, width, height)
}
```

---

## PAD (PHASE) ONTWIKKELING

### PAD-1: Minimaal Modulair Systeem ✓
- Module runtime, compiler, basic orchestration

### PAD-2: Echte Module-Migratie ✓
**Phase A**: MigrationPlanner (observatie)
**Phase B**: MigrationExecutor (uitvoering)

Migratie Flow:
```
Step N:   MigrationPlanner → migrationPlan
Step N+1: MigrationExecutor → moduleUpdates
Step N+2: ModuleRegistry → updated allocation
```

### PAD-3: Hex-Semantische Invarianten ✓
Observationele monitoring:
- Ring-balans berekening
- Bezettingsgraad per ring
- Migratie-druk detectie
- Invariant-violatie flags

### PAD-4: Canon Freeze & Experimentele Scheiding ✓
- Canon juridisch, technisch, conceptueel bevroren
- Experimentele laag geïsoleerd
- Read-only export van canon naar experimenteel
- Geen terugkoppeling mogelijk

---

## TEST INFRASTRUCTUUR

| Bestand | Grootte | Test Scope |
|---------|---------|------------|
| `test_hexmhs_live.js` | 7.5KB | 36-step OS executie test |
| `test_canon_isolation.js` | 14KB | PAD-4 canon-experimenteel isolatie |
| `test_contracts.js` | 2.0KB | Module contract validatie |
| `test_hex_invariants_longrun.js` | 14KB | 72+ step lange-termijn stabiliteit |
| `test_real_module_migration.js` | 6.5KB | Echte module migratie |
| `hex_invariants_demo.js` | 9.0KB | Invariant demonstratie |
| `canon_experimental_demo.js` | 9.0KB | Experimentele scheiding demo |
| `conceptual_migration_demo.js` | 5.5KB | Conceptuele migratie demo |

---

## DOCUMENTATIE

| Bestand | Grootte | Onderwerp |
|---------|---------|-----------|
| `README.md` | 1.5KB | Project overzicht |
| `PAD-2_Phase_A_Documentation.md` | 5.0KB | MigrationPlanner implementatie |
| `PAD-2_Phase_B_Documentation.md` | 9.0KB | MigrationExecutor implementatie |
| `PAD4_CANON_FREEZE_DOCUMENTATION.md` | 8.5KB | Canon freeze & experimentele scheiding |
| `CANONBREUK_HERSTEL.md` | 5.5KB | Fix: topologie-resizing → echte module-migratie |
| `HEX_SEMANTISCHE_INVARIANTEN_GRENZEN.md` | 6.0KB | Grenzen observationeel vs afdwingend |
| `14_2hexPROjectionSYStemCANon.md` | 2.0KB | Projectie definitie (isomorfe vormherhaling) |
| `hexBYE_2D_enhancements.md` | 3.5KB | 2D visualisatie verbeteringen |
| `recombination_summary.txt` | 2.5KB | hexBYE OS-integratie afronding |
| `externe_consumptie_adapter_vis.txt` | 2.0KB | Adapter consumptie analyse |

---

## CANONIEKE REGELS

### TOEGESTAAN (Observationeel)
✓ Meten en rapporteren
✓ Patronen detecteren
✓ Trends analyseren
✓ Forensische documentatie
✓ Statistische analyse

### VERBODEN (Afdwingend)
✗ Scheduler aanpassen op basis van invarianten
✗ Migration forceren voor balancing
✗ Runtime optimalisatie op basis van density
✗ Adapter/visualisatie beslissingen die canon "corrigeren"
✗ Feedback loops van experimenteel naar canon

---

## INVARIANTEN

### Structurele Invarianten
1. **kappa ≥ 0**: Kromming niet-negatief
2. **0 ≤ C ≤ 1**: Coherentie begrensd
3. **θ ∈ [0, 2π)**: Fase modulair
4. **N = 1.0**: Klasse-constante onveranderlijk
5. **t increments**: Discrete tijd altijd stijgend

### Topologie Invarianten
1. Center (ring 0) blijft bestaan (min 6 nodes)
2. Geen gaten in ringen
3. Geen dubbele posities
4. Hex-structuur blijft geldig (6-nodes-per-ring)
5. Maximaal 1 module per node

---

## BESTANDSCLASSIFICATIE

### Per Type
| Type | Aantal | Totale Grootte |
|------|--------|----------------|
| JavaScript (.js) | 34 | ~340KB |
| OS Domain-Specific (.os) | 5 | ~50KB |
| HTML | 5 | ~240KB |
| Markdown (.md) | 8 | ~40KB |
| Python (.py) | 1 | ~8KB |
| CSS | 1 | ~12KB |
| TXT | 2 | ~4KB |

### Per Functionele Categorie
| Categorie | Bestanden |
|-----------|-----------|
| Kern Runtime | 4 |
| OS Modules | 5 |
| Pipeline Modules | 4 |
| Adapters | 4 |
| Visualisatie | 8 |
| UI/Frontend | 6 |
| Tests | 8 |
| Documentatie | 10 |
| Overig | 4 |

---

## DATAGEGEVENS GEËXTRAHEERD

### Geen Persoonlijke Gegevens Gevonden
- ✓ Geen email adressen
- ✓ Geen telefoonnummers
- ✓ Geen fysieke adressen
- ✓ Geen namen van personen
- ✓ Geen API keys of credentials
- ✓ Geen URLs naar externe diensten (behalve npm registry)

### Technische Identifiers
- Project namespace: `hexMHS`, `hexBYE`, `ASCπ`
- Versie strings: v1, v1.0, v1.1, v1.2
- Module IDs: CoreClock, ContextField, HexTopology, etc.

---

## CONCLUSIE

Dit project implementeert een **volledig deterministisch, canoniek bevroren modulair operating system** (hexMHS) met:

1. **9 canonieke OS-modules** die samenwerken via een dataflow-architectuur
2. **7-node hexagonale topologie** voor module-plaatsing
3. **Echte module-migratie** (modules bewegen over nodes, niet topologie-resizing)
4. **Observationele invariant-monitoring** zonder afdwinging
5. **Strikte canon-experimenteel scheiding** met read-only grens
6. **Volledige test-coverage** voor isolatie en lange-termijn stabiliteit

Het systeem is **juridisch, technisch en conceptueel bevroren** als hexMHS v1, met mogelijkheid voor experimentele uitbreidingen die geen impact hebben op het canonieke gedrag.
