from fastapi import APIRouter, HTTPException, status, Depends
from models.schemas import LoginRequest, Token
from utils.helpers import create_access_token, get_password_hash, verify_password
from datetime import timedelta

router = APIRouter()

# Hardcoded admin user for demonstration
# In a real app, this would be in a database
ADMIN_USERNAME = "admin"
# Password: "password123" (hashed)
ADMIN_HASHED_PASSWORD = get_password_hash("password123")

@router.post("/login", response_model=Token)
async def login(request: LoginRequest):
    if request.username == ADMIN_USERNAME and verify_password(request.password, ADMIN_HASHED_PASSWORD):
        access_token = create_access_token(data={"sub": request.username})
        return {"access_token": access_token, "token_type": "bearer"}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
        headers={"WWW-Authenticate": "Bearer"},
    )

@router.put("/profile/update")
async def update_profile(request: dict):
    # This is a high-fidelity mock endpoint for institutional credential sync.
    # In a full-stack production phase, we would verify the current session and update MongoDB.
    return {"message": "Institutional identity synchronization complete", "status": "success"}
