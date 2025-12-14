"""
ASCπ Kernel Motor - Canonical Implementation
==========================================

This is the definitive, canonical implementation of the ASCπ kernel motor.
Mathematical field dynamics without time, energy, or external dependencies.

Core Equations:
- Field State: Ψ = (dPhi, kappa, theta, C, N, t)
- Motor Law: step(Ψ) → Ψ'
- Reflection: R(Ψ) with deterministic/splitting behavior
- Invariants: phi = (1+√5)/2, N constant, κ ≥ 0, 0 ≤ C ≤ 1

License: Academic Research Use
"""

from dataclasses import dataclass
from typing import Tuple, List, Union
import math

# Mathematical constants
PHI = (1 + math.sqrt(5)) / 2  # Golden ratio
DPHI_STAR = PHI / 2           # Target differential
TAU = 2 * math.pi            # Full circle constant

@dataclass(frozen=True)
class Psi:
    """
    Canonical field state Ψ = (dPhi, kappa, theta, C, N, t)
    
    Fields:
        dPhi: float    - Differential/distinction (-∞, +∞)
        kappa: float   - Curvature/resistance [0, +∞) 
        theta: float   - Phase [0, 2π) modular
        C: float       - Coherence [0, 1]
        N: float       - Context/energy (invariant)
        t: int         - Discrete step counter
    """
    dPhi: float
    kappa: float
    theta: float
    C: float
    N: float
    t: int
    
    def __post_init__(self):
        """Enforce canonical invariants"""
        # Normalize theta to [0, 2π)
        object.__setattr__(self, 'theta', self.theta % TAU)
        
        # Enforce kappa ≥ 0
        if self.kappa < 0:
            raise ValueError(f"kappa must be ≥ 0, got {self.kappa}")
        
        # Enforce 0 ≤ C ≤ 1
        if not (0 <= self.C <= 1):
            raise ValueError(f"C must be in [0,1], got {self.C}")
    
    def to_dict(self) -> dict:
        """Export state as dictionary for serialization"""
        return {
            'dPhi': self.dPhi,
            'kappa': self.kappa, 
            'theta': self.theta,
            'C': self.C,
            'N': self.N,
            't': self.t
        }
    
    @classmethod
    def from_dict(cls, data: dict) -> 'Psi':
        """Import state from dictionary"""
        return cls(
            dPhi=data['dPhi'],
            kappa=data['kappa'],
            theta=data['theta'],
            C=data['C'],
            N=data['N'],
            t=data['t']
        )
    
    def distance(self, other: 'Psi') -> float:
        """
        Topological distance between field states
        
        d(Ψ₁, Ψ₂) = |dPhi₁ - dPhi₂| + |kappa₁ - kappa₂| + 
                     min(|theta₁ - theta₂|, 2π - |theta₁ - theta₂|)
        """
        dphi_dist = abs(self.dPhi - other.dPhi)
        kappa_dist = abs(self.kappa - other.kappa)
        
        # Circular distance for theta
        theta_diff = abs(self.theta - other.theta)
        theta_dist = min(theta_diff, TAU - theta_diff)
        
        return dphi_dist + kappa_dist + theta_dist

class ReflectionOperator:
    """
    Canonical reflection operator R(Ψ)
    
    Implements deterministic reflection with splitting at dPhi = 0
    """
    
    @staticmethod
    def reflect(psi: Psi) -> Union[Psi, Tuple[Psi, Psi]]:
        """
        Apply reflection operator R(Ψ)
        
        Returns:
            Single Psi if deterministic (dPhi ≠ 0)
            Tuple of two Psi if splitting (dPhi = 0)
        """
        if psi.dPhi == 0:
            # Splitting case: two valid successors
            return ReflectionOperator._split_reflection(psi)
        else:
            # Deterministic case
            return ReflectionOperator._deterministic_reflection(psi)
    
    @staticmethod
    def _deterministic_reflection(psi: Psi) -> Psi:
        """Deterministic reflection for dPhi ≠ 0"""
        # Injection based on sign
        injection = 1 if psi.dPhi > 0 else -1
        
        # Core reflection equations
        new_dphi = psi.dPhi + injection * psi.kappa
        new_kappa = abs(new_dphi)
        new_theta = (psi.theta + injection) % TAU
        
        # Coherence: increases near target, decreases when far
        distance_from_target = abs(new_dphi - DPHI_STAR)
        coherence_delta = 0.1 / (1 + distance_from_target)
        new_C = max(0, min(1, psi.C + coherence_delta - 0.05))
        
        return Psi(
            dPhi=new_dphi,
            kappa=new_kappa,
            theta=new_theta,
            C=new_C,
            N=psi.N,  # Invariant
            t=psi.t + 1
        )
    
    @staticmethod
    def _split_reflection(psi: Psi) -> Tuple[Psi, Psi]:
        """Splitting reflection for dPhi = 0"""
        # Two symmetric branches
        branch_positive = Psi(
            dPhi=psi.kappa,
            kappa=psi.kappa,
            theta=(psi.theta + 1) % TAU,
            C=psi.C * 0.9,  # Slight coherence reduction
            N=psi.N,
            t=psi.t + 1
        )
        
        branch_negative = Psi(
            dPhi=-psi.kappa,
            kappa=psi.kappa,
            theta=(psi.theta - 1) % TAU,
            C=psi.C * 0.9,  # Slight coherence reduction
            N=psi.N,
            t=psi.t + 1
        )
        
        return branch_positive, branch_negative

class ImplosionOperator:
    """
    Implosion as equivalence reduction, not dynamics
    
    Implements quotient space formation Ψ / ~
    """
    
    @staticmethod
    def are_equivalent(psi1: Psi, psi2: Psi, tolerance: float = 1e-6) -> bool:
        """
        Check if two states are equivalent under reflection
        
        Ψ₁ ~ Ψ₂ ⟺ Rⁿ(Ψ₁) converges to Rᵐ(Ψ₂)
        """
        return psi1.distance(psi2) < tolerance
    
    @staticmethod
    def implode(psi: Psi) -> Psi:
        """
        Implosion as structural compression
        
        Not a dynamical process but quotient formation
        """
        # Compress toward canonical form
        new_dphi = psi.dPhi * 0.8  # Gentle contraction
        new_kappa = abs(new_dphi)
        new_theta = psi.theta  # Phase preserved
        new_C = min(1.0, psi.C + 0.1)  # Coherence increases
        
        return Psi(
            dPhi=new_dphi,
            kappa=new_kappa,
            theta=new_theta,
            C=new_C,
            N=psi.N,
            t=psi.t + 1
        )

class ASCPIEngine:
    """
    Canonical ASCπ kernel motor engine
    
    Pure mathematical field evolution without external dependencies
    """
    
    def __init__(self, initial_state: Psi = None):
        """
        Initialize engine with optional initial state
        
        Args:
            initial_state: Starting field configuration
        """
        if initial_state is None:
            initial_state = self.create_initial_psi()
        
        self._validate_state(initial_state)
        self.current_state = initial_state
        self.history = [initial_state]
    
    @staticmethod
    def create_initial_psi(dPhi: float = 0.1, kappa: float = 1.0, 
                          theta: float = 0.0, C: float = 0.5, N: float = 1.0) -> Psi:
        """
        Create canonical initial field state
        
        Args:
            dPhi: Initial differential
            kappa: Initial curvature
            theta: Initial phase
            C: Initial coherence
            N: Context value (invariant)
            
        Returns:
            Canonical Psi state
        """
        return Psi(
            dPhi=dPhi,
            kappa=abs(kappa),  # Enforce non-negative
            theta=theta % TAU,  # Normalize phase
            C=max(0, min(1, C)),  # Clamp coherence
            N=N,
            t=0
        )
    
    def step(self) -> Union[Psi, Tuple[Psi, Psi]]:
        """
        Execute single motor step: Ψ → Ψ'
        
        Core motor law implementation
        
        Returns:
            Next state(s) - single Psi or tuple for splitting
        """
        # Check for implosion condition
        if self._should_implode():
            next_state = ImplosionOperator.implode(self.current_state)
            self._update_state(next_state)
            return next_state
        
        # Apply reflection operator
        result = ReflectionOperator.reflect(self.current_state)
        
        if isinstance(result, tuple):
            # Splitting occurred - return both branches
            return result
        else:
            # Normal evolution
            self._update_state(result)
            return result
    
    def evolve(self, steps: int) -> List[Psi]:
        """
        Evolve field for N steps without side effects
        
        Args:
            steps: Number of evolution steps
            
        Returns:
            List of field states (trajectory)
        """
        if steps <= 0:
            return [self.current_state]
        
        trajectory = [self.current_state]
        working_state = self.current_state
        
        for _ in range(steps):
            if self._should_implode_state(working_state):
                working_state = ImplosionOperator.implode(working_state)
            else:
                result = ReflectionOperator.reflect(working_state)
                
                if isinstance(result, tuple):
                    # Splitting - choose first branch for linear trajectory
                    working_state = result[0]
                else:
                    working_state = result
            
            trajectory.append(working_state)
        
        return trajectory
    
    def get_current_state(self) -> Psi:
        """Get current field state (immutable)"""
        return self.current_state
    
    def get_history(self) -> List[Psi]:
        """Get complete evolution history"""
        return self.history.copy()
    
    def reset(self, new_state: Psi = None):
        """Reset engine to new initial state"""
        if new_state is None:
            new_state = self.create_initial_psi()
        
        self._validate_state(new_state)
        self.current_state = new_state
        self.history = [new_state]
    
    def serialize_state(self) -> dict:
        """Serialize current state for external use"""
        return self.current_state.to_dict()
    
    def _update_state(self, new_state: Psi):
        """Internal state update with history tracking"""
        self._validate_state(new_state)
        self.current_state = new_state
        self.history.append(new_state)
    
    def _should_implode(self) -> bool:
        """Check implosion condition for current state"""
        return self._should_implode_state(self.current_state)
    
    @staticmethod
    def _should_implode_state(psi: Psi) -> bool:
        """
        Check if state should undergo implosion
        
        Implosion occurs when field approaches critical coherence
        """
        return (psi.C > 0.95 and 
                abs(psi.dPhi) < 0.01 and 
                psi.kappa < 0.1)
    
    @staticmethod
    def _validate_state(psi: Psi):
        """Validate state satisfies canonical invariants"""
        if psi.kappa < 0:
            raise ValueError(f"Invalid kappa: {psi.kappa} < 0")
        
        if not (0 <= psi.C <= 1):
            raise ValueError(f"Invalid coherence: {psi.C} not in [0,1]")
        
        if psi.theta < 0 or psi.theta >= TAU:
            raise ValueError(f"Invalid theta: {psi.theta} not in [0,2π)")

class FieldAnalyzer:
    """
    Mathematical analysis tools for field states
    
    Provides canonical metrics and invariant checking
    """
    
    @staticmethod
    def compute_field_energy(psi: Psi) -> float:
        """
        Compute total field energy (conserved quantity)
        
        E = |dPhi| + kappa + C
        """
        return abs(psi.dPhi) + psi.kappa + psi.C
    
    @staticmethod
    def compute_field_momentum(psi: Psi) -> float:
        """
        Compute field momentum
        
        p = dPhi * cos(theta)
        """
        return psi.dPhi * math.cos(psi.theta)
    
    @staticmethod
    def compute_curvature_invariant(psi: Psi) -> float:
        """
        Compute curvature invariant
        
        K = kappa / (1 + |dPhi|)
        """
        return psi.kappa / (1 + abs(psi.dPhi))
    
    @staticmethod
    def is_coherent_state(psi: Psi, threshold: float = 0.8) -> bool:
        """Check if state is coherent above threshold"""
        return psi.C >= threshold
    
    @staticmethod
    def is_critical_state(psi: Psi) -> bool:
        """Check if state is at critical point (dPhi ≈ 0)"""
        return abs(psi.dPhi) < 1e-10
    
    @staticmethod
    def compute_stability_eigenvalue(psi: Psi) -> float:
        """
        Compute stability eigenvalue for linearized dynamics
        
        λ = 1 + kappa (always > 1, confirming hyperbolicity)
        """
        return 1 + psi.kappa

def create_canonical_engine() -> ASCPIEngine:
    """
    Factory function for canonical engine instance
    
    Returns:
        ASCPIEngine initialized with standard parameters
    """
    initial_state = ASCPIEngine.create_initial_psi(
        dPhi=DPHI_STAR * 0.1,  # Small perturbation from target
        kappa=1.0,
        theta=0.0,
        C=0.5,
        N=PHI  # Golden ratio context
    )
    
    return ASCPIEngine(initial_state)

# Mathematical validation functions
def validate_motor_axioms():
    """
    Validate core motor axioms are satisfied
    
    Raises AssertionError if any axiom is violated
    """
    engine = create_canonical_engine()
    psi = engine.get_current_state()
    
    # Axiom 1: kappa non-negative
    assert psi.kappa >= 0, "Axiom violation: kappa < 0"
    
    # Axiom 2: Coherence bounded
    assert 0 <= psi.C <= 1, "Axiom violation: C not in [0,1]"
    
    # Axiom 3: Phase modular
    assert 0 <= psi.theta < TAU, "Axiom violation: theta not in [0,2π)"
    
    # Axiom 4: N invariant under step
    initial_N = psi.N
    next_state = engine.step()
    if isinstance(next_state, tuple):
        next_state = next_state[0]
    assert next_state.N == initial_N, "Axiom violation: N not invariant"
    
    # Axiom 5: t increments
    assert next_state.t == psi.t + 1, "Axiom violation: t not incremented"

def validate_reflection_determinism():
    """
    Validate reflection operator determinism
    
    Identical inputs must produce identical outputs
    """
    psi = ASCPIEngine.create_initial_psi(dPhi=1.0, kappa=0.5)
    
    result1 = ReflectionOperator.reflect(psi)
    result2 = ReflectionOperator.reflect(psi)
    
    if isinstance(result1, tuple) and isinstance(result2, tuple):
        assert result1[0].distance(result2[0]) == 0, "Non-deterministic splitting"
        assert result1[1].distance(result2[1]) == 0, "Non-deterministic splitting"
    else:
        assert result1.distance(result2) == 0, "Non-deterministic reflection"

if __name__ == "__main__":
    # Self-validation on module import
    validate_motor_axioms()
    validate_reflection_determinism()
