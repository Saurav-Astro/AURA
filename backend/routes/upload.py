from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
import os
from services.preprocessing import load_file_data, preprocess_enrollment_data, get_data_preview
from utils.helpers import get_current_user
from typing import Any

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    allowed_extensions = {'.csv', '.xlsx', '.xls'}
    file_ext = os.path.splitext(file.filename)[1].lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a CSV or Excel file.")
    
    try:
        contents = await file.read()
        df = load_file_data(contents, file.filename)
        processed_df = preprocess_enrollment_data(df)
        preview = get_data_preview(processed_df)
        
        return {
            "filename": file.filename,
            "status": "success",
            "records_count": len(processed_df),
            "preview": preview
        }
    except HTTPException as e:
        print(f"UPLOAD ERROR (HTTP): {e.detail}")
        raise e
    except Exception as e:
        print(f"UPLOAD ERROR (SYSTEM): {str(e)}")
        raise HTTPException(status_code=500, detail=f"System Processing Fault: {str(e)}")
