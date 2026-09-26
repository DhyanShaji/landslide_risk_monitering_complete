import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/mockData';

interface ResilienceScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEvacModal: () => void;
}

export const ResilienceScreen: React.FC<ResilienceScreenProps> = ({
  onNavigate,
  onOpenEvacModal,
}) => {
  const [heartbeatSent, setHeartbeatSent] = useState(false);
  const [packetCount, setPacketCount] = useState(1480);
  const [testLog, setTestLog] = useState<string[]>([
    '[11:32:10 IST] Routine satellite packet handshake acknowledged by INSAT-3DR.',
    '[11:30:00 IST] Mesh sync across 14 BSNL mountain towers verified.',
    '[11:28:45 IST] Encrypted SMS fallback queue verified empty (Basal Low Risk).',
  ]);

  const handleSendHeartbeat = () => {
    setHeartbeatSent(true);
    const newLog = `[${new Date().toLocaleTimeString('en-IN', { hour12: false })} IST] Test SMS heartbeat dispatched to +91 94340 88219 (Field Handset). Response latency: 420ms. Status: DELIVERED.`;
    setTestLog((prev) => [newLog, ...prev]);
    setPacketCount((prev) => prev + 1);
    setTimeout(() => setHeartbeatSent(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-6">
      {/* SECTION HEADER */}
      <div className="bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 px-6 py-4 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-2xl">perm_phone_msg</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm uppercase tracking-wider text-secondary font-bold">
                Resilience Layer Active
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm text-on-surface-variant font-mono">
                BSNL / Airtel Cell Broadcast Relay
              </span>
            </div>
            <h1 className="font-headline-xl text-on-surface font-bold tracking-tight mt-1">
              SMS Fallback &amp; Offline Network Protocol
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md transition-all cursor-pointer border border-surface-variant/30"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Overview</span>
          </button>
        </div>
      </div>

      {/* CORE RESILIENCE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Operational Protocol Details (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-label-sm uppercase tracking-wider text-secondary font-bold">
                Automated Disaster Cell Broadcast
              </span>
              <span className="font-label-sm px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-bold">
                PROTOCOL ARMED
              </span>
            </div>

            <h3 className="font-headline-sm font-bold text-on-surface">
              Zero-Data SMS Alert Fallback Mechanism
            </h3>

            <p className="font-body-md text-on-surface-variant">
              In the event that 4G/5G cellular data bandwidth degrades or fiber trunks along NH-10 are severed by landslides, the Slopesence AI system automatically pivots to low-frequency SMS and 2G Cell Broadcast (CB Channel 4370).
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-md font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">history</span>
                    Last Cached Packet Sync:
                  </span>
                  <span className="font-mono text-sm text-tertiary font-bold">08 mins ago</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Local offline SQLite cache stores risk boundaries for up to 72 hours without internet access.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-md font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-base">sim_card</span>
                    Cellular Carrier Uplink:
                  </span>
                  <span className="font-mono text-sm text-tertiary font-bold">Airtel / BSNL NER (Good)</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Direct transceiver pairing via Gangtok DDMA emergency tower array.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-variant/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-md font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">contact_phone</span>
                    Registered Community Residents:
                  </span>
                  <span className="font-mono text-sm text-secondary font-bold">{packetCount} Citizens</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Pre-configured phone numbers in Gangtok Ridge &amp; Dikchu-Singtam Corridor for priority SMS dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Test Action Trigger */}
          <div className="pt-2">
            <button
              onClick={handleSendHeartbeat}
              disabled={heartbeatSent}
              className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-label-lg py-3 px-4 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-xl">
                {heartbeatSent ? 'sync' : 'send_to_mobile'}
              </span>
              <span>
                {heartbeatSent ? 'Dispatching Encrypted Heartbeat...' : 'Test SMS Heartbeat to Field Handset'}
              </span>
            </button>
          </div>
        </div>

        {/* Right: Live Packet Transmission Console (5 Cols) */}
        <div className="lg:col-span-5 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-surface-variant/30 pb-3 mb-4">
              <span className="font-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                Transmission Log Stream
              </span>
              <span className="font-mono text-xs text-on-surface-variant">PORT 8429/VHF</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs max-h-72 overflow-y-auto pr-1">
              {testLog.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-surface-container-lowest/80 border border-surface-variant/20 text-on-surface-variant leading-relaxed"
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-variant/30 text-xs space-y-2">
            <div className="flex justify-between text-on-surface font-semibold">
              <span>SMS Broadcast Priority:</span>
              <span className="text-secondary font-mono">CLASS 0 (FLASH ALERT)</span>
            </div>
            <div className="text-on-surface-variant">
              When Tier 4 Critical Trigger fires, message displays instantly on all mobile screens without requiring app launch.
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION LINKS */}
      <div className="rounded-xl bg-surface-container-low border border-surface-variant/30 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={ASSETS.NDMA_EMBLEM} alt="NDMA India" className="w-8 h-8 object-contain" />
          <div className="font-body-sm text-on-surface-variant">
            Jump to other connected disaster mitigation modules:
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('emergency')}
            className="px-4 py-2 rounded-lg bg-error-container text-on-error font-label-md font-semibold cursor-pointer shadow-md hover:opacity-90 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">warning</span>
            <span>Emergency Evacuation HUD</span>
          </button>
          <button
            onClick={() => onNavigate('alerts')}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md font-semibold cursor-pointer border border-surface-variant/40 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">notifications</span>
            <span>State Alert Bulletins</span>
          </button>
        </div>
      </div>
    </div>
  );
};
