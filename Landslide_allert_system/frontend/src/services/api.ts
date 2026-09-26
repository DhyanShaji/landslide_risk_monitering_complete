/**
 * API Service for Landslide Risk Monitoring System Backend Integration
 * Communicates with FastAPI server at http://127.0.0.1:8000/api/v1
 * Provides fallback to mock data if backend server is unreachable.
 */

import { mockMapPins, mockShapFactors, mockWeatherForecast } from '../data/mockData';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

async function fetchWithFallback<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      signal: controller.signal,
    });
    clearTimeout(id);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[Backend API] Endpoint ${endpoint} unavailable, using local client logic:`, error);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw error;
  }
}

export const apiService = {
  // Check backend server health
  checkHealth: async () => {
    return fetchWithFallback<{ status: string; database: string }>('/health');
  },

  // ML Risk Prediction
  predictRisk: async (data: { elevation: number; slope: number; rainfall_2023: number; latitude?: number; longitude?: number }) => {
    return fetchWithFallback(
      '/risk/predict',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      {
        latitude: data.latitude || 26.19,
        longitude: data.longitude || 91.75,
        elevation: data.elevation,
        slope: data.slope,
        rainfall_2023: data.rainfall_2023,
        risk_score: Math.min(Math.round((data.slope * 0.8 + data.rainfall_2023 * 0.4 + data.elevation * 0.05)), 100),
        risk_level: data.slope > 35 && data.rainfall_2023 > 100 ? 'Critical' : 'High',
        risk_tier: 'Tier 1',
        probability: 0.88,
        recommended_actions: [
          'Move away from steep slopes immediately.',
          'Proceed to nearest designated emergency shelter.',
          'Share your location with emergency responders.'
        ]
      }
    );
  },

  // Spatial Risk Pins for Dashboard Map
  getMapLocations: async (territory: string = 'sikkim') => {
    return fetchWithFallback(`/risk/map-locations?territory=${territory}`, undefined, mockMapPins);
  },

  // SHAP Feature Factors
  getShapFactors: async () => {
    return fetchWithFallback('/risk/shap-factors', undefined, mockShapFactors);
  },

  // Safe Shelter Recommendation Engine
  getRecommendedShelters: async (latitude: number = 26.19, longitude: number = 91.75) => {
    return fetchWithFallback(
      '/shelters/recommend',
      {
        method: 'POST',
        body: JSON.stringify({ latitude, longitude, max_shelters: 5 }),
      }
    );
  },

  // Active Emergency Alerts
  getActiveAlerts: async () => {
    return fetchWithFallback('/alerts/active');
  },

  // Weather & Precipitation Forecast
  getWeatherForecast: async (territory: string = 'sikkim') => {
    return fetchWithFallback(`/weather/forecast?territory=${territory}`, undefined, mockWeatherForecast);
  },

  // Emergency SOS Dispatch
  dispatchEmergencySOS: async (data: { latitude: number; longitude: number; riskLevel?: string; riskScore?: number; notes?: string }) => {
    return fetchWithFallback(
      '/emergency/sos',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }
};
