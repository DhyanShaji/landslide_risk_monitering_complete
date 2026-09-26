from fastapi import APIRouter, HTTPException
from app.schemas.shelter import ShelterRecommendationRequest, ShelterRecommendationResponse
from app.services.shelter_service import shelter_service

router = APIRouter()

@router.post("/recommend", response_model=ShelterRecommendationResponse, summary="Recommend Safest Evacuation Shelters")
def recommend_shelters(request: ShelterRecommendationRequest):
    """
    Computes real-time Haversine distance, shelter capacity, and spatial risk safety scores to recommend top evacuation shelters.
    """
    try:
        results = shelter_service.get_recommended_shelters(
            user_lat=request.latitude,
            user_lon=request.longitude,
            max_count=request.max_shelters or 5
        )
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Shelter Recommendation Engine Error: {str(e)}")

@router.get("/list", summary="List All Registered Emergency Shelters")
def list_shelters():
    """
    Returns all registered emergency shelters and relief hubs in the region.
    """
    df = shelter_service.shelters_df.to_dict(orient="records")
    return {"total": len(df), "shelters": df}
