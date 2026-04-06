from fastapi import APIRouter, Depends, HTTPException
from services.preprocessing import get_processed_data
from services.eda import get_analytics_summary, generate_base64_charts
from utils.helpers import get_current_user
from models.schemas import AnalyticsResponse, ChartResponse
from typing import Any

router = APIRouter()

@router.get("/analytics", response_model=AnalyticsResponse)
async def get_analytics():
    processed_data = get_processed_data()
    if processed_data is None:
        return {
            "total_students": 0,
            "yearly_trend": [],
            "course_distribution": [],
            "region_distribution": []
        }
    
    summary = get_analytics_summary(processed_data)
    return summary

@router.get("/charts", response_model=ChartResponse)
async def get_charts():
    processed_data = get_processed_data()
    if processed_data is None:
        return {"charts": {}}
    
    charts = generate_base64_charts(processed_data)
    return {"charts": charts}
