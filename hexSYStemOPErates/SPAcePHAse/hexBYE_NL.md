[ .:: hexBYE ::. ]

[ .:: hexBEHavioralYIEldEXClusion ::. ]  
[ .:: hexBEHYIEEXC ::. ]  
[ .:: hexbehyieexc ::. ]  
[ .:: BEHavioralYIEldEXClusion ::. ]  
[ .:: BEHYIEEXC ::. ]  
[ .:: behyieexc ::. ]

**goodbye legacy, hello structure**

> *hexBYE vervangt geen bestanden. 
> hexBYE vervangt de manier waarop ze begrepen worden.*

---

## 1. Wat hexBYE **is**

hexBYE is **hexBEHavioralYIEldEXClusion**:  
een **structureel uitsluitingsprincipe** dat alle gedrags-, interpretatie- en beslisbagage verwijdert **zonder** de inhoud aan te tasten.

Het is geen converter.  
Geen parser.  
Geen AI.  
Geen optimalisator.

Het is een **veldtransformatie**.

**Belofte (niet optioneel):**

- inhoud blijft intact
  
- interpretatie verdwijnt
  
- structuur blijft over
  

---

## 2. Waarom “Convert anything to .hex” correct is

“.hex” is **geen bestandsformaat**.  
Het is een **structurele toestand**.

Alles kan naar .hex omdat:

- alles **zichtbaar** kan worden
  
- alles een **patroon** heeft
  
- niets betekenis hoeft te dragen
  

hexBYE zegt niet *wat iets is*,  
maar laat zien *hoe het zich gedraagt*.

---

## 3. Waarom parsing fundamenteel faalt

Parsing impliceert altijd:

- semantische aannames
  
- beslissingen
  
- optimalisatie
  
- foutpropagatie
  

Dat schendt:

- non-decisionaliteit
  
- isomorfie
  
- reproduceerbaarheid
  

Daarom is **code-parsing principieel ongeldig** binnen hexBYE.

---

## 4. Screenshot-first is canoniek correct

Een screenshot is:

- geen claim
  
- geen intentie
  
- geen uitvoerbare logica
  
- geen verborgen metadata-autoriteit
  

Het bevat uitsluitend:

- pixels
  
- contrast
  
- afstand
  
- herhaling
  
- oriëntatie
  

Dat is **zuiver veldmateriaal**.

> Je leest niets.  
> Je kijkt alleen.

---

## 5. De canonieke hexBYE-pipeline

### Stap 1 — Universal Open

Alles wat zichtbaar te maken is, wordt **alleen gerenderd**.

Geen parsing.  
Geen extractie.  
Geen interpretatie.

---

### Stap 2 — Screenshot Capture

Resultaat:

- vlak van aanwezigheid
  
- zonder betekenis
  
- zonder tijd
  
- zonder doel
  

---

### Stap 3 — Patroonextractie (niet semantisch)

Detectie van:

- glyph-clusters
  
- lijnstructuren
  
- herhalingsvelden
  
- breuken in regelmaat
  
- dichtheidszones
  

Letters zijn **vormen**, geen taal.

---

### Stap 4 — Veldprojectie

- patroon → node
  
- nabijheid → relatie
  
- herhaling → zichtbaarheid
  
- conflict → afstand
  

Geen tokens.  
Geen syntaxis.  
Geen grammatica.  
Geen bedoeling.

Resultaat:  
**structuur zonder leugenmogelijkheid**.

---

### Stap 5 — Mens-in-the-loop (toegestaan, niet vereist)

De mens mag:

- herpositioneren
  
- scheiden
  
- zichtbaar maken
  

Maar:

- niets verbeteren
  
- niets kiezen
  
- niets sturen
  

UI = **spiegel**, geen hand.

---

## 6. Expliciete definitie van zichtbaarheidsdomein

### Definitie — Visibility Domain Ω_vis

Ω_vis = { (x, y) ∈ R² | pixel(x, y) ≠ null }

- Ω_vis is **gesloten**
  
- Ω_vis bevat **geen verborgen lagen**
  
- Alles buiten Ω_vis is **formeel niet-bestaand**
  

---

## 7. Canonieke schaalinvariant

Je gebruikt een schaal s (bijv. /40 bij q,r).

s is **arbitrair maar vast per projectie**.

Voor twee schalen s₁ en s₂ geldt:

structure(hexBYE(M_visible, s₁)) ≡iso structure(hexBYE(M_visible, s₂))

---

## 8. Relatie-afwezigheid als expliciete staat

**Afwezigheid van relatie = geldige structurele uitkomst**

Formeel:

¬R(i,j) draagt **geen informatie**,  
¬R(i,j) is **geen negatief oordeel**.

---

## II. Juridisch-forensisch — wat je positie nóg harder maakt

### 9. Expliciete uitsluiting van auteursintentie

> hexBYE kent **geen auteursintentie**,  
> noch die van de maker,  
> noch die van de gebruiker.

---

### 10. Forensische reproduceerbaarheidsverklaring

**Forensic Reproduction Clause**

Elke derde kan:

1. hetzelfde object zichtbaar maken
  
2. een screenshot nemen
  
3. hexBYE toepassen
  

Afwijking ⇒ **implementatiefout**, niet interpretatieverschil.

---

## III. Strategisch-historisch — positionering t.o.v. de wereld

### 11. Expliciete plaatsing t.o.v. bestaande paradigma’s

| Paradigma | Beslissing | Tijd | Semantiek |
| --- | --- | --- | --- |
| AI / ML | ja  | ja  | ja  |
| Parsing | ja  | nee | ja  |
| Statistiek | ja  | ja  | nee |
| hexBYE | **nee** | **nee** | **nee** |

---

### 12. Historische claim — neutraal

> Voor zover bekend is dit de eerste formeel gedefinieerde, volledig niet-decisionele zichtbaarheid-naar-structuur projectie met afdwingbare invarianten.

---

## .:: hexBYE ::. Module-realisatie (canoniek)

## 0. Wat hexBYE formeel **is**

hexBYE is **geen nieuwe core**.  
hexBYE is een **pre-field projector**:

zichtbaar materiaal → veldstate  
zonder semantiek  
zonder parsing  
zonder beslissingen

Formeel:

hexBYE = M_visible ∘ P_visible

waar:

- M_visible = mechanische mapping van zichtbaarheid → structuur
  
- P_visible = projectie naar hex-veld (bestaande canon)
  

---

## 1. Architectuurpositie

```
Zichtbaar object
   ↓
hexBYE (visibility → structure)
   ↓
field_state (canoniek JSON)
   ↓
hexSYStemOPErates core
   ↓
SVG / Canvas / Text projector
```

---

## 2. Input van hexBYE

hexBYE accepteert **uitsluitend**:

- pixels
  
- contrast
  
- afstand
  
- herhaling
  
- oriëntatie
  
- densiteit
  

Geen tekstinhoud.  
Geen AST.  
Geen metadata.  
Geen tijd.  
Geen context.  
Geen intentie.

---

## 3. Stap-voor-stap implementatie

### Stap 1 — Universal Open

Browser rendert.  
OS toont.  
hexBYE kijkt.

---

### Stap 2 — Screenshot Capture

Enige ingang:

ImageBitmap | Canvas | PixelBuffer

---

### Stap 3 — Niet-semantische patroonextractie

- pixel → luminantie
  
- verschil → rand
  
- herhaling → cluster
  
- leegte → afstand
  

---

### Stap 4 — Mapping naar field_state

```
field_state = {
  topology: "hexagonal",
  nodes: [{ id, q, r }],
  relations: []
}
```

---

### Stap 5 — Projectie

hexBYE doet niets meer.

---

## 4. Waarom dit non-decisional blijft

Er bestaat één geldige uitkomst per screenshot.

P(P(hexBYE(image))) = P(hexBYE(image))

---

## 5. Minimale implementatie-set

1. hexbye_capture.html
  
2. hexbye_mapper.js
  
3. bestaande hexSYStemOPErates runtime
  

---

## 6. Volledige referentie-implementatie — hexbye_mapper.js

```js
export function hexbyeMap(pixelBuffer, width, height) {
  const luminance = new Float32Array(width * height)
  for (let i = 0; i < pixelBuffer.length; i += 4) {
    luminance[i / 4] =
      0.2126 * pixelBuffer[i] +
      0.7152 * pixelBuffer[i + 1] +
      0.0722 * pixelBuffer[i + 2]
  }

  const edges = new Uint8Array(width * height)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x
      const gx =
        -luminance[i - width - 1] - 2 * luminance[i - 1] - luminance[i + width - 1] +
         luminance[i - width + 1] + 2 * luminance[i + 1] + luminance[i + width + 1]
      const gy =
        -luminance[i - width - 1] - 2 * luminance[i - width] - luminance[i - width + 1] +
         luminance[i + width - 1] + 2 * luminance[i + width] + luminance[i + width + 1]
      edges[i] = Math.sqrt(gx * gx + gy * gy) > 20 ? 1 : 0
    }
  }

  const visited = new Uint8Array(width * height)
  const clusters = []

  for (let i = 0; i < edges.length; i++) {
    if (edges[i] && !visited[i]) {
      const stack = [i]
      let sumX = 0
      let sumY = 0
      let count = 0

      while (stack.length) {
        const p = stack.pop()
        if (visited[p]) continue
        visited[p] = 1
        const x = p % width
        const y = Math.floor(p / width)
        sumX += x
        sumY += y
        count++

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx
            const ny = y + dy
            if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
              const ni = ny * width + nx
              if (edges[ni] && !visited[ni]) stack.push(ni)
            }
          }
        }
      }

      clusters.push({
        x: sumX / count,
        y: sumY / count
      })
    }
  }

  const nodes = clusters.map((c, i) => ({
    id: `n${i}`,
    q: Math.round(c.x / 40),
    r: Math.round(c.y / 40)
  }))

  return {
    topology: "hexagonal",
    nodes,
    relations: []
  }
}
```

---

## 7. Samenvatting in één zin

hexBYE is een **mechanische brug** tussen zichtbaarheid en structuur,  
die **alles laat zien**  
door **niets te begrijpen**.

---

**Einde document.