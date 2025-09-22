import React from "react";
import type { Highscore } from "../types";

interface HighscoresProps {
  highscores: Highscore[];
  onClear: () => void;
}

const TrophyIcon = () => (
  <div
    className="minecraft-inventory-slot"
    style={{
      width: "64px",
      height: "64px",
      background: "var(--minecraft-gold)",
    }}
  >
    <span style={{ fontSize: "32px" }}>🏆</span>
  </div>
);

export const Highscores: React.FC<HighscoresProps> = ({
  highscores,
  onClear,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `${index + 1}`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-4">
          <TrophyIcon />
          <h2 className="text-2xl font-bold minecraft-text">🏆 Hall of Fame</h2>
        </div>
        <p className="text-sm minecraft-text opacity-80 mt-2">
          Hier stehen die besten Minecraft-Tipper!
        </p>
      </div>

      {highscores.length === 0 ? (
        <div className="minecraft-panel text-center">
          <div
            className="minecraft-inventory-slot mx-auto mb-4"
            style={{ fontSize: "32px" }}
          >
            📜
          </div>
          <p className="minecraft-text">
            Noch keine Highscores! Spiele eine Runde und werde Legende!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="minecraft-panel">
            <div className="grid grid-cols-5 gap-4 text-xs font-bold minecraft-text px-4">
              <span>Rang</span>
              <span>WPM</span>
              <span>Genauigkeit</span>
              <span>Level</span>
              <span className="text-right">Datum</span>
            </div>
          </div>
          {highscores.map((score, index) => (
            <div key={index} className="minecraft-panel">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div
                  className="minecraft-inventory-slot text-center"
                  style={{ width: "32px", height: "32px", fontSize: "16px" }}
                >
                  {getRankIcon(index)}
                </div>
                <div
                  className="minecraft-text font-bold"
                  style={{ color: "var(--minecraft-diamond)" }}
                >
                  {score.wpm}
                </div>
                <div
                  className="minecraft-text font-bold"
                  style={{ color: "var(--minecraft-emerald)" }}
                >
                  {score.accuracy.toFixed(1)}%
                </div>
                <div className="minecraft-text">{score.difficulty}</div>
                <div className="minecraft-text text-right text-xs opacity-80">
                  {formatDate(score.date)}
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mt-6">
            <button onClick={onClear} className="minecraft-button redstone">
              🗑️ Alle Records löschen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
