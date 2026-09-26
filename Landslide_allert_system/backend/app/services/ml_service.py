import os
import joblib
import pandas as pd
import numpy as np
from app.config import settings
from app.services.action_service import get_recommended_actions

class MLService:
    def __init__(self):
        self.model = None
        self.risk_scores_df = None
        self.load_model_and_data()

    def load_model_and_data(self):
        if settings.MODEL_PATH.exists():
            try:
                self.model = joblib.load(settings.MODEL_PATH)
                print(f"[ML Model] Loaded successfully from {settings.MODEL_PATH}")
            except Exception as e:
                print(f"[ML Model] Error loading model file: {e}")
        else:
            print(f"[ML Model] Model file not found at {settings.MODEL_PATH}")

        if settings.RISK_SCORES_PATH.exists():
            try:
                self.risk_scores_df = pd.read_csv(settings.RISK_SCORES_PATH)
                print(f"[Data] Risk Scores CSV loaded successfully ({len(self.risk_scores_df)} records)")
            except Exception as e:
                print(f"[Data] Error loading risk scores CSV: {e}")
        else:
            print(f"[Data] Risk Scores CSV not found at {settings.RISK_SCORES_PATH}")

    def predict_risk(self, elevation: float, slope: float, rainfall_2023: float, latitude: float = 26.19, longitude: float = 91.75):
        if self.model is not None:
            features = pd.DataFrame([{
                "Elevation": elevation,
                "Slope": slope,
                "Rainfall_2023": rainfall_2023
            }])
            probability = float(self.model.predict_proba(features)[0, 1])
            risk_score = round(probability * 100, 2)
        else:
            # Fallback heuristic calculation if model not present
            slope_factor = min(slope / 60.0, 1.0) * 45
            rain_factor = min(rainfall_2023 / 300.0, 1.0) * 40
            elev_factor = min(elevation / 3000.0, 1.0) * 15
            risk_score = round(slope_factor + rain_factor + elev_factor, 2)
            probability = risk_score / 100.0

        risk_level = self.get_risk_level(risk_score)
        risk_tier = self.get_risk_tier(risk_score)
        actions = get_recommended_actions(risk_score)

        return {
            "latitude": latitude,
            "longitude": longitude,
            "elevation": elevation,
            "slope": slope,
            "rainfall_2023": rainfall_2023,
            "risk_score": risk_score,
            "risk_level": risk_level,
            "risk_tier": risk_tier,
            "probability": round(probability, 4),
            "recommended_actions": actions["actions"]
        }

    def get_risk_level(self, score: float) -> str:
        if score >= 76:
            return "Critical"
        elif score >= 51:
            return "High"
        elif score >= 26:
            return "Moderate"
        else:
            return "Low"

    def get_risk_tier(self, score: float) -> str:
        if score >= 76:
            return "Tier 1"
        elif score >= 51:
            return "Tier 2"
        elif score >= 26:
            return "Tier 3"
        else:
            return "Tier 4"

    def get_precomputed_locations(self):
        if self.risk_scores_df is not None:
            return self.risk_scores_df.to_dict(orient="records")
        return []

ml_service = MLService()
