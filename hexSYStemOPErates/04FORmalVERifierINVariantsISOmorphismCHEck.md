# hexSYStemOPErates

## Formal Verifier — Invariants & Isomorphism Check

---

## 1. Verificatie-scope

De verifier toetst **uitsluitend**:

- structurele correctheid

- invariantbehoud

- isomorfie Math ↔ Code

De verifier **stuurt niets** en **corrigeert niets**.  
Resultaat is **PASS** of **FAIL**.

---

## 2. Formele predicaten

### P1 — Non-Decisionaliteit

Voor elke functie f in code:

- f bevat **geen** selectie op basis van criterium, doel of voorkeur.

**Detectie (syntactisch/semantisch):**

- verboden tokens: if, else, switch, case, ?:

- verboden patronen: min/max als selectie, score-vergelijkingen, thresholds met acties

Resultaat:

- true ⇒ voldoet

- false ⇒ FAIL(P1)

---

### P2 — Geen Optimalisatie

Er bestaat **geen** functie g waarvoor geldt:

- g(H) ≠ H en g(H) ≠ ∅

**Detectie:**

- state-mutatie met “verbetering”

- incrementele updates

- accumulatie tussen cycli

Resultaat:

- true ⇒ voldoet

- false ⇒ FAIL(P2)

---

### P3 — Tijd-Neutraliteit

Tijd heeft **geen logische autoriteit**.

Formeel:

- Voor alle t1, t2 geldt: Output(t1) ≡ Output(t2) bij gelijke input.

**Detectie:**

- tijdswaarden gebruikt in beslissingen

- delta-time beïnvloedt structuur

Toegestaan:

- herhaling zonder logica (raf, interval)

Resultaat:

- true ⇒ voldoet

- false ⇒ FAIL(P3)

---

### P4 — Idempotentie van Projectie

Herhaalde projectie verandert niets.

Formeel:

- Project(Project(H)) = Project(H)

**Detectie:**

- incrementele rendering

- diff-based updates

- append-without-clear

Resultaat:

- true ⇒ voldoet

- false ⇒ FAIL(P4)

---

### P5 — Crossed-Link Neutraliteit

Crossed-links zijn **alleen beschikbaar**, nooit actief intern.

Formeel:

- er bestaat geen interne functie: available → active

**Detectie:**

- event listeners

- callbacks

- auto-activatie

- interne triggers

Resultaat:

- true ⇒ voldoet

- false ⇒ FAIL(P5)

---

### P6 — Structurele Correspondentie

Elke wiskundige constructie heeft een **exacte code-tegenhanger**.

Te controleren mapping:

- N → nodes

- R → impliciete relatie via afstand

- V → zichtbaarheid (opacity/blur)

- P → render-projectie

- ⊕ → identiteit (geen compositie)

Resultaat:

- volledig ⇒ voldoet

- ontbrekend/extra ⇒ FAIL(P6)

---

## 3. Verificatie-algoritme (pseudo)

`function VERIFY(system):     results = []     results.append(check_non_decisional(system))     results.append(check_no_optimization(system))     results.append(check_time_neutral(system))     results.append(check_idempotence(system))     results.append(check_crossed_link(system))     results.append(check_structural_correspondence(system))     if all(results == PASS):         return PASS     else:         return FAIL with violated predicates`

---

## 4. Mechanische checks (concreet)

### 4.1 Static scan (AST / tekst)

- scan op verboden tokens

- scan op verboden API-patronen

- scan op state-mutaties

### 4.2 Runtime probe (optioneel, niet-sturend)

- voer projectie 2× uit met identieke input

- vergelijk outputs (structuur + zichtbaarheid)

- verschil ⇒ FAIL(P4)

---

## 5. Referentie-implementatie (minimal)

### 5.1 Verifier-interface (taal-agnostisch)

`VerifierResult = {   pass: boolean,   violations: [ "P1", "P4", ... ] }`

### 5.2 Voorbeeld (JS-achtig pseudocode)

`function checkNonDecisional(ast) {  return !ast.contains(["IfStatement", "ConditionalExpression", "SwitchStatement"]); }  function checkIdempotence(projectFn, input) {  const a = projectFn(input);  const b = projectFn(input);  return deepEqual(a, b); }`

---

## 6. Pass/Fail-definitie

- **PASS**  
  Alle P1–P6 zijn waar. Implementatie is **geldige instantie**.

- **FAIL**  
  Eén of meer predicaten onwaar. Implementatie is **per definitie ongeldig**.

Er is **geen gradatie**.  
Er is **geen herstelactie**.  
Niet-projectie is de correcte reactie.

---

## 7. Slotverklaring (normatief)

Deze verifier definieert de **enige geldige toets** voor hexSYStemOPErates.

Elke implementatie die niet slaagt:

- is niet isomorf

- is niet conform

- mag niet als hexSYStemOPErates worden aangeduid

---

**Einde formele verifier**
