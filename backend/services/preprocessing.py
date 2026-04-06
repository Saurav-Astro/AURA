import pandas as pd
import io
from fastapi import HTTPException

# In-memory storage for the processed DataFrame
_processed_data = None

def get_processed_data():
    return _processed_data

def load_file_data(content: bytes, filename: str):
    try:
        buffer = io.BytesIO(content)
        if filename.endswith('.csv'):
            df = pd.read_csv(buffer)
        elif filename.endswith(('.xlsx', '.xls')):
            df = pd.read_excel(buffer)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
        return df
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Parsing error: {str(e)}")

def preprocess_enrollment_data(df: pd.DataFrame):
    # Ensure columns are unique at the start by suffixing duplicates
    new_cols = []
    seen = {}
    for col in df.columns:
        c = str(col).strip()
        if c in seen:
            seen[c] += 1
            new_cols.append(f"{c}_{seen[c]}")
        else:
            seen[c] = 0
            new_cols.append(c)
    df.columns = new_cols
    
    mandatory_mapping = {
        "Year": ["Year", "year", "YEAR", "Academic Year", "Enroll_Year", "Admission Year"],
        "Course": ["Course", "course", "COURSE", "Program", "Subject", "Department"],
        "Students": ["Students", "students", "STUDENTS", "Enrollment", "Count", "Total Students"],
        "Region": ["Region", "region", "REGION", "Location", "State", "City"],
    }
    optional_mapping = {
        "Financial_Background": ["Financial_Background", "Finance", "Income", "Economic Status"],
        "Family_Background": ["Family_Background", "Family", "Background", "Parent Job"]
    }
    
    final_mapping = {}
    identified_cols = set()
    
    # Process Mandatory
    for standard, aliases in mandatory_mapping.items():
        found = False
        for col in df.columns:
            if col not in identified_cols and (col in aliases or col.lower() == standard.lower()):
                final_mapping[col] = standard
                identified_cols.add(col)
                found = True
                break
        
        # SPECIAL FALLBACK: Students
        if standard == "Students" and not found:
            id_cols = ["Student_ID", "ID", "RollNo", "Student ID", "STUDENT_ID"]
            for id_col in df.columns:
                if id_col in id_cols:
                    df["Students"] = 1
                    final_mapping["Students"] = "Students"
                    found = True
                    break
        
        # SECONDARY FALLBACK: Year
        if standard == "Year" and not found:
            df["Year"] = 2024
            final_mapping["Year"] = "Year"
            found = True

        if not found:
            raise HTTPException(status_code=400, detail=f"Missing required data: {standard}. Please ensure your dataset contains a '{standard}' column or Student_ID.")

    # Process Optional
    for standard, aliases in optional_mapping.items():
        for col in df.columns:
            if col not in identified_cols and (col in aliases or col.lower() == standard.lower()):
                final_mapping[col] = standard
                identified_cols.add(col)
                break

    # Rename and then SELECT only the standard columns to avoid duplicate overlaps
    df = df.rename(columns=final_mapping)
    
    # We'll use a dynamic selection based on what's available
    required_columns = ["Year", "Course", "Students", "Region"]
    optional_columns = ["Financial_Background", "Family_Background"]
    
    # Filter only columns that exist after renaming
    existing_cols = [col for col in required_columns + optional_columns if col in df.columns]
    
    # Force 1-dimensional selection: If rename created duplicates, only take the first
    df = df.loc[:, ~df.columns.duplicated()]
    df = df[existing_cols]

    # Handling missing values for required columns
    df = df.dropna(subset=[col for col in required_columns if col in df.columns])

    # Removing duplicates
    df = df.drop_duplicates()

    # Data type conversion
    df['Year'] = pd.to_numeric(df['Year'], errors='coerce').fillna(2024).astype(int)
    df['Students'] = pd.to_numeric(df['Students'], errors='coerce').fillna(1).astype(int)
    
    # Store globally in-memory for other services
    global _processed_data
    _processed_data = df.sort_values(by='Year')
    
    return _processed_data

def get_data_preview(df: pd.DataFrame, n=5):
    return {
        "columns": df.columns.tolist(),
        "data": df.head(n).to_dict(orient='records')
    }
