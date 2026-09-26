import React, { useState } from 'react';
import { ScreenId } from '../types';
import { WEATHER_FORECAST } from '../data/mockData';

interface WeatherForecastScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const WeatherForecastScreen: React.FC<WeatherForecastScreenProps> = ({ onNavigate }) => {
  const [selectedStation, setSelectedStation] = useState('Gangtok Ridge (1,650m)');

  const hourlyForecast = [
    { time: '12:00', temp: 24, pop: 85, rainMm: 14, wind: '12 km/h' },
    { time: '13:00', temp: 23, pop: 80, rainMm: 11, wind: '14 km/h' },
    { time: '14:00', temp: 22, pop: 65, rainMm: 8, wind: '15 km/h' },
    { time: '15:00', temp: 21, pop: 50, rainMm: 5, wind: '10 km/h' },
    { time: '16:00', temp: 20, pop: 40, rainMm: 3, wind: '8 km/h' },
    { time: '17:00', temp: 19, pop: 30, rainMm: 1, wind: '6 km/h' },
    { time: '18:00', temp: 18, pop: 25, rainMm: 0.5, wind: '5 km/h' },
  ];

  const mountainPasses = [
    { name: 'Nathula Pass (4,310m)', condition: 'Snow & Sleet', status: 'Closed to Transit', risk: 'High' },
    { name: 'Sela Pass (4,170m)', condition: 'Dense Fog & Ice', status: 'Restricted 4x4 Only', risk: 'Medium' },
    { name: 'Zoji La Corridor (3,528m)', condition: 'Intermittent Showers', status: 'Open Normal', risk: 'Low' },
    { name: 'Bum La Border Pass (4,630m)', condition: 'Sub-Zero Flurries', status: 'Convoys Escorted', risk: 'Medium' },
  ];

  return (
    <div className="flex flex-col w-full pb-space-2xl space-y-space-lg">
      {/* Header */}
      <section className="bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 p-space-lg rounded-xl shadow-md space-y-space-2xs">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-xl">cloud_sync</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
            IMD Regional Meteorological Centre, NER
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface">
            Mountain Weather &amp; Precipitation Radar
          </h1>
          <div className="flex items-center gap-space-xs">
            <span className="text-xs font-semibold text-on-surface-variant">Station:</span>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="bg-surface-container-high border border-surface-variant/40 text-on-surface font-label-sm text-label-sm px-space-md py-space-xs rounded-lg"
            >
              <option>Gangtok Ridge (1,650m)</option>
              <option>Cherrapunji AWS (1,430m)</option>
              <option>Tawang Plateau (3,048m)</option>
              <option>Imphal Valley (786m)</option>
            </select>
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Doppler Radar (X-Band Gangtok) active. Subsurface saturation algorithms integrate current precipitation rates to forecast slope liquefaction.
        </p>
      </section>

      {/* Hourly Precipitation Grid */}
      <section className="rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-space-lg shadow-xl space-y-space-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary">schedule</span>
            Hourly Rainfall &amp; Wind Vector Timeline
          </h2>
          <span className="font-label-sm text-label-sm px-space-xs py-space-2xs bg-secondary/15 text-secondary rounded font-mono">
            UPDATED: 11:45 IST
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-space-sm">
          {hourlyForecast.map((h) => (
            <div
              key={h.time}
              className="p-space-sm rounded-lg bg-surface-container-high/70 border border-surface-variant/30 text-center space-y-space-xs"
            >
              <div className="text-xs font-mono font-bold text-on-surface-variant">{h.time}</div>
              <div className="text-xl font-bold text-on-surface">{h.temp}°C</div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-secondary text-2xl">
                  {h.rainMm > 8 ? 'thunderstorm' : h.rainMm > 2 ? 'rainy' : 'cloud'}
                </span>
                <span className="text-xs text-secondary font-bold mt-1">{h.pop}% Rain</span>
              </div>
              <div className="text-[11px] font-mono text-on-surface-variant border-t border-surface-variant/20 pt-1">
                {h.rainMm} mm/h
              </div>
              <div className="text-[10px] text-outline font-mono">{h.wind}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5-Day Projection & Mountain Pass Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-base">
        {/* 5-Day Projection (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-space-lg shadow-xl space-y-space-md">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary">calendar_month</span>
            5-Day Extended Mountain Forecast
          </h3>
          <div className="space-y-space-xs">
            {WEATHER_FORECAST.map((day) => (
              <div
                key={day.dayName}
                className="p-space-sm rounded-lg bg-surface-container-high/60 border border-surface-variant/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-space-md">
                  <span className="material-symbols-outlined text-secondary text-2xl">
                    {day.icon}
                  </span>
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-surface">
                      {day.dayName} ({day.dateStr})
                    </div>
                    <div className="text-xs text-on-surface-variant">{day.condition}</div>
                  </div>
                </div>
                <div className="flex items-center gap-space-lg">
                  <div className="text-right">
                    <span className="text-xs text-on-surface-variant block">Rain Prob</span>
                    <span className="font-label-md text-label-md font-bold text-secondary">
                      {day.rainProbability}% ({day.expectedRainMm}mm)
                    </span>
                  </div>
                  <div className="text-right font-mono font-bold text-on-surface">
                    {day.high}° / {day.low}°
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Altitude Passes (5 Cols) */}
        <div className="lg:col-span-5 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-space-lg shadow-xl space-y-space-md">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary">terrain</span>
            Strategic Mountain Pass Conditions
          </h3>
          <div className="space-y-space-sm">
            {mountainPasses.map((p) => (
              <div
                key={p.name}
                className="p-space-sm rounded-lg bg-surface-container-high/70 border border-surface-variant/30 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    {p.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      p.risk === 'High'
                        ? 'bg-error-container text-on-error'
                        : p.risk === 'Medium'
                        ? 'bg-secondary-container/30 text-secondary'
                        : 'bg-tertiary/20 text-tertiary'
                    }`}
                  >
                    {p.risk} Risk
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>{p.condition}</span>
                  <span className="font-semibold text-on-surface">{p.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-space-xs">
            <button
              onClick={() => onNavigate('risk-map')}
              className="w-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md py-space-xs px-space-md rounded-lg transition-all"
            >
              Overlay Weather onto GIS Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
