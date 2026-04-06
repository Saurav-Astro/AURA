from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, upload, analytics, forecast, export, logs
import uvicorn

app = FastAPI(title="Student Enrollment Trend Analysis System API")

# Configure CORS
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:9002").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
