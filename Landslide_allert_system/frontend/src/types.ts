export type ScreenId =
  | 'home'
  | 'trend'
  | 'surveillance'
  | 'weather-forecast'
  | 'risk-analysis'
  | 'risk-map'
  | 'alerts'
  | 'emergency'
  | 'resilience'
  | 'profile'
  | 'settings';

export type RiskTier = 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';

export interface Territory {
  id: string;
  name: string;
  capital: string;
  activeAlerts: number;
  criticalAlert: boolean;
  saturation24h: number;
  statusText: string;
}

export interface MapPin {
  id: string;
  name: string;
  sector: string;
  coordinates: { lat: number; lng: number };
  tier: RiskTier;
  riskPercent: number;
  precipitation24h: number;
  soilSaturation: number;
  slopeAngle: number;
  historicalScars: number;
  lithology: string;
  nearestShelter: {
    name: string;
    distance: string;
    duration: string;
    route: string;
    elevation: number;
    capacity: number;
    available: number;
  };
  screenPosition: { top: string; left: string };
  type: 'emergency' | 'warning' | 'watch' | 'low' | 'shelter';
}

export interface ShapFactor {
  id: string;
  name: string;
  icon: string;
  sourceBadge: string;
  sourceType: 'live' | 'sensor' | 'dem' | 'history' | 'geology';
  weightDelta: string;
  weightDeltaNum: number;
  valueDisplay: string;
  weightSeverity: 'Very High' | 'High' | 'Moderate' | 'Normal' | 'Elevated';
  progressPercent: number;
  thresholdNote: string;
  subNote: string;
}

export interface WeatherDay {
  dayName: string;
  dateStr: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  rainProbability: number;
  expectedRainMm: number;
  isToday?: boolean;
}
