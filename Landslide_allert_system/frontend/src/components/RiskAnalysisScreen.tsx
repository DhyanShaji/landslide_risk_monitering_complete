import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS, SHAP_FACTORS } from '../data/mockData';

interface RiskAnalysisScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEvacModal: () => void;
}

export const RiskAnalysisScreen: React.FC<RiskAnalysisScreenProps> = ({
  onNavigate,
  onOpenEvacModal,
}) => {
  const [additionalRain, setAdditionalRain] = useState(0);
  const [waterTableRise, setWaterTableRise] = useState(0);

  // Compute simulated risk based on perturbation
  // Base is 78%. Each 10mm of rain adds ~2.2%. Each 0.5m of water table adds ~2.8%. Max 99%.
  const simulatedRisk = Math.min(
    99,
    Math.round(78 + additionalRain * 0.22 + waterTableRise * 5.6)
  );

  const getSimulatedTier = (val: number) => {
    if (val >= 85) return { label: 'Level 4 Critical Emergency', color: 'text-error', bg: 'bg-error-container text-on-error' };
    if (val >= 65) return { label: 'Level 3 High Warning', color: 'text-secondary', bg: 'bg-secondary-container/30 text-secondary' };
    if (val >= 40) return { label: 'Level 2 Watch', color: 'text-primary', bg: 'bg-primary/20 text-primary' };
    return { label: 'Level 1 Low Risk', color: 'text-tertiary', bg: 'bg-tertiary/20 text-tertiary' };
  };

  const currentTier = getSimulatedTier(simulatedRisk);

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full pb-space-2xl space-y-space-lg">
      {/* OPERATIONAL METADATA BAR */}
      <section className="bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 px-space-base py-space-sm rounded-xl flex flex-wrap items-center justify-between gap-space-sm shadow-md">
        <div className="flex items-center gap-space-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
          <span className="font-label-sm text-label-sm font-semibold text-tertiary tracking-wider uppercase">
            TELEMETRY FEED: ACTIVE (LIVE SENSOR NET)
          </span>
          <span className="text-outline-variant font-label-sm text-label-sm">•</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
            LAST UPDATE: 14 OCT, 11:30 IST
          </span>
        </div>
        <div className="flex items-center gap-space-md">
          <span className="font-label-sm text-label-sm px-space-xs py-space-2xs bg-surface-container-high rounded text-on-surface-variant font-mono">
            PREDICTIVE MODEL: XGBOOST-V4.2
          </span>
          <span className="font-label-sm text-label-sm text-primary font-mono font-medium">
            CONFIDENCE: 94.2%
          </span>
        </div>
      </section>

      {/* HEADER TITLE BLOCK */}
      <div className="space-y-space-2xs">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-xl">analytics</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
            SHAP ML Explainability Engine
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface tracking-tight">
          AI Risk Analysis &amp; Factor Attribution
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Deep telemetry attribution for Target Sector:{' '}
          <strong className="text-on-surface font-semibold">Gangtok Ridge Sector 4</strong>. Feature
          weights derived via TreeExplainer game-theoretic Shapley values calculated against
          historical NER monsoon triggers.
        </p>
      </div>

      {/* BENTO SECTION 1: PROBABILITY GAUGE + OPERATIONAL EXPLAINABILITY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-base">
        {/* Circular Probability Gauge (4 Cols) */}
        <div className="lg:col-span-4 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-space-lg shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
            <span className="font-bold uppercase tracking-wider text-secondary">PROBABILITY GAUGE</span>
            <span className="font-mono">P(Event)</span>
          </div>

          <div className="relative w-52 h-52 my-space-md flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                className="text-surface-variant/30"
                cx="60"
                cy="60"
                fill="transparent"
                r="52"
                stroke="currentColor"
                strokeWidth="10"
              />
              <defs>
                <linearGradient id="probGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7bd0ff" />
                  <stop offset="70%" stopColor="#ffb4ab" />
                  <stop offset="100%" stopColor="#ff5449" />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                fill="transparent"
                r="52"
                stroke="url(#probGrad)"
                strokeDasharray="326.7"
                strokeDashoffset="71.87"
                strokeLinecap="round"
                strokeWidth="10"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display-lg text-display-lg font-bold text-on-surface leading-none">
                78<span className="text-secondary text-headline-sm">%</span>
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold mt-space-2xs">
                LEVEL 3 WARNING
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                6-24 Hours Window
              </span>
            </div>
          </div>

          <div className="w-full p-space-sm rounded-lg bg-surface-container-high/80 border border-surface-variant/30 space-y-space-2xs text-left">
            <div className="flex justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">Model Calibration:</span>
              <span className="text-tertiary font-bold">94.2% Verified</span>
            </div>
            <div className="flex justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">Primary Failure Mode:</span>
              <span className="text-on-surface font-semibold">Translational Debris Slide</span>
            </div>
          </div>
        </div>

        {/* Natural Language Operational Intelligence (8 Cols) */}
        <div className="lg:col-span-8 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-space-lg shadow-xl flex flex-col justify-between space-y-space-md">
          <div className="space-y-space-sm">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-xl">psychology</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                Natural Language Operational Intelligence
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              &quot;Why is the landslide risk high in Gangtok Ridge Sector 4?&quot;
            </h2>

            {/* Synthesized Operational Narrative */}
            <div className="p-space-base rounded-xl bg-surface-container-lowest/80 border-l-4 border-primary border-surface-variant/30 text-body-lg font-body-lg text-on-surface leading-relaxed shadow-inner">
              <p>
                &ldquo;Intense monsoon rainfall of <strong className="text-secondary font-bold">142mm over the past 24 hours</strong>{' '}
                (77% above critical saturation threshold) has driven soil moisture to{' '}
                <strong className="text-secondary font-bold">86%</strong>, inducing rapid pore-water
                pressure accumulation. Combined with a steep{' '}
                <strong className="text-primary font-bold">37° gradient</strong> in weathered
                Daling-group phyllite and <strong className="text-on-surface font-semibold">3 historical shear incidents</strong>, gravitational shear stress now approaches critical yield point.&rdquo;
              </p>
            </div>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-xs">
            <div className="p-space-sm rounded-lg bg-surface-container-high/60 border border-surface-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Rain Trigger</span>
              <span className="font-label-lg text-label-lg font-bold text-secondary">+77% Above Threshold</span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-high/60 border border-surface-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Pore Saturation</span>
              <span className="font-label-lg text-label-lg font-bold text-secondary">86% Volumetric</span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-high/60 border border-surface-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Critical Slope</span>
              <span className="font-label-lg text-label-lg font-bold text-primary">37° Gradient</span>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-high/60 border border-surface-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant block">Subsurface Creep</span>
              <span className="font-label-lg text-label-lg font-bold text-tertiary">2.1 mm / 6h</span>
            </div>
          </div>
        </div>
      </section>

      {/* SPATIAL ESCARPMENT RELIEF (CROSS-SECTION / 3D TOPOGRAPHY) */}
      <section className="rounded-xl overflow-hidden bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 shadow-xl">
        <div className="p-space-md border-b border-surface-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-xl">terrain</span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Spatial Escarpment Relief &amp; Subsurface Profile
            </h3>
          </div>
          <span className="font-label-sm text-label-sm px-space-xs py-space-2xs rounded bg-surface-container-high text-primary font-mono">
            3D DIGITAL ELEVATION MODEL (SRTM 30M)
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 relative h-72 bg-surface-container-lowest flex items-center justify-center overflow-hidden">
            <img
              alt="3D Escarpment Geological Cross-Section"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              src={ASSETS.ESCARPMENT_RELIEF}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface/10 to-surface-container pointer-events-none"></div>
            <div className="absolute bottom-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md px-space-sm py-space-2xs rounded text-xs font-mono text-primary border border-surface-variant/30">
              LAT: 27.3389° N • LON: 88.6065° E • AZIMUTH: 312°
            </div>
          </div>
          <div className="lg:col-span-5 p-space-lg flex flex-col justify-between space-y-space-md bg-surface-container/60">
            <div className="space-y-space-sm">
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                Cross-Section Telemetry
              </span>
              <div className="space-y-space-xs">
                <div className="flex justify-between py-space-2xs border-b border-surface-variant/20 font-body-sm text-body-sm">
                  <span className="text-on-surface-variant">Peak Crest Elevation:</span>
                  <span className="text-on-surface font-mono font-semibold">1,840 m MSL</span>
                </div>
                <div className="flex justify-between py-space-2xs border-b border-surface-variant/20 font-body-sm text-body-sm">
                  <span className="text-on-surface-variant">Valley Floor Inflow:</span>
                  <span className="text-on-surface font-mono font-semibold">1,210 m MSL</span>
                </div>
                <div className="flex justify-between py-space-2xs border-b border-surface-variant/20 font-body-sm text-body-sm">
                  <span className="text-on-surface-variant">Shear Plane Pore Pressure:</span>
                  <span className="text-secondary font-mono font-bold">4.2 kPa / m</span>
                </div>
                <div className="flex justify-between py-space-2xs border-b border-surface-variant/20 font-body-sm text-body-sm">
                  <span className="text-on-surface-variant">Aspect / Dip Direction:</span>
                  <span className="text-on-surface font-mono font-semibold">284° WNW</span>
                </div>
                <div className="flex justify-between py-space-2xs font-body-sm text-body-sm">
                  <span className="text-on-surface-variant">Critical Friction Angle:</span>
                  <span className="text-primary font-mono font-bold">φ = 32.5° (Slope: 37°)</span>
                </div>
              </div>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-high border border-surface-variant/30 flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-secondary text-2xl">info</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Slope angle (37°) exceeds basal friction threshold (32.5°), rendering the mantle
                dependent on matric suction, which is depleted by rainfall.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10-FACTOR SENSITIVITY & SHAP ATTRIBUTION WEIGHTS GRID */}
      <section className="space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-xl">bar_chart</span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                10-Factor Sensitivity &amp; SHAP Attribution Weights
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Positive SHAP values represent push factors driving landslide probability above the baseline.
            </p>
          </div>
          <span className="font-label-sm text-label-sm px-space-sm py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-mono">
            BASE EXPECTED RISK: E[f(x)] = 12%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-space-sm">
          {SHAP_FACTORS.map((factor) => (
            <div
              key={factor.id}
              className="rounded-xl bg-surface-container/70 border border-surface-variant/30 backdrop-blur-md p-space-md shadow-md flex flex-col justify-between hover:bg-surface-container-high transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg">{factor.icon}</span>
                  <span className="font-label-sm text-label-sm px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant font-mono">
                    {factor.sourceBadge}
                  </span>
                </div>

                <div className="mt-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-semibold text-on-surface">
                      {factor.name}
                    </span>
                    <span className="font-label-md text-label-md font-bold text-secondary font-mono">
                      {factor.weightDelta}
                    </span>
                  </div>
                  <div className="font-telemetry-num text-telemetry-num text-on-surface mt-space-2xs">
                    {factor.valueDisplay}
                  </div>
                </div>
              </div>

              <div className="mt-space-md pt-space-xs space-y-space-2xs border-t border-surface-variant/20">
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>{factor.thresholdNote}</span>
                  <span className="text-secondary font-medium">{factor.subNote}</span>
                </div>
                <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-secondary h-full rounded-full transition-all duration-500"
                    style={{ width: `${factor.progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE PRECIPITATION PERTURBATION SIMULATOR (WHAT-IF SCENARIO ENGINE) */}
      <section className="rounded-xl bg-surface-container/85 backdrop-blur-xl border border-primary/30 p-space-lg shadow-xl space-y-space-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div className="space-y-space-2xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-xl">tune</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Interactive Perturbation Sandbox: &quot;What-If&quot; Stress Engine
              </h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Simulate localized monsoon influx or subsurface rise to observe real-time recalculation of failure probabilities.
            </p>
          </div>
          <button
            onClick={() => {
              setAdditionalRain(0);
              setWaterTableRise(0);
            }}
            className="self-start sm:self-auto flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container-high border border-surface-variant/40 transition-colors"
          >
            <span className="material-symbols-outlined text-base">restart_alt</span>
            Reset Simulation
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center">
          {/* Sliders (7 Cols) */}
          <div className="md:col-span-7 space-y-space-md bg-surface-container-lowest/60 p-space-md rounded-xl border border-surface-variant/30">
            {/* Slider 1: Additional Rain */}
            <div className="space-y-space-xs">
              <div className="flex justify-between font-label-md text-label-md">
                <span className="text-on-surface font-semibold flex items-center gap-space-2xs">
                  <span className="material-symbols-outlined text-secondary text-base">rainy</span>
                  Projected Additional Rainfall (Next 6h):
                </span>
                <span className="font-mono text-secondary font-bold">+{additionalRain} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={additionalRain}
                onChange={(e) => setAdditionalRain(Number(e.target.value))}
                className="w-full accent-secondary cursor-pointer h-2 bg-surface-variant rounded-lg"
              />
              <div className="flex justify-between text-xs text-outline font-mono">
                <span>0 mm (Current: 142mm)</span>
                <span>+50 mm (Heavy Cloudburst)</span>
                <span>+100 mm (Flash Flood)</span>
              </div>
            </div>

            {/* Slider 2: Water Table Rise */}
            <div className="space-y-space-xs pt-space-xs border-t border-surface-variant/20">
              <div className="flex justify-between font-label-md text-label-md">
                <span className="text-on-surface font-semibold flex items-center gap-space-2xs">
                  <span className="material-symbols-outlined text-primary text-base">water</span>
                  Subsurface Water Table / Pore Rise:
                </span>
                <span className="font-mono text-primary font-bold">+{waterTableRise.toFixed(1)} m</span>
              </div>
              <input
                type="range"
                min="0"
                max="3"
                step="0.2"
                value={waterTableRise}
                onChange={(e) => setWaterTableRise(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer h-2 bg-surface-variant rounded-lg"
              />
              <div className="flex justify-between text-xs text-outline font-mono">
                <span>+0.0 m (Base)</span>
                <span>+1.5 m (Critical Head)</span>
                <span>+3.0 m (Liquefaction Limit)</span>
              </div>
            </div>
          </div>

          {/* Simulated Outcome Display (5 Cols) */}
          <div className="md:col-span-5 p-space-md rounded-xl bg-surface-container-high/90 border border-surface-variant/40 space-y-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                SIMULATED RISK OUTCOME
              </span>
              <span className={`font-label-sm text-label-sm font-bold uppercase px-space-xs py-space-2xs rounded ${currentTier.bg}`}>
                {currentTier.label}
              </span>
            </div>

            <div className="flex items-baseline gap-space-sm">
              <span className="font-display-lg text-display-lg font-bold text-on-surface">
                {simulatedRisk}%
              </span>
              <span className="text-sm font-mono text-on-surface-variant">
                (Base: 78% • Delta: +{simulatedRisk - 78}%)
              </span>
            </div>

            <div className="space-y-space-2xs">
              <div className="flex justify-between text-xs text-on-surface-variant">
                <span>Failure Risk Index</span>
                <span className="font-mono text-on-surface font-bold">{simulatedRisk} / 100</span>
              </div>
              <div className="w-full bg-surface-variant h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    simulatedRisk >= 85 ? 'bg-error' : simulatedRisk >= 65 ? 'bg-secondary' : 'bg-primary'
                  }`}
                  style={{ width: `${simulatedRisk}%` }}
                ></div>
              </div>
            </div>

            {simulatedRisk >= 85 ? (
              <div className="p-space-xs rounded bg-error-container/40 text-error text-xs font-semibold flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-base">emergency</span>
                CRITICAL THRESHOLD BREACHED: Immediate evacuation protocol mandated!
              </div>
            ) : (
              <div className="text-xs text-on-surface-variant">
                Dynamic safety factor FoS estimated at ~{(1.42 * (100 - simulatedRisk) / 60).toFixed(2)}.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ACTION DIRECTIVES BANNER */}
      <section className="rounded-xl bg-surface-container-low border border-surface-variant/40 p-space-md shadow-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">shield</span>
          </div>
          <div>
            <div className="font-label-lg text-label-lg font-bold text-on-surface">
              Evacuation Readiness State: Level 3 Standby
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              DDMA Gangtok and SDRF Sector 4 alert relays initialized on standby.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-space-sm w-full sm:w-auto">
          <button
            onClick={handleExportPdf}
            className="w-full sm:w-auto bg-surface-container-high text-on-surface hover:bg-surface-variant font-label-md text-label-md px-space-md py-space-xs rounded transition-all cursor-pointer border border-surface-variant/40 flex items-center justify-center gap-space-2xs"
          >
            <span className="material-symbols-outlined text-base">print</span>
            Export Technical PDF
          </button>
          <button
            onClick={onOpenEvacModal}
            className="w-full sm:w-auto bg-error-container text-on-error hover:opacity-90 font-label-md text-label-md px-space-md py-space-xs rounded transition-all cursor-pointer shadow-lg flex items-center justify-center gap-space-2xs font-bold"
          >
            <span className="material-symbols-outlined text-base">campaign</span>
            Initiate Pre-Evacuation Alert (SMS)
          </button>
        </div>
      </section>
    </div>
  );
};
