import React, { useMemo } from "react";
import { PracticeStats as PracticeStatsType } from "../types";

interface PracticeStatsProps {
  stats: PracticeStatsType;
  characterFrequency: Array<{
    character: string;
    frequency: number;
    accuracy: number;
  }>;
  isActive: boolean;
}

const StatCard: React.FC<{
  icon: string;
  label: string;
  value: string | number;
  color: string;
  subtext?: string;
}> = ({ icon, label, value, color, subtext }) => {
  return (
    <div className={`minecraft-inventory-slot bg-gradient-to-br ${color} p-4 text-center`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold minecraft-text text-white drop-shadow-lg">
        {value}
      </div>
      <div className="text-xs minecraft-text text-gray-200">
        {label}
      </div>
      {subtext && (
        <div className="text-xs minecraft-text text-gray-300 mt-1">
          {subtext}
        </div>
      )}
    </div>
  );
};

const ProgressBar: React.FC<{
  percentage: number;
  color: string;
  label: string;
}> = ({ percentage, color, label }) => {
  return (
    <div className="minecraft-panel p-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm minecraft-text">{label}</span>
        <span className="text-sm minecraft-text font-bold">
          {percentage.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

const CharacterBreakdown: React.FC<{
  characterFrequency: Array<{
    character: string;
    frequency: number;
    accuracy: number;
  }>;
  problematicKeys: string[];
}> = ({ characterFrequency, problematicKeys }) => {
  const topCharacters = characterFrequency.slice(0, 10);

  return (
    <div className="minecraft-panel p-4">
      <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
        📊 Zeichen-Analyse
      </h4>

      {topCharacters.length === 0 ? (
        <div className="text-center text-gray-400 minecraft-text">
          🔍 Noch keine Daten vorhanden
        </div>
      ) : (
        <div className="space-y-2">
          {topCharacters.map((char) => (
            <div key={char.character} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`minecraft-inventory-slot w-8 h-8 flex items-center justify-center text-sm font-bold ${
                  problematicKeys.includes(char.character)
                    ? 'bg-red-600 text-white'
                    : char.accuracy >= 90
                      ? 'bg-green-600 text-white'
                      : char.accuracy >= 70
                        ? 'bg-yellow-600 text-white'
                        : 'bg-red-600 text-white'
                }`}>
                  {char.character === ' ' ? '␣' : char.character}
                </div>
                <div className="flex-1">
                  <div className="text-sm minecraft-text">
                    {char.frequency.toFixed(1)}% häufig
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold ${
                  char.accuracy >= 90 ? 'text-green-400' :
                  char.accuracy >= 70 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {char.accuracy.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProblematicKeys: React.FC<{
  problematicKeys: string[];
}> = ({ problematicKeys }) => {
  if (problematicKeys.length === 0) {
    return (
      <div className="minecraft-panel p-4">
        <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
          🎯 Problematische Tasten
        </h4>
        <div className="text-center text-green-400 minecraft-text">
          🎉 Alle Tasten werden gut gemeistert!
        </div>
      </div>
    );
  }

  return (
    <div className="minecraft-panel p-4">
      <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
        ⚠️ Problematische Tasten
      </h4>
      <div className="flex flex-wrap gap-2">
        {problematicKeys.map((key) => (
          <div
            key={key}
            className="minecraft-inventory-slot bg-red-600 text-white px-3 py-2 font-bold"
          >
            {key === ' ' ? '␣ (Space)' : key}
          </div>
        ))}
      </div>
      <div className="text-sm text-gray-400 minecraft-text mt-3">
        💡 Diese Tasten haben eine Genauigkeit unter 70%
      </div>
    </div>
  );
};

const StreakDisplay: React.FC<{
  currentStreak: number;
  bestStreak: number;
}> = ({ currentStreak, bestStreak }) => {
  return (
    <div className="minecraft-panel p-4">
      <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
        🔥 Trefferserien
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-400 minecraft-text">
            {currentStreak}
          </div>
          <div className="text-sm text-gray-300 minecraft-text">
            Aktuelle Serie
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-400 minecraft-text">
            {bestStreak}
          </div>
          <div className="text-sm text-gray-300 minecraft-text">
            Beste Serie
          </div>
        </div>
      </div>

      {currentStreak >= 10 && (
        <div className="text-center mt-3 p-2 bg-orange-900/50 rounded">
          <span className="text-orange-300 text-sm minecraft-text">
            🔥 Heiße Serie! Weiter so!
          </span>
        </div>
      )}
    </div>
  );
};

const SessionProgress: React.FC<{
  sessionTime: number;
  charactersTyped: number;
  isActive: boolean;
}> = ({ sessionTime, charactersTyped, isActive }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionLevel = (chars: number) => {
    if (chars < 50) return { level: 1, name: "Neuling", color: "text-gray-400" };
    if (chars < 150) return { level: 2, name: "Lehrling", color: "text-green-400" };
    if (chars < 300) return { level: 3, name: "Geselle", color: "text-blue-400" };
    if (chars < 500) return { level: 4, name: "Experte", color: "text-purple-400" };
    return { level: 5, name: "Meister", color: "text-yellow-400" };
  };

  const sessionLevel = getSessionLevel(charactersTyped);

  return (
    <div className="minecraft-panel p-4">
      <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
        ⏱️ Session-Fortschritt
      </h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="minecraft-text">Zeit:</span>
          <span className={`minecraft-text font-bold ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
            {formatTime(sessionTime)}
            {isActive && (
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse" />
            )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="minecraft-text">Level:</span>
          <span className={`minecraft-text font-bold ${sessionLevel.color}`}>
            {sessionLevel.level} - {sessionLevel.name}
          </span>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400 minecraft-text">
            {charactersTyped} Zeichen getippt
          </div>
        </div>
      </div>
    </div>
  );
};

export const PracticeStats: React.FC<PracticeStatsProps> = ({
  stats,
  characterFrequency,
  isActive,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const mainStats = useMemo(() => [
    {
      icon: "⚡",
      label: "WPM",
      value: stats.wpm,
      color: "from-yellow-500 to-orange-600",
      subtext: "Wörter/Min"
    },
    {
      icon: "🎯",
      label: "Genauigkeit",
      value: `${stats.accuracy.toFixed(1)}%`,
      color: stats.accuracy >= 95 ? "from-green-500 to-emerald-600" :
            stats.accuracy >= 80 ? "from-yellow-500 to-orange-600" :
            "from-red-500 to-red-600",
      subtext: `${stats.correctCharacters}/${stats.charactersTyped}`
    },
    {
      icon: "⏱️",
      label: "Zeit",
      value: formatTime(stats.sessionTime),
      color: "from-blue-500 to-purple-600",
      subtext: isActive ? "Läuft..." : "Gestoppt"
    },
    {
      icon: "📝",
      label: "Zeichen",
      value: stats.charactersTyped,
      color: "from-purple-500 to-pink-600",
      subtext: "Getippt"
    }
  ], [stats, isActive]);

  return (
    <div className="space-y-6">
      {/* Haupt-Statistiken */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mainStats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            subtext={stat.subtext}
          />
        ))}
      </div>

      {/* Fortschrittsbalken */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProgressBar
          percentage={stats.accuracy}
          color="bg-gradient-to-r from-green-400 to-emerald-500"
          label="🎯 Genauigkeit"
        />
        <ProgressBar
          percentage={Math.min((stats.wpm / 60) * 100, 100)}
          color="bg-gradient-to-r from-yellow-400 to-orange-500"
          label="⚡ WPM Fortschritt (Ziel: 60)"
        />
      </div>

      {/* Detaillierte Analyse */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <SessionProgress
            sessionTime={stats.sessionTime}
            charactersTyped={stats.charactersTyped}
            isActive={isActive}
          />
          <StreakDisplay
            currentStreak={stats.streak}
            bestStreak={stats.bestStreak}
          />
        </div>

        <div className="space-y-4">
          <CharacterBreakdown
            characterFrequency={characterFrequency}
            problematicKeys={stats.problematicKeys}
          />
          <ProblematicKeys
            problematicKeys={stats.problematicKeys}
          />
        </div>
      </div>
    </div>
  );
};