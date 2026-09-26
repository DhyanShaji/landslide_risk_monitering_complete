from typing import List, Optional
from pydantic import BaseModel, Field

class RiskPredictionRequest(BaseModel):
    latitude: Optional[float] = Field(26.1900, description="Latitude coordinate")
    longitude: Optional[float] = Field(91.7500, description="Longitude coordinate")
    elevation: float = Field(..., description="Elevation in meters", example=1250.0)
    slope: float = Field(..., description="Slope angle in degrees", example=38.5)
    rainfall_2023: float = Field(..., description="Cumulative 24h rainfall in mm", example=145.0)

class RiskPredictionResponse(BaseModel):
    latitude: float
    longitude: float
    elevation: float
    slope: float
    rainfall_2023: float
    risk_score: float
    risk_level: str  # Low, Moderate, High, Critical
    risk_tier: str   # Tier 1, Tier 2, Tier 3, Tier 4
    probability: float
    recommended_actions: List[str]

class LocationRiskPin(BaseModel):
    id: str
    name: str
    sector: str
    coordinates: dict
    tier: str
    riskPercent: float
    precipitation24h: float
    soilSaturation: float
    slopeAngle: float
    historicalScars: int
    lithology: str
    nearestShelter: dict
    type: str

class ShapFactor(BaseModel):
    id: str
    name: str
    icon: str
    sourceBadge: str
    sourceType: str
    weightDelta: str
    weightDeltaNum: float
    valueDisplay: str
    weightSeverity: str
    progressPercent: float
    thresholdNote: str
    subNote: str
