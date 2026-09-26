import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS, EMERGENCY_HELPLINES, SURVIVAL_STEPS } from '../data/mockData';

interface EmergencyScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEvacModal: () => void;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({
  onNavigate,
  onOpenEvacModal,
}) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [beaconSent, setBeaconSent] = useState(false);

  const handleCall = (num: string) => {
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
    // In iframe or web, window.location.href = `tel:${num.replace(/\s+/g, '')}`;
    try {
      window.open(`tel:${num.replace(/\s+/g, '')}`, '_self');
    } catch {
      // ignore
    }
  };

  const handleResendBeacon = () => {
    setBeaconSent(true);
    setTimeout(() => {
      alert('Emergency SMS Beacon rebroadcast via BSNL/Airtel NER Cell Broadcast relay #4829!');
      setBeaconSent(false);
    }, 500);
  };

  return (
    <div className="flex flex-col w-full pb-space-2xl space-y-space-lg">
      {/* TOP EMERGENCY BANNER HUD */}
      <section className="relative overflow-hidden rounded-xl bg-error-container p-space-lg shadow-2xl border-2 border-error animate-pulse duration-3000">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-error/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-space-md text-on-error">
          <div className="space-y-space-2xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-3xl text-on-error animate-bounce">
                dangerous
              </span>
              <span className="font-headline-sm text-headline-sm font-bold uppercase tracking-wider">
                CRITICAL LANDSLIDE EMERGENCY ACTIVE
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-error/90 max-w-2xl">
              Sector 2, Sikkim Himalaya Range • Lat: 27.412° N, Long: 88.528° E • Uplink: INSAT-3DR /
              NDRF Push
            </p>
          </div>
          <button
            onClick={onOpenEvacModal}
            className="self-start md:self-auto bg-on-error text-error-container hover:bg-white font-label-lg text-label-lg font-bold px-space-lg py-space-sm rounded-lg shadow-xl transition-all cursor-pointer flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-xl">campaign</span>
            <span>TRIGGER BROADCAST</span>
          </button>
        </div>
      </section>

      {/* 1. ACTIVE CRITICAL EMERGENCY CARD */}
      <section className="rounded-xl bg-surface-container/90 backdrop-blur-xl border-2 border-error/50 p-space-lg shadow-2xl space-y-space-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm border-b border-surface-variant/30 pb-space-md">
          <div>
            <span className="font-label-sm text-label-sm text-error font-bold uppercase tracking-wider">
              TARGET DISASTER SECTOR
            </span>
            <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface mt-1">
              Dikchu - Singtam Highway Corridor
            </h1>
            <span className="text-sm font-mono text-on-surface-variant">
              East Sikkim District • NH-10 Lifeline Transit Cut
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="text-right">
              <div className="font-display-lg text-display-lg font-bold text-error leading-none">
                89<span className="text-headline-sm">%</span>
              </div>
              <span className="font-label-sm text-label-sm text-error font-bold uppercase">
                CRITICAL IMMINENT
              </span>
            </div>
            <div className="h-12 w-px bg-surface-variant/40"></div>
            <div className="text-right">
              <div className="font-display-lg text-display-lg font-bold text-secondary leading-none">
                168<span className="text-headline-sm">mm</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">
                PORE SATURATION
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Hazard Mechanics */}
        <div className="p-space-base rounded-xl bg-surface-container-lowest/80 border-l-4 border-error text-on-surface space-y-space-2xs">
          <div className="flex items-center gap-space-xs font-label-md text-label-md font-bold text-error">
            <span className="material-symbols-outlined text-lg">warning</span>
            DYNAMIC HAZARD MECHANICS:
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            High-velocity translational rockslide &amp; debris torrent triggered by saturated
            colluvium over phyllite bedrock. Accelerating shear displacement rate (+1.4 cm/hour
            detected by InSAR). Failure expected along toe slope.
          </p>
        </div>

        {/* MASS EVACUATION TRIGGER BUTTON */}
        <div className="pt-space-xs">
          <button
            onClick={onOpenEvacModal}
            className="w-full bg-error-container hover:bg-error-container/90 text-on-error font-headline-sm text-headline-sm font-bold py-space-md px-space-xl rounded-xl shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-space-md border-2 border-error"
          >
            <span className="material-symbols-outlined text-3xl animate-bounce">
              emergency_share
            </span>
            <span>🚨 EVACUATE NOW — INITIATE PROTOCOL</span>
          </button>
        </div>
      </section>

      {/* 2. NEAREST SAFE ZONE & EVACUATION PATH (DUAL PANE) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-base">
        {/* Safe Zone Details (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-tertiary/40 p-space-lg shadow-xl flex flex-col justify-between space-y-space-md">
          <div className="space-y-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-tertiary text-2xl">
                  night_shelter
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary font-bold">
                  Nearest Verified Safe Haven
                </span>
              </div>
              <span className="font-label-sm text-label-sm px-space-xs py-space-2xs rounded-full bg-tertiary/20 text-tertiary font-bold">
                OPERATIONAL
              </span>
            </div>

            <div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                Government Senior Secondary School Shelter A
              </h2>
              <p className="font-body-md text-body-md text-tertiary font-semibold mt-1">
                Official Green Safe Vector: High Ridge Line via Ridge Rd (Avoiding NH-10)
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-space-sm pt-space-xs">
              <div className="p-space-sm rounded-lg bg-surface-container-high border border-surface-variant/30">
                <span className="text-xs text-on-surface-variant block">Distance</span>
                <span className="font-telemetry-num text-telemetry-num text-on-surface">1.2 km</span>
                <span className="text-[10px] text-tertiary block">~8 min foot march</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-high border border-surface-variant/30">
                <span className="text-xs text-on-surface-variant block">Safety Elevation</span>
                <span className="font-telemetry-num text-telemetry-num text-on-surface">1,640 m</span>
                <span className="text-[10px] text-tertiary block">+210m elevation gain</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-high border border-surface-variant/30">
                <span className="text-xs text-on-surface-variant block">Bed Capacity</span>
                <span className="font-telemetry-num text-telemetry-num text-on-surface">450 / 600</span>
                <span className="text-[10px] text-tertiary block">150 Beds Available</span>
              </div>
            </div>

            {/* Shelter Facilities */}
            <div className="space-y-space-xs pt-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                On-Site Facilities:
              </span>
              <div className="flex flex-wrap gap-space-xs font-label-sm text-label-sm">
                <span className="px-space-xs py-space-2xs bg-surface-container-high rounded text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-tertiary">check_circle</span>
                  Emergency Medical Kit
                </span>
                <span className="px-space-xs py-space-2xs bg-surface-container-high rounded text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-tertiary">check_circle</span>
                  Clean Filtered Water
                </span>
                <span className="px-space-xs py-space-2xs bg-surface-container-high rounded text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-tertiary">check_circle</span>
                  Satellite Link &amp; Solar Genset
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-space-sm pt-space-sm border-t border-surface-variant/30">
            <button
              onClick={() => onNavigate('risk-map')}
              className="flex-1 bg-tertiary text-on-tertiary hover:opacity-90 font-label-md text-label-md py-space-xs px-space-md rounded-lg transition-all font-bold cursor-pointer text-center flex items-center justify-center gap-space-2xs shadow-md"
            >
              <span className="material-symbols-outlined text-lg">navigation</span>
              <span>Open Offline GPS Routing</span>
            </button>
            <button
              onClick={() => handleCall('+91 94340 88219')}
              className="bg-surface-container-high text-on-surface hover:bg-surface-variant font-label-md text-label-md py-space-xs px-space-md rounded-lg transition-all border border-surface-variant/40 flex items-center gap-space-2xs"
            >
              <span className="material-symbols-outlined text-lg text-primary">call</span>
              <span>Shelter Coordinator</span>
            </button>
          </div>
        </div>

        {/* Tactical Evacuation Route Visual Map (5 Cols) */}
        <div className="lg:col-span-5 rounded-xl overflow-hidden bg-surface-container-low border border-surface-variant/40 shadow-xl flex flex-col justify-between">
          <div className="relative h-64 bg-surface-container-lowest overflow-hidden">
            <img
              alt="Safe Evacuation Corridor Map"
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
              src={ASSETS.SHELTER_MAP}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute top-3 left-3 bg-tertiary-container/90 backdrop-blur-md px-space-sm py-space-2xs rounded font-label-sm text-label-sm text-on-tertiary-container font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-ping"></span>
              SAFE CORRIDOR ACTIVE
            </div>
            <div className="absolute bottom-3 right-3 bg-surface-container-lowest/85 backdrop-blur-md px-space-sm py-space-2xs rounded text-xs font-mono text-on-surface-variant border border-surface-variant/30">
              VECTOR: 1.2 KM / ELEV +210M
            </div>
          </div>

          <div className="p-space-md space-y-space-xs">
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">Trail Clearance:</span>
              <span className="text-tertiary font-bold">100% Unblocked</span>
            </div>
            <div className="flex items-center justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">SDRF Escort Team:</span>
              <span className="text-on-surface font-mono font-semibold">Stationed at Checkpoint B</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 5 CRITICAL FIELD SURVIVAL INSTRUCTIONS */}
      <section className="space-y-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-xl">fact_check</span>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            5 Critical Field Survival Directives
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-space-sm">
          {SURVIVAL_STEPS.map((s) => (
            <div
              key={s.step}
              className="p-space-md rounded-xl bg-surface-container/70 border border-surface-variant/30 backdrop-blur-md flex flex-col justify-between space-y-space-sm hover:bg-surface-container transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display-lg text-headline-lg font-extrabold text-surface-variant font-mono">
                    {s.step}
                  </span>
                  <span className="material-symbols-outlined text-2xl text-primary">{s.icon}</span>
                </div>
                <h3 className="font-label-lg text-label-lg font-bold text-on-surface mt-space-xs">
                  {s.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIRECT EMERGENCY HELPLINES */}
      <section className="rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-space-lg shadow-xl space-y-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-xl">ring_volume</span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Direct Emergency Helplines (Priority Dial)
            </h2>
          </div>
          {copiedNumber && (
            <span className="text-xs font-mono text-tertiary bg-tertiary/15 px-space-sm py-space-2xs rounded">
              Dialing {copiedNumber}...
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
          {EMERGENCY_HELPLINES.filter((h) => !h.isFullWidth).map((h) => (
            <button
              key={h.number}
              onClick={() => handleCall(h.number)}
              className="p-space-md rounded-xl bg-surface-container-high/70 border border-surface-variant/40 hover:bg-surface-variant text-left transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between w-full">
                <span className="material-symbols-outlined text-2xl text-primary group-hover:scale-110 transition-transform">
                  {h.icon}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-mono">
                  CALL 24/7
                </span>
              </div>
              <div className="mt-space-sm">
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  {h.title}
                </div>
                <div className="font-headline-sm text-headline-sm font-bold text-on-surface font-mono mt-1">
                  {h.number}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* National 112 Full Width Card */}
        <button
          onClick={() => handleCall('112')}
          className="w-full p-space-md rounded-xl bg-secondary-container/20 border border-secondary/40 hover:bg-secondary-container/30 text-left transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-space-md group"
        >
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-3xl">local_police</span>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm font-bold text-on-surface">
                National Police &amp; Quick Response Force (National SOS)
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                All India Unified Emergency Dispatch • Satellite GPS auto-triangulation supported
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="font-display-lg text-display-lg font-bold text-secondary font-mono">
              112
            </span>
            <span className="material-symbols-outlined text-2xl text-secondary">phone_forwarded</span>
          </div>
        </button>
      </section>

      {/* 5. OFFLINE SMS ALERT & CELL BROADCAST PANEL */}
      <section className="rounded-xl bg-surface-container-low border border-surface-variant/40 p-space-md shadow-md flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="space-y-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-lg">sms</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Cell Broadcast &amp; Offline SMS Fallback
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Current SMS Payload:{' '}
            <code className="text-xs bg-surface-container-lowest px-1.5 py-0.5 rounded font-mono text-on-surface">
              [EVAC-CRIT] TIER 4 LANDSLIDE DIKCHU CORRIDOR. EVACUATE TO GOVT SR SEC SCHOOL SHELTER A VIA RIDGE RD. STAY OFF NH-10.
            </code>
          </p>
        </div>
        <button
          onClick={handleResendBeacon}
          disabled={beaconSent}
          className="w-full md:w-auto bg-surface-container-high text-on-surface hover:bg-surface-variant font-label-md text-label-md px-space-md py-space-xs rounded transition-all cursor-pointer border border-surface-variant/40 flex items-center justify-center gap-space-2xs whitespace-nowrap disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-base">
            {beaconSent ? 'sync' : 'cell_tower'}
          </span>
          <span>{beaconSent ? 'Transmitting Packet...' : 'Re-send Emergency SMS Beacon to SDMA'}</span>
        </button>
      </section>
    </div>
  );
};
