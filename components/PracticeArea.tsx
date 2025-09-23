import React, { useState } from "react";
import { usePracticeMode } from "../hooks/usePracticeMode";
import { CharacterDisplay } from "./CharacterDisplay";
import { PracticeSettings } from "./PracticeSettings";
import { PracticeStats } from "./PracticeStats";
import { Keyboard } from "./Keyboard";

type PracticeView = "settings" | "practice" | "stats";

export const PracticeArea: React.FC = () => {
  const [currentView, setCurrentView] = useState<PracticeView>("settings");
  const {
    settings,
    stats,
    isActive,
    currentCharacter,
    currentSequence,
    errorFlash,
    particleEffect,
    updateSettings,
    startPractice,
    stopPractice,
    resetPractice,
    getCharacterFrequency,
  } = usePracticeMode();

  const characterFrequency = getCharacterFrequency();

  const handleStartPractice = () => {
    startPractice();
    setCurrentView("practice");
  };

  const handleStopPractice = () => {
    stopPractice();
    setCurrentView("stats");
  };

  const handleResetPractice = () => {
    resetPractice();
    setCurrentView("settings");
  };

  const renderViewSelector = () => {
    const views = [
      { key: "settings", label: "⚙️ Einstellungen", disabled: isActive },
      { key: "practice", label: "🎮 Übung", disabled: false },
      { key: "stats", label: "📊 Statistiken", disabled: false },
    ];

    return (
      <div className="flex justify-center gap-2 mb-6">
        {views.map((view) => (
          <button
            key={view.key}
            onClick={() => !view.disabled && setCurrentView(view.key as PracticeView)}
            className={`minecraft-button px-4 py-2 transition-all ${
              currentView === view.key
                ? 'emerald shadow-emerald-500/50'
                : view.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-600'
            }`}
            disabled={view.disabled}
          >
            {view.label}
          </button>
        ))}
      </div>
    );
  };

  const renderActionButtons = () => {
    if (currentView === "practice") {
      return (
        <div className="flex justify-center gap-4 mt-6">
          {!isActive ? (
            <button
              onClick={handleStartPractice}
              className="minecraft-button emerald px-6 py-3 text-lg font-bold shadow-emerald-500/50 shadow-lg"
            >
              🚀 Übung starten
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={handleStopPractice}
                className="minecraft-button redstone px-6 py-3 text-lg font-bold shadow-red-500/50 shadow-lg"
              >
                ⏸️ Stoppen
              </button>
              <button
                onClick={handleResetPractice}
                className="minecraft-button px-6 py-3 text-lg font-bold"
              >
                🔄 Zurücksetzen
              </button>
            </div>
          )}
        </div>
      );
    }

    if (currentView === "stats" && stats.charactersTyped > 0) {
      return (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrentView("practice")}
            className="minecraft-button emerald px-6 py-3 text-lg font-bold"
          >
            🔄 Neue Übung
          </button>
          <button
            onClick={handleResetPractice}
            className="minecraft-button px-6 py-3 text-lg font-bold"
          >
            ⚙️ Einstellungen
          </button>
        </div>
      );
    }

    return null;
  };

  const renderContent = () => {
    switch (currentView) {
      case "settings":
        return (
          <PracticeSettings
            settings={settings}
            onSettingsChange={updateSettings}
            isActive={isActive}
          />
        );

      case "practice":
        return (
          <div className="space-y-6">
            {/* Live-Statistiken während der Übung */}
            {isActive && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="minecraft-inventory-slot bg-gradient-to-br from-yellow-500 to-orange-600 p-3 text-center">
                  <div className="text-xl font-bold text-white">{stats.wpm}</div>
                  <div className="text-xs text-gray-200">WPM</div>
                </div>
                <div className="minecraft-inventory-slot bg-gradient-to-br from-green-500 to-emerald-600 p-3 text-center">
                  <div className="text-xl font-bold text-white">{stats.accuracy.toFixed(1)}%</div>
                  <div className="text-xs text-gray-200">Genauigkeit</div>
                </div>
                <div className="minecraft-inventory-slot bg-gradient-to-br from-purple-500 to-pink-600 p-3 text-center">
                  <div className="text-xl font-bold text-white">{stats.charactersTyped}</div>
                  <div className="text-xs text-gray-200">Zeichen</div>
                </div>
                <div className="minecraft-inventory-slot bg-gradient-to-br from-orange-500 to-red-600 p-3 text-center">
                  <div className="text-xl font-bold text-white">{stats.streak}</div>
                  <div className="text-xs text-gray-200">Serie</div>
                </div>
              </div>
            )}

            {/* Charakter-Anzeige */}
            <CharacterDisplay
              currentCharacter={currentCharacter}
              currentSequence={currentSequence}
              displayMode={settings.displayMode}
              errorFlash={errorFlash}
              particleEffect={particleEffect}
            />

            {/* Tastatur */}
            {settings.showKeyboard && (
              <div className="mt-8">
                <Keyboard currentCharacter={currentCharacter} />
              </div>
            )}

            {/* Übungshinweise */}
            {!isActive && (
              <div className="minecraft-panel p-6 text-center">
                <h3 className="text-xl font-bold minecraft-text text-yellow-300 mb-4">
                  🎯 Bereit für die Übung?
                </h3>
                <div className="space-y-2 text-sm minecraft-text text-gray-300">
                  <p>
                    <strong>Modus:</strong> {
                      settings.mode === 'letters' ? '🔤 Nur Buchstaben' :
                      settings.mode === 'letters-numbers' ? '🔢 Buchstaben + Zahlen' :
                      settings.mode === 'german' ? '🇩🇪 Deutsch mit Umlauten' :
                      settings.mode === 'minecraft' ? '⚡ Gaming-Zeichen' :
                      '🎯 Vollständiger Zeichensatz'
                    }
                  </p>
                  <p>
                    <strong>Anzeige:</strong> {
                      settings.displayMode === 'single' ? '📱 Einzelzeichen' :
                      settings.displayMode === 'sequence' ? '📊 Sequenz' :
                      settings.displayMode === 'rain' ? '🌧 Zeichenregen' :
                      '🎵 Rhythmus'
                    }
                  </p>
                  <p>
                    <strong>Geschwindigkeit:</strong> {settings.speed}x
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case "stats":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold minecraft-text text-yellow-300 mb-2">
                📊 Übungsstatistiken
              </h2>
              {stats.charactersTyped === 0 ? (
                <p className="text-gray-400 minecraft-text">
                  Noch keine Übungsdaten vorhanden
                </p>
              ) : (
                <p className="text-gray-300 minecraft-text">
                  Deine Fortschritte im Überblick
                </p>
              )}
            </div>

            <PracticeStats
              stats={stats}
              characterFrequency={characterFrequency}
              isActive={isActive}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold minecraft-text text-yellow-300 mb-2">
          🏗️ Freier Übungsplatz
        </h1>
        <p className="minecraft-text text-gray-300">
          Trainiere deine Tippfähigkeiten in verschiedenen Modi ohne Zeitdruck
        </p>
      </div>

      {/* View-Selector */}
      {renderViewSelector()}

      {/* Content */}
      <main className="minecraft-panel minecraft-text">
        {renderContent()}
      </main>

      {/* Action Buttons */}
      {renderActionButtons()}

      {/* Tipps */}
      {!isActive && currentView === "practice" && (
        <div className="minecraft-panel p-4 mt-6 bg-blue-900/20">
          <h4 className="font-bold minecraft-text text-blue-300 mb-2">
            💡 Übungstipps
          </h4>
          <ul className="text-sm minecraft-text text-gray-300 space-y-1">
            <li>• Konzentriere dich auf Genauigkeit vor Geschwindigkeit</li>
            <li>• Verwende alle 10 Finger für optimale Effizienz</li>
            <li>• Schaue nicht auf die Tastatur - vertraue dem Muskelgedächtnis</li>
            <li>• Mache regelmäßig Pausen, um Ermüdung zu vermeiden</li>
            <li>• Übe täglich für beste Ergebnisse</li>
          </ul>
        </div>
      )}

      {/* Erfolgsmeldungen */}
      {stats.bestStreak >= 50 && (
        <div className="fixed bottom-4 right-4 minecraft-panel p-4 bg-green-900/90 border-green-400 border">
          <div className="text-green-300 font-bold">
            🔥 Unglaublich! {stats.bestStreak} Zeichen in Folge!
          </div>
        </div>
      )}

      {stats.wpm >= 60 && (
        <div className="fixed bottom-4 left-4 minecraft-panel p-4 bg-yellow-900/90 border-yellow-400 border">
          <div className="text-yellow-300 font-bold">
            ⚡ Profi-Level! {stats.wpm} WPM erreicht!
          </div>
        </div>
      )}
    </div>
  );
};