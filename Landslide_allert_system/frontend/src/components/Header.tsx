import React from 'react';
import { ScreenId } from '../types';
import { ASSETS, OFFICER_PROFILE, TERRITORIES } from '../data/mockData';

interface HeaderProps {
  currentScreen?: ScreenId;
  selectedTerritory: string;
  onSelectTerritory: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  selectedTerritory,
  onSelectTerritory,
  onNavigate,
  onToggleMobileSidebar,
}) => {
  return (
    <header
      id="command-header"
      className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/90 backdrop-blur-xl border-b border-surface-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6"
    >
      {/* Left: Mobile Toggle & Brand in Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-on-surface hover:bg-surface-container rounded-lg cursor-pointer"
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
          <img
            alt="Slopesence AI Logo"
            className="h-8 w-auto object-contain hidden sm:block"
            src={ASSETS.LOGO}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm font-bold tracking-tight text-on-surface">
                SLOPESENCE AI
              </span>
              <img
                src={ASSETS.NDMA_EMBLEM}
                alt="NDMA India"
                className="h-4 w-4 object-contain hidden md:inline-block"
                title="NDMA India Official Early Warning Partner"
              />
            </div>
            <span className="font-label-sm text-primary tracking-wider uppercase font-semibold">
              NER Command Center
            </span>
          </div>
        </div>
      </div>

      {/* Center: Quick Section Redirect Navigation Pills (No Scrolling Needed) */}
      <div className="hidden lg:flex items-center gap-1.5 bg-surface-container-lowest/80 border border-surface-variant/40 p-1 rounded-xl shadow-inner">
        <button
          onClick={() => onNavigate('home')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            currentScreen === 'home'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onNavigate('telemetry')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            currentScreen === 'telemetry'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Telemetry
        </button>
        <button
          onClick={() => onNavigate('trend')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            currentScreen === 'trend'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          24h Trend
        </button>
        <button
          onClick={() => onNavigate('risk-map')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            currentScreen === 'risk-map'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          GIS Map
        </button>
        <button
          onClick={() => onNavigate('risk-analysis')}
          className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
            currentScreen === 'risk-analysis'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
          }`}
        >
          AI SHAP
        </button>
        <button
          onClick={() => onNavigate('emergency')}
          className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1 ${
            currentScreen === 'emergency'
              ? 'bg-error-container text-on-error shadow-sm animate-pulse'
              : 'text-error hover:bg-error-container/20'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
          <span>Emergency</span>
        </button>
      </div>

      {/* Center: Live Telemetry Satellite Feed Status (Desktop only) */}
      <div className="hidden xl:flex items-center gap-space-sm bg-surface-container-low/70 border border-surface-variant/40 px-space-md py-space-xs rounded-full shadow-sm">
        <div className="flex items-center gap-space-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          <span className="font-label-sm text-label-sm font-semibold text-tertiary">Connected</span>
        </div>
        <span className="text-outline-variant font-label-sm text-label-sm">|</span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          Live NER Feed: <span className="text-primary font-medium">Active</span>
        </span>
        <span className="text-outline-variant font-label-sm text-label-sm">|</span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">Sync: Just now</span>
        <span className="font-label-sm text-label-sm px-space-xs py-space-2xs bg-secondary-container/20 text-secondary rounded-full font-bold uppercase">
          LIVE / SATELLITE
        </span>
      </div>

      {/* Right Controls: Alerts Banner, State Selector & User Profile */}
      <div className="flex items-center gap-space-sm sm:gap-space-md">
        {/* Active Alerts Pill */}
        <button
          onClick={() => onNavigate('emergency')}
          className="hidden md:flex items-center gap-space-xs bg-error-container/30 hover:bg-error-container/50 border border-error/30 px-space-md py-space-xs rounded-full transition-colors cursor-pointer"
          title="Jump to active emergency sector"
        >
          <span className="font-label-sm text-label-sm text-error font-semibold flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-base text-error animate-pulse">warning</span>
            2 Active Alerts (Sikkim & Manipur)
          </span>
        </button>

        {/* Territory Selector */}
        <div className="relative flex items-center">
          <select
            id="territory-select"
            value={selectedTerritory}
            onChange={(e) => onSelectTerritory(e.target.value)}
            className="bg-surface-container-high/90 border border-surface-variant/50 text-on-surface font-label-sm text-label-sm px-space-md py-space-xs rounded-lg focus:outline-none cursor-pointer appearance-none pr-space-xl"
          >
            {TERRITORIES.map((t) => (
              <option key={t.id} value={t.id} className="bg-surface-container-highest text-on-surface">
                {t.name} ({t.capital})
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-2 text-on-surface-variant text-base">
            expand_more
          </span>
        </div>

        {/* Officer Avatar Chip */}
        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-space-sm pl-space-xs hover:opacity-90 transition-opacity"
          title="Open Field Officer Profile"
        >
          <div className="text-right hidden sm:flex flex-col">
            <span className="font-label-sm text-label-sm font-semibold text-on-surface">
              {OFFICER_PROFILE.name}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {OFFICER_PROFILE.designation}
            </span>
          </div>
          <img
            alt={OFFICER_PROFILE.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
            src={ASSETS.OFFICER_AVATAR}
          />
        </button>
      </div>
    </header>
  );
};
