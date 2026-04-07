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
        "Financial_Background": ["Financial_Background", "Finance", "Income", "Economic Status", "Fee Category", "Scholarship", "Fee", "Income Group", "Socio-Economic", "Wealth", "Financial Status"],
        "Family_Background": ["Family_Background", "Family", "Background", "Parent Job", "Caste", "Category", "Religion", "Father's Occupation", "Mother's Occupation", "Legacy", "Alumni", "First Generation", "Demographic", "Social Category"],
        "School": ["School", "school", "SCHOOL", "Previous School", "High School", "Institution", "Board", "Intermediate"]
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
            id_cols = ["Student_ID", "ID", "RollNo", "Student ID", "STUDENT_ID", "Enrolled total", "Total", "Count"]
            for id_col in df.columns:
                if id_col not in identified_cols and (id_col in id_cols or "total" in str(id_col).lower() or "count" in str(id_col).lower() or "student" in str(id_col).lower()):
                    final_mapping[id_col] = "Students"
                    identified_cols.add(id_col)
                    found = True
                    break
            if not found:
                df["Students"] = 1
                final_mapping["Students"] = "Students"
                identified_cols.add("Students")
                found = True
        
        # SECONDARY FALLBACK: Year
        if standard == "Year" and not found:
            df["Year"] = 2024
            final_mapping["Year"] = "Year"
            identified_cols.add("Year")
            found = True

        if not found:
            # DYNAMIC FALLBACK: Assign to any unused string column, otherwise generate dummy data.
            unmapped_str_cols = [c for c in df.columns if c not in identified_cols and df[c].dtype == 'object']
            if unmapped_str_cols:
                fallback_col = unmapped_str_cols[0]
                final_mapping[fallback_col] = standard
                identified_cols.add(fallback_col)
                found = True
            else:
                df[standard] = f"UNKNOWN {standard.upper()}"
                final_mapping[standard] = standard
                identified_cols.add(standard)
                found = True

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
    optional_columns = ["Financial_Background", "Family_Background", "School"]
    
    # Force 1-dimensional selection: If rename created duplicates, only take the first
    df = df.loc[:, ~df.columns.duplicated()]

    # Handling missing values for required columns
    df = df.dropna(subset=[col for col in required_columns if col in df.columns])

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
