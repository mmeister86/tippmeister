import React from "react";

const FingerIcon = ({
  fingerType,
}: {
  fingerType: "pinky" | "ring" | "middle" | "index" | "thumb";
}) => {
  const colors = {
    pinky: "var(--minecraft-redstone)",
    ring: "var(--minecraft-gold)",
    middle: "var(--minecraft-sand)",
    index: "var(--minecraft-emerald)",
    thumb: "var(--minecraft-diamond)",
  };

  return (
    <div
      className="minecraft-inventory-slot inline-block mr-2"
      style={{ background: colors[fingerType], width: "24px", height: "24px" }}
    ></div>
  );
};

export const Instructions: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <div
          className="minecraft-inventory-slot mx-auto mb-4"
          style={{
            width: "64px",
            height: "64px",
            background: "var(--minecraft-emerald)",
          }}
        >
          <span style={{ fontSize: "32px" }}>📚</span>
        </div>
        <h2 className="text-2xl font-bold minecraft-text">
          📖 Minecraft Tipp-Guide
        </h2>
        <p className="text-sm minecraft-text opacity-80 mt-2">
          So wirst du zum Redstone-Tipper-Meister!
        </p>
      </div>

      <div className="minecraft-panel">
        <div
          className="minecraft-inventory-slot mb-4"
          style={{
            background: "var(--minecraft-grass)",
            width: "48px",
            height: "48px",
          }}
        >
          <span style={{ fontSize: "24px" }}>1️⃣</span>
        </div>
        <h3
          className="text-lg font-bold minecraft-text mb-3"
          style={{ color: "var(--minecraft-emerald)" }}
        >
          Die Grundstellung (Home Row)
        </h3>
        <p className="minecraft-text text-sm mb-4 opacity-90">
          Lege deine Finger auf die mittlere Reihe der Tastatur - das ist deine
          "Basis" wie in Minecraft! Linke Finger:{" "}
          <span
            className="font-bold"
            style={{ color: "var(--minecraft-gold)" }}
          >
            A, S, D, F
          </span>{" "}
          | Rechte Finger:{" "}
          <span
            className="font-bold"
            style={{ color: "var(--minecraft-gold)" }}
          >
            J, K, L, Ö
          </span>
        </p>
        <div
          className="minecraft-panel text-center minecraft-font text-lg tracking-widest"
          style={{ background: "var(--minecraft-black)", padding: "16px" }}
        >
          <span style={{ color: "var(--minecraft-redstone)" }}>A</span>
          <span style={{ color: "var(--minecraft-gold)" }}>S</span>
          <span style={{ color: "var(--minecraft-sand)" }}>D</span>
          <span style={{ color: "var(--minecraft-emerald)" }}>F</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: "var(--minecraft-emerald)" }}>J</span>
          <span style={{ color: "var(--minecraft-sand)" }}>K</span>
          <span style={{ color: "var(--minecraft-gold)" }}>L</span>
          <span style={{ color: "var(--minecraft-redstone)" }}>Ö</span>
        </div>
      </div>

      <div className="minecraft-panel">
        <div
          className="minecraft-inventory-slot mb-4"
          style={{
            background: "var(--minecraft-diamond)",
            width: "48px",
            height: "48px",
          }}
        >
          <span style={{ fontSize: "24px" }}>2️⃣</span>
        </div>
        <h3
          className="text-lg font-bold minecraft-text mb-3"
          style={{ color: "var(--minecraft-diamond)" }}
        >
          Das Minecraft-Tippen
        </h3>
        <p className="minecraft-text text-sm mb-4 opacity-90">
          Wähle ein Level aus! Die Minecraft-Tastatur zeigt dir, welche Taste du
          drücken musst. Jeder Finger hat seine eigene Farbe - wie verschiedene
          Minecraft-Blöcke!
        </p>
        <div className="space-y-2">
          <div className="flex items-center">
            <FingerIcon fingerType="pinky" />
            <span className="minecraft-text text-xs">
              Kleiner Finger - Redstone Rot
            </span>
          </div>
          <div className="flex items-center">
            <FingerIcon fingerType="ring" />
            <span className="minecraft-text text-xs">Ringfinger - Gold</span>
          </div>
          <div className="flex items-center">
            <FingerIcon fingerType="middle" />
            <span className="minecraft-text text-xs">Mittelfinger - Sand</span>
          </div>
          <div className="flex items-center">
            <FingerIcon fingerType="index" />
            <span className="minecraft-text text-xs">
              Zeigefinger - Smaragd
            </span>
          </div>
          <div className="flex items-center">
            <FingerIcon fingerType="thumb" />
            <span className="minecraft-text text-xs">
              Daumen - Diamant (Leertaste)
            </span>
          </div>
        </div>
      </div>

      <div className="minecraft-panel">
        <div
          className="minecraft-inventory-slot mb-4"
          style={{
            background: "var(--minecraft-gold)",
            width: "48px",
            height: "48px",
          }}
        >
          <span style={{ fontSize: "24px" }}>3️⃣</span>
        </div>
        <h3
          className="text-lg font-bold minecraft-text mb-3"
          style={{ color: "var(--minecraft-gold)" }}
        >
          Ziel: Werde zum Typing-Champion!
        </h3>
        <p className="minecraft-text text-sm opacity-90">
          Tippe so schnell und genau wie möglich! Sammle XP (WPM) und erreiche
          100% Genauigkeit. Je mehr du übst, desto schneller wirst du - wie beim
          Minecraft bauen!
          <span
            style={{ color: "var(--minecraft-emerald)" }}
            className="font-bold"
          >
            Viel Erfolg, Crafter!
          </span>
        </p>
      </div>
    </div>
  );
};
