def get_recommended_actions(risk_score: float) -> dict:
    """
    Returns appropriate emergency procedures and action items based on AI risk score.
    Reflects ml/action_engine.py logic.
    """
    if risk_score >= 76:
        return {
            "level": "CRITICAL",
            "message": "Immediate evacuation recommended.",
            "actions": [
                "Move away from steep slopes immediately.",
                "Avoid landslide-prone roads and mountain corridors.",
                "Proceed directly to the safest designated emergency shelter.",
                "Broadcast live SOS coordinates to emergency response dispatch."
            ]
        }
    elif risk_score >= 51:
        return {
            "level": "HIGH",
            "message": "High landslide risk detected.",
            "actions": [
                "Stay alert for warning signs (mud seepage, slope cracks).",
                "Avoid unnecessary travel through active slope sectors.",
                "Monitor real-time rainfall and saturation updates.",
                "Prepare emergency go-bags for immediate evacuation."
            ]
        }
    elif risk_score >= 26:
        return {
            "level": "MODERATE",
            "message": "Moderate landslide risk.",
            "actions": [
                "Monitor weather forecasts and telemetry alerts.",
                "Avoid unreinforced or unstable slope contours.",
                "Ensure emergency communications and supplies are operational."
            ]
        }
    else:
        return {
            "level": "LOW",
            "message": "Low landslide risk.",
            "actions": [
                "Continue standard operations.",
                "Maintain periodic weather monitoring."
            ]
        }
