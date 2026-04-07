from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class LoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class AnalyticsResponse(BaseModel):
    total_students: int
    yearly_trend: List[Dict[str, Any]]
    course_distribution: List[Dict[str, Any]]
    region_distribution: List[Dict[str, Any]]
    family_distribution: Optional[List[Dict[str, Any]]] = None
    financial_distribution: Optional[List[Dict[str, Any]]] = None
    insights: Optional[Dict[str, Any]] = None
    is_family_synthetic: Optional[bool] = None
    is_financial_synthetic: Optional[bool] = None

class ForecastResponse(BaseModel):
    historical: List[Dict[str, Any]]
    forecast: List[Dict[str, Any]]
    years: List[int]

class ChartResponse(BaseModel):
    charts: Dict[str, str]  # base64 encoded images

class SamplePreview(BaseModel):
    columns: List[str]
    data: List[Dict[str, Any]]
