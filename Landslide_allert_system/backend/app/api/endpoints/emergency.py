import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.alert import SOSRequest, SOSResponse
from app.services.shelter_service import shelter_service
from app.db.session import get_db
from app.db.models import EmergencySOS

router = APIRouter()

@router.post("/sos", response_model=SOSResponse, summary="Dispatch Critical Emergency SOS Alert")
def dispatch_emergency_sos(request: SOSRequest, db: Session = Depends(get_db)):
    """
    Log an active emergency SOS alert with tactical command, compute nearest safe shelter recommendation, and return dispatch confirmation.
    """
    try:
        # Compute best shelter
        shelter_result = shelter_service.get_recommended_shelters(
            user_lat=request.latitude,
            user_lon=request.longitude,
            max_count=1
        )
        assigned_shelter = shelter_result.get("recommended_shelter")

        # Save to database
        db_sos = EmergencySOS(
            user_name=request.user_name,
            contact_phone=request.contact_phone,
            latitude=request.latitude,
            longitude=request.longitude,
            risk_level=request.risk_level,
            risk_score=request.risk_score,
            status="DISPATCHED",
            timestamp=datetime.datetime.utcnow(),
            notes=request.notes
        )
        db.add(db_sos)
        db.commit()
        db.refresh(db_sos)

        return {
            "sos_id": db_sos.id,
            "status": "DISPATCHED",
            "timestamp": db_sos.timestamp,
            "assigned_shelter": assigned_shelter,
            "message": f"Emergency rescue team notified. Recommended evacuation route to {assigned_shelter['name'] if assigned_shelter else 'nearest high-ground hub'}."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Emergency SOS Dispatch Error: {str(e)}")
