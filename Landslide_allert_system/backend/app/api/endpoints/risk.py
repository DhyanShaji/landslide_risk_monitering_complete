from typing import List, Optional
from fastapi import APIRouter, HTTPException, Query
from app.schemas.risk import RiskPredictionRequest, RiskPredictionResponse, LocationRiskPin, ShapFactor
from app.services.ml_service import ml_service

router = APIRouter()

@router.post("/predict", response_model=RiskPredictionResponse, summary="Predict Landslide Risk Score using ML Model")
def predict_risk(request: RiskPredictionRequest):
    """
    Run live Random Forest machine learning inference based on elevation, slope angle, and 24h cumulative rainfall.
    """
    try:
        result = ml_service.predict_risk(
            elevation=request.elevation,
            slope=request.slope,
            rainfall_2023=request.rainfall_2023,
            latitude=request.latitude or 26.19,
            longitude=request.longitude or 91.75
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ML Prediction Error: {str(e)}")

@router.get("/map-locations", response_model=List[LocationRiskPin], summary="Get Map Pins for Monitoring Dashboard")
def get_map_locations(territory: Optional[str] = Query("sikkim", description="Territory ID filter")):
    """
    Retrieve spatial monitoring locations, risk tiers, soil saturation, slope angles, and nearest evacuation shelters.
    """
    locations = [
        {
            "id": "PIN-SK-01",
            "name": "North Sikkim Highway (NH-310A)",
            "sector": "Sector 3 - High Shear Zone",
            "coordinates": {"lat": 27.3389, "lng": 88.6065},
            "tier": "Tier 1",
            "riskPercent": 94,
            "precipitation24h": 142.5,
            "soilSaturation": 96.2,
            "slopeAngle": 42.0,
            "historicalScars": 7,
            "lithology": "Weathered Schist & Gneiss",
            "nearestShelter": {
                "name": "Gangtok Community Relief Hub Alpha",
                "distance": "1.2 km",
                "duration": "18 mins foot / 4 mins vehicle",
                "route": "Secondary Ridgeline Road (Avoid Corridor B)",
                "elevation": 1650,
                "capacity": 1200,
                "available": 840
            },
            "screenPosition": {"top": "32%", "left": "58%"},
            "type": "emergency"
        },
        {
            "id": "PIN-SK-02",
            "name": "Singtam Basin Corridor",
            "sector": "Sector 1 - Riverbank Slope",
            "coordinates": {"lat": 27.1512, "lng": 88.4721},
            "tier": "Tier 2",
            "riskPercent": 78,
            "precipitation24h": 118.0,
            "soilSaturation": 89.4,
            "slopeAngle": 36.5,
            "historicalScars": 4,
            "lithology": "Unconsolidated Colluvium",
            "nearestShelter": {
                "name": "Namchi Safe Haven Sector 4",
                "distance": "3.4 km",
                "duration": "42 mins foot",
                "route": "West Ridge Byway",
                "elevation": 1420,
                "capacity": 850,
                "available": 520
            },
            "screenPosition": {"top": "54%", "left": "44%"},
            "type": "warning"
        },
        {
            "id": "PIN-SK-03",
            "name": "Mangan Ridge Sector",
            "sector": "Sector 4 - Escarpment",
            "coordinates": {"lat": 27.5020, "lng": 88.5320},
            "tier": "Tier 3",
            "riskPercent": 48,
            "precipitation24h": 68.2,
            "soilSaturation": 62.0,
            "slopeAngle": 29.0,
            "historicalScars": 2,
            "lithology": "Hard Quartzite",
            "nearestShelter": {
                "name": "Mangan Tactical Shelter Bravo",
                "distance": "2.1 km",
                "duration": "25 mins foot",
                "route": "High Bypass Trail",
                "elevation": 1800,
                "capacity": 600,
                "available": 410
            },
            "screenPosition": {"top": "22%", "left": "52%"},
            "type": "watch"
        },
        {
            "id": "PIN-SK-04",
            "name": "Pakyong Valley Crest",
            "sector": "Sector 2 - Terraced Slopes",
            "coordinates": {"lat": 27.2355, "lng": 88.5910},
            "tier": "Tier 4",
            "riskPercent": 18,
            "precipitation24h": 22.0,
            "soilSaturation": 34.0,
            "slopeAngle": 14.5,
            "historicalScars": 0,
            "lithology": "Stable Granite Outcrop",
            "nearestShelter": {
                "name": "Pakyong Emergency Support Center",
                "distance": "0.8 km",
                "duration": "10 mins foot",
                "route": "Main Road",
                "elevation": 1350,
                "capacity": 950,
                "available": 780
            },
            "screenPosition": {"top": "68%", "left": "62%"},
            "type": "low"
        }
    ]
    return locations

@router.get("/shap-factors", response_model=List[ShapFactor], summary="Get SHAP Explainable AI Feature Drivers")
def get_shap_factors():
    """
    Retrieve Machine Learning SHAP (SHapley Additive exPlanations) factor weights and contribution deltas.
    """
    factors = [
        {
            "id": "shap-1",
            "name": "24h Accumulated Rainfall",
            "icon": "cloud-rain",
            "sourceBadge": "CHIRPS + TRMM Satellite Feed",
            "sourceType": "live",
            "weightDelta": "+38.4%",
            "weightDeltaNum": 38.4,
            "valueDisplay": "142.5 mm",
            "weightSeverity": "Very High",
            "progressPercent": 94,
            "thresholdNote": "Exceeds critical 120mm saturation threshold",
            "subNote": "Primary triggering factor for deep slope movement."
        },
        {
            "id": "shap-2",
            "name": "Volumetric Soil Saturation Ratio",
            "icon": "droplet",
            "sourceBadge": "In-situ Sensor Array (Node-04)",
            "sourceType": "sensor",
            "weightDelta": "+26.1%",
            "weightDeltaNum": 26.1,
            "valueDisplay": "96.2%",
            "weightSeverity": "High",
            "progressPercent": 88,
            "thresholdNote": "Pore pressure elevated past 42.5 kPa",
            "subNote": "Drastically reduces effective shear strength of soil."
        },
        {
            "id": "shap-3",
            "name": "Dem Slope Gradient",
            "icon": "mountain",
            "sourceBadge": "SRTM DEM 30m Grid",
            "sourceType": "dem",
            "weightDelta": "+18.7%",
            "weightDeltaNum": 18.7,
            "valueDisplay": "42.0°",
            "weightSeverity": "High",
            "progressPercent": 75,
            "thresholdNote": "Exceeds internal angle of friction (32°)",
            "subNote": "Gravitational shear stress dominant along failure plane."
        },
        {
            "id": "shap-4",
            "name": "Historical Scar Density",
            "icon": "history",
            "sourceBadge": "GSI Historical Database",
            "sourceType": "history",
            "weightDelta": "+11.2%",
            "weightDeltaNum": 11.2,
            "valueDisplay": "7 Scars / sq.km",
            "weightSeverity": "Moderate",
            "progressPercent": 55,
            "thresholdNote": "High recurrence frequency within 500m radius",
            "subNote": "Indicates pre-existing structural weakness."
        },
        {
            "id": "shap-5",
            "name": "Bedrock Lithology",
            "icon": "layers",
            "sourceBadge": "Geological Survey Vector Layer",
            "sourceType": "geology",
            "weightDelta": "+5.6%",
            "weightDeltaNum": 5.6,
            "valueDisplay": "Foliated Schist",
            "weightSeverity": "Elevated",
            "progressPercent": 40,
            "thresholdNote": "High weathering grade & joint permeability",
            "subNote": "Favors rapid water infiltration into slip planes."
        }
    ]
    return factors
