from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class TelemetryReadingSchema(BaseModel):
    sensor_id: str
    location_name: str
    latitude: float
    longitude: float
    pore_water_pressure_kpa: float
    soil_moisture_pct: float
    inclinometer_displacement_mm: float
    rainfall_24h_mm: float
    timestamp: Optional[datetime] = None

class SensorOverview(BaseModel):
    active_nodes: int
    critical_nodes: int
    warning_nodes: int
    nominal_nodes: int
    last_updated: datetime
    readings: List[TelemetryReadingSchema]
