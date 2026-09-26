import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/mockData';

interface TrendScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEvacModal: () => void;
}

export const TrendScreen: React.FC<TrendScreenProps> = ({
  onNavigate,
  onOpenEvacModal,
}) => {
  const [activeChartPoint, setActiveChartPoint] = useState<string | null>(null);

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Timestamp,RiskProbability,RainfallRate_mmh,SoilMoisture_pct,PorePressure_kPa,Status\n' +
      '00:00,22,2.1,62,1.8,Safe\n' +
      '04:00,27,4.4,65,2.1,Safe\n' +
      '08:00,35,8.2,71,2.8,Watch\n' +
      '12:00,41,14.0,79,3.4,Watch\n' +
      '16:00,48,11.5,84,3.9,Watch-Peak\n' +
      '20:00,28,3.2,74,2.9,Safe\n' +
      'NOW,18,0.8,68,2.2,Safe';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'slopesence_24hr_telemetry_gangtok.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-6">
      {/* HEADER BAR */}
      <div className="bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 px-6 py-4 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">stacked_line_chart</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm uppercase tracking-wider text-tertiary font-bold">
                Sentinel-1 SAR + IMD In-Sync
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm text-on-surface-variant font-mono">
                Composite 24-Hr Log
              </span>
            </div>
            <h1 className="font-headline-xl text-on-surface font-bold tracking-tight mt-1">
              24-Hour Landslide Risk Trend
            </h1>
          </div>
        </div>

        {/* Quick redirect links */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md transition-all cursor-pointer border border-surface-variant/30"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Overview</span>
          </button>
          <button
            onClick={() => onNavigate('telemetry')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md transition-all cursor-pointer border border-surface-variant/30"
          >
            <span className="material-symbols-outlined text-sm">speed</span>
            <span>Key Telemetry</span>
          </button>
        </div>
      </div>

      {/* TREND ANALYSIS SUMMARY CARD */}
      <div className="rounded-xl bg-surface-container/80 border border-surface-variant/40 backdrop-blur-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h2 className="font-headline-sm font-bold text-on-surface">
              Hourly Composite Probabilistic Scoring
            </h2>
            <p className="font-body-md text-on-surface-variant">
              Hourly probabilistic composite scoring derived from Sentinel-1 SAR backscatter, Doppler rainfall density, and pore pressure probes across the Gangtok corridor.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface-container-high border border-surface-variant/40 px-4 py-2 rounded-full flex-shrink-0">
            <span className="material-symbols-outlined text-tertiary text-lg">trending_down</span>
            <span className="font-label-sm text-tertiary font-bold">
              Risk Trend: Decreasing ↘ (-14% in last 6 hrs)
            </span>
          </div>
        </div>

        {/* Graph Canvas */}
        <div className="relative w-full bg-surface-container-lowest/80 border border-surface-variant/30 rounded-xl p-6 shadow-inner">
          {/* Legend */}
          <div className="flex flex-wrap items-center justify-end gap-5 text-label-sm font-label-sm mb-4">
            <span className="flex items-center gap-1.5 text-error font-semibold">
              <span className="w-3.5 h-1 bg-error rounded-full"></span> Emergency Threshold (85%)
            </span>
            <span className="flex items-center gap-1.5 text-secondary font-semibold">
              <span className="w-3.5 h-1 bg-secondary rounded-full"></span> Warning Threshold (65%)
            </span>
            <span className="flex items-center gap-1.5 text-primary font-semibold">
              <span className="w-3.5 h-1 bg-primary rounded-full"></span> Watch Threshold (40%)
            </span>
            <span className="flex items-center gap-1.5 text-tertiary font-bold">
              <span className="w-3.5 h-1 bg-tertiary rounded-full"></span> Actual Basal (18%)
            </span>
          </div>

          {/* SVG Chart */}
          <div className="relative w-full h-72">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 220">
              <defs>
                <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#29a195" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#4edea3" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#051424" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Threshold Lines */}
              <line stroke="#ffb4ab" strokeDasharray="4 4" strokeOpacity="0.4" strokeWidth="1" x1="40" x2="780" y1="33" y2="33" />
              <text className="text-[10px] font-mono" fill="#ffb4ab" textAnchor="start" x="785" y="37">85%</text>

              <line stroke="#7bd0ff" strokeDasharray="4 4" strokeOpacity="0.4" strokeWidth="1" x1="40" x2="780" y1="77" y2="77" />
              <text className="text-[10px] font-mono" fill="#7bd0ff" textAnchor="start" x="785" y="81">65%</text>

              <line stroke="#6bd8cb" strokeDasharray="4 4" strokeOpacity="0.4" strokeWidth="1" x1="40" x2="780" y1="132" y2="132" />
              <text className="text-[10px] font-mono" fill="#6bd8cb" textAnchor="start" x="785" y="136">40%</text>

              {/* Ground line */}
              <line stroke="#273647" strokeWidth="1.5" x1="40" x2="780" y1="200" y2="200" />

              {/* Area polygon */}
              <polygon
                fill="url(#trendAreaGradient)"
                points="80,171.6 220,160.6 360,143.0 500,129.8 640,114.4 760,180.4 760,200 80,200"
              />

              {/* Curve Stroke */}
              <path
                d="M 80,171.6 C 150,166 180,163 220,160.6 C 280,157 320,148 360,143.0 C 420,135 460,132 500,129.8 C 560,126 600,116 640,114.4 C 690,112 710,175 760,180.4"
                fill="none"
                stroke="#6bd8cb"
                strokeLinecap="round"
                strokeWidth="3.5"
              />

              {/* Markers */}
              <circle
                className="fill-surface stroke-primary cursor-pointer hover:r-6 transition-all"
                cx="80"
                cy="171.6"
                r="4.5"
                strokeWidth="2.5"
                onMouseEnter={() => setActiveChartPoint('00:00 — 22% Probability (Basal Stability)')}
                onMouseLeave={() => setActiveChartPoint(null)}
              />
              <text className="text-[11px] font-mono" fill="#879391" textAnchor="middle" x="80" y="215">00:00 (22%)</text>

              <circle
                className="fill-surface stroke-primary cursor-pointer hover:r-6 transition-all"
                cx="220"
                cy="160.6"
                r="4.5"
                strokeWidth="2.5"
                onMouseEnter={() => setActiveChartPoint('04:00 — 27% Probability (Light Pre-Dawn Shower)')}
                onMouseLeave={() => setActiveChartPoint(null)}
              />
              <text className="text-[11px] font-mono" fill="#879391" textAnchor="middle" x="220" y="215">04:00 (27%)</text>

              <circle
                className="fill-surface stroke-primary cursor-pointer hover:r-6 transition-all"
                cx="360"
                cy="143.0"
                r="4.5"
                strokeWidth="2.5"
                onMouseEnter={() => setActiveChartPoint('08:00 — 35% Probability (Morning Rain Influx)')}
                onMouseLeave={() => setActiveChartPoint(null)}
              />
              <text className="text-[11px] font-mono" fill="#879391" textAnchor="middle" x="360" y="215">08:00 (35%)</text>

              <circle
                className="fill-surface-variant stroke-secondary cursor-pointer hover:r-7 transition-all"
                cx="500"
                cy="129.8"
                r="5.5"
                strokeWidth="2.5"
                onMouseEnter={() => setActiveChartPoint('12:00 — 41% Probability (Watch Threshold Triggered)')}
                onMouseLeave={() => setActiveChartPoint(null)}
              />
              <text className="text-[11px] font-mono font-semibold" fill="#7bd0ff" textAnchor="middle" x="500" y="215">12:00 (41%)</text>

              <circle
                className="fill-surface-variant stroke-secondary cursor-pointer hover:r-7 transition-all"
                cx="640"
                cy="114.4"
                r="5.5"
                strokeWidth="2.5"
                onMouseEnter={() => setActiveChartPoint('16:00 — 48% Probability (Peak Monsoon Pulse: 14mm/h)')}
                onMouseLeave={() => setActiveChartPoint(null)}
              />
              <text className="text-[11px] font-mono font-bold" fill="#7bd0ff" textAnchor="middle" x="640" y="215">16:00 (48%) Peak</text>

              <circle
                className="fill-tertiary stroke-surface cursor-pointer animate-pulse"
                cx="760"
                cy="180.4"
                r="6.5"
                strokeWidth="3"
                onMouseEnter={() => setActiveChartPoint('NOW — 18% Normal Basal Level (Rain paused, drainage active)')}
                onMouseLeave={() => setActiveChartPoint(null)}
              />
              <text className="text-[12px] font-mono font-bold" fill="#4edea3" textAnchor="middle" x="760" y="215">NOW (18%)</text>
            </svg>
          </div>

          {activeChartPoint ? (
            <div className="mt-3 p-2 rounded-lg bg-surface-container border border-primary/30 text-center font-mono text-sm text-primary animate-fade-in">
              Active Inspector: {activeChartPoint}
            </div>
          ) : (
            <div className="mt-3 text-center font-body-sm text-on-surface-variant">
              Hover over markers to inspect exact hourly sensor weights and probabilistic factors
            </div>
          )}
        </div>

        {/* Summary Metric Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-1">
            <span className="font-label-sm text-on-surface-variant block">Subsurface Runoff</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              <span className="font-label-lg font-bold text-tertiary">+4.2 mm/hr Drainage</span>
            </div>
            <p className="font-body-sm text-on-surface-variant">Rapid pore-water dissipation reducing shear stress.</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-1">
            <span className="font-label-sm text-on-surface-variant block">Radar Reliability</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span className="font-label-lg font-bold text-secondary">98.7% Doppler Coverage</span>
            </div>
            <p className="font-body-sm text-on-surface-variant">IMD Gangtok direct line-of-sight across Teesta basin.</p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-1 flex flex-col justify-between">
            <span className="font-label-sm text-on-surface-variant block">Data Archival</span>
            <button
              onClick={handleExportCsv}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 font-label-md font-semibold transition-all cursor-pointer border border-primary/20"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export 24-hr CSV Log</span>
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER NAVIGATION PILLS */}
      <div className="rounded-xl bg-surface-container-low border border-surface-variant/30 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={ASSETS.NDMA_EMBLEM} alt="NDMA India" className="w-8 h-8 object-contain" />
          <div className="font-body-sm text-on-surface-variant">
            Jump to other operational intelligence screens:
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('telemetry')}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-semibold cursor-pointer border border-surface-variant/40 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">speed</span>
            <span>Sensor Telemetry</span>
          </button>
          <button
            onClick={() => onNavigate('risk-analysis')}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md font-semibold cursor-pointer shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">psychology</span>
            <span>SHAP Attribution Engine</span>
          </button>
          <button
            onClick={() => onNavigate('risk-map')}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-semibold cursor-pointer border border-surface-variant/40 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">explore</span>
            <span>Tactical Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
