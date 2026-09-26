import React from 'react';
import { ScreenId } from '../types';
import { ASSETS } from '../data/mockData';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'home' as ScreenId, label: 'Overview', icon: 'home' },
    { id: 'trend' as ScreenId, label: '24-Hr Risk Trend', icon: 'show_chart' },
    { id: 'surveillance' as ScreenId, label: 'Highway Surveillance', icon: 'videocam' },
    { id: 'risk-map' as ScreenId, label: 'Tactical GIS Map', icon: 'explore' },
    { id: 'risk-analysis' as ScreenId, label: 'AI Risk Analysis', icon: 'analytics' },
    { id: 'emergency' as ScreenId, label: 'Emergency HUD', icon: 'fmd_bad', iconClass: 'text-error', badge: 'CRITICAL', badgeClass: 'bg-error-container text-on-error animate-pulse' },
    { id: 'weather-forecast' as ScreenId, label: 'Weather Forecast', icon: 'thunderstorm' },
    { id: 'alerts' as ScreenId, label: 'Alert Bulletins', icon: 'warning', badge: '2', badgeClass: 'bg-secondary-container/20 text-secondary' },
    { id: 'resilience' as ScreenId, label: 'SMS Resilience', icon: 'perm_phone_msg' },
    { id: 'profile' as ScreenId, label: 'Field Officer', icon: 'account_circle' },
  ];

  const utilityItems = [
    { id: 'settings' as ScreenId, label: 'Settings', icon: 'settings' },
  ];

  const handleNavClick = (id: ScreenId) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-low/95 backdrop-blur-xl z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-variant/30 transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Header Brand */}
          <div className="h-16 px-space-base flex items-center justify-between gap-space-sm bg-surface-container-lowest/60 border-b border-surface-variant/20">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-space-sm text-left group"
            >
              <img
                alt="Slopesence AI Logo"
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                src={ASSETS.LOGO}
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary">
                    SLOPESENCE
                  </span>
                  <span className="font-label-sm text-label-sm px-space-xs py-space-2xs bg-primary/15 text-primary rounded">
                    AI
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  NER Early Warning Sys
                </span>
              </div>
            </button>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Main Navigation List */}
          <nav className="px-space-sm py-space-md space-y-space-2xs">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-space-md">
                    <span
                      className={`material-symbols-outlined text-xl ${
                        item.iconClass ? item.iconClass : ''
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-label-lg text-label-lg">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`font-label-sm text-label-sm px-space-xs py-space-2xs rounded font-bold uppercase ${item.badgeClass}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="my-space-sm h-px bg-surface-variant/40" />
            <div className="px-space-sm py-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                System Utilities
              </span>
            </div>

            {utilityItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-space-md">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="font-label-lg text-label-lg">{item.label}</span>
                  </div>
                </button>
              );
            })}

            <button
              onClick={() => alert('Field Session Logged: Telemetry heartbeat saved in local terminal buffer.')}
              className="w-full flex items-center justify-between px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left"
            >
              <div className="flex items-center gap-space-md">
                <span className="material-symbols-outlined text-xl">logout</span>
                <span className="font-label-lg text-label-lg">Logout</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Satellite Uplink HUD */}
        <div className="p-space-base m-space-sm rounded-xl bg-surface-container/70 backdrop-blur-md space-y-space-sm border border-surface-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-base">
                satellite_alt
              </span>
              <span className="font-label-sm text-label-sm font-semibold uppercase text-primary">
                NER Satellite Uplink
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-tertiary font-bold">100%</span>
          </div>

          <div className="space-y-space-2xs">
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>INSAT-3DR / Sentinel-1</span>
              <span className="text-tertiary font-medium">Active</span>
            </div>
            <div className="w-full h-1 bg-surface-variant rounded-full overflow-hidden">
              <div className="w-full h-full bg-tertiary"></div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Cache (SMS Fallback)
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
};
