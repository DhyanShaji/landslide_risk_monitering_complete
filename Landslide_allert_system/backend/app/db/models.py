import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text
from app.db.session import Base

class AlertLog(Base):
    __tablename__ = "alert_logs"

    id = Column(Integer, primary_key=True, index=True)
    alert_code = Column(String, index=True)
    territory_id = Column(String, index=True, default="sikkim")
    title = Column(String)
    level = Column(String)  # Tier 1, Tier 2, Critical, High, Moderate
    sector = Column(String)
    coordinates_lat = Column(Float)
    coordinates_lng = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    message = Column(Text)
    acknowledged = Column(Boolean, default=False)


class EmergencySOS(Base):
    __tablename__ = "emergency_sos"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, default="Tactical Command User")
    contact_phone = Column(String, nullable=True)
    latitude = Column(Float)
    longitude = Column(Float)
    risk_level = Column(String)
    risk_score = Column(Float)
    status = Column(String, default="DISPATCHED")  # DISPATCHED, IN_PROGRESS, RESOLVED
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    notes = Column(Text, nullable=True)

