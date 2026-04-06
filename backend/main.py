from fastapi import FastAPI, Request
import os
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, upload, analytics, forecast, export, logs
from services.logs_service import add_log_entry
import uvicorn

app = FastAPI(title="Student Enrollment Trend Analysis System API")

# Configure CORS
raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:9002")
origins = [origin.strip().rstrip('/') for origin in raw_origins.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LogAuditorMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        if request.method != "OPTIONS" and request.url.path not in ["/docs", "/openapi.json", "/", "/health"]:
            ip = request.client.host if request.client else "UNKNOWN SYS"
            path = request.url.path
            action, label, icon = "SYSTEM_PING", "NETWORK PING", "Activity"
            
            if "/login" in path:
                action, label, icon = "AUTHENTICATION", "SECURE LOGIN", "ShieldCheck"
            elif "/upload" in path:
                action, label, icon = "DATA_INGESTION", "RECORD UPLOAD", "Database"
            elif "/analytics" in path or "/forecast" in path:
                action, label, icon = "DIAGNOSTIC_QUERY", "DATA QUERY", "Activity"
            elif "/logs" in path:
                action, label, icon = "AUDIT_VIEW", "LOGS ACCESS", "Eye"
                
            status = "WARNING" if response.status_code >= 400 else "SUCCESS"
            add_log_entry(action=action, label=label, icon=icon, status=status, origin=ip)
        return response

app.add_middleware(LogAuditorMiddleware)

# Include Routers
app.include_router(auth.router, tags=["Authentication"])
app.include_router(upload.router, tags=["Data Upload"])
app.include_router(analytics.router, tags=["EDA & Analytics"])
app.include_router(forecast.router, tags=["Forecasting"])
app.include_router(export.router, tags=["Export Data"])
app.include_router(logs.router, tags=["Security Logs"])

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "Aura Analytics Engine"}

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Student Enrollment Trend Analysis System API",
        "documentation": "/docs"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

