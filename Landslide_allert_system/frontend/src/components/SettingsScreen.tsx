import React, { useState } from 'react';

export const SettingsScreen: React.FC = () => {
  const [syncInterval, setSyncInterval] = useState('60s');
  const [offlineSms, setOfflineSms] = useState(true);
  const [audioSiren, setAudioSiren] = useState(true);
  const [satellitePriority, setSatellitePriority] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-space-2xl space-y-space-lg">
      <section className="bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 p-space-lg rounded-xl shadow-md space-y-space-2xs">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-xl">settings</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
            System Telemetry &amp; Preferences
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface">
          Command Center Settings
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Configure telemetry polling frequencies, low-bandwidth fallback gateways, and audio siren thresholds.
        </p>
      </section>

      <div className="max-w-3xl space-y-space-base">
        <div className="p-space-lg rounded-xl bg-surface-container/80 backdrop-blur-xl border border-surface-variant/40 space-y-space-md">
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Telemetry &amp; Network Protocol
          </h2>

          <div className="space-y-space-sm font-body-md">
            <div className="flex items-center justify-between py-space-xs border-b border-surface-variant/20">
              <div>
                <div className="text-on-surface font-semibold">Sensor Polling Rate</div>
                <div className="text-xs text-on-surface-variant">
                  Frequency of IoT piezometer &amp; rainfall gauge requests
                </div>
              </div>
              <select
                value={syncInterval}
                onChange={(e) => setSyncInterval(e.target.value)}
                className="bg-surface-container-high border border-surface-variant/40 text-on-surface px-space-md py-space-xs rounded-lg text-sm"
              >
                <option value="30s">Every 30 seconds</option>
                <option value="60s">Every 60 seconds (Default)</option>
                <option value="5m">Every 5 minutes (Low Power)</option>
                <option value="15m">Every 15 minutes</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-space-xs border-b border-surface-variant/20">
              <div>
                <div className="text-on-surface font-semibold">Automated SMS Fallback Gateway</div>
                <div className="text-xs text-on-surface-variant">
                  Convert Tier 4 breaches into encrypted cell broadcasts if LTE packet loss occurs
                </div>
              </div>
              <input
                type="checkbox"
                checked={offlineSms}
                onChange={(e) => setOfflineSms(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-space-xs border-b border-surface-variant/20">
              <div>
                <div className="text-on-surface font-semibold">Critical Threat Audio Siren</div>
                <div className="text-xs text-on-surface-variant">
                  Audible alarm chime upon detection of Level 4 Emergency acceleration
                </div>
              </div>
              <input
                type="checkbox"
                checked={audioSiren}
                onChange={(e) => setAudioSiren(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-space-xs">
              <div>
                <div className="text-on-surface font-semibold">Prefer Satellite Uplink (INSAT-3DR)</div>
                <div className="text-xs text-on-surface-variant">
                  Prioritize geostationary satellite telemetry over terrestrial fiber during monsoon
                </div>
              </div>
              <input
                type="checkbox"
                checked={satellitePriority}
                onChange={(e) => setSatellitePriority(e.target.checked)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-space-sm flex items-center justify-between">
            <button
              onClick={handleSave}
              className="bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md py-space-xs px-space-lg rounded-lg transition-all font-semibold cursor-pointer"
            >
              Save Preferences
            </button>
            {saved && (
              <span className="text-xs font-bold text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Configuration synchronized to field transceiver!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
