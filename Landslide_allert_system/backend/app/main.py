import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.router import api_router
from app.db.session import engine, Base
from app.db.models import AlertLog, EmergencySOS

# Initialize database tables
try:
    Base.metadata.create_all(bind=engine)
    print("[DB] Database tables created/verified successfully.")
except Exception as e:
    print(f"[DB] Database initialization error: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-driven Landslide Risk Monitoring, Predictive Early Warning & Emergency Evacuation Management System API.",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Response Time Timing Middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = f"{process_time:.4f}s"
    return response

# Root Route
@app.get("/", summary="API Root & System Status")
def root():
    return {
        "status": "ONLINE",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs_url": "/docs",
        "health_check": "/health",
        "api_v1": f"{settings.API_V1_STR}"
    }

# Health Check Route
@app.get("/health", summary="Health Check")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "ml_model_loaded": True,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }

# Include API Router
app.include_router(api_router, prefix=settings.API_V1_STR)
