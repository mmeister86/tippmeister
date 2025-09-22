import React from "react";
import { KEYBOARD_ROWS_QWERTZ, KEY_LAYOUT, FINGER_COLORS } from "../constants";

interface KeyboardProps {
  currentCharacter?: string;
}

const HandIndicator: React.FC<{ hand: "left" | "right" }> = ({ hand }) => {
  const isLeft = hand === "left";
  return (
    <div
      className={`minecraft-panel absolute -top-12 text-xs font-bold ${
        isLeft ? "left-2" : "right-2"
      }`}
      style={{
        background: isLeft
          ? "var(--minecraft-diamond)"
          : "var(--minecraft-emerald)",
      }}
    >
      <span className="minecraft-text">
        {isLeft ? "👈 Linke Hand" : "Rechte Hand 👉"}
      </span>
    </div>
  );
};

export const Keyboard: React.FC<KeyboardProps> = React.memo(
  ({ currentCharacter }) => {
    const charLower = currentCharacter ? currentCharacter.toLowerCase() : null;
    const keyInfo = charLower ? KEY_LAYOUT[charLower] : null;

    return (
      <div className="minecraft-panel relative">
        <div className="text-center mb-4">
          <span className="text-sm minecraft-text opacity-80">
            ⌨️ Minecraft Tastatur
          </span>
        </div>
        {keyInfo && <HandIndicator hand={keyInfo.hand} />}
        <div
          className="space-y-2 p-4"
          style={{ background: "var(--minecraft-dark-gray)" }}
        >
          {KEYBOARD_ROWS_QWERTZ.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((key) => {
                const isCurrent = key === charLower;
                const keyLayoutInfo = KEY_LAYOUT[key];
                const fingerColorClass = keyLayoutInfo
                  ? FINGER_COLORS[keyLayoutInfo.finger]
                  : "";

                let keyClass = `minecraft-key ${fingerColorClass}`;

                if (key === " ") {
                  keyClass += " w-32 h-8";
                } else {
                  keyClass += " w-8 h-8";
                }

                if (isCurrent) {
                  keyClass += " active minecraft-glow";
                }

                return (
                  <div key={key} className={keyClass}>
                    {key === " " ? "SPACE" : key.toUpperCase()}
                    {["f", "j"].includes(key) && (
                      <div
                        className="absolute bottom-1 w-2 h-0.5"
                        style={{ background: "var(--minecraft-gold)" }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
