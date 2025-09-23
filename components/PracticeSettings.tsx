import React from "react";
import { PracticeMode, PracticeDisplayMode, PracticeSettings as PracticeSettingsType } from "../types";

interface PracticeSettingsProps {
  settings: PracticeSettingsType;
  onSettingsChange: (settings: Partial<PracticeSettingsType>) => void;
  isActive: boolean;
}

const ModeSelector: React.FC<{
  currentMode: PracticeMode;
  onModeChange: (mode: PracticeMode) => void;
  disabled: boolean;
}> = ({ currentMode, onModeChange, disabled }) => {
  const modes = [
    {
      key: PracticeMode.Letters,
      label: "🔤 Nur Buchstaben",
      description: "A-Z, a-z"
    },
    {
      key: PracticeMode.LettersNumbers,
      label: "🔢 Buchstaben + Zahlen",
      description: "A-Z, a-z, 0-9"
    },
    {
      key: PracticeMode.German,
      label: "🇩🇪 Deutsch",
      description: "Mit Umlauten ä, ö, ü, ß"
    },
    {
      key: PracticeMode.Minecraft,
      label: "⚡ Gaming",
      description: "WASD + Gaming-Zeichen"
    },
    {
      key: PracticeMode.FullCharset,
      label: "🎯 Vollständig",
      description: "Alle Zeichen + Sonderzeichen"
    },
  ];

  return (
    <div className="minecraft-panel p-4">
      <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
        📝 Zeichensatz
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {modes.map((mode) => (
          <button
            key={mode.key}
            onClick={() => onModeChange(mode.key)}
            disabled={disabled}
            className={`minecraft-button text-left p-3 transition-all ${
              currentMode === mode.key
                ? 'emerald shadow-emerald-500/50'
                : disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-600'
            }`}
          >
            <div className="font-bold">{mode.label}</div>
            <div className="text-xs text-gray-300">{mode.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

const DisplayModeSelector: React.FC<{
  currentMode: PracticeDisplayMode;
  onModeChange: (mode: PracticeDisplayMode) => void;
  disabled: boolean;
}> = ({ currentMode, onModeChange, disabled }) => {
  const modes = [
    {
      key: PracticeDisplayMode.Single,
      label: "📱 Einzelzeichen",
      description: "Ein Zeichen nach dem anderen"
    },
    {
      key: PracticeDisplayMode.Sequence,
      label: "📊 Sequenz",
      description: "Mehrere Zeichen gleichzeitig"
    },
    {
      key: PracticeDisplayMode.Rain,
      label: "🌧 Zeichenregen",
      description: "Fallende Zeichen abfangen"
    },
    {
      key: PracticeDisplayMode.Rhythm,
      label: "🎵 Rhythmus",
      description: "Im Takt tippen"
    },
  ];

  return (
    <div className="minecraft-panel p-4">
      <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
        🎮 Anzeigemodus
      </h4>
      <div className="grid grid-cols-1 gap-2">
        {modes.map((mode) => (
          <button
            key={mode.key}
            onClick={() => onModeChange(mode.key)}
            disabled={disabled}
            className={`minecraft-button text-left p-3 transition-all ${
              currentMode === mode.key
                ? 'emerald shadow-emerald-500/50'
                : disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-600'
            }`}
          >
            <div className="font-bold">{mode.label}</div>
            <div className="text-xs text-gray-300">{mode.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

const SpeedControl: React.FC<{
  speed: number;
  onSpeedChange: (speed: number) => void;
  disabled: boolean;
}> = ({ speed, onSpeedChange, disabled }) => {
  return (
    <div className="minecraft-panel p-4">
      <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
        🚀 Geschwindigkeit
      </h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm minecraft-text">Langsam</span>
          <span className="text-sm minecraft-text">Schnell</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          disabled={disabled}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right,
              #10b981 0%,
              #10b981 ${((speed - 0.5) / (3 - 0.5)) * 100}%,
              #4b5563 ${((speed - 0.5) / (3 - 0.5)) * 100}%,
              #4b5563 100%)`
          }}
        />
        <div className="text-center">
          <span className="minecraft-text text-emerald-400 font-bold">
            {speed.toFixed(1)}x
          </span>
        </div>
      </div>
    </div>
  );
};

const VisualSettings: React.FC<{
  settings: PracticeSettingsType;
  onSettingsChange: (settings: Partial<PracticeSettingsType>) => void;
  disabled: boolean;
}> = ({ settings, onSettingsChange, disabled }) => {
  return (
    <div className="minecraft-panel p-4">
      <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
        🎨 Anzeige-Optionen
      </h4>
      <div className="space-y-3">
        {/* Tastatur anzeigen */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.showKeyboard}
            onChange={(e) => onSettingsChange({ showKeyboard: e.target.checked })}
            disabled={disabled}
            className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
          />
          <span className="minecraft-text">⌨️ Tastatur anzeigen</span>
        </label>

        {/* Sound */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={(e) => onSettingsChange({ soundEnabled: e.target.checked })}
            disabled={disabled}
            className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
          />
          <span className="minecraft-text">🔊 Sound-Feedback</span>
        </label>

        {/* Partikel */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.particlesEnabled}
            onChange={(e) => onSettingsChange({ particlesEnabled: e.target.checked })}
            disabled={disabled}
            className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
          />
          <span className="minecraft-text">✨ Partikel-Effekte</span>
        </label>
      </div>
    </div>
  );
};

const AdvancedSettings: React.FC<{
  settings: PracticeSettingsType;
  onSettingsChange: (settings: Partial<PracticeSettingsType>) => void;
  disabled: boolean;
}> = ({ settings, onSettingsChange, disabled }) => {
  return (
    <div className="minecraft-panel p-4">
      <h4 className="text-lg font-bold minecraft-text text-yellow-300 mb-3">
        ⚙️ Erweiterte Einstellungen
      </h4>
      <div className="space-y-4">
        {/* Sequenz-Länge */}
        {settings.displayMode === PracticeDisplayMode.Sequence && (
          <div>
            <label className="block minecraft-text text-sm mb-2">
              📏 Sequenz-Länge: {settings.sequenceLength}
            </label>
            <input
              type="range"
              min="3"
              max="10"
              value={settings.sequenceLength || 5}
              onChange={(e) => onSettingsChange({ sequenceLength: parseInt(e.target.value) })}
              disabled={disabled}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {/* Rhythmus-Intervall */}
        {settings.displayMode === PracticeDisplayMode.Rhythm && (
          <div>
            <label className="block minecraft-text text-sm mb-2">
              🎵 Rhythmus: {((settings.rhythmInterval || 1000) / 1000).toFixed(1)}s
            </label>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={settings.rhythmInterval || 1000}
              onChange={(e) => onSettingsChange({ rhythmInterval: parseInt(e.target.value) })}
              disabled={disabled}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const PracticeSettings: React.FC<PracticeSettingsProps> = ({
  settings,
  onSettingsChange,
  isActive,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold minecraft-text text-yellow-300">
          🏗️ Übungsplatz Einstellungen
        </h2>
        {isActive && (
          <p className="text-sm text-red-400 mt-2">
            ⚠️ Einstellungen können während der Übung nicht geändert werden
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <ModeSelector
            currentMode={settings.mode}
            onModeChange={(mode) => onSettingsChange({ mode })}
            disabled={isActive}
          />

          <DisplayModeSelector
            currentMode={settings.displayMode}
            onModeChange={(displayMode) => onSettingsChange({ displayMode })}
            disabled={isActive}
          />
        </div>

        <div className="space-y-4">
          <SpeedControl
            speed={settings.speed}
            onSpeedChange={(speed) => onSettingsChange({ speed })}
            disabled={isActive}
          />

          <VisualSettings
            settings={settings}
            onSettingsChange={onSettingsChange}
            disabled={isActive}
          />

          <AdvancedSettings
            settings={settings}
            onSettingsChange={onSettingsChange}
            disabled={isActive}
          />
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #064e3b;
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
        }

        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #064e3b;
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
};