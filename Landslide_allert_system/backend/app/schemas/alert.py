from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class AlertSchema(BaseModel):
    id: Optional[int] = None
    alert_code: str
    territory_id: str = "sikkim"
    title: str
    level: str
    sector: str
    coordinates_lat: float
    coordinates_lng: float
    timestamp: datetime
    message: str
    acknowledged: bool = False

class SOSRequest(BaseModel):
    user_name: str = "Tactical Command User"
    contact_phone: Optional[str] = None
    latitude: float
    longitude: float
    risk_level: str = "CRITICAL"
    risk_score: float = 85.0
    notes: Optional[str] = "Emergency evacuation request initialized from portal."

class SOSResponse(BaseModel):
    sos_id: int
    status: str
    timestamp: datetime
    assigned_shelter: Optional[dict] = None
    message: str
