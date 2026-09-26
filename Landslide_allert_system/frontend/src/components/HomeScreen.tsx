import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEvacModal: () => void;
  selectedTerritory: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenEvacModal,
  selectedTerritory,
}) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Gangtok, East Sikkim');

  const locations = [
    { name: 'Gangtok, East Sikkim', coords: '27.33° N, 88.61° E', elev: '1,650m MSL', risk: 'Low (18%)' },
    { name: 'Dikchu-Singtam Corridor', coords: '27.24° N, 88.51° E', elev: '1,210m MSL', risk: 'Critical (89%)' },
    { name: 'Mangan North Ridge', coords: '27.50° N, 88.53° E', elev: '1,980m MSL', risk: 'Watch (44%)' },
    { name: 'Pakyong Airport Approach', coords: '27.22° N, 88.58° E', elev: '1,390m MSL', risk: 'Safe (32%)' },
  ];

  return (
    <div className="flex flex-col w-full pb-8 space-y-6">
      {/* SECTION DIRECT LINK SWITCHER STRIP (NON-SCROLLING DIRECT REDIRECTS) */}
      <section className="bg-surface-container-low/95 backdrop-blur-xl border border-surface-variant/40 p-2.5 rounded-xl shadow-md flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 flex-nowrap">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-2 hidden sm:inline-block">
            Sections:
          </span>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md font-bold shadow-sm whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-base">shield</span>
            <span>Overview</span>
          </button>
          <button
            onClick={() => onNavigate('telemetry')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md font-semibold transition-all cursor-pointer whitespace-nowrap border border-surface-variant/20"
          >
            <span className="material-symbols-outlined text-base text-primary">speed</span>
            <span>Key Telemetry</span>
          </button>
          <button
            onClick={() => onNavigate('trend')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md font-semibold transition-all cursor-pointer whitespace-nowrap border border-surface-variant/20"
          >
            <span className="material-symbols-outlined text-base text-secondary">show_chart</span>
            <span>24-Hr Risk Trend</span>
          </button>
          <button
            onClick={() => onNavigate('surveillance')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md font-semibold transition-all cursor-pointer whitespace-nowrap border border-surface-variant/20"
          >
            <span className="material-symbols-outlined text-base text-secondary">videocam</span>
            <span>Highway Surveillance</span>
          </button>
          <button
            onClick={() => onNavigate('resilience')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md font-semibold transition-all cursor-pointer whitespace-nowrap border border-surface-variant/20"
          >
            <span className="material-symbols-outlined text-base text-tertiary">perm_phone_msg</span>
            <span>SMS Resilience</span>
          </button>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onNavigate('risk-analysis')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary/15 text-secondary hover:bg-secondary/25 font-label-md font-bold transition-all cursor-pointer border border-secondary/25 whitespace-nowrap"
          >
            <span>AI SHAP Analysis</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* LOCATION CONTEXT BAR */}
      <section className="bg-surface-container-low/80 backdrop-blur-xl border border-surface-variant/30 px-6 py-4 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">location_on</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline-sm font-bold text-on-surface">
                {selectedLocation}
              </span>
              <span className="font-label-sm text-on-surface-variant font-mono">
                (27.33° N, 88.61° E)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm text-tertiary font-bold tracking-wider uppercase">
                LIVE SENSOR FEED IN-SYNC
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm text-on-surface-variant">Elev: 1,650m MSL</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowLocationModal(true)}
          className="flex items-center gap-1.5 bg-primary text-on-primary font-label-md font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-base">pin_drop</span>
          <span>Switch Station</span>
        </button>
      </section>

      {/* STATUS STRIP: IMMEDIATE ASSESSMENT RESULT */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-surface-container/70 border border-tertiary/20 p-5 rounded-xl shadow-sm">
        <div className="md:col-span-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-tertiary/15 flex items-center justify-center flex-shrink-0 text-tertiary border border-tertiary/25">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div className="space-y-0.5">
            <div className="font-label-sm uppercase tracking-wider text-tertiary font-bold">
              Immediate Assessment Result
            </div>
            <div className="font-headline-sm text-on-surface font-semibold">
              Your location is currently safe from active landslide displacement.
            </div>
          </div>
        </div>
        <div className="md:col-span-4 flex md:justify-end items-center">
          <span className="font-label-sm px-4 py-1.5 rounded-full bg-tertiary/15 border border-tertiary/30 text-tertiary font-bold uppercase tracking-wider">
            STATUS: SAFE • STABLE SHEAR PLANE
          </span>
        </div>
      </section>

      {/* HERO RISK CARD & TELEMETRY SUMMARY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. HERO RISK CARD (8 COLS) */}
        <div className="lg:col-span-8 relative overflow-hidden rounded-xl bg-surface-container/85 backdrop-blur-xl p-6 shadow-xl border border-surface-variant/40 flex flex-col justify-between space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 via-tertiary/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>
          <div>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">shield_with_heart</span>
                <span className="font-label-sm uppercase tracking-widest text-on-surface-variant font-bold">
                  Primary Telemetry Directive
                </span>
              </div>
              <span className="font-label-sm px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-mono">
                REF ID: SLP-SKM-2025-08A
              </span>
            </div>

            {/* Gauge & Narrative */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Circular Gauge */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-2">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      className="text-surface-variant/40"
                      cx="60"
                      cy="60"
                      fill="transparent"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <defs>
                      <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4edea3" />
                        <stop offset="100%" stopColor="#6bd8cb" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="60"
                      cy="60"
                      fill="transparent"
                      r="50"
                      stroke="url(#riskGrad)"
                      strokeDasharray="314.16"
                      strokeDashoffset="257.61"
                      strokeLinecap="round"
                      strokeWidth="8"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display-lg font-bold text-on-surface leading-none">
                      18<span className="text-primary text-xl">%</span>
                    </span>
                    <span className="font-label-sm uppercase tracking-wider text-on-surface-variant mt-1">
                      Probability
                    </span>
                    <span className="font-label-sm text-tertiary font-bold mt-1">
                      NORMAL BASAL LEVEL
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                  <span className="font-label-sm text-tertiary font-semibold">
                    Sensor InSAR In-Sync
                  </span>
                </div>
              </div>

              {/* Narrative & Quick Specs */}
              <div className="sm:col-span-7 space-y-3">
                <div>
                  <span className="font-label-sm text-tertiary uppercase tracking-wider font-bold">
                    CURRENT LANDSLIDE RISK
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-headline-xl font-bold text-on-surface">
                      LOW RISK
                    </span>
                    <span className="px-3 py-1 rounded-full bg-tertiary/15 text-tertiary font-label-sm font-bold">
                      TIER 1 (GREEN)
                    </span>
                  </div>
                </div>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Current location is showing stable geological conditions. Subsurface pore-water pressure along the Gangtok-Nathula highway slope corridor has drained below the stability threshold. No immediate threat detected.
                </p>
                <div className="p-3 rounded-xl bg-surface-container-high/60 border border-surface-variant/30 space-y-1.5">
                  <div className="flex items-center justify-between font-label-sm">
                    <span className="text-on-surface font-semibold">Risk Window:</span>
                    <span className="text-tertiary font-bold">Stable (Next 48 Hours)</span>
                  </div>
                  <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full w-[18%] rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-primary">radar</span>
                    <span>Updated 5m ago via GSI &amp; IMD Doppler</span>
                  </span>
                  <span className="text-primary font-mono font-medium">99.4% CONF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Strip */}
          <div className="pt-4 border-t border-surface-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-label-sm px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-mono">
                MODEL: NER-XGBoost-V4.2
              </span>
              <span className="font-label-sm text-on-surface-variant">
                Next pass: 14:20 IST
              </span>
            </div>
            <button
              onClick={() => onNavigate('risk-analysis')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-on-primary font-label-md font-semibold px-5 py-2.5 rounded-lg shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer"
              type="button"
            >
              <span>View Detailed SHAP Analysis</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 2. HIGHWAY OPTICAL FEED PREVIEW (4 COLS) */}
        <div className="lg:col-span-4 rounded-xl overflow-hidden bg-surface-container-low border border-surface-variant/40 shadow-xl flex flex-col justify-between">
          <div
            className="w-full h-44 bg-cover bg-center relative group cursor-pointer"
            style={{ backgroundImage: `url('${ASSETS.HIGHWAY_CAM}')` }}
            onClick={() => onNavigate('surveillance')}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-black/40"></div>
            <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-primary flex items-center gap-1.5 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
              <span>LIVE CAM NH-10</span>
            </div>
            <div className="absolute bottom-2.5 right-2.5 bg-surface-container-lowest/80 px-2 py-0.5 rounded text-xs text-secondary font-mono">
              Click to Open Full View
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary font-mono">
                NH-10 GANGTOK CORRIDOR
              </span>
              <span className="font-label-sm px-2 py-0.5 rounded-full bg-tertiary/20 text-tertiary font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> PASSABLE
              </span>
            </div>

            <div className="space-y-2 text-xs text-on-surface-variant">
              <div className="flex justify-between py-1 border-b border-surface-variant/20">
                <span>Roadbed Displacement:</span>
                <span className="text-on-surface font-mono font-semibold">&lt; 0.2 mm/day</span>
              </div>
              <div className="flex justify-between py-1 border-b border-surface-variant/20">
                <span>Slope Inclinometer #4:</span>
                <span className="text-tertiary font-mono font-semibold">0.03° Deviation</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Rockfall Netting Tension:</span>
                <span className="text-on-surface font-mono font-semibold">Normal (4.2 kN)</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('surveillance')}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-semibold transition-all cursor-pointer border border-surface-variant/30"
            >
              <span className="material-symbols-outlined text-sm">videocam</span>
              <span>Open Highway Surveillance</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION DIRECT JUMP TILES: REDIRECT ON CLICK INSTEAD OF SCROLLING */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">grid_view</span>
            <h2 className="font-headline-sm font-bold text-on-surface">
              Operational Intelligence Sections
            </h2>
          </div>
          <span className="font-label-sm text-on-surface-variant">
            Click any section below to redirect instantly:
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tile 1: Key Telemetry */}
          <div
            onClick={() => onNavigate('telemetry')}
            className="p-5 rounded-xl bg-surface-container/80 border border-surface-variant/40 hover:border-primary/50 hover:bg-surface-container cursor-pointer transition-all shadow-md group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">speed</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                arrow_forward
              </span>
            </div>
            <div>
              <div className="font-headline-sm text-on-surface font-bold">Key Telemetry</div>
              <p className="font-body-sm text-on-surface-variant mt-1">
                Live readings for Rainfall (86mm), Soil Moisture (68%), and Slope Factor of Safety (1.42).
              </p>
            </div>
            <div className="pt-2 border-t border-surface-variant/20 flex justify-between items-center text-xs">
              <span className="text-tertiary font-semibold">4 Sensors Online</span>
              <span className="text-primary font-mono">Redirect →</span>
            </div>
          </div>

          {/* Tile 2: 24-Hr Risk Trend */}
          <div
            onClick={() => onNavigate('trend')}
            className="p-5 rounded-xl bg-surface-container/80 border border-surface-variant/40 hover:border-secondary/50 hover:bg-surface-container cursor-pointer transition-all shadow-md group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">show_chart</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">
                arrow_forward
              </span>
            </div>
            <div>
              <div className="font-headline-sm text-on-surface font-bold">24-Hour Trend Graph</div>
              <p className="font-body-sm text-on-surface-variant mt-1">
                Hourly probabilistic curve, Sentinel-1 radar backscatter, peak markers, and CSV log export.
              </p>
            </div>
            <div className="pt-2 border-t border-surface-variant/20 flex justify-between items-center text-xs">
              <span className="text-secondary font-semibold">-14% last 6 hrs</span>
              <span className="text-secondary font-mono">Redirect →</span>
            </div>
          </div>

          {/* Tile 3: Tactical GIS Risk Map */}
          <div
            onClick={() => onNavigate('risk-map')}
            className="p-5 rounded-xl bg-surface-container/80 border border-surface-variant/40 hover:border-tertiary/50 hover:bg-surface-container cursor-pointer transition-all shadow-md group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-tertiary/15 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">explore</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-tertiary transition-colors">
                arrow_forward
              </span>
            </div>
            <div>
              <div className="font-headline-sm text-on-surface font-bold">Tactical GIS Map</div>
              <p className="font-body-sm text-on-surface-variant mt-1">
                Spatial contours, Teesta River corridor, safe haven shelter routing, and pin inspector.
              </p>
            </div>
            <div className="pt-2 border-t border-surface-variant/20 flex justify-between items-center text-xs">
              <span className="text-tertiary font-semibold">4 Active Sectors</span>
              <span className="text-tertiary font-mono">Redirect →</span>
            </div>
          </div>

          {/* Tile 4: Emergency Evacuation HUD */}
          <div
            onClick={() => onNavigate('emergency')}
            className="p-5 rounded-xl bg-surface-container/80 border border-surface-variant/40 hover:border-error/50 hover:bg-surface-container cursor-pointer transition-all shadow-md group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-error-container/40 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-error transition-colors">
                arrow_forward
              </span>
            </div>
            <div>
              <div className="font-headline-sm text-on-surface font-bold">Critical Emergency HUD</div>
              <p className="font-body-sm text-on-surface-variant mt-1">
                Dikchu-Singtam 89% disaster response, safe routes, 5-step checklist, and NDRF hotline.
              </p>
            </div>
            <div className="pt-2 border-t border-surface-variant/20 flex justify-between items-center text-xs">
              <span className="text-error font-semibold">Tier 4 Alert Ready</span>
              <span className="text-error font-mono">Redirect →</span>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL DISASTER PROTOCOL FOOTER */}
      <section className="rounded-xl bg-surface-container-low border border-surface-variant/30 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-primary-container/20 border border-primary/25 flex items-center justify-center flex-shrink-0">
            <img
              className="w-7 h-7 object-contain"
              alt="National Disaster Management Authority of India"
              src={ASSETS.NDMA_EMBLEM}
            />
          </div>
          <div className="space-y-0.5">
            <span className="font-label-sm uppercase tracking-wider text-primary font-bold">
              Government of India • NDMA / Sikkim SDMA Channel
            </span>
            <p className="font-body-sm text-on-surface-variant">
              DDMA Gangtok Control Room: +91 3592 284444 • Toll-Free Helpline: 1077
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigate('risk-map')}
            className="w-full md:w-auto bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer border border-surface-variant/40"
            type="button"
          >
            Evacuation Map
          </button>
          <button
            onClick={onOpenEvacModal}
            className="w-full md:w-auto bg-error-container text-on-error hover:opacity-90 font-label-md font-bold px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            type="button"
          >
            <span className="material-symbols-outlined text-base">sos</span>
            <span>SOS Broadcast</span>
          </button>
        </div>
      </section>

      {/* MODAL: CHANGE LOCATION */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-low border border-surface-variant/50 max-w-md w-full rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-on-surface font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">pin_drop</span>
                Switch Telemetry Station
              </h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-body-sm text-on-surface-variant">
              Select an active telemetry station in the Sikkim-Darjeeling Himalayas:
            </p>
            <div className="space-y-2">
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setSelectedLocation(loc.name);
                    setShowLocationModal(false);
                  }}
                  className={`w-full p-3 rounded-lg text-left border flex items-center justify-between transition-all cursor-pointer ${
                    selectedLocation === loc.name
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-surface-container hover:bg-surface-container-high border-surface-variant/30 text-on-surface'
                  }`}
                >
                  <div>
                    <div className="font-label-md font-bold">{loc.name}</div>
                    <div className="font-body-sm text-on-surface-variant">
                      {loc.coords} • {loc.elev}
                    </div>
                  </div>
                  <span className="font-label-sm px-2 py-0.5 rounded bg-surface-variant text-on-surface">
                    {loc.risk}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
