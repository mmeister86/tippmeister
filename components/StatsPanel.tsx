import React from "react";

interface StatsPanelProps {
  wpm: number;
  accuracy: number;
  errors: number;
  elapsedTime: number;
}

const StatCard: React.FC<{
  label: string;
  value: string | number;
  unit?: string;
  icon: string;
  color: string;
}> = ({ label, value, unit, icon, color }) => (
  <div className="minecraft-panel text-center">
    <div
      className="minecraft-inventory-slot mx-auto mb-2"
      style={{ background: color }}
    >
      <span style={{ fontSize: "20px" }}>{icon}</span>
    </div>
    <span className="text-xs minecraft-text opacity-80 block mb-1">
      {label}
    </span>
    <div className="text-lg font-bold minecraft-text">
      {value}
      {unit && <span className="text-xs ml-1">{unit}</span>}
    </div>
  </div>
);

export const StatsPanel: React.FC<StatsPanelProps> = ({
  wpm,
  accuracy,
  errors,
  elapsedTime,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="text-center mb-4">
        <span className="text-sm minecraft-text opacity-80">
          ⚡ Spieler Stats
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Geschwindigkeit"
          value={wpm}
          unit="WPM"
          icon="⚡"
          color="var(--minecraft-diamond)"
        />
        <StatCard
          label="Genauigkeit"
          value={accuracy.toFixed(1)}
          unit="%"
          icon="🎯"
          color="var(--minecraft-emerald)"
        />
        <StatCard
          label="Fehler"
          value={errors}
          icon="💥"
          color="var(--minecraft-redstone)"
        />
        <StatCard
          label="Zeit"
          value={formatTime(elapsedTime)}
          icon="⏰"
          color="var(--minecraft-gold)"
        />
      </div>
    </div>
  );
};
