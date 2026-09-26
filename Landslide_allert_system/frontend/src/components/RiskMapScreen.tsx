import React, { useState } from 'react';
import { MapPin, RiskTier, ScreenId } from '../types';
import { MAP_PINS, TERRITORIES } from '../data/mockData';

interface RiskMapScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEvacModal: () => void;
  selectedTerritory: string;
  onSelectTerritory: (id: string) => void;
}

export const RiskMapScreen: React.FC<RiskMapScreenProps> = ({
  onNavigate,
  onOpenEvacModal,
  selectedTerritory,
  onSelectTerritory,
}) => {
  const [selectedPinId, setSelectedPinId] = useState<string>('gangtok-ridge');
  const [activeTierFilter, setActiveTierFilter] = useState<string>('all');
  const [timeWindow, setTimeWindow] = useState<string>('24h');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [basemap, setBasemap] = useState<'topo' | 'satellite' | 'dem'>('topo');

  // Layers toggles
  const [showContours, setShowContours] = useState<boolean>(true);
  const [showRadar, setShowRadar] = useState<boolean>(true);
  const [showSensors, setShowSensors] = useState<boolean>(true);
  const [showScars, setShowScars] = useState<boolean>(true);
  const [showShelters, setShowShelters] = useState<boolean>(true);

  const selectedPin = MAP_PINS.find((p) => p.id === selectedPinId) || MAP_PINS[1];

  const filteredPins = MAP_PINS.filter((pin) => {
    if (activeTierFilter === 'all') return true;
    if (activeTierFilter === 'emergency') return pin.tier === 'Tier 4';
    if (activeTierFilter === 'warning') return pin.tier === 'Tier 3';
    if (activeTierFilter === 'watch') return pin.tier === 'Tier 2';
    if (activeTierFilter === 'low') return pin.tier === 'Tier 1' && pin.type !== 'shelter';
    if (activeTierFilter === 'shelter') return pin.type === 'shelter';
    return true;
  });

  const getTierBadge = (tier: RiskTier) => {
    switch (tier) {
      case 'Tier 4':
        return { label: 'Level 4 Critical Emergency', bg: 'bg-error-container text-on-error' };
      case 'Tier 3':
        return { label: 'Level 3 High Warning', bg: 'bg-secondary-container/30 text-secondary border border-secondary/40' };
      case 'Tier 2':
        return { label: 'Level 2 Watch', bg: 'bg-primary/20 text-primary border border-primary/40' };
      default:
        return { label: 'Level 1 Safe / Low Risk', bg: 'bg-tertiary/20 text-tertiary border border-tertiary/40' };
    }
  };

  const handleDownloadOfflineMap = () => {
    alert('Offline Vector Map Bundle for Sector 4 (MBTiles format, 42MB) saved to local device cache for disconnected field operation.');
  };

  return (
    <div className="flex flex-col w-full pb-space-2xl space-y-space-md">
      {/* 1. TOP GIS FILTER BAR */}
      <section className="bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 p-space-md rounded-xl shadow-md space-y-space-sm">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          {/* Territory & Sector Pickers */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-xl">map</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">Territory:</span>
              <select
                value={selectedTerritory}
                onChange={(e) => onSelectTerritory(e.target.value)}
                className="bg-surface-container-high border border-surface-variant/40 text-on-surface font-label-sm text-label-sm px-space-md py-space-xs rounded-lg focus:outline-none cursor-pointer"
              >
                {TERRITORIES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-space-xs">
              <span className="font-label-md text-label-md text-on-surface font-semibold">Target Sector:</span>
              <select
                value={selectedPinId}
                onChange={(e) => setSelectedPinId(e.target.value)}
                className="bg-surface-container-high border border-surface-variant/40 text-on-surface font-label-sm text-label-sm px-space-md py-space-xs rounded-lg focus:outline-none cursor-pointer"
              >
                {MAP_PINS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Window Toggles */}
          <div className="flex items-center bg-surface-container-high/80 p-space-2xs rounded-lg border border-surface-variant/30">
            <span className="font-label-sm text-label-sm text-on-surface-variant px-space-xs uppercase font-semibold">
              Forecast Window:
            </span>
            {['6h', '12h', '24h', '48h', '72h'].map((w) => (
              <button
                key={w}
                onClick={() => setTimeWindow(w)}
                className={`px-space-sm py-space-2xs rounded font-label-sm text-label-sm transition-all ${
                  timeWindow === w
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {w === '24h' ? 'Next 24h' : w}
              </button>
            ))}
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm px-space-xs py-space-2xs rounded bg-tertiary/15 text-tertiary font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span> LIVE GIS FEED
            </span>
            <span className="font-label-sm text-label-sm px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-mono">
              SYNC: 100%
            </span>
          </div>
        </div>

        {/* Subfilter Row: Threat Category & Active Layer Checkboxes */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs border-t border-surface-variant/20">
          {/* Threat Tiers */}
          <div className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm">
            <span className="text-on-surface-variant uppercase font-semibold">Filter:</span>
            {[
              { id: 'all', label: 'All Sectors (189)' },
              { id: 'emergency', label: 'Emergency (2)', class: 'text-error' },
              { id: 'warning', label: 'Warning (7)', class: 'text-secondary' },
              { id: 'watch', label: 'Watch (38)', class: 'text-primary' },
              { id: 'low', label: 'Low Risk (142)', class: 'text-tertiary' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveTierFilter(f.id)}
                className={`px-space-sm py-space-2xs rounded-full transition-all cursor-pointer ${
                  activeTierFilter === f.id
                    ? 'bg-surface-variant text-on-surface font-bold border border-primary/50'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                } ${f.class || ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Active Layer Toggles */}
          <div className="flex flex-wrap items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
            <label className="flex items-center gap-space-xs cursor-pointer hover:text-on-surface">
              <input
                type="checkbox"
                checked={showContours}
                onChange={(e) => setShowContours(e.target.checked)}
                className="accent-primary"
              />
              <span>Topographic Contours</span>
            </label>
            <label className="flex items-center gap-space-xs cursor-pointer hover:text-on-surface">
              <input
                type="checkbox"
                checked={showRadar}
                onChange={(e) => setShowRadar(e.target.checked)}
                className="accent-secondary"
              />
              <span>Precipitation Radar</span>
            </label>
            <label className="flex items-center gap-space-xs cursor-pointer hover:text-on-surface">
              <input
                type="checkbox"
                checked={showSensors}
                onChange={(e) => setShowSensors(e.target.checked)}
                className="accent-tertiary"
              />
              <span>IoT Piezometers</span>
            </label>
            <label className="flex items-center gap-space-xs cursor-pointer hover:text-on-surface">
              <input
                type="checkbox"
                checked={showScars}
                onChange={(e) => setShowScars(e.target.checked)}
                className="accent-error"
              />
              <span>Historic Scars</span>
            </label>
            <label className="flex items-center gap-space-xs cursor-pointer hover:text-on-surface">
              <input
                type="checkbox"
                checked={showShelters}
                onChange={(e) => setShowShelters(e.target.checked)}
                className="accent-primary"
              />
              <span>Safe Havens</span>
            </label>
          </div>
        </div>
      </section>

      {/* 2. MAIN SPLIT VIEW: INTERACTIVE MAP CANVAS (8 COLS) + DOCKED LATERAL INSPECTOR (4 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-base">
        {/* MAP CANVAS (8 COLS) */}
        <div className="lg:col-span-8 rounded-xl overflow-hidden bg-surface-container-lowest border border-surface-variant/40 shadow-2xl relative flex flex-col h-[640px]">
          {/* Map Controls Floating Overlay */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-space-xs">
            <div className="bg-surface-container-high/90 backdrop-blur-md rounded-lg border border-surface-variant/40 shadow-lg flex flex-col overflow-hidden">
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-2 hover:bg-surface-variant text-on-surface transition-colors"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-lg">add</span>
              </button>
              <div className="h-px bg-surface-variant/40"></div>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                className="p-2 hover:bg-surface-variant text-on-surface transition-colors"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-lg">remove</span>
              </button>
            </div>

            <button
              onClick={() => setZoomLevel(1)}
              className="bg-surface-container-high/90 backdrop-blur-md p-2 rounded-lg border border-surface-variant/40 shadow-lg hover:bg-surface-variant text-on-surface transition-colors"
              title="Reset View (North Up)"
            >
              <span className="material-symbols-outlined text-lg text-primary">navigation</span>
            </button>

            <button
              onClick={() => setSelectedPinId('gangtok-ridge')}
              className="bg-surface-container-high/90 backdrop-blur-md p-2 rounded-lg border border-surface-variant/40 shadow-lg hover:bg-surface-variant text-on-surface transition-colors"
              title="My Position (GPS GPS-8429)"
            >
              <span className="material-symbols-outlined text-lg text-tertiary">my_location</span>
            </button>
          </div>

          {/* Basemap Switcher Floating Overlay */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-space-xs bg-surface-container-high/90 backdrop-blur-md p-space-2xs rounded-lg border border-surface-variant/40 shadow-lg font-label-sm text-label-sm">
            {(['topo', 'satellite', 'dem'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBasemap(b)}
                className={`px-space-sm py-space-2xs rounded uppercase transition-all ${
                  basemap === b
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {b === 'topo' ? 'Topographic' : b === 'satellite' ? 'Satellite' : 'DEM Shaded'}
              </button>
            ))}
          </div>

          {/* Scale Bar & GIS Attribution */}
          <div className="absolute bottom-4 left-4 z-20 bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-space-2xs rounded border border-surface-variant/30 text-xs font-mono text-on-surface-variant flex items-center gap-space-md">
            <span>SCALE: 1:50,000</span>
            <div className="flex items-center gap-1">
              <span className="w-12 h-1 bg-on-surface-variant inline-block"></span>
              <span>5 km</span>
            </div>
            <span>WGS 84 / UTM ZONE 45N</span>
          </div>

          {/* GIS Interactive Topographic Canvas with SVG Contours & Shading */}
          <div
            className="w-full h-full relative overflow-hidden transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            {/* Base Background Texture */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                basemap === 'satellite'
                  ? 'bg-[#081827]'
                  : basemap === 'dem'
                  ? 'bg-[#040e1a]'
                  : 'bg-[#051424]'
              }`}
            >
              {/* Radar Doppler Precipitation Hue Overlay */}
              {showRadar && (
                <div className="absolute inset-0 bg-radial from-secondary/15 via-error/10 to-transparent pointer-events-none opacity-80 animate-pulse duration-3000"></div>
              )}

              {/* Detailed Elevation Contour Lines (SVG Vector) */}
              {showContours && (
                <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 1000 700">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#273647" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Contour Curves */}
                  <path
                    d="M 50,150 Q 200,80 400,120 T 750,90 T 950,160"
                    fill="none"
                    stroke="#3d4947"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 40,220 Q 220,160 450,190 T 800,160 T 960,240"
                    fill="none"
                    stroke="#3d4947"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 30,300 Q 250,240 500,280 T 820,230 T 980,320"
                    fill="none"
                    stroke="#6bd8cb"
                    strokeOpacity="0.4"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 60,380 Q 280,320 540,360 T 850,310 T 970,400"
                    fill="none"
                    stroke="#3d4947"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 20,460 Q 300,410 580,450 T 880,400 T 990,490"
                    fill="none"
                    stroke="#3d4947"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M 50,540 Q 320,490 620,530 T 910,480 T 980,580"
                    fill="none"
                    stroke="#6bd8cb"
                    strokeOpacity="0.4"
                    strokeWidth="1.5"
                  />

                  {/* Teesta River Corridor */}
                  <path
                    d="M 150,0 Q 220,200 320,380 T 360,700"
                    fill="none"
                    stroke="#00a6e0"
                    strokeOpacity="0.6"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <text x="250" y="270" fill="#00a6e0" fontSize="11" fontFamily="monospace" opacity="0.8">
                    TEESTA RIVER CORRIDOR
                  </text>

                  {/* NH-10 Lifeline Highway Vector */}
                  <path
                    d="M 180,0 Q 260,220 380,410 T 420,700"
                    fill="none"
                    stroke="#ffdad6"
                    strokeOpacity="0.5"
                    strokeDasharray="6 3"
                    strokeWidth="2.5"
                  />
                  <text x="320" y="440" fill="#ffdad6" fontSize="10" fontFamily="monospace" opacity="0.8">
                    NH-10 GANGTOK ROAD
                  </text>

                  {/* Evacuation Safe Route Vector */}
                  <path
                    d="M 440,294 Q 480,240 540,182"
                    fill="none"
                    stroke="#4edea3"
                    strokeDasharray="4 4"
                    strokeWidth="3"
                  />
                  <text x="490" y="220" fill="#4edea3" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                    SAFE RIDGE VECTOR
                  </text>

                  {/* Geological Shear Fault Scars */}
                  {showScars && (
                    <>
                      <path
                        d="M 280,410 L 320,440 L 310,460"
                        fill="none"
                        stroke="#ffb4ab"
                        strokeWidth="2"
                      />
                      <text x="325" y="435" fill="#ffb4ab" fontSize="9" fontFamily="monospace">
                        SCAR #2023
                      </text>
                    </>
                  )}
                </svg>
              )}
            </div>

            {/* Interactive Map Pins Layer */}
            {filteredPins.map((pin) => {
              const isSelected = pin.id === selectedPin.id;
              const isEmergency = pin.tier === 'Tier 4';
              const isWarning = pin.tier === 'Tier 3';
              const isShelter = pin.type === 'shelter';

              return (
                <div
                  key={pin.id}
                  onClick={() => setSelectedPinId(pin.id)}
                  style={{ top: pin.screenPosition.top, left: pin.screenPosition.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                >
                  {/* Danger Zone Pulse Ring */}
                  {isEmergency && (
                    <span className="absolute -inset-4 rounded-full bg-error/30 animate-ping pointer-events-none"></span>
                  )}
                  {isWarning && (
                    <span className="absolute -inset-3 rounded-full bg-secondary/20 animate-pulse pointer-events-none"></span>
                  )}

                  {/* Marker Pin */}
                  <div
                    className={`flex items-center gap-space-xs px-space-sm py-space-xs rounded-full border shadow-xl transition-transform duration-200 group-hover:scale-110 ${
                      isSelected
                        ? 'ring-2 ring-white scale-105'
                        : ''
                    } ${
                      isEmergency
                        ? 'bg-error-container text-on-error border-error'
                        : isWarning
                        ? 'bg-secondary-container text-on-secondary-container border-secondary'
                        : isShelter
                        ? 'bg-tertiary-container text-on-tertiary-container border-tertiary'
                        : 'bg-surface-container-high text-on-surface border-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {isShelter ? 'night_shelter' : isEmergency ? 'dangerous' : isWarning ? 'warning' : 'fmd_good'}
                    </span>
                    <span className="font-label-sm text-label-sm font-bold whitespace-nowrap">
                      {isShelter ? 'SAFE HAVEN' : `${pin.riskPercent}% RISK`}
                    </span>
                  </div>

                  {/* Marker Tooltip on Hover / Selected */}
                  <div
                    className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-surface-container-lowest/95 backdrop-blur-md px-space-sm py-space-2xs rounded-md border border-surface-variant/40 shadow-2xl text-xs whitespace-nowrap pointer-events-none transition-opacity ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <div className="font-bold text-on-surface">{pin.name}</div>
                    <div className="text-on-surface-variant text-[10px] font-mono">
                      {pin.sector} • Saturation: {pin.soilSaturation}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DOCKED LATERAL INSPECTOR (4 COLS) */}
        <div className="lg:col-span-4 rounded-xl bg-surface-container/85 backdrop-blur-xl border border-surface-variant/40 p-space-lg shadow-xl flex flex-col justify-between space-y-space-md">
          <div className="space-y-space-md">
            {/* Inspector Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                  Target Sector Telemetry
                </span>
                <span
                  className={`font-label-sm text-label-sm px-space-xs py-space-2xs rounded font-bold uppercase ${
                    getTierBadge(selectedPin.tier).bg
                  }`}
                >
                  {selectedPin.tier}
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-space-2xs">
                {selectedPin.name}
              </h2>
              <span className="text-xs font-mono text-on-surface-variant">
                {selectedPin.sector}
              </span>
            </div>

            {/* AI Risk Probability Ring */}
            <div className="p-space-sm rounded-xl bg-surface-container-lowest/70 border border-surface-variant/30 flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                  Probability of Failure
                </span>
                <div className="flex items-baseline gap-space-2xs mt-1">
                  <span className="font-headline-xl text-headline-xl font-bold text-on-surface">
                    {selectedPin.riskPercent}%
                  </span>
                  <span className="text-xs text-secondary font-mono">P(Event)</span>
                </div>
                <span className="text-xs text-on-surface-variant">
                  Model Confidence: 94.2% verified
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`font-label-sm text-label-sm font-bold px-space-xs py-space-2xs rounded ${
                    getTierBadge(selectedPin.tier).bg
                  }`}
                >
                  {getTierBadge(selectedPin.tier).label}
                </span>
                <span className="text-[11px] text-on-surface-variant block mt-2">
                  Window: 6-24 Hours
                </span>
              </div>
            </div>

            {/* Environmental Telemetry 4-Square */}
            <div className="grid grid-cols-2 gap-space-xs">
              <div className="p-space-sm rounded-lg bg-surface-container-high/60 border border-surface-variant/30">
                <span className="text-xs text-on-surface-variant block">24h Rainfall</span>
                <span className="font-telemetry-num text-telemetry-num text-on-surface">
                  {selectedPin.precipitation24h} mm
                </span>
                <span className="text-[10px] text-secondary block">+77% over threshold</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-high/60 border border-surface-variant/30">
                <span className="text-xs text-on-surface-variant block">Soil Moisture</span>
                <span className="font-telemetry-num text-telemetry-num text-on-surface">
                  {selectedPin.soilSaturation}%
                </span>
                <span className="text-[10px] text-error block">Critical Saturation</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-high/60 border border-surface-variant/30">
                <span className="text-xs text-on-surface-variant block">Slope Incline</span>
                <span className="font-telemetry-num text-telemetry-num text-on-surface">
                  {selectedPin.slopeAngle}°
                </span>
                <span className="text-[10px] text-primary block">Steep Talus Angle</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-high/60 border border-surface-variant/30">
                <span className="text-xs text-on-surface-variant block">Historic Scars</span>
                <span className="font-telemetry-num text-telemetry-num text-on-surface">
                  {selectedPin.historicalScars} Events
                </span>
                <span className="text-[10px] text-on-surface-variant block">2019, 2021, 2023</span>
              </div>
            </div>

            {/* Lithology & Shear Profile Readout */}
            <div className="p-space-sm rounded-lg bg-surface-container-high/40 border border-surface-variant/20 space-y-space-2xs text-xs">
              <div className="text-on-surface font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary">layers</span>
                Lithology Profile:
              </div>
              <p className="text-on-surface-variant">{selectedPin.lithology}</p>
            </div>

            {/* Nearest Safe Evacuation Haven Card */}
            <div className="p-space-sm rounded-xl bg-tertiary-container/10 border border-tertiary/30 space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">night_shelter</span>
                  Nearest Safe Evacuation Haven
                </span>
                <span className="text-xs font-mono text-tertiary font-bold">
                  {selectedPin.nearestShelter.elevation}m MSL
                </span>
              </div>

              <div>
                <div className="font-label-lg text-label-lg font-bold text-on-surface">
                  {selectedPin.nearestShelter.name}
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">
                  Distance: <strong className="text-on-surface">{selectedPin.nearestShelter.distance}</strong> ({selectedPin.nearestShelter.duration})
                </div>
                <div className="text-xs text-tertiary mt-0.5">
                  Route: {selectedPin.nearestShelter.route}
                </div>
              </div>

              <div className="flex justify-between text-xs pt-1 border-t border-surface-variant/20 text-on-surface-variant">
                <span>Capacity: {selectedPin.nearestShelter.capacity} persons</span>
                <span className="text-tertiary font-semibold">{selectedPin.nearestShelter.available} Beds Available</span>
              </div>

              <div className="flex items-center gap-space-xs pt-1">
                <button
                  onClick={() => onNavigate('emergency')}
                  className="flex-1 bg-tertiary text-on-tertiary hover:opacity-90 font-label-sm text-label-sm py-1.5 px-space-sm rounded transition-all font-bold cursor-pointer text-center"
                >
                  Navigate to Safe Zone
                </button>
                <button
                  onClick={handleDownloadOfflineMap}
                  className="p-1.5 bg-surface-container-highest text-on-surface hover:text-primary rounded"
                  title="Download Offline Vector Map"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Lateral Inspector Actions */}
          <div className="pt-space-sm border-t border-surface-variant/30 flex flex-col gap-space-xs">
            <button
              onClick={() => onNavigate('risk-analysis')}
              className="w-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-label-md text-label-md py-space-xs px-space-md rounded transition-all cursor-pointer shadow-md flex items-center justify-center gap-space-2xs font-semibold"
            >
              <span>View Deep AI Risk Analysis</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
            <button
              onClick={onOpenEvacModal}
              className="w-full bg-error-container text-on-error hover:opacity-90 font-label-md text-label-md py-space-xs px-space-md rounded transition-all cursor-pointer shadow-md flex items-center justify-center gap-space-2xs font-bold"
            >
              <span className="material-symbols-outlined text-base">campaign</span>
              Trigger Emergency Evacuation Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM REGIONAL SITUATION TICKER & HYBRID BROADCAST STRIP */}
      <section className="rounded-xl bg-surface-container-low border border-surface-variant/30 p-space-md shadow-md space-y-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-lg">public</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              NER Regional Landslide Radar Ticker
            </span>
          </div>
          <span className="text-xs font-mono text-outline">Real-Time IMD / GSI Sync</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm pt-space-xs">
          {TERRITORIES.slice(0, 4).map((t) => (
            <div
              key={t.id}
              onClick={() => onSelectTerritory(t.id)}
              className="p-space-sm rounded-lg bg-surface-container border border-surface-variant/30 hover:bg-surface-container-high transition-all cursor-pointer space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md font-bold text-on-surface">
                  {t.name}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    t.criticalAlert
                      ? 'bg-error-container text-on-error animate-pulse'
                      : t.activeAlerts > 0
                      ? 'bg-secondary-container/20 text-secondary'
                      : 'bg-tertiary/20 text-tertiary'
                  }`}
                >
                  {t.criticalAlert ? 'CRITICAL' : t.activeAlerts > 0 ? `${t.activeAlerts} WARNING` : 'NORMAL'}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant line-clamp-2">{t.statusText}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
