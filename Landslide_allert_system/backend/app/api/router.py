from fastapi import APIRouter
from app.api.endpoints import risk, shelters, alerts, weather, emergency

api_router = APIRouter()

api_router.include_router(risk.router, prefix="/risk", tags=["Landslide Risk ML & Spatial"])
api_router.include_router(shelters.router, prefix="/shelters", tags=["Evacuation & Shelters"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["Emergency Alerts"])
api_router.include_router(weather.router, prefix="/weather", tags=["Precipitation & Weather"])
api_router.include_router(emergency.router, prefix="/emergency", tags=["Emergency SOS & Dispatch"])
