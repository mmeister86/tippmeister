import React from "react";

export type View = "menu" | "game" | "highscores" | "instructions" | "badges" | "practice";

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavItem: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`minecraft-button ${isActive ? "emerald" : ""} text-xs`}
    >
      {label}
    </button>
  );
};

const MinecraftIcon: React.FC = () => (
  <div
    className="minecraft-inventory-slot"
    style={{ background: "var(--minecraft-grass)" }}
  >
    <span style={{ color: "var(--text-light)", fontSize: "16px" }}>⌨</span>
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="minecraft-panel mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <MinecraftIcon />
          <h1 className="text-lg font-bold minecraft-text">
            Tipp-Meister Minecraft Edition
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <NavItem
            label="⚔ Spiel"
            isActive={currentView === "menu" || currentView === "game"}
            onClick={() => setView("menu")}
          />
          <NavItem
            label="🏗 Übungsplatz"
            isActive={currentView === "practice"}
            onClick={() => setView("practice")}
          />
          <NavItem
            label="🏆 Bestenliste"
            isActive={currentView === "highscores"}
            onClick={() => setView("highscores")}
          />
          <NavItem
            label="📚 Anleitung"
            isActive={currentView === "instructions"}
            onClick={() => setView("instructions")}
          />
          <NavItem
            label="🎖 Abzeichen"
            isActive={currentView === "badges"}
            onClick={() => setView("badges")}
          />
        </div>
      </div>
    </nav>
  );
};
