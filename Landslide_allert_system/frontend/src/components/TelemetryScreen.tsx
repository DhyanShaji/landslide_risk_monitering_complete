import React from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/mockData';

interface TelemetryScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEvacModal: () => void;
}

export const TelemetryScreen: React.FC<TelemetryScreenProps> = ({
  onNavigate,
  onOpenEvacModal,
}) => {
  return (
    <div className="flex flex-col w-full pb-8 space-y-6">
      {/* SECTION BREADCRUMB & HEADER */}
      <div className="bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 px-6 py-4 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">speed</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm uppercase tracking-wider text-tertiary font-bold">
                Live Sensor Net Active
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm text-on-surface-variant font-mono">
                Station: Gangtok Hub (1,650m MSL)
              </span>
            </div>
            <h1 className="font-headline-xl text-on-surface font-bold tracking-tight mt-1">
              Key Environmental Telemetry
            </h1>
          </div>
        </div>

        {/* Quick redirect links to neighboring sections */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md transition-all cursor-pointer border border-surface-variant/30"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Overview</span>
          </button>
          <button
            onClick={() => onNavigate('trend')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 font-label-md font-semibold transition-all cursor-pointer border border-primary/20"
          >
            <span>View 24-hr Trends</span>
            <span className="material-symbols-outlined text-sm">trending_up</span>
          </button>
        </div>
      </div>

      {/* TELEMETRY CARDS (4 CORE SENSORS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Sensor 1: Cumulative Rainfall */}
        <div className="rounded-xl bg-surface-container/80 border border-surface-variant/40 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-secondary/50 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm px-2.5 py-1 rounded bg-surface-variant text-on-surface-variant font-bold tracking-wider uppercase">
                IMD DOPPLER + GAUGE
              </span>
              <span className="font-label-sm px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-bold">
                Moderate Rate
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4 text-on-surface-variant font-label-md">
              <span className="material-symbols-outlined text-secondary text-xl">rainy</span>
              <span className="font-semibold text-on-surface">Rainfall (Cumulative)</span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-telemetry-num text-on-surface text-3xl font-bold">86</span>
              <span className="font-body-md text-on-surface-variant">mm / 24h</span>
            </div>
          </div>

          {/* Sparkline & Details */}
          <div className="pt-3 border-t border-surface-variant/30 space-y-3">
            <div className="flex justify-between font-label-sm text-on-surface-variant">
              <span>Peak: 14mm/h at 11:30</span>
              <span className="text-tertiary font-semibold">Decreasing (-3mm/h)</span>
            </div>
            <svg className="w-full h-10 overflow-visible text-secondary" fill="none" viewBox="0 0 100 24">
              <path
                d="M 0,20 Q 20,22 35,14 T 65,4 T 85,16 T 100,18"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <circle className="fill-secondary" cx="100" cy="18" r="3.5" />
            </svg>
            <div className="p-2.5 rounded bg-surface-container-high/60 text-xs text-on-surface-variant flex justify-between">
              <span>Threshold: 120mm</span>
              <span className="text-secondary font-mono font-semibold">34mm Margin Remaining</span>
            </div>
          </div>
        </div>

        {/* Sensor 2: Soil Moisture */}
        <div className="rounded-xl bg-surface-container/80 border border-surface-variant/40 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-primary/50 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm px-2.5 py-1 rounded bg-surface-variant text-on-surface-variant font-bold tracking-wider uppercase">
                FIBER-OPTIC PIEZOMETER
              </span>
              <span className="font-label-sm px-2.5 py-1 rounded-full bg-primary/15 text-primary font-bold">
                Basal Normal
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4 text-on-surface-variant font-label-md">
              <span className="material-symbols-outlined text-primary text-xl">water_drop</span>
              <span className="font-semibold text-on-surface">Volumetric Soil Moisture</span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-telemetry-num text-on-surface text-3xl font-bold">68</span>
              <span className="font-body-md text-on-surface-variant">% Saturation</span>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-variant/30 space-y-3">
            <div className="flex justify-between font-label-sm text-on-surface-variant">
              <span>Saturation Index</span>
              <span className="text-on-surface font-mono font-semibold">0.68 / 1.0 (Critical: 0.85)</span>
            </div>
            <div className="w-full bg-surface-variant h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[68%] rounded-full transition-all duration-500"></div>
            </div>
            <div className="p-2.5 rounded bg-surface-container-high/60 text-xs text-on-surface-variant flex justify-between">
              <span>Sensor Depth: 1.5m</span>
              <span className="text-tertiary font-mono font-semibold">Runoff: Good</span>
            </div>
          </div>
        </div>

        {/* Sensor 3: Slope Stability (Factor of Safety) */}
        <div className="rounded-xl bg-surface-container/80 border border-surface-variant/40 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-tertiary/50 transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm px-2.5 py-1 rounded bg-surface-variant text-on-surface-variant font-bold tracking-wider uppercase">
                INSAT-3DR SAR + GNSS
              </span>
              <span className="font-label-sm px-2.5 py-1 rounded-full bg-tertiary/15 text-tertiary font-bold">
                Good State
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4 text-on-surface-variant font-label-md">
              <span className="material-symbols-outlined text-tertiary text-xl">landscape</span>
              <span className="font-semibold text-on-surface">Slope Stability (FoS)</span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-telemetry-num text-tertiary text-3xl font-bold">1.42</span>
              <span className="font-body-md text-on-surface-variant">Factor of Safety</span>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-variant/30 space-y-3">
            <div className="flex justify-between font-label-sm text-on-surface-variant">
              <span>Critical Cutoff: FoS &lt; 1.0</span>
              <span className="text-tertiary font-semibold">+0.42 Margin</span>
            </div>
            <div className="w-full bg-surface-variant h-2.5 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full w-[78%] rounded-full transition-all duration-500"></div>
            </div>
            <div className="p-2.5 rounded bg-surface-container-high/60 text-xs text-on-surface-variant flex justify-between">
              <span>Displacement Rate:</span>
              <span className="text-tertiary font-mono font-semibold">&lt; 0.2 mm / day</span>
            </div>
          </div>
        </div>

        {/* Sensor 4: Atmospheric & Microclimate */}
        <div className="rounded-xl bg-surface-container/80 border border-surface-variant/40 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-surface-variant transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm px-2.5 py-1 rounded bg-surface-variant text-on-surface-variant font-bold tracking-wider uppercase">
                IMD GANGTOK RMC
              </span>
              <span className="font-label-sm px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-bold">
                Normal Microclimate
              </span>
            </div>

            <div className="flex items-center gap-2 mt-4 text-on-surface-variant font-label-md">
              <span className="material-symbols-outlined text-on-surface-variant text-xl">thermostat</span>
              <span className="font-semibold text-on-surface">Ambient Atmosphere</span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-telemetry-num text-on-surface text-3xl font-bold">24°C</span>
              <span className="font-body-md text-on-surface-variant">(Humidity: 82%)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-surface-variant/30 space-y-3">
            <div className="flex justify-between font-label-sm text-on-surface-variant">
              <span>Dew Point: 20.8°C</span>
              <span className="text-on-surface font-mono">1008 hPa</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm">
              <span className="material-symbols-outlined text-base text-primary">air</span>
              <span>Wind: 14 km/h ENE (Mountain Breeze)</span>
            </div>
            <div className="p-2.5 rounded bg-surface-container-high/60 text-xs text-on-surface-variant flex justify-between">
              <span>Inversion Layer:</span>
              <span className="text-on-surface font-mono font-semibold">1,900m MSL</span>
            </div>
          </div>
        </div>
      </div>

      {/* ADDITIONAL SENSOR GRID: SOIL DRAINAGE, VIBRATION, INCLINOMETERS */}
      <div className="rounded-xl bg-surface-container/80 border border-surface-variant/40 p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-headline-sm text-on-surface font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">sensors</span>
              Subsurface Sensor Array Status
            </h3>
            <p className="font-body-sm text-on-surface-variant">
              Continuous 60-second telemetry polling across all 12 borehole probe nodes along Gangtok Ridge.
            </p>
          </div>
          <span className="font-label-sm px-3 py-1 rounded-full bg-tertiary/15 text-tertiary font-bold border border-tertiary/30">
            12 OF 12 NODES HEALTHY (100% OPERATIONAL)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-2">
            <div className="flex justify-between text-xs text-on-surface-variant font-semibold">
              <span>Drainage Velocity:</span>
              <span className="text-tertiary font-mono">+4.2 mm/hr</span>
            </div>
            <div className="font-body-sm text-on-surface">Effective subterranean runoff actively preventing hydrostatic head buildup.</div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-2">
            <div className="flex justify-between text-xs text-on-surface-variant font-semibold">
              <span>Inclinometer Deviation:</span>
              <span className="text-tertiary font-mono">0.03° (Normal)</span>
            </div>
            <div className="font-body-sm text-on-surface">Angular deviation within basal tolerance threshold (&lt;0.15°).</div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-2">
            <div className="flex justify-between text-xs text-on-surface-variant font-semibold">
              <span>Netting Cable Tension:</span>
              <span className="text-on-surface font-mono">4.2 kN (Calibrated)</span>
            </div>
            <div className="font-body-sm text-on-surface">Rockfall mitigation drape lines showing standard tensile stress.</div>
          </div>
        </div>
      </div>

      {/* QUICK SECTION JUMP FOOTER */}
      <div className="rounded-xl bg-surface-container-low border border-surface-variant/30 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={ASSETS.NDMA_EMBLEM} alt="NDMA India" className="w-8 h-8 object-contain" />
          <div>
            <div className="font-label-sm uppercase tracking-wider text-primary font-bold">
              Related Operational Sections
            </div>
            <div className="font-body-sm text-on-surface-variant">
              Jump directly to connected analytical and geospatial modules:
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('trend')}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-semibold cursor-pointer border border-surface-variant/40 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">show_chart</span>
            <span>24-Hour Trend Graph</span>
          </button>
          <button
            onClick={() => onNavigate('surveillance')}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-semibold cursor-pointer border border-surface-variant/40 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">videocam</span>
            <span>Highway Surveillance</span>
          </button>
          <button
            onClick={() => onNavigate('risk-map')}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-semibold cursor-pointer border border-surface-variant/40 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">explore</span>
            <span>Tactical GIS Map</span>
          </button>
          <button
            onClick={() => onNavigate('risk-analysis')}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md font-semibold cursor-pointer shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">analytics</span>
            <span>AI Risk Analysis</span>
          </button>
        </div>
      </div>
    </div>
  );
};
