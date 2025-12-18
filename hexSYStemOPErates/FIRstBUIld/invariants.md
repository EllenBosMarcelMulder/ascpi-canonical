# hexSYStemOPErates - Invarianten (WET)

## I₁: Geen Optimalisatie
∀ transformatie T op H: T(H) = H of T(H) = ∅

**Verboden:**
- if/else met optimalisatiedoel
- score/priority berekeningen
- "beter maken" logica

## I₂: Geen Tijdsautoriteit
P(H,t₁) ≡ P(H,t₂)

**Verboden:**
- Date.now() voor logica
- performance timers als autoriteit
- tijdsdelta berekeningen voor beslissingen

## I₃: Crossed-Link Neutraliteit
Overgang: externe trigger ⟷ available
Geen interne functie: f_internal: available → active ≡ ∅

**Verboden:**
- automatische activatie
- interne triggers
- callbacks met state-mutatie

## P1: Non-decisional
Geen operatie die, gegeven meerdere structureel geldige toestanden, één toestand selecteert op basis van een criterium.

## P2: Geen Optimalisatie
Geen gradaties van "beter/slechter".

## P3: Geen Tijdsautoriteit
Tijd alleen voor herhaling, niet voor logica.

## P4: Idempotentie
P(P(H)) = P(H)

## P5: Crossed-link Neutraliteit
Externe activatie alleen.

## P6: Structurele Correspondentie
Math ≡ Code isomorfie.

**SCHENDING = ONGELDIG**
**GEEN GRADATIES. GEEN HERSTEL.**