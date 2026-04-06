from fastapi import APIRouter, Depends, HTTPException
from services.preprocessing import get_processed_data
from services.arima_model import perform_arima_forecast
from utils.helpers import get_current_user
from models.schemas import ForecastResponse
from typing import Any

router = APIRouter()

@router.get("/forecast", response_model=ForecastResponse)
async def get_forecast(years: int = 5):
    processed_data = get_processed_data()
    if processed_data is None:
        return {
            "historical": [],
            "forecast": [],
            "years": []
        }
    
    forecast = perform_arima_forecast(processed_data, forecast_years=years)
    return forecast
