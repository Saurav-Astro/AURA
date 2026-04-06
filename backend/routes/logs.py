from fastapi import APIRouter
from services.logs_service import get_access_logs
from typing import List, Dict, Any

router = APIRouter()

@router.get("/logs", response_model=List[Dict[str, Any]])
async def get_logs():
    return get_access_logs()
