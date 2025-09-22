import React from "react";
import type { Badge } from "../types";
import { BadgeIcon } from "./BadgeIcons";

interface BadgesProps {
  badges: Badge[];
}

export const Badges: React.FC<BadgesProps> = ({ badges }) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div
          className="minecraft-inventory-slot mx-auto mb-4"
          style={{
            width: "64px",
            height: "64px",
            background: "var(--minecraft-gold)",
          }}
        >
          <span style={{ fontSize: "32px" }}>🎖️</span>
        </div>
        <h2 className="text-2xl font-bold minecraft-text">
          🏆 Achievement Sammlung
        </h2>
        <p className="text-sm minecraft-text opacity-80 mt-2">
          Sammle alle Minecraft-Tipp-Achievements!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="minecraft-panel relative"
            style={{
              background: badge.achieved
                ? "var(--minecraft-gold)"
                : "var(--minecraft-dark-gray)",
              opacity: badge.achieved ? 1 : 0.6,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="minecraft-inventory-slot"
                style={{
                  background: badge.achieved
                    ? "var(--minecraft-emerald)"
                    : "var(--minecraft-stone)",
                  width: "48px",
                  height: "48px",
                }}
              >
                <BadgeIcon badgeId={badge.id} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm minecraft-text">
                  {badge.name}
                </h3>
                <p className="text-xs minecraft-text opacity-80">
                  {badge.description}
                </p>
              </div>
            </div>
            {badge.achieved && (
              <div
                className="absolute top-2 right-2 minecraft-glow"
                style={{ fontSize: "16px" }}
                title="Achievement Unlocked!"
              >
                ✅
              </div>
            )}
            {!badge.achieved && (
              <div
                className="absolute top-2 right-2"
                style={{ fontSize: "16px", opacity: 0.5 }}
              >
                🔒
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
