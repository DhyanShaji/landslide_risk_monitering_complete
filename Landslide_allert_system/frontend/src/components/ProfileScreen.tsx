import React from 'react';
import { ScreenId } from '../types';
import { ASSETS, OFFICER_PROFILE } from '../data/mockData';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full pb-space-2xl space-y-space-lg">
      {/* Officer Header Banner */}
      <section className="rounded-xl overflow-hidden bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 p-space-lg shadow-xl relative">
        <div className="flex flex-col md:flex-row items-center gap-space-lg">
          <img
            alt={OFFICER_PROFILE.name}
            className="w-28 h-28 rounded-full object-cover ring-4 ring-primary/40 shadow-2xl"
            src={ASSETS.OFFICER_AVATAR}
          />
          <div className="space-y-space-2xs text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                AUTHORIZED FIELD OFFICER
              </span>
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            </div>
            <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface">
              {OFFICER_PROFILE.name}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {OFFICER_PROFILE.designation} • {OFFICER_PROFILE.station}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-space-xs pt-space-2xs font-mono text-xs text-on-surface-variant">
              <span className="px-space-xs py-space-2xs bg-surface-container rounded">
                ID: {OFFICER_PROFILE.officerId}
              </span>
              <span className="px-space-xs py-space-2xs bg-surface-container rounded">
                TERMINAL: {OFFICER_PROFILE.satelliteTerminalId}
              </span>
              <span className="px-space-xs py-space-2xs bg-tertiary/20 text-tertiary rounded font-bold">
                ACTIVE DUTY
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Field Details & Credentials */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-base">
        <div className="lg:col-span-6 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-space-lg shadow-xl space-y-space-md">
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary">badge</span>
            Assigned Field Sectors &amp; Responsibilities
          </h2>
          <div className="space-y-space-sm">
            {OFFICER_PROFILE.assignedSectors.map((sec, idx) => (
              <div
                key={sec}
                className="p-space-sm rounded-lg bg-surface-container-high/70 border border-surface-variant/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-space-sm">
                  <span className="font-mono text-xs text-primary font-bold">0{idx + 1}</span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">
                    {sec}
                  </span>
                </div>
                <span className="text-xs text-tertiary font-mono font-bold">MONITORED</span>
              </div>
            ))}
          </div>

          <div className="pt-space-xs">
            <button
              onClick={() => onNavigate('risk-map')}
              className="w-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md py-space-xs px-space-md rounded-lg transition-all"
            >
              Open Tactical Map for My Sectors
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 p-space-lg shadow-xl space-y-space-md">
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary">phonelink_ring</span>
            Device &amp; Telemetry Equipment Diagnostics
          </h2>
          <div className="space-y-space-xs font-body-sm text-body-sm">
            <div className="flex justify-between py-space-xs border-b border-surface-variant/20">
              <span className="text-on-surface-variant">Handset Battery Health:</span>
              <span className="text-tertiary font-mono font-bold">{OFFICER_PROFILE.battery} (Optimal)</span>
            </div>
            <div className="flex justify-between py-space-xs border-b border-surface-variant/20">
              <span className="text-on-surface-variant">SDRF VHF Radio Frequency:</span>
              <span className="text-on-surface font-mono font-bold">{OFFICER_PROFILE.radioFrequency}</span>
            </div>
            <div className="flex justify-between py-space-xs border-b border-surface-variant/20">
              <span className="text-on-surface-variant">GPS Triangulation Accuracy:</span>
              <span className="text-primary font-mono font-bold">± 1.4 meters</span>
            </div>
            <div className="flex justify-between py-space-xs border-b border-surface-variant/20">
              <span className="text-on-surface-variant">Satellite Transceiver Mode:</span>
              <span className="text-tertiary font-semibold">INSAT-3DR Direct Push</span>
            </div>
            <div className="flex justify-between py-space-xs">
              <span className="text-on-surface-variant">Local Offline Database Cache:</span>
              <span className="text-secondary font-mono">148 MB Synced (3 min ago)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
