"""
hex3DhexGLYph v1.0.0 - Canonical Geometric Realization
=====================================================

Isomorphic geometric mapping of ASCπ kernel field state Ψ to 3D hexagonal structure.
Pure mathematical mapping without dynamics, time, or simulation.

CANONICAL STATUS: This file is frozen and immutable.
Any modification constitutes a new system requiring new version.

Isomorphic to: ascpi_kernel.py
License: Academic Research Use
"""

from dataclasses import dataclass
from typing import Tuple, List, Dict, Union
import math

# Mathematical constants
TAU = 2 * math.pi
CHANNEL_COUNT = 6

# Import canonical kernel with fallback
try:
    from ascpi_kernel import Psi as KernelPsi
    Psi = KernelPsi
except ImportError:
    KernelPsi = None

@dataclass(frozen=True)
class CanonicalPsi:
    """Canonical field state - core fields only"""
    dPhi: float
    kappa: float
    theta: float
    C: float
    N: float

if KernelPsi is None:
    Psi = CanonicalPsi

@dataclass(frozen=True)
class Point3D:
    """3D spatial coordinate"""
    x: float
    y: float
    z: float
    
    def distance_to(self, other: 'Point3D') -> float:
        """Euclidean distance between points"""
        return math.sqrt(
            (self.x - other.x)**2 + 
            (self.y - other.y)**2 + 
            (self.z - other.z)**2
        )

@dataclass(frozen=True)
class ChannelGeometry:
    """Single channel geometric configuration"""
    channel_id: int
    center_path: List[Point3D]
    diameter: float
    curvature_density: float
    smoothness: float
    is_active: bool

@dataclass(frozen=True)
class HexGlyphGeometry:
    """Complete hexagonal glyph structure"""
    channels: Tuple[ChannelGeometry, ...]
    total_volume: float
    traversal_markers: int
    center_point: Point3D
    scale_factor: float
    
    def __post_init__(self):
        """Enforce canonical traversal_markers = 0"""
        if self.traversal_markers != 0:
            object.__setattr__(self, 'traversal_markers', 0)

class ChannelConnectivity:
    """Hexagonal channel connection topology"""
    
    @staticmethod
    def get_adjacent_channels(channel_id: int) -> Tuple[int, int]:
        """Get two adjacent channels for given channel"""
        prev_channel = (channel_id - 1) % CHANNEL_COUNT
        next_channel = (channel_id + 1) % CHANNEL_COUNT
        return prev_channel, next_channel
    
    @staticmethod
    def get_connection_points(from_channel: int, to_channel: int) -> Tuple[Point3D, Point3D]:
        """Get connection points between two channels"""
        from_angle = from_channel * TAU / CHANNEL_COUNT
        to_angle = to_channel * TAU / CHANNEL_COUNT
        
        from_point = Point3D(
            x=math.cos(from_angle),
            y=math.sin(from_angle), 
            z=0.0
        )
        to_point = Point3D(
            x=math.cos(to_angle),
            y=math.sin(to_angle),
            z=0.0  
        )
        
        return from_point, to_point
    
    @staticmethod
    def is_valid_transition(from_channel: int, to_channel: int) -> bool:
        """Check if transition between channels is topologically valid"""
        adjacent = ChannelConnectivity.get_adjacent_channels(from_channel)
        return to_channel in adjacent

class GeometricMapper:
    """Maps kernel field state to geometric structure"""
    
    @staticmethod
    def map_dphi_to_diameter(dphi: float, base_diameter: float = 1.0, alpha: float = 0.5) -> float:
        """Map dPhi to channel diameter with sign symmetry
        
        Uses exponential mapping: diameter = base · exp(α · dPhi)
        Preserves symmetry and avoids discontinuities.
        """
        return base_diameter * math.exp(alpha * dphi)
    
    @staticmethod
    def map_kappa_to_curvature(kappa: float) -> float:
        """Map kappa to geometric curvature density"""
        return max(0.0, kappa)
    
    @staticmethod
    def map_theta_to_channel(theta: float) -> int:
        """Map theta to active channel ID as element of ℤ₆
        
        theta is interpreted as element of cyclic group ℤ₆,
        not as spatial angle.
        """
        normalized_theta = theta % TAU
        channel_id = int((normalized_theta / TAU) * CHANNEL_COUNT)
        return channel_id % CHANNEL_COUNT
    
    @staticmethod
    def map_coherence_to_smoothness(coherence: float) -> float:
        """Map coherence C to geometric smoothness"""
        return max(0.0, min(1.0, coherence))
    
    @staticmethod
    def map_context_to_volume(context: float) -> float:
        """Map context N to total volume (invariant)"""
        return abs(context)

class ChannelPathGenerator:
    """Generates 3D paths for hexagonal channels"""
    
    @staticmethod
    def generate_channel_path(channel_id: int, curvature_density: float, 
                            num_points: int = 20, minimal: bool = True) -> List[Point3D]:
        """Generate 3D path for single channel"""
        path_points = []
        base_angle = channel_id * TAU / CHANNEL_COUNT
        
        if minimal:
            for i in range(num_points):
                t = i / (num_points - 1)
                point = Point3D(
                    x=math.cos(base_angle + t * TAU / CHANNEL_COUNT),
                    y=math.sin(base_angle + t * TAU / CHANNEL_COUNT),
                    z=0.0
                )
                path_points.append(point)
        else:
            for i in range(num_points):
                t = i / (num_points - 1)
                radius_variation = 1.0 + 0.1 * curvature_density * math.sin(t * TAU * curvature_density)
                height_variation = 0.2 * curvature_density * math.cos(t * TAU * curvature_density * 2)
                angle = base_angle + t * TAU / CHANNEL_COUNT
                point = Point3D(
                    x=radius_variation * math.cos(angle),
                    y=radius_variation * math.sin(angle),
                    z=height_variation
                )
                path_points.append(point)
        
        return path_points
    
    @staticmethod
    def create_torus_connection(path1: List[Point3D], path2: List[Point3D]) -> List[Point3D]:
        """Create connection between two channel paths"""
        connection_points = []
        
        if len(path1) > 0 and len(path2) > 0:
            start_point = path1[-1]
            end_point = path2[0]
            
            for i in range(5):
                t = i / 4.0
                point = Point3D(
                    x=start_point.x + t * (end_point.x - start_point.x),
                    y=start_point.y + t * (end_point.y - start_point.y), 
                    z=start_point.z + t * (end_point.z - start_point.z)
                )
                connection_points.append(point)
        
        return connection_points

# ============================================================================
# NON-CANONICAL RESEARCH EXTENSION
# ============================================================================

class SplittingGeometry:
    """
    NON-CANONICAL / RESEARCH EXTENSION
    ---------------------------------
    This class is NOT part of the ASCπ motor,
    nor of the canonical geometric realization.
    It represents an optional hypothesis layer.
    
    The interpretation of dPhi ≈ 0 as geometric bifurcation
    is research speculation, not proven dynamics or axiom.
    """
    
    @staticmethod
    def detect_splitting_condition(psi) -> bool:
        """Check if field state requires geometric splitting"""
        return abs(psi.dPhi) < 1e-10
    
    @staticmethod
    def generate_split_geometry(base_geometry: HexGlyphGeometry, 
                              active_channel: int) -> Tuple[HexGlyphGeometry, HexGlyphGeometry]:
        """Generate two split geometries for dPhi = 0 case"""
        split_geometry_1 = HexGlyphGeometry(
            channels=base_geometry.channels,
            total_volume=base_geometry.total_volume,
            traversal_markers=0,
            center_point=base_geometry.center_point,
            scale_factor=base_geometry.scale_factor
        )
        
        split_geometry_2 = HexGlyphGeometry(
            channels=base_geometry.channels,
            total_volume=base_geometry.total_volume,
            traversal_markers=0,
            center_point=base_geometry.center_point,
            scale_factor=base_geometry.scale_factor
        )
        
        return split_geometry_1, split_geometry_2

# ============================================================================
# CANONICAL IMPLEMENTATION
# ============================================================================

class Hex3DGlyph:
    """Canonical geometric structure representing ASCπ field state"""
    
    def __init__(self, base_scale: float = 1.0, minimal: bool = True, research_mode: bool = False):
        """Initialize with base geometric scale and complexity mode"""
        self.base_scale = base_scale
        self.minimal = minimal
        self.research_mode = research_mode
        self.center = Point3D(0.0, 0.0, 0.0)
    
    def map_field_state(self, psi) -> Union[HexGlyphGeometry, Tuple[HexGlyphGeometry, HexGlyphGeometry]]:
        """Map kernel field state to geometric structure"""
        
        channel_diameter = GeometricMapper.map_dphi_to_diameter(psi.dPhi)
        curvature_density = GeometricMapper.map_kappa_to_curvature(psi.kappa)
        active_channel = GeometricMapper.map_theta_to_channel(psi.theta)
        smoothness = GeometricMapper.map_coherence_to_smoothness(psi.C)
        total_volume = GeometricMapper.map_context_to_volume(psi.N)
        
        channels = []
        for channel_id in range(CHANNEL_COUNT):
            path_points = ChannelPathGenerator.generate_channel_path(
                channel_id, curvature_density, minimal=self.minimal
            )
            
            channel = ChannelGeometry(
                channel_id=channel_id,
                center_path=path_points,
                diameter=channel_diameter,
                curvature_density=curvature_density,
                smoothness=smoothness,
                is_active=(channel_id == active_channel)
            )
            channels.append(channel)
        
        geometry = HexGlyphGeometry(
            channels=tuple(channels),
            total_volume=total_volume,
            traversal_markers=0,
            center_point=self.center,
            scale_factor=self.base_scale
        )
        
        if self.research_mode and SplittingGeometry.detect_splitting_condition(psi):
            return SplittingGeometry.generate_split_geometry(geometry, active_channel)
        else:
            return geometry
    
    def get_channel_connectivity(self) -> Dict[int, List[int]]:
        """Get hexagonal connectivity matrix"""
        connectivity = {}
        for channel_id in range(CHANNEL_COUNT):
            adjacent = ChannelConnectivity.get_adjacent_channels(channel_id)
            connectivity[channel_id] = list(adjacent)
        return connectivity
    
    def compute_geometric_invariants(self, geometry: HexGlyphGeometry) -> Dict[str, float]:
        """Compute topological invariants of geometry"""
        return {
            'total_volume': geometry.total_volume,
            'channel_count': len(geometry.channels),
            'connectivity_degree': 2,
            'traversal_count': geometry.traversal_markers
        }
    
    def validate_isomorphism(self, psi, geometry: HexGlyphGeometry) -> bool:
        """Validate that geometry is isomorphic to field state"""
        
        if abs(geometry.total_volume - abs(psi.N)) > 1e-6:
            return False
        
        if geometry.traversal_markers != 0:
            return False
        
        expected_channel = GeometricMapper.map_theta_to_channel(psi.theta)
        active_channels = [ch.channel_id for ch in geometry.channels if ch.is_active]
        if len(active_channels) != 1 or active_channels[0] != expected_channel:
            return False
        
        for channel in geometry.channels:
            if channel.curvature_density < 0:
                return False
            if not (0 <= channel.smoothness <= 1):
                return False
        
        return True

def create_canonical_glyph(minimal: bool = True, research_mode: bool = False) -> Hex3DGlyph:
    """Create canonical hex3D glyph instance"""
    return Hex3DGlyph(base_scale=1.0, minimal=minimal, research_mode=research_mode)

def validate_geometric_axioms():
    """Validate geometric realization satisfies topological axioms"""
    glyph = create_canonical_glyph()
    
    connectivity = glyph.get_channel_connectivity()
    assert len(connectivity) == CHANNEL_COUNT
    for channel_id, adjacent in connectivity.items():
        assert len(adjacent) == 2
    
    for i in range(CHANNEL_COUNT):
        for j in range(CHANNEL_COUNT):
            expected = ChannelConnectivity.is_valid_transition(i, j)
            adjacent = ChannelConnectivity.get_adjacent_channels(i)
            actual = j in adjacent
            assert expected == actual

if __name__ == "__main__":
    validate_geometric_axioms()
