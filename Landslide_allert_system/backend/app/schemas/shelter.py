from typing import List, Optional
from pydantic import BaseModel, Field

class ShelterRecommendationRequest(BaseModel):
    latitude: float = Field(26.1900, description="User latitude")
    longitude: float = Field(91.7500, description="User longitude")
    max_shelters: Optional[int] = Field(5, description="Number of recommended shelters to return")

class ShelterDetail(BaseModel):
    name: str
    latitude: float
    longitude: float
    capacity: int
    distance_km: float
    nearby_risk_score: float
    safety_score: float
    elevation_m: Optional[float] = 1250.0
    status: str = "AVAILABLE"

class ShelterRecommendationResponse(BaseModel):
    user_latitude: float
    user_longitude: float
    total_found: int
    recommended_shelter: Optional[ShelterDetail] = None
    all_shelters: List[ShelterDetail]
