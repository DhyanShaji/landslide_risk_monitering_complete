import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/mockData';

interface SurveillanceScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEvacModal: () => void;
}

export const SurveillanceScreen: React.FC<SurveillanceScreenProps> = ({
  onNavigate,
  onOpenEvacModal,
}) => {
  const [activeCam, setActiveCam] = useState<'nh10' | 'dikchu' | 'mangan'>('nh10');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-6">
      {/* SECTION HEADER */}
      <div className="bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 px-6 py-4 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">videocam</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm uppercase tracking-wider text-tertiary font-bold">
                Live Highway Optical Feed
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm text-on-surface-variant font-mono">
                NH-10 Gangtok Arterial Corridor
              </span>
            </div>
            <h1 className="font-headline-xl text-on-surface font-bold tracking-tight mt-1">
              Mountain Highway Surveillance &amp; Inclinometers
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
            onClick={handleRefreshFeed}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 font-label-md font-semibold transition-all cursor-pointer border border-primary/20"
          >
            <span className={`material-symbols-outlined text-sm ${isRefreshing ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isRefreshing ? 'Syncing...' : 'Refresh Feed'}</span>
          </button>
        </div>
      </div>

      {/* MAIN CAMERA FEED & TELEMETRY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: High Resolution Optical Feed using ASSETS.HIGHWAY_CAM (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl overflow-hidden bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 shadow-xl flex flex-col justify-between">
          <div className="p-4 border-b border-surface-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-label-sm px-2.5 py-1 rounded bg-surface-container-lowest text-secondary font-mono font-bold">
                CAM-04 • NH-10 KM 42.6
              </span>
              <span className="font-label-sm px-2.5 py-1 rounded-full bg-tertiary/20 text-tertiary font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> PASSABLE
              </span>
            </div>
            <span className="font-mono text-xs text-on-surface-variant">
              1080p • 30 FPS • H.265
            </span>
          </div>

          {/* Camera Viewport with Original Image */}
          <div className="relative h-80 w-full bg-surface-container-lowest overflow-hidden group">
            <img
              src={ASSETS.HIGHWAY_CAM}
              alt="Live High Altitude Himalayan Highway Camera on NH-10"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container/90 via-transparent to-black/30 pointer-events-none"></div>

            {/* In-Frame HUD Overlays */}
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-primary flex items-center gap-2 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
              <span>LIVE CAM: GANGTOK-NATHULA SECTOR 2</span>
            </div>

            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded text-xs font-mono text-tertiary border border-tertiary/30">
              ROAD CLEAR • NO DEBRIS
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-surface-container-lowest/80 backdrop-blur-md p-2.5 rounded-lg border border-surface-variant/30 text-xs">
              <span className="font-mono text-on-surface">COORDINATES: 27.3389° N, 88.6065° E</span>
              <span className="text-secondary font-mono">RADAR CONFIRMATION: 99.4%</span>
            </div>
          </div>

          {/* Camera Selector Tabs */}
          <div className="p-4 bg-surface-container-high/60 border-t border-surface-variant/30 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCam('nh10')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeCam === 'nh10'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                NH-10 Mile 42 (Active)
              </button>
              <button
                onClick={() => setActiveCam('dikchu')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeCam === 'dikchu'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Dikchu Bridge
              </button>
              <button
                onClick={() => setActiveCam('mangan')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeCam === 'mangan'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Mangan Highway Junction
              </button>
            </div>
            <span className="text-xs text-on-surface-variant font-mono">
              Border Roads Organisation (BRO)
            </span>
          </div>
        </div>

        {/* Right: Structural Telemetry & Inclinometer Readings (5 Cols) */}
        <div className="lg:col-span-5 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-6 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-sm uppercase tracking-wider text-secondary font-bold">
                Slope Engineering Diagnostics
              </span>
              <span className="font-label-sm px-2 py-0.5 rounded bg-surface-variant text-on-surface font-mono">
                SENS-BR-42
              </span>
            </div>

            <h3 className="font-headline-sm font-bold text-on-surface">
              Retaining Structure &amp; Slope Stress
            </h3>

            {/* Diagnostic items */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-1">
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>Roadbed Creep Displacement:</span>
                  <span className="text-tertiary font-mono font-bold">&lt; 0.2 mm / 24h</span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[12%]"></div>
                </div>
                <div className="text-[11px] text-on-surface-variant pt-1">
                  Threshold limit: &gt; 5.0 mm/day requires traffic diversion.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-1">
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>Slope Inclinometer #4:</span>
                  <span className="text-tertiary font-mono font-bold">0.03° Deviation</span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[8%]"></div>
                </div>
                <div className="text-[11px] text-on-surface-variant pt-1">
                  Sub-surface shear angle stable across deep bedrock mantle.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-1">
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>Rockfall Netting Cable Tension:</span>
                  <span className="text-on-surface font-mono font-bold">Normal (4.2 kN)</span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[45%]"></div>
                </div>
                <div className="text-[11px] text-on-surface-variant pt-1">
                  High-tensile wire mesh anchored at 6m depth along upper scarp.
                </div>
              </div>
            </div>
          </div>

          {/* Regional Tower Grid Status */}
          <div className="p-4 rounded-xl bg-surface-container-high/80 border border-surface-variant/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0 text-secondary">
                <span className="material-symbols-outlined text-xl">cell_tower</span>
              </div>
              <div>
                <div className="font-label-sm text-secondary font-bold uppercase">
                  NER Regional Grid Status
                </div>
                <div className="font-label-lg text-on-surface font-semibold">
                  All 14 Sikkim Towers Online
                </div>
              </div>
            </div>
            <span className="font-mono text-xs text-on-surface-variant">LATENCY: 18ms</span>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION LINKS */}
      <div className="rounded-xl bg-surface-container-low border border-surface-variant/30 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={ASSETS.NDMA_EMBLEM} alt="NDMA India" className="w-8 h-8 object-contain" />
          <div className="font-body-sm text-on-surface-variant">
            Explore live disaster routing and elevation profiles:
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('risk-map')}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-semibold cursor-pointer border border-surface-variant/40 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">explore</span>
            <span>View Full GIS Map</span>
          </button>
          <button
            onClick={() => onNavigate('emergency')}
            className="px-4 py-2 rounded-lg bg-error-container text-on-error font-label-md font-semibold cursor-pointer shadow-md hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">warning</span>
            <span>Critical Emergency HUD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
