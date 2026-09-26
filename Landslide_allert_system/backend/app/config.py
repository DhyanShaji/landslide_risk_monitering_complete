import os
from pathlib import Path

try:
    from pydantic_settings import BaseSettings
except ImportError:
    BaseSettings = object



BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data" / "processed"
MODEL_PATH = DATA_DIR / "landslide_random_forest.pkl"
RISK_SCORES_PATH = DATA_DIR / "risk_scores.csv"
SHELTERS_PATH = DATA_DIR / "shelters.csv"
TRAINING_DATA_PATH = DATA_DIR / "ml_training_dataset.csv"

class Settings:
    PROJECT_NAME: str = "AI Landslide Risk Monitoring & Early Warning System API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Paths
    BASE_DIR: Path = BASE_DIR
    DATA_DIR: Path = DATA_DIR
    MODEL_PATH: Path = MODEL_PATH
    RISK_SCORES_PATH: Path = RISK_SCORES_PATH
    SHELTERS_PATH: Path = SHELTERS_PATH
    TRAINING_DATA_PATH: Path = TRAINING_DATA_PATH
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/landslide_monitoring.db")
    
    # CORS Origins
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ]

settings = Settings()
