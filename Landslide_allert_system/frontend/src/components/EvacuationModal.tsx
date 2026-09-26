import React, { useState } from 'react';

interface EvacuationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToEmergency: () => void;
}

export const EvacuationModal: React.FC<EvacuationModalProps> = ({
  isOpen,
  onClose,
  onNavigateToEmergency,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!isOpen) return null;

  const handleBroadcast = () => {
    if (!confirmed) return;
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastSent(true);
    }, 1200);
  };

  const handleFinish = () => {
    setBroadcastSent(false);
    setConfirmed(false);
    onClose();
    onNavigateToEmergency();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-surface-container border-2 border-error max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-error-container p-space-md flex items-center justify-between text-on-error">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-3xl animate-pulse">emergency_share</span>
            <div>
              <div className="font-label-sm uppercase font-bold tracking-wider">
                TACTICAL COMMAND DISPATCH
              </div>
              <h3 className="font-headline-sm font-bold">Mass Evacuation &amp; SOS Broadcast</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-on-error/80 hover:text-on-error p-1">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-space-lg space-y-space-md text-on-surface">
          {!broadcastSent ? (
            <>
              <div className="p-space-sm rounded-lg bg-error-container/20 border border-error/40 text-on-surface text-sm space-y-1">
                <div className="font-bold text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">warning</span>
                  CRITICAL NOTICE: AUTHORIZED OFFICERS ONLY
                </div>
                <p className="text-xs text-on-surface-variant">
                  This action will initiate immediate public alarm sirens, dispatch Cell Broadcast
                  transmissions to all handsets in Sector 2 (Dikchu - Singtam Corridor), and notify
                  SDRF / NDRF 12th Battalion.
                </p>
              </div>

              {/* Channels List */}
              <div className="space-y-space-2xs">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Targeted Broadcast Channels:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-space-xs rounded bg-surface-container-high border border-surface-variant/30 flex items-center gap-2">
                    <span className="material-symbols-outlined text-error text-base">cell_tower</span>
                    <span>Cell Broadcast to 1,480 Handsets</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-high border border-surface-variant/30 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">notifications_active</span>
                    <span>Municipal Acoustic Sirens</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-high border border-surface-variant/30 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base">local_police</span>
                    <span>SDRF &amp; NDRF Quick Dispatch</span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container-high border border-surface-variant/30 flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-base">night_shelter</span>
                    <span>Govt Sr Sec School Shelter Alert</span>
                  </div>
                </div>
              </div>

              {/* Confirmation Checkbox */}
              <div className="p-space-sm rounded-lg bg-surface-container-lowest/80 border border-surface-variant/30">
                <label className="flex items-start gap-space-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-error cursor-pointer"
                  />
                  <span className="text-xs text-on-surface leading-relaxed">
                    I confirm that slope inclinometer shear and pore-water saturation thresholds
                    have reached Level 4 Critical Emergency criteria, and I authorize emergency
                    evacuation orders.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-space-md py-space-xs rounded text-sm text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBroadcast}
                  disabled={!confirmed || isBroadcasting}
                  className="bg-error-container hover:bg-error text-on-error px-space-lg py-space-sm rounded-lg font-bold text-sm shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">
                    {isBroadcasting ? 'sync' : 'campaign'}
                  </span>
                  <span>{isBroadcasting ? 'Dispatched Uplink...' : 'DISPATCH MASS EVACUATION'}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="py-space-md text-center space-y-space-md">
              <div className="w-16 h-16 rounded-full bg-error-container text-on-error flex items-center justify-center mx-auto animate-bounce">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-on-surface">
                  Emergency Broadcast Dispatched!
                </h4>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1">
                  Cell Broadcast, SMS relay, and SDMA command centers have been alerted. Redirecting
                  to the Active Emergency HUD.
                </p>
              </div>
              <button
                type="button"
                onClick={handleFinish}
                className="bg-primary text-on-primary font-bold px-space-lg py-space-sm rounded-lg text-sm shadow-lg hover:bg-primary-container"
              >
                Go to Emergency Command HUD
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
