# hexSYStemOPErates

## Mechanical Mapping — Mathematics → Code

---

## 0. Doel van dit document

Dit document definieert een **mechanische, niet-interpretatieve mapping** tussen:

- de **formele wiskunde** van hexSYStemOPErates

- en **concrete code-constructies**

Elke regel is afdwingbaar.  
Elke afwijking is objectief detecteerbaar.

---

## 1. Structuren

### 1.1 Hexagonaal veld H = (N, R)

**Wiskunde**

- N = set van nodes

- R = symmetrische relatie

**Code (DOM / SVG / JS)**

- N → array van objecten
  
  - id: string
  
  - position: { x: number, y: number }

- R → afgeleide relatie
  
  - nooit opgeslagen als matrix
  
  - altijd opnieuw geprojecteerd uit posities

**Verboden**

- adjacency lists met gewicht

- directionele edges

- hiërarchische parent-child relaties

---

## 2. Coördinaat-embedding

### 2.1 Axiaal → Cartesiaans

**Wiskunde**  
x = s · (3/2 · q)  
y = s · (√3 · (r + q/2))

**Code**

- berekening in een pure functie:
  
  - input: q, r, scale
  
  - output: x, y

- geen opslag van q,r én x,y tegelijk

- x,y is projectie, geen bron

**Verboden**

- bidirectionele conversie

- mutatie van q,r op basis van x,y

---

## 3. Afstand d(n₁,n₂)

**Wiskunde**  
d = ( |q₁ − q₂| + |q₁ + r₁ − q₂ − r₂| + |r₁ − r₂| ) / 2

**Code**

- pure functie distance(a,b)

- gebruikt alleen huidige posities

- geen caching

- geen optimalisatie

**Toegestaan**

- Math.abs

- basisrekenkunde

**Verboden**

- memoization

- nearest-neighbor indices

- spatial trees

---

## 4. Relatiematrix R

### 4.1 Definitie

R[i,j] = 1 als d ≤ d_max

**Code**

- impliciet:
  
  - if distance < d_max → relatie bestaat

- relatie wordt **niet opgeslagen**

- relatie bestaat alleen tijdens projectie

**Belangrijk**

- R is geen datastructuur

- R is een **projectieconditie**

---

## 5. Zichtbaarheid V(d)

### 5.1 Continue vorm

V(d) = exp(−α · d)

### 5.2 Discrete klassen

- high

- mid

- low

**Code**

- mapping d → className

- className bepaalt:
  
  - opacity
  
  - blur

- geen numerieke score verder gebruikt

**Verboden**

- terugrekenen van opacity naar d

- feedback van zichtbaarheid naar structuur

---

## 6. Projectie P(H)

### 6.1 Definitie

P(H) = {(nᵢ,nⱼ,V(d))}

**Code**

- render-stap:
  
  - verwijder vorige projectie
  
  - teken huidige nodes
  
  - teken huidige relaties

**Cruciaal**

- oude projectie wordt weggegooid

- nieuwe projectie wordt volledig opgebouwd

Dit **is** idempotentie in code.

---

## 7. Idempotentie P(P(H)) = P(H)

**Code-regel**

- geen accumulatie

- geen state-diffs

- geen incrementele updates

Implementatiepatroon:

- clear()

- project()

---

## 8. Invariant I₁ — Geen optimalisatie

**Wiskunde**  
T(H) = H of ∅

**Code**

- elke functie doet:
  
  - projecteren
  
  - of niets

**Verboden**

- verbeteren

- aanpassen

- interpoleren

- “closer to ideal”

Als iets niet geldig is → **niet tekenen**.

---

## 9. Invariant I₂ — Geen tijdsautoriteit

**Wiskunde**  
P(H,t₁) ≡ P(H,t₂)

**Code**

- tijd mag alleen herhalen

- nooit beslissen

**Toegestaan**

- requestAnimationFrame

- setInterval

**Verboden**

- timeouts als logica

- delta-time

- framerate-afhankelijke uitkomsten

---

## 10. Invariant I₃ — Crossed-Link Neutraliteit

**Wiskunde**  
C ∈ {available, inactive}

Geen interne functie available → active

**Code**

- crossed-link = data-object

- of verborgen DOM-node

- of JSON-flag

**Verboden**

- event listeners

- callbacks

- automatische activatie

---

## 11. Algebra van veldstate S = (N,R,V)

**Wiskunde**  
S ⊕ T = S

**Code**

- geen compositie van states

- geen merge

- geen stacking

Nieuwe state overschrijft nooit oude —  
oude wordt simpelweg niet meer geprojecteerd.

---

## 12. Phase State F = (φ, closure)

**Code**

- phase = string

- closure = boolean

**Regel**

- closure = closed → geen nieuwe structuren tekenen

- code **checkt**, maar **handelt niet**

Niet-projectie = correcte reactie.

---

## 13. Isomorfie-wet

**Wiskunde**  
Code ≡iso Math

**Code-eis**

Voor elke definitie:

- exacte tegenhanger

- geen extra vrijheid

- geen impliciete aannames

---

## 14. Mechanische verificatie (samengevat)

Elke implementatie moet voldoen aan:

- geen if/else met doelen

- geen optimalisatie-functies

- geen state-mutatie met intentie

- geen tijd als autoriteit

- volledige herprojectie per cyclus

Afwijking = **ongeldig systeem**.

---

## 15. Slot

Deze mapping maakt hexSYStemOPErates:

- reproduceerbaar

- implementeerbaar door derden

- juridisch toetsbaar

- technisch afdwingbaar

Er is **geen ruimte voor interpretatie**.

---

**Einde mechanische mapping**
