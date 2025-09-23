import { useState, useCallback, useRef, useEffect } from "react";
import { Difficulty } from "../types";
import type { GameState } from "../types";

const isTypingKey = (key: string) => {
  // Allow all single characters (including special characters like '-', ':', '§', '@', etc.) and Backspace
  return key.length === 1 || key === "Backspace";
};

export const useTypingGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [errorFlash, setErrorFlash] = useState(false);

  const startTime = useRef<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const timerRef = useRef<number | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);

  const clearMainTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startGame = useCallback(
    (newText: string) => {
      clearMainTimer();
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

      setGameState("typing");
      setText(newText);
      setTyped("");
      setErrors(0);
      setTotalTyped(0);
      setErrorFlash(false);
      startTime.current = Date.now();
      setElapsedTime(0);

      timerRef.current = window.setInterval(() => {
        if (startTime.current) {
          setElapsedTime((Date.now() - startTime.current) / 1000);
        }
      }, 1000);
    },
    [clearMainTimer]
  );

  const resetGame = useCallback(() => {
    clearMainTimer();
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    setGameState("waiting");
    setText("");
    setTyped("");
    setErrors(0);
    setTotalTyped(0);
    startTime.current = null;
    setElapsedTime(0);
    setErrorFlash(false);
  }, [clearMainTimer]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameState !== "typing" || !isTypingKey(e.key)) {
        return;
      }
      e.preventDefault();

      const current = typed.length;
      if (current >= text.length) return;

      if (e.key === "Backspace") {
        // Backspace handling - don't count as typed character
        return;
      }

      // Get the expected character and the typed character
      const expectedChar = text[current];
      const typedChar = e.key;

      // Check if the characters match (including special characters like '-')
      if (typedChar === expectedChar) {
        setTyped((prev) => prev + typedChar);
      } else {
        setErrors((prev) => prev + 1);
        setErrorFlash(true);
        if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = window.setTimeout(() => {
          setErrorFlash(false);
        }, 200);
      }

      setTotalTyped((prev) => prev + 1);

      if (current + 1 === text.length) {
        setGameState("finished");
        startTime.current = null;
        clearMainTimer();
      }
    },
    [gameState, typed, text, clearMainTimer]
  );

  useEffect(() => {
    return () => {
      clearMainTimer();
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, [clearMainTimer]);

  const wpm =
    elapsedTime > 0 ? Math.round(typed.length / 5 / (elapsedTime / 60)) : 0;
  const accuracy =
    totalTyped > 0 ? ((totalTyped - errors) / totalTyped) * 100 : 100;

  return {
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
  };
};
