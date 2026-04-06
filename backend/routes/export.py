from fastapi import APIRouter, Depends, HTTPException, Response
from services.preprocessing import get_processed_data
from utils.helpers import get_current_user
import io
from typing import Any

router = APIRouter()

@router.get("/export")
async def export_data():
    processed_data = get_processed_data()
    if processed_data is None:
        raise HTTPException(status_code=400, detail="Institutional baseline not found. Ingestion is required before document generation.")
    
    # Generate Strategic Summary for the header
    from services.eda import get_strategic_insights
    insights = get_strategic_insights(processed_data)
    
    summary_header = [
        "Aura Intelligence Hub - Institutional Synthesis Report",
        "Strategy: Strategic Enrollment Planning (SEP)",
        f"Total Institutional Reach: {int(processed_data['Students'].sum()):,}",
        f"Programmatic Yield Leader: {insights.get('yield_leader', 'N/A')}",
        f"Regional Growth Pulse: {insights.get('growth_pulse', 'N/A')}",
        f"Yield Velocity: {insights.get('yield_velocity', 'N/A')}",
        f"Operational Window: {insights.get('record_longevity', 'N/A')}",
        "-" * 40,
        "" # Empty line before data
    ]
    header_str = "\n".join([f"# {line}" if line and line != "-" * 40 else line for line in summary_header])
    
    # Export to CSV string
    csv_data = processed_data.to_csv(index=False)
    final_output = f"{header_str}\n{csv_data}"
    
    response = Response(content=final_output, media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=Institutional_Synthesis_Report.csv"
    
    return response
