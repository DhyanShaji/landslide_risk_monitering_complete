import datetime
from typing import List, Dict

class WeatherService:
    def get_7day_forecast(self, territory_id: str = "sikkim") -> List[Dict]:
        today = datetime.date.today()
        forecast = [
            {
                "dayName": "Today",
                "dateStr": today.strftime("%b %d"),
                "high": 22,
                "low": 15,
                "condition": "Heavy Rainfall Warning",
                "icon": "cloud-rain",
                "rainProbability": 92,
                "expectedRainMm": 145.5,
                "isToday": True
            },
            {
                "dayName": (today + datetime.timedelta(days=1)).strftime("%a"),
                "dateStr": (today + datetime.timedelta(days=1)).strftime("%b %d"),
                "high": 21,
                "low": 14,
                "condition": "Torrential Downpour",
                "icon": "cloud-lightning",
                "rainProbability": 88,
                "expectedRainMm": 112.0
            },
            {
                "dayName": (today + datetime.timedelta(days=2)).strftime("%a"),
                "dateStr": (today + datetime.timedelta(days=2)).strftime("%b %d"),
                "high": 24,
                "low": 16,
                "condition": "Moderate Shower",
                "icon": "cloud-drizzle",
                "rainProbability": 65,
                "expectedRainMm": 42.0
            },
            {
                "dayName": (today + datetime.timedelta(days=3)).strftime("%a"),
                "dateStr": (today + datetime.timedelta(days=3)).strftime("%b %d"),
                "high": 25,
                "low": 17,
                "condition": "Scattered Rain",
                "icon": "cloud-sun-rain",
                "rainProbability": 45,
                "expectedRainMm": 18.5
            },
            {
                "dayName": (today + datetime.timedelta(days=4)).strftime("%a"),
                "dateStr": (today + datetime.timedelta(days=4)).strftime("%b %d"),
                "high": 26,
                "low": 18,
                "condition": "Partly Cloudy",
                "icon": "cloud-sun",
                "rainProbability": 20,
                "expectedRainMm": 5.0
            },
            {
                "dayName": (today + datetime.timedelta(days=5)).strftime("%a"),
                "dateStr": (today + datetime.timedelta(days=5)).strftime("%b %d"),
                "high": 27,
                "low": 18,
                "condition": "Clear Sky",
                "icon": "sun",
                "rainProbability": 10,
                "expectedRainMm": 0.0
            },
            {
                "dayName": (today + datetime.timedelta(days=6)).strftime("%a"),
                "dateStr": (today + datetime.timedelta(days=6)).strftime("%b %d"),
                "high": 26,
                "low": 17,
                "condition": "Light Overcast",
                "icon": "cloud",
                "rainProbability": 15,
                "expectedRainMm": 2.0
            }
        ]
        return forecast

weather_service = WeatherService()
