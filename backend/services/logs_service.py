import random
from datetime import datetime, timedelta
from typing import List, Dict, Any

# In-memory session logs for demo
_access_logs = []

def generate_initial_logs(count: int = 15):
    global _access_logs
    if _access_logs: return # Only generate once per session start
    
    actions = [
        {"action": "INGESTION_PROTOCOL", "label": "DATA INGESTION", "icon": "Database"},
        {"action": "EXPORT_INSTITUTIONAL", "label": "REPORT EXPORT", "icon": "Download"},
        {"action": "SECURITY_SYNC", "label": "SECURITY PROTOCOL", "icon": "ShieldCheck"},
        {"action": "PROFILE_UPDATE", "label": "CREDENTIAL SYNC", "icon": "User"},
        {"action": "ANALYTICS_QUERY", "label": "DIAGNOSTIC QUERY", "icon": "Activity"},
    ]
    
    origins = ["MAIN_CAMPUS", "REMOTE_PORTAL", "DEAN_OFFICE", "ADMIN_CONSOLE"]
    statuses = ["SUCCESS", "SUCCESS", "SUCCESS", "WARNING"] # Weighted towards success
    
    start_time = datetime.now() - timedelta(hours=2)
    
    for i in range(count):
        log_time = start_time + timedelta(minutes=random.randint(5, 115))
        act = random.choice(actions)
        _access_logs.append({
            "id": f"LOG-{1000 + i}",
            "timestamp": log_time.strftime("%Y-%m-%d %H:%M:%S"),
            "action": act["action"],
            "label": act["label"],
            "icon": act["icon"],
            "user": "ADMIN_VERIFIED",
            "origin": random.choice(origins),
            "status": random.choice(statuses)
        })
    
    # Sort by time newest first
    _access_logs.sort(key=lambda x: x["timestamp"], reverse=True)

def get_access_logs() -> List[Dict[str, Any]]:
    global _access_logs
    if not _access_logs:
        generate_initial_logs()
    return _access_logs

def add_log_entry(action: str, label: str, icon: str, status: str = "SUCCESS"):
    global _access_logs
    new_log = {
        "id": f"LOG-{1000 + len(_access_logs)}",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "action": action,
        "label": label,
        "icon": icon,
        "user": "ADMIN_VERIFIED",
        "origin": "ADMIN_CONSOLE",
        "status": status
    }
    _access_logs.insert(0, new_log)
    return new_log
