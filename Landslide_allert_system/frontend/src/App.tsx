/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { TrendScreen } from './components/TrendScreen';
import { SurveillanceScreen } from './components/SurveillanceScreen';
import { ResilienceScreen } from './components/ResilienceScreen';
import { RiskMapScreen } from './components/RiskMapScreen';
import { RiskAnalysisScreen } from './components/RiskAnalysisScreen';
import { EmergencyScreen } from './components/EmergencyScreen';
import { WeatherForecastScreen } from './components/WeatherForecastScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { EvacuationModal } from './components/EvacuationModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [selectedTerritory, setSelectedTerritory] = useState<string>('sikkim');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isEvacModalOpen, setIsEvacModalOpen] = useState<boolean>(false);

  // Scroll to top on section redirect
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Persistent Left Sidebar with Direct Section Redirect Links */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          setIsMobileSidebarOpen(false);
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Top Tactical Command Header with Quick Jump Section Pills */}
      <Header
        currentScreen={currentScreen}
        selectedTerritory={selectedTerritory}
        onSelectTerritory={(id) => setSelectedTerritory(id)}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
      />

      {/* Main Viewport: Clean, Non-Scrolling Direct Views */}
      <main className="flex-1 lg:pl-72 pt-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
          {currentScreen === 'home' && (
            <HomeScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenEvacModal={() => setIsEvacModalOpen(true)}
              selectedTerritory={selectedTerritory}
            />
          )}

          {currentScreen === 'trend' && (
            <TrendScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenEvacModal={() => setIsEvacModalOpen(true)}
            />
          )}

          {currentScreen === 'surveillance' && (
            <SurveillanceScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenEvacModal={() => setIsEvacModalOpen(true)}
            />
          )}

          {currentScreen === 'resilience' && (
            <ResilienceScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenEvacModal={() => setIsEvacModalOpen(true)}
            />
          )}

          {currentScreen === 'risk-map' && (
            <RiskMapScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenEvacModal={() => setIsEvacModalOpen(true)}
              selectedTerritory={selectedTerritory}
              onSelectTerritory={(id) => setSelectedTerritory(id)}
            />
          )}

          {currentScreen === 'risk-analysis' && (
            <RiskAnalysisScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenEvacModal={() => setIsEvacModalOpen(true)}
            />
          )}

          {currentScreen === 'emergency' && (
            <EmergencyScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenEvacModal={() => setIsEvacModalOpen(true)}
            />
          )}

          {currentScreen === 'weather-forecast' && (
            <WeatherForecastScreen onNavigate={(screen) => setCurrentScreen(screen)} />
          )}

          {currentScreen === 'alerts' && (
            <AlertsScreen
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenEvacModal={() => setIsEvacModalOpen(true)}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen onNavigate={(screen) => setCurrentScreen(screen)} />
          )}

          {currentScreen === 'settings' && <SettingsScreen />}
        </div>
      </main>

      {/* Critical Evacuation SOS Modal */}
      {isEvacModalOpen && (
        <EvacuationModal
          isOpen={isEvacModalOpen}
          onClose={() => setIsEvacModalOpen(false)}
          onNavigate={(screen) => {
            setIsEvacModalOpen(false);
            setCurrentScreen(screen);
          }}
        />
      )}
    </div>
  );
}
