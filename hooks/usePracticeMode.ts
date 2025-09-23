import { useState, useCallback, useRef, useEffect } from "react";
import { PracticeMode, PracticeDisplayMode, PracticeSettings, PracticeStats } from "../types";
import { CharacterGenerator } from "../services/characterGenerator";

const defaultSettings: PracticeSettings = {
  mode: PracticeMode.Letters,
  displayMode: PracticeDisplayMode.Single,
  speed: 1,
  showKeyboard: true,
  soundEnabled: true,
  particlesEnabled: true,
  sequenceLength: 5,
  rhythmInterval: 1000,
};

const defaultStats: PracticeStats = {
  charactersTyped: 0,
  correctCharacters: 0,
  wpm: 0,
  accuracy: 100,
  sessionTime: 0,
  characterBreakdown: {},
  problematicKeys: [],
  streak: 0,
  bestStreak: 0,
};

export const usePracticeMode = () => {
  const [settings, setSettings] = useState<PracticeSettings>(defaultSettings);
  const [stats, setStats] = useState<PracticeStats>(defaultStats);
  const [isActive, setIsActive] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<string>("");
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [errorFlash, setErrorFlash] = useState(false);
  const [particleEffect, setParticleEffect] = useState<{ x: number; y: number; character: string } | null>(null);

  const generatorRef = useRef<CharacterGenerator>(new CharacterGenerator(settings.mode));
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const rhythmTimerRef = useRef<number | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  const particleTimeoutRef = useRef<number | null>(null);

  const updateSettings = useCallback((newSettings: Partial<PracticeSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      if (newSettings.mode && newSettings.mode !== prev.mode) {
        generatorRef.current.updateMode(newSettings.mode);
      }
      return updated;
    });
  }, []);

  const generateNextCharacter = useCallback(() => {
    if (settings.displayMode === PracticeDisplayMode.Sequence) {
      // Immer eine neue Sequenz erstellen
      const newSequence = generatorRef.current.generateSequence(settings.sequenceLength || 5);
      setCurrentSequence(newSequence);
      setSequenceIndex(0);
      setCurrentCharacter(newSequence[0]);
    } else {
      const nextChar = generatorRef.current.generateRandomCharacter();
      setCurrentCharacter(nextChar);
    }
  }, [settings.displayMode, settings.sequenceLength]);

  const startPractice = useCallback(() => {
    setIsActive(true);
    setStats(defaultStats);
    startTimeRef.current = Date.now();
    generateNextCharacter();

    // Timer für Statistiken
    timerRef.current = window.setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setStats(prev => ({
          ...prev,
          sessionTime: elapsed,
          wpm: prev.charactersTyped > 0 ? Math.round((prev.correctCharacters / 5) / (elapsed / 60)) : 0,
        }));
      }
    }, 100);

    // Rhythmus-Timer für Rhythmus-Modus
    if (settings.displayMode === PracticeDisplayMode.Rhythm) {
      rhythmTimerRef.current = window.setInterval(() => {
        generateNextCharacter();
      }, settings.rhythmInterval || 1000);
    }
  }, [generateNextCharacter, settings.displayMode, settings.rhythmInterval]);

  const stopPractice = useCallback(() => {
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (rhythmTimerRef.current) {
      clearInterval(rhythmTimerRef.current);
      rhythmTimerRef.current = null;
    }
    startTimeRef.current = null;
  }, []);

  const resetPractice = useCallback(() => {
    stopPractice();
    setStats(defaultStats);
    setCurrentCharacter("");
    setCurrentSequence([]);
    setSequenceIndex(0);
    setErrorFlash(false);
    setParticleEffect(null);
  }, [stopPractice]);

  const handleKeyPress = useCallback((key: string) => {
    if (!isActive || !currentCharacter) return;

    const isCorrect = key === currentCharacter;

    setStats(prev => {
      const newStats = { ...prev };
      newStats.charactersTyped += 1;

      if (isCorrect) {
        newStats.correctCharacters += 1;
        newStats.streak += 1;
        newStats.bestStreak = Math.max(newStats.bestStreak, newStats.streak);
      } else {
        newStats.streak = 0;
      }

      // Character breakdown aktualisieren
      if (!newStats.characterBreakdown[currentCharacter]) {
        newStats.characterBreakdown[currentCharacter] = { correct: 0, total: 0 };
      }
      newStats.characterBreakdown[currentCharacter].total += 1;
      if (isCorrect) {
        newStats.characterBreakdown[currentCharacter].correct += 1;
      }

      // Genauigkeit berechnen
      newStats.accuracy = newStats.charactersTyped > 0
        ? (newStats.correctCharacters / newStats.charactersTyped) * 100
        : 100;

      // Problematische Tasten identifizieren
      newStats.problematicKeys = Object.entries(newStats.characterBreakdown)
        .filter(([_, data]) => data.total >= 5 && (data.correct / data.total) < 0.7)
        .map(([char]) => char)
        .slice(0, 5); // Top 5 problematische Tasten

      return newStats;
    });

    if (isCorrect) {
      // Partikel-Effekt
      if (settings.particlesEnabled) {
        setParticleEffect({
          x: Math.random() * 100,
          y: Math.random() * 100,
          character: currentCharacter
        });
        if (particleTimeoutRef.current) clearTimeout(particleTimeoutRef.current);
        particleTimeoutRef.current = window.setTimeout(() => {
          setParticleEffect(null);
        }, 1000);
      }

      // Nächstes Zeichen generieren
      if (settings.displayMode === PracticeDisplayMode.Sequence) {
        if (sequenceIndex + 1 < currentSequence.length) {
          setSequenceIndex(prev => prev + 1);
          setCurrentCharacter(currentSequence[sequenceIndex + 1]);
        } else {
          generateNextCharacter();
        }
      } else if (settings.displayMode !== PracticeDisplayMode.Rhythm) {
        generateNextCharacter();
      }
    } else {
      // Fehler-Flash
      setErrorFlash(true);
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = window.setTimeout(() => {
        setErrorFlash(false);
      }, 200);
    }
  }, [isActive, currentCharacter, settings.particlesEnabled, settings.displayMode, sequenceIndex, currentSequence, generateNextCharacter]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isActive) return;

    // Nur einzelne Zeichen und Backspace erlauben
    if (e.key.length === 1) {
      e.preventDefault();
      handleKeyPress(e.key);
    }
  }, [isActive, handleKeyPress]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (rhythmTimerRef.current) clearInterval(rhythmTimerRef.current);
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      if (particleTimeoutRef.current) clearTimeout(particleTimeoutRef.current);
    };
  }, []);

  // Tastatur-Event-Listener
  useEffect(() => {
    if (isActive) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isActive, handleKeyDown]);

  const getCurrentSequenceDisplay = () => {
    if (settings.displayMode === PracticeDisplayMode.Sequence && currentSequence.length > 0) {
      return currentSequence.map((char, index) => ({
        character: char,
        status: index < sequenceIndex ? 'completed' : index === sequenceIndex ? 'current' : 'upcoming'
      }));
    }
    return [];
  };

  const getCharacterFrequency = () => {
    const total = Object.values(stats.characterBreakdown).reduce((sum, data) => sum + data.total, 0);
    return Object.entries(stats.characterBreakdown)
      .map(([char, data]) => ({
        character: char,
        frequency: total > 0 ? (data.total / total) * 100 : 0,
        accuracy: data.total > 0 ? (data.correct / data.total) * 100 : 100
      }))
      .sort((a, b) => b.frequency - a.frequency);
  };

  return {
    settings,
    stats,
    isActive,
    currentCharacter,
    currentSequence: getCurrentSequenceDisplay(),
    errorFlash,
    particleEffect,
    updateSettings,
    startPractice,
    stopPractice,
    resetPractice,
    getCharacterFrequency,
  };
};