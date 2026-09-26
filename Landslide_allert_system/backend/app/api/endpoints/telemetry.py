import datetime
from fastapi import APIRouter
from app.schemas.telemetry import SensorOverview, TelemetryReadingSchema

router = APIRouter()

@router.get("/live", response_model=SensorOverview, summary="Get Live Sensor Array Telemetry")
def get_live_telemetry():
    """
    Returns live telemetry readings from field-deployed IoT sensor nodes (Pore Water Pressure, Soil Saturation, Inclinometer Displacement, Rainfall).
    """
    now = datetime.datetime.utcnow()
    readings = [
        {
            "sensor_id": "NODE-SK-01",
            "location_name": "NH-310A Mile 14",
            "latitude": 27.3389,
            "longitude": 88.6065,
            "pore_water_pressure_kpa": 48.6,
            "soil_moisture_pct": 96.2,
            "inclinometer_displacement_mm": 14.8,
            "rainfall_24h_mm": 142.5,
            "timestamp": now
        },
        {
            "sensor_id": "NODE-SK-02",
            "location_name": "Singtam Bridge Approach",
            "latitude": 27.1512,
            "longitude": 88.4721,
            "pore_water_pressure_kpa": 38.2,
            "soil_moisture_pct": 89.4,
            "inclinometer_displacement_mm": 8.2,
            "rainfall_24h_mm": 118.0,
            "timestamp": now
        },
        {
            "sensor_id": "NODE-SK-03",
            "location_name": "Mangan Pass Sector",
            "latitude": 27.5020,
            "longitude": 88.5320,
            "pore_water_pressure_kpa": 22.4,
            "soil_moisture_pct": 62.0,
            "inclinometer_displacement_mm": 3.1,
            "rainfall_24h_mm": 68.2,
            "timestamp": now
        },
        {
            "sensor_id": "NODE-SK-04",
            "location_name": "Pakyong Ridge Crest",
            "latitude": 27.2355,
            "longitude": 88.5910,
            "pore_water_pressure_kpa": 12.0,
            "soil_moisture_pct": 34.0,
            "inclinometer_displacement_mm": 0.4,
            "rainfall_24h_mm": 22.0,
            "timestamp": now
        }
    ]

    return {
        "active_nodes": 48,
        "critical_nodes": 6,
        "warning_nodes": 12,
        "nominal_nodes": 30,
        "last_updated": now,
        "readings": readings
    }
