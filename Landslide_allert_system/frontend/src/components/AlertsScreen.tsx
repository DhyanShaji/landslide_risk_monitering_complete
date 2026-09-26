import React, { useState } from 'react';
import { ScreenId } from '../types';

interface AlertsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEvacModal: () => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({ onNavigate, onOpenEvacModal }) => {
  const [filterState, setFilterState] = useState('all');

  const alerts = [
    {
      id: 'alt-1',
      title: 'Dikchu - Singtam Highway Corridor (NH-10)',
      state: 'Sikkim',
      tier: 'Tier 4 Emergency',
      severity: 'critical',
      probability: '89%',
      issued: '18 mins ago',
      desc: 'Active toe erosion and rapid pore-water acceleration. Impending rockslide blocking NH-10. Evacuate to Govt Sr Sec School Shelter A.',
      targetSector: 'Sector 2, Sikkim Himalaya Range',
      contacts: 'DDMA Gangtok 1077',
    },
    {
      id: 'alt-2',
      title: 'Noney Hill Section - Tupul Embankment',
      state: 'Manipur',
      tier: 'Tier 4 Emergency',
      severity: 'critical',
      probability: '86%',
      issued: '42 mins ago',
      desc: 'Railway line cutting shear zone failure detected by InSAR. Immediate stoppage of track vehicular movements advised.',
      targetSector: 'Sub-Division Noney',
      contacts: 'SEOC Manipur 1070',
    },
    {
      id: 'alt-3',
      title: 'Gangtok Ridge Sector 4',
      state: 'Sikkim',
      tier: 'Tier 3 Warning',
      severity: 'warning',
      probability: '78%',
      issued: '1 hour ago',
      desc: '142mm rainfall cumulative has saturated weathered phyllite slopes. Pre-evacuation readiness advised for high-density slope dwellings.',
      targetSector: 'East Sikkim Urban Corridor',
      contacts: 'Sir Tashi Namgyal High School Haven',
    },
    {
      id: 'alt-4',
      title: 'Dawki Ghat Route & Mawkdok Ravine',
      state: 'Meghalaya',
      tier: 'Tier 3 Warning',
      severity: 'warning',
      probability: '71%',
      issued: '2 hours ago',
      desc: 'Excess runoff velocity along gorge walls. Heavy tourist vehicle restrictions in force.',
      targetSector: 'East Khasi Hills',
      contacts: 'Shillong Control 0364-2222222',
    },
    {
      id: 'alt-5',
      title: 'Mangan North Road',
      state: 'Sikkim',
      tier: 'Tier 2 Watch',
      severity: 'watch',
      probability: '44%',
      issued: '3 hours ago',
      desc: 'Intermittent slope creep observed at culvert km 54. Watch protocol armed.',
      targetSector: 'North Sikkim Valley Transit',
      contacts: 'Mangan Community Hall Shelter',
    },
  ];

  const filteredAlerts = alerts.filter(
    (a) => filterState === 'all' || a.state.toLowerCase() === filterState.toLowerCase()
  );

  return (
    <div className="flex flex-col w-full pb-space-2xl space-y-space-lg">
      {/* Header */}
      <section className="bg-surface-container-low/90 backdrop-blur-xl border border-surface-variant/30 p-space-lg rounded-xl shadow-md space-y-space-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-error text-2xl animate-pulse">warning</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-error font-bold">
              National Disaster Warning Relay
            </span>
          </div>
          <span className="font-label-sm text-label-sm px-space-sm py-space-2xs rounded bg-error-container text-on-error font-bold">
            2 ACTIVE TIER 4 EMERGENCIES
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl font-bold text-on-surface">
          Active Disaster Bulletins &amp; Alerts
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Live alert feeds synchronized from NDMA, Sikkim SDMA, and State Emergency Operation Centers across the 8 North-Eastern states.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-space-xs pt-space-sm flex-wrap">
          <span className="text-xs text-on-surface-variant uppercase font-semibold">Filter State:</span>
          {['all', 'Sikkim', 'Manipur', 'Meghalaya', 'Arunachal'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterState(st)}
              className={`px-space-sm py-space-2xs rounded-full text-xs font-semibold transition-all ${
                filterState.toLowerCase() === st.toLowerCase()
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {st === 'all' ? 'All NER States' : st}
            </button>
          ))}
        </div>
      </section>

      {/* Alerts Feed */}
      <div className="space-y-space-md">
        {filteredAlerts.map((alt) => (
          <div
            key={alt.id}
            className={`p-space-lg rounded-xl border backdrop-blur-xl shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-space-md ${
              alt.severity === 'critical'
                ? 'bg-surface-container/90 border-error/50'
                : alt.severity === 'warning'
                ? 'bg-surface-container/80 border-secondary/40'
                : 'bg-surface-container/70 border-surface-variant/30'
            }`}
          >
            <div className="space-y-space-xs flex-1">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span
                  className={`font-label-sm text-label-sm font-bold px-space-xs py-space-2xs rounded uppercase ${
                    alt.severity === 'critical'
                      ? 'bg-error-container text-on-error animate-pulse'
                      : alt.severity === 'warning'
                      ? 'bg-secondary-container/30 text-secondary'
                      : 'bg-primary/20 text-primary'
                  }`}
                >
                  {alt.tier}
                </span>
                <span className="text-xs bg-surface-container-high px-space-xs py-space-2xs rounded text-on-surface font-semibold">
                  {alt.state}
                </span>
                <span className="text-xs text-outline font-mono">Issued {alt.issued}</span>
              </div>

              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {alt.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">{alt.desc}</p>

              <div className="flex items-center gap-space-md text-xs font-mono text-on-surface-variant pt-space-xs">
                <span>Sector: {alt.targetSector}</span>
                <span>•</span>
                <span>Contact: {alt.contacts}</span>
              </div>
            </div>

            <div className="flex md:flex-col items-center gap-space-sm justify-between md:justify-center border-t md:border-t-0 md:border-l border-surface-variant/30 pt-space-sm md:pt-0 md:pl-space-lg">
              <div className="text-right md:text-center">
                <span className="text-xs text-on-surface-variant block">Risk Index</span>
                <span
                  className={`font-display-lg text-headline-xl font-bold ${
                    alt.severity === 'critical'
                      ? 'text-error'
                      : alt.severity === 'warning'
                      ? 'text-secondary'
                      : 'text-primary'
                  }`}
                >
                  {alt.probability}
                </span>
              </div>

              <div className="flex items-center gap-space-xs">
                {alt.severity === 'critical' ? (
                  <button
                    onClick={() => onNavigate('emergency')}
                    className="bg-error-container text-on-error hover:opacity-90 font-label-md text-label-md px-space-md py-space-xs rounded transition-all font-bold"
                  >
                    Open Emergency HUD
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('risk-analysis')}
                    className="bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md px-space-md py-space-xs rounded transition-all font-semibold"
                  >
                    Analyze Risk
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
