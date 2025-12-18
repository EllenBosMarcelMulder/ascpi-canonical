# hexSYStemOPErates - Core Definitions

## Axiaal → Cartesiaans Transformatie
```
x = s · (3/2 · q)
y = s · (√3 · (r + q/2))
```

## Hexafstand
```
d(n₁, n₂) = (|q₁ − q₂| + |q₁ + r₁ − q₂ − r₂| + |r₁ − r₂|) / 2
```

## Relatie
```
R[i,j] = 1 ⇔ d ≤ d_max
```

## Zichtbaarheid
```
V(d) = exp(−α · d)

Discrete projectie:
d < 40 → high
40 ≤ d < 80 → mid  
d ≥ 80 → low
```

## Projectie
```
P(H) = {(nᵢ, nⱼ, V(d))}
```

## Idempotentie
```
P(P(H)) = P(H)
```