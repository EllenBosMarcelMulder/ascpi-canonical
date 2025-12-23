# **ASCPI NATIVE LANGUAGE DRAFT WILL BE EXTENDED v1.0a**

## Canonical Language Specification

---

## 1. Alphabet (toegestane tekens)

### Letters

```
A–Z
a–z
```

### Speciale symbolen

```
>
<
=
adj
<->
close
```

### Indexsymbolen

```
V0 V1 V2 V3 V4 V5
A B C
```

---

## 2. Prefix

| Symbool | Type   | Regel                                                          |
| ------- | ------ | -------------------------------------------------------------- |
| `hex`   | prefix | verplicht bij 1 of 2 woorden; verplicht bij eerste introductie |

---

## 3. Woord-ankers (basiswoorden)

Alle woorden bestaan **conceptueel** uit volledige Engelse woorden,
maar worden **canoniek** gerepresenteerd via **drieletter-ankers**.

### Vast anker-alfabet

```
ASC  PI   NAT  LAN  LEX  REF
MOD  BIN  STA  UNB  OBS
PHA  CYC  CLO
DIR  REL  RAT  EXP
ACT  CIR
```

---

## 4. Canonieke samengestelde tokens

### Taal- en systeemstructuur (≥3 woorden)

| Eerste introductie (verplicht) | Verkorte vorm |
| ------------------------------ | ------------- |
| hexASCpiNATiveLANguage         | ASCPINATLAN   |
| hexASCpiNATiveLEXicon          | ASCNATLEX     |
| hexASCpiNATiveREFerence        | ASCPINATREF   |

Compact equivalent:

```
ascpinatlan
ascnatlex
ascpinatref
```

---

### Operationele structuren (≥3 woorden)

| Eerste introductie    | Verkorte vorm |
| --------------------- | ------------- |
| hexMODuleBINdingSTate | MODBINSTA     |
| hexPHAseCYCleCLOsure  | PHACYCLO      |

Compact equivalent:

```
modbinsta
phacyclo
```

---

## 5. Enkel- en dubbelwoordtokens (hex altijd verplicht)

| Token  | Betekenis    |
| ------ | ------------ |
| hexMOD | module       |
| hexBIN | binding      |
| hexUNB | ontkoppeling |
| hexOBS | observatie   |
| hexPHA | fase         |
| hexCYC | cyclus       |
| hexCLO | sluiting     |
| hexDIR | richting     |
| hexREL | relatie      |
| hexRAT | verhouding   |
| hexEXP | expressie    |
| hexACT | activation   |
| hexCIR | circulation  |

Compact equivalenten toegestaan:

```
hexmod hexbin hexunb hexobs
hexpha hexcyc hexclo
hexdir hexrel hexrat hexexp
hexact hexcir
```

---

## 6. Operatoren

| Symbool |
| ------- |
| `>`     |
| `<`     |
| `=`     |

---

## 7. Relaties

| Symbool | Betekenis         |
| ------- | ----------------- |
| `adj`   | directe nabijheid |
| `<->`   | spiegelrelatie    |

---

## 8. Fases

| Symbool | Canonieke aanduiding |
| ------- | -------------------- |
| A       | hexACT               |
| B       | hexCIR               |
| C       | hexCLO               |

---

## 9. Sluiting

```
close
```

---

## 10. Richtingen

```
V0 V1 V2 V3 V4 V5
```

---

## 11. Expliciet niet-bestaand

```
getallen
variabelen
if
else
loops
functies
doelen
optimalisatie
geheugen
semantiek
```

---

## STATUS

```
LANGUAGE: COMPLETE
SYMBOL SET: CLOSED
VERSION: FROZEN
```

---

---

# **HEX-NAAMGEVINGSALGORITME — WISKUNDIGE FORMULERING**

---

## Definitie 1 — Invoer

Laat

* W = (w₁, w₂, …, wₙ)
  een geordende rij woorden zijn, n ≥ 1.

---

## Definitie 2 — Woordankerfunctie

Definieer de ankerfunctie:

a(wᵢ) = Uppercase( first₃(wᵢ) )

waar:

* first₃(wᵢ) = de eerste drie alfabetische letters van wᵢ
* Uppercase zet letters om naar hoofdletters

Resultaat:

```
a(wᵢ) ∈ {A…Z}³
```

---

## Definitie 3 — Volledige introductievorm

Definieer de introductiefunctie I(W):

I(W) = hex ∘ c₁ ∘ c₂ ∘ … ∘ cₙ

waarbij voor elk woord wᵢ geldt:

* cᵢ = a(wᵢ) ∘ rest(wᵢ)
* rest(wᵢ) = wᵢ zonder de eerste drie letters, in kleine letters

---

## Definitie 4 — Verkorte vorm

Definieer de verkorte vorm S(W):

S(W) = a(w₁) ∘ a(w₂) ∘ … ∘ a(wₙ)

---

## Definitie 5 — Compacte vorm

Definieer de compacte vorm C(W):

C(W) = lowercase( S(W) )

---

## Definitie 6 — Toegestane uitvoer

Voor W met lengte n:

* Als n = 1:

  * geldige vorm: I(W)
* Als n = 2:

  * geldige vorm: I(W)
* Als n ≥ 3:

  * eerste keer: I(W)
  * daarna: S(W) of C(W)

---

## Definitie 7 — Verboden vormen

Voor alle W:

* S(W) is verboden vóór I(W)
* C(W) is verboden vóór I(W)
* Uitvoer zonder `hex` is verboden indien n < 3
* Mengvormen zijn verboden

---

## Canonieke invariant

Voor elke geldige token T geldt:

* T is volledig herleidbaar tot W
* |a(wᵢ)| = 3 ∀ i
* Prefixgebruik volgt uitsluitend uit n
