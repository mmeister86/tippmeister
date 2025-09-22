import React, { useState, useEffect, useCallback } from "react";
import { Navbar, View } from "./components/Navbar";
import { DifficultySelector } from "./components/DifficultySelector";
import { TypingArea } from "./components/TypingArea";
import { StatsPanel } from "./components/StatsPanel";
import { Keyboard } from "./components/Keyboard";
import { Modal } from "./components/Modal";
import { Highscores } from "./components/Highscores";
import { Instructions } from "./components/Instructions";
import { Badges } from "./components/Badges";
import { useTypingGame } from "./hooks/useTypingGame";
import { generateText } from "./services/textGenerator";
import { Difficulty, Highscore, Badge } from "./types";
import { minecraftSounds } from "./utils/sounds";

// Minecraft-themed Badge definitions
const initialBadges: Badge[] = [
  {
    id: "wpm-beginner",
    name: "🌱 Sprössling Schreiber",
    description: "Erreiche 40 WPM im Gras-Level. Erstes Wachstum!",
    achieved: false,
    metric: "wpm",
    threshold: 40,
    difficulty: Difficulty.Beginner,
  },
  {
    id: "wpm-intermediate",
    name: "⚡ Redstone Rekord",
    description: "Erreiche 60 WPM im Diamant-Level. Energie pur!",
    achieved: false,
    metric: "wpm",
    threshold: 60,
    difficulty: Difficulty.Intermediate,
  },
  {
    id: "wpm-expert",
    name: "🔥 Enderdrachen Tipper",
    description: "Erreiche 80 WPM im Nether-Level. Legendär!",
    achieved: false,
    metric: "wpm",
    threshold: 80,
    difficulty: Difficulty.Expert,
  },
  {
    id: "accuracy-95",
    name: "🎯 Bogenschütze",
    description: "Treffe 95% deiner Tasten. Präzision wie ein Skeleton!",
    achieved: false,
    metric: "accuracy",
    threshold: 95,
  },
  {
    id: "accuracy-100",
    name: "💎 Perfekter Crafter",
    description: "Null Fehler! Du bist ein wahrer Minecraft-Meister!",
    achieved: false,
    metric: "accuracy",
    threshold: 100,
  },
  {
    id: "games-10",
    name: "🛡️ Ausdauer-Krieger",
    description: "Überlebe 10 Tipp-Abenteuer. Wahre Ausdauer!",
    achieved: false,
    metric: "gamesPlayed",
    threshold: 10,
  },
];

const App: React.FC = () => {
  const [view, setView] = useState<View>("menu");
  const {
    gameState,
    difficulty,
    text,
    typed,
    errors,
    wpm,
    accuracy,
    totalTyped,
    elapsedTime,
    errorFlash,
    setDifficulty,
    startGame,
    resetGame,
    handleKeyDown,
  } = useTypingGame();

  const [highscores, setHighscores] = useState<Highscore[]>([]);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedHighscores = localStorage.getItem("highscores");
      if (savedHighscores) {
        setHighscores(JSON.parse(savedHighscores));
      }
      const savedBadges = localStorage.getItem("badges");
      if (savedBadges) {
        setBadges(JSON.parse(savedBadges));
      }
      const savedGamesPlayed = localStorage.getItem("gamesPlayed");
      if (savedGamesPlayed) {
        setGamesPlayed(JSON.parse(savedGamesPlayed));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  // Save highscores to localStorage
  const saveHighscores = useCallback((newScores: Highscore[]) => {
    const sortedScores = newScores.sort((a, b) => b.wpm - a.wpm).slice(0, 10);
    setHighscores(sortedScores);
    localStorage.setItem("highscores", JSON.stringify(sortedScores));
  }, []);

  // Check for and update badges
  const checkBadges = useCallback(
    (
      currentWpm: number,
      currentAccuracy: number,
      currentDifficulty: Difficulty
    ) => {
      const newGamesPlayed = gamesPlayed + 1;
      setGamesPlayed(newGamesPlayed);
      localStorage.setItem("gamesPlayed", JSON.stringify(newGamesPlayed));

      const updatedBadges = badges.map((badge) => {
        if (badge.achieved) return badge;

        let isAchieved = false;
        switch (badge.metric) {
          case "wpm":
            if (
              badge.difficulty === currentDifficulty &&
              currentWpm >= (badge.threshold as number)
            ) {
              isAchieved = true;
            }
            break;
          case "accuracy":
            if (currentAccuracy >= (badge.threshold as number)) {
              isAchieved = true;
            }
            break;
          case "gamesPlayed":
            if (newGamesPlayed >= (badge.threshold as number)) {
              isAchieved = true;
            }
            break;
        }

        return { ...badge, achieved: isAchieved };
      });

      setBadges(updatedBadges);
      localStorage.setItem("badges", JSON.stringify(updatedBadges));
    },
    [badges, gamesPlayed]
  );

  // Effect for when game finishes
  useEffect(() => {
    if (gameState === "finished") {
      const newHighscore: Highscore = {
        wpm,
        accuracy,
        difficulty,
        date: new Date().toISOString(),
      };
      saveHighscores([...highscores, newHighscore]);
      checkBadges(wpm, accuracy, difficulty);

      // Trigger celebration sound
      setTimeout(() => {
        minecraftSounds.playLevelComplete();
      }, 500);
    }
  }, [
    gameState,
    wpm,
    accuracy,
    difficulty,
    highscores,
    saveHighscores,
    checkBadges,
  ]);

  // Effect for error feedback - nur Sound
  useEffect(() => {
    if (errorFlash) {
      minecraftSounds.playError();
    }
  }, [errorFlash]);

  // Keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
    minecraftSounds.playButtonClick();
    setDifficulty(selectedDifficulty);
    const newText = generateText(selectedDifficulty);
    startGame(newText);
    setView("game");
  };

  const handleReset = () => {
    resetGame();
    setView("menu");
  };

  const handleClearHighscores = () => {
    setHighscores([]);
    localStorage.removeItem("highscores");
  };

  const renderContent = () => {
    switch (view) {
      case "menu":
        return <DifficultySelector onSelect={handleSelectDifficulty} />;
      case "game":
        return (
          <div className="space-y-6">
            <StatsPanel
              wpm={wpm}
              accuracy={accuracy}
              errors={errors}
              elapsedTime={elapsedTime}
            />
            <TypingArea text={text} typed={typed} errorFlash={errorFlash} />
            <Keyboard currentCharacter={text[typed.length]} />
            <div className="text-center">
              <button
                onClick={handleReset}
                className="minecraft-button redstone"
              >
                ← Zurück zum Hauptmenü
              </button>
            </div>
          </div>
        );
      case "highscores":
        return (
          <Highscores highscores={highscores} onClear={handleClearHighscores} />
        );
      case "instructions":
        return <Instructions />;
      case "badges":
        return <Badges badges={badges} />;
      default:
        return <DifficultySelector onSelect={handleSelectDifficulty} />;
    }
  };

  return (
    <div
      className="min-h-screen minecraft-font"
      style={{
        background:
          "repeating-linear-gradient(45deg, var(--minecraft-grass), var(--minecraft-grass) 2px, var(--minecraft-emerald) 2px, var(--minecraft-emerald) 4px)",
      }}
    >
      <div className="container mx-auto p-4 md:p-8">
        <Navbar currentView={view} setView={setView} />
        <main className="minecraft-panel minecraft-text">
          {renderContent()}
        </main>
        <Modal
          isOpen={gameState === "finished"}
          onClose={handleReset}
          title="🏆 Level Complete! 🏆"
        >
          <div className="text-center space-y-4">
            <p className="text-sm minecraft-text">
              Fantastisch! Hier sind deine XP:
            </p>
            <div className="flex justify-around minecraft-panel">
              <div className="text-center minecraft-inventory-slot flex-col">
                <div
                  className="text-lg font-bold"
                  style={{ color: "var(--minecraft-gold)" }}
                >
                  {wpm}
                </div>
                <div className="text-xs">WPM</div>
              </div>
              <div className="text-center minecraft-inventory-slot flex-col">
                <div
                  className="text-lg font-bold"
                  style={{ color: "var(--minecraft-emerald)" }}
                >
                  {accuracy.toFixed(1)}%
                </div>
                <div className="text-xs">Genauigkeit</div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full minecraft-button emerald"
            >
              Neues Level
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default App;
