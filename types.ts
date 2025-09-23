export enum Difficulty {
  Beginner = "Anfänger",
  Intermediate = "Fortgeschritten",
  Expert = "Experte",
}

export type GameState = "waiting" | "typing" | "finished";

export interface Highscore {
  wpm: number;
  accuracy: number;
  difficulty: Difficulty;
  date: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  achieved: boolean;
  threshold: number | { wpm: number; accuracy: number };
  metric: "wpm" | "accuracy" | "totalTyped" | "gamesPlayed" | "combo";
  difficulty?: Difficulty;
}

export enum PracticeMode {
  Letters = "letters",
  LettersNumbers = "letters-numbers",
  FullCharset = "full-charset",
  German = "german",
  Minecraft = "minecraft",
}

export enum PracticeDisplayMode {
  Single = "single",
  Sequence = "sequence",
  Rhythm = "rhythm",
}

export interface PracticeSettings {
  mode: PracticeMode;
  displayMode: PracticeDisplayMode;
  speed: number;
  showKeyboard: boolean;
  soundEnabled: boolean;
  particlesEnabled: boolean;
  sequenceLength?: number;
  rhythmInterval?: number;
}

export interface PracticeStats {
  charactersTyped: number;
  correctCharacters: number;
  wpm: number;
  accuracy: number;
  sessionTime: number;
  characterBreakdown: Record<string, { correct: number; total: number }>;
  problematicKeys: string[];
  streak: number;
  bestStreak: number;
}

export interface PracticeSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  settings: PracticeSettings;
  finalStats: PracticeStats;
}
