from typing import List, Dict
from fastapi import APIRouter, Query
from app.services.weather_service import weather_service

router = APIRouter()

@router.get("/forecast", response_model=List[Dict], summary="Get 7-Day Weather & Precipitation Forecast")
def get_weather_forecast(territory: str = Query("sikkim", description="Territory ID")):
    """
    Retrieve 7-day weather predictions, rainfall probability, and cumulative precipitation volume.
    """
    return weather_service.get_7day_forecast(territory)
