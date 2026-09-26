import os
import pandas as pd
import numpy as np
from app.config import settings

def calculate_haversine_distance(lat1: float, lon1: float, lat2: np.ndarray, lon2: np.ndarray) -> np.ndarray:
    R = 6371.0  # Earth radius in kilometers
    lat1_rad = np.radians(lat1)
    lat2_rad = np.radians(lat2)
    dlat = lat2_rad - lat1_rad
    dlon = np.radians(lon2 - lon1)

    a = np.sin(dlat / 2.0) ** 2 + np.cos(lat1_rad) * np.cos(lat2_rad) * (np.sin(dlon / 2.0) ** 2)
    c = 2.0 * np.arctan2(np.sqrt(a), np.sqrt(1.0 - a))
    return R * c

class ShelterService:
    def __init__(self):
        self.shelters_df = None
        self.risk_data_df = None
        self.load_data()

    def load_data(self):
        if settings.SHELTERS_PATH.exists():
            try:
                self.shelters_df = pd.read_csv(settings.SHELTERS_PATH)
                print(f"[Shelters Data] Loaded CSV ({len(self.shelters_df)} shelters)")
            except Exception as e:
                print(f"[Shelters Data] Error reading shelters CSV: {e}")

        if settings.RISK_SCORES_PATH.exists():
            try:
                self.risk_data_df = pd.read_csv(settings.RISK_SCORES_PATH)
            except Exception as e:
                print(f"[Shelters Data] Error reading risk scores CSV: {e}")

        if self.shelters_df is None or len(self.shelters_df) == 0:
            # Fallback default shelters list for Sikkim / NER region
            self.shelters_df = pd.DataFrame([
                {"Name": "Gangtok Community Relief Hub Alpha", "Latitude": 27.3389, "Longitude": 88.6065, "Capacity": 1200},
                {"Name": "Namchi Safe Haven Sector 4", "Latitude": 27.1664, "Longitude": 88.3644, "Capacity": 850},
                {"Name": "Mangan Tactical Shelter Bravo", "Latitude": 27.5020, "Longitude": 88.5320, "Capacity": 600},
                {"Name": "Pakyong Emergency Support Center", "Latitude": 27.2355, "Longitude": 88.5910, "Capacity": 950},
                {"Name": "Gyalshing High-Ground Shelter", "Latitude": 27.2882, "Longitude": 88.2361, "Capacity": 500}
            ])

    def estimate_shelter_risk(self, shelter_lat: float, shelter_lon: float) -> float:
        if self.risk_data_df is None or len(self.risk_data_df) == 0:
            return 25.0
        distances = calculate_haversine_distance(
            shelter_lat,
            shelter_lon,
            self.risk_data_df["Latitude"].values,
            self.risk_data_df["Longitude"].values
        )
        nearest_indices = np.argsort(distances)[:10]
        nearest_risks = self.risk_data_df.iloc[nearest_indices]["Risk_Score"]
        return float(nearest_risks.mean())

    def get_recommended_shelters(self, user_lat: float, user_lon: float, max_count: int = 5):
        df = self.shelters_df.copy()
        
        # Calculate Haversine distance
        df["Distance_km"] = calculate_haversine_distance(
            user_lat,
            user_lon,
            df["Latitude"].values,
            df["Longitude"].values
        )

        # Estimate nearby risk
        df["Nearby_Risk"] = df.apply(
            lambda row: self.estimate_shelter_risk(row["Latitude"], row["Longitude"]),
            axis=1
        )

        # Filter out critical risk areas (> 76 score)
        safe_df = df[df["Nearby_Risk"] < 76].copy()
        if len(safe_df) == 0:
            safe_df = df.copy()  # Fallback to all if none under 76

        safe_df["Risk_Safety"] = 100.0 - safe_df["Nearby_Risk"]
        max_dist = max(safe_df["Distance_km"].max(), 20.0)
        safe_df["Distance_Score"] = 100.0 * (1.0 - (safe_df["Distance_km"] / max_dist).clip(upper=1.0))
        max_cap = max(df["Capacity"].max(), 100)
        safe_df["Capacity_Score"] = (safe_df["Capacity"] / max_cap) * 100.0

        # Safety Score formula matching ml/shelter_recommendation.py
        safe_df["Safety_Score"] = (
            0.50 * safe_df["Risk_Safety"] +
            0.30 * safe_df["Distance_Score"] +
            0.20 * safe_df["Capacity_Score"]
        )

        sorted_df = safe_df.sort_values(by="Safety_Score", ascending=False)
        top_shelters = []
        for _, row in sorted_df.head(max_count).iterrows():
            top_shelters.append({
                "name": str(row["Name"]),
                "latitude": float(row["Latitude"]),
                "longitude": float(row["Longitude"]),
                "capacity": int(row["Capacity"]),
                "distance_km": round(float(row["Distance_km"]), 2),
                "nearby_risk_score": round(float(row["Nearby_Risk"]), 2),
                "safety_score": round(float(row["Safety_Score"]), 2),
                "elevation_m": 1250.0,
                "status": "AVAILABLE"
            })

        best_shelter = top_shelters[0] if top_shelters else None

        return {
            "user_latitude": user_lat,
            "user_longitude": user_lon,
            "total_found": len(top_shelters),
            "recommended_shelter": best_shelter,
            "all_shelters": top_shelters
        }

shelter_service = ShelterService()
