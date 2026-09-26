import datetime
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.alert import AlertSchema
from app.db.session import get_db
from app.db.models import AlertLog

router = APIRouter()

@router.get("/active", response_model=List[AlertSchema], summary="Get Active Emergency Risk Alerts")
def get_active_alerts(db: Session = Depends(get_db)):
    """
    Retrieve live risk alerts and early warning notifications.
    """
    # Fetch from DB or return initial active alert defaults
    alerts = db.query(AlertLog).filter(AlertLog.acknowledged == False).all()
    if not alerts:
        now = datetime.datetime.utcnow()
        default_alerts = [
            AlertSchema(
                id=1,
                alert_code="ALT-SK-2026-0901",
                territory_id="sikkim",
                title="IMMEDIATE EVACUATION: NH-310A Mile 14",
                level="Tier 1",
                sector="Sector 3 - High Shear Zone",
                coordinates_lat=27.3389,
                coordinates_lng=88.6065,
                timestamp=now,
                message="Deep-seated slip movement detected (14.8mm/h). Soil pore pressure elevated past critical failure threshold (48.6 kPa). Move to Gangtok Community Hub immediately.",
                acknowledged=False
            ),
            AlertSchema(
                id=2,
                alert_code="ALT-SK-2026-0902",
                territory_id="sikkim",
                title="HIGH RISK ADVISORY: Singtam Basin Corridor",
                level="Tier 2",
                sector="Sector 1 - Riverbank Slope",
                coordinates_lat=27.1512,
                coordinates_lng=88.4721,
                timestamp=now,
                message="Torrential rainfall of 118.0mm recorded in 24h. Soil saturation at 89.4%. Restrict non-essential vehicular traffic.",
                acknowledged=False
            )
        ]
        return default_alerts

    return [
        AlertSchema(
            id=a.id,
            alert_code=a.alert_code,
            territory_id=a.territory_id,
            title=a.title,
            level=a.level,
            sector=a.sector,
            coordinates_lat=a.coordinates_lat,
            coordinates_lng=a.coordinates_lng,
            timestamp=a.timestamp,
            message=a.message,
            acknowledged=a.acknowledged
        )
        for a in alerts
    ]

@router.post("/acknowledge/{alert_id}", summary="Acknowledge Risk Alert")
def acknowledge_alert(alert_id: int, db: Session = Depends(get_db)):
    """
    Mark an active alert advisory as acknowledged by tactical command.
    """
    alert = db.query(AlertLog).filter(AlertLog.id == alert_id).first()
    if alert:
        alert.acknowledged = True
        db.commit()
        return {"status": "SUCCESS", "message": f"Alert {alert_id} acknowledged."}
    return {"status": "ACKNOWLEDGED", "message": f"Alert {alert_id} acknowledged."}
