import { PracticeMode } from "../types";

const CHARACTER_SETS = {
  [PracticeMode.Letters]: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  [PracticeMode.LettersNumbers]: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  [PracticeMode.FullCharset]: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
  [PracticeMode.German]: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZäöüßÄÖÜ0123456789.,!?-",
  [PracticeMode.Minecraft]: "WASDwasdefghijklmnopqrstuvwxyz0123456789~/@#$%^&*()_+-=[]{}|;:,.<>?",
};

const COMMON_FINGER_EXERCISES = {
  homeRow: "asdfghjklöä",
  topRow: "qwertzuiopü",
  bottomRow: "yxcvbnm,.-",
  leftHand: "qwertasdfgyxcvb",
  rightHand: "zuiophjklönm",
  indexFingers: "fgjh",
  middleFingers: "dkei",
  ringFingers: "slow",
  pinkies: "aqpöü",
};

export class CharacterGenerator {
  private mode: PracticeMode;
  private characterSet: string;
  private weightedCharacters: string[];

  constructor(mode: PracticeMode) {
    this.mode = mode;
    this.characterSet = CHARACTER_SETS[mode];
    this.weightedCharacters = this.createWeightedCharacterSet();
  }

  private createWeightedCharacterSet(): string[] {
    const weighted: string[] = [];
    const chars = this.characterSet.split('');

    chars.forEach(char => {
      let weight = 1;

      // Häufigere deutsche Buchstaben höher gewichten
      if ('enariltsuohdmgcfbwkpvzjxyqß'.includes(char.toLowerCase())) {
        weight = Math.max(1, Math.floor(8 - 'enariltsuohdmgcfbwkpvzjxyqß'.indexOf(char.toLowerCase()) / 3));
      }

      // Umlaute besonders trainieren
      if ('äöüÄÖÜß'.includes(char)) {
        weight = 3;
      }

      // Zahlen weniger häufig
      if ('0123456789'.includes(char)) {
        weight = 1;
      }

      // Sonderzeichen noch seltener
      if ('!@#$%^&*()_+-=[]{}|;:,.<>?'.includes(char)) {
        weight = 1;
      }

      for (let i = 0; i < weight; i++) {
        weighted.push(char);
      }
    });

    return weighted;
  }

  generateRandomCharacter(): string {
    return this.weightedCharacters[Math.floor(Math.random() * this.weightedCharacters.length)];
  }

  generateSequence(length: number): string[] {
    const sequence: string[] = [];
    for (let i = 0; i < length; i++) {
      sequence.push(this.generateRandomCharacter());
    }
    return sequence;
  }

  generateFingerExercise(finger: 'index' | 'middle' | 'ring' | 'pinky', length: number = 10): string[] {
    let exerciseChars: string;

    switch (finger) {
      case 'index':
        exerciseChars = COMMON_FINGER_EXERCISES.indexFingers;
        break;
      case 'middle':
        exerciseChars = COMMON_FINGER_EXERCISES.middleFingers;
        break;
      case 'ring':
        exerciseChars = COMMON_FINGER_EXERCISES.ringFingers;
        break;
      case 'pinky':
        exerciseChars = COMMON_FINGER_EXERCISES.pinkies;
        break;
    }

    const sequence: string[] = [];
    for (let i = 0; i < length; i++) {
      sequence.push(exerciseChars[Math.floor(Math.random() * exerciseChars.length)]);
    }
    return sequence;
  }

  generateProgressiveSequence(currentLevel: number, length: number): string[] {
    // Schwierigkeit steigt mit Level
    let chars: string;

    if (currentLevel <= 5) {
      chars = COMMON_FINGER_EXERCISES.homeRow; // Grundreihe
    } else if (currentLevel <= 10) {
      chars = COMMON_FINGER_EXERCISES.homeRow + COMMON_FINGER_EXERCISES.topRow; // + obere Reihe
    } else if (currentLevel <= 15) {
      chars = this.characterSet.replace(/[^a-zA-ZäöüÄÖÜß]/g, ''); // Nur Buchstaben
    } else if (currentLevel <= 20) {
      chars = this.characterSet.replace(/[!@#$%^&*()_+=\[\]{}|;:,.<>?]/g, ''); // Ohne Sonderzeichen
    } else {
      chars = this.characterSet; // Alles
    }

    const sequence: string[] = [];
    for (let i = 0; i < length; i++) {
      sequence.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    return sequence;
  }

  generateWordPattern(pattern: 'common' | 'difficult' | 'mixed', length: number): string[] {
    const patterns = {
      common: ['th', 'er', 'on', 'an', 're', 'he', 'in', 'ed', 'nd', 'ha'],
      difficult: ['qu', 'sch', 'tsch', 'pf', 'tz', 'ck', 'ng', 'nk'],
      mixed: ['und', 'der', 'die', 'ich', 'mit', 'zu', 'auf', 'für', 'von', 'das']
    };

    const patternChars = patterns[pattern].join('');
    const sequence: string[] = [];

    for (let i = 0; i < length; i++) {
      sequence.push(patternChars[Math.floor(Math.random() * patternChars.length)]);
    }

    return sequence;
  }

  generateRhythmicPattern(baseChar: string, variations: string[], patternLength: number): string[] {
    const sequence: string[] = [];
    const pattern = [baseChar, ...variations];

    for (let i = 0; i < patternLength; i++) {
      sequence.push(pattern[i % pattern.length]);
    }

    return sequence;
  }

  getCharacterSet(): string {
    return this.characterSet;
  }

  getMode(): PracticeMode {
    return this.mode;
  }

  updateMode(newMode: PracticeMode): void {
    this.mode = newMode;
    this.characterSet = CHARACTER_SETS[newMode];
    this.weightedCharacters = this.createWeightedCharacterSet();
  }
}

export const createCharacterGenerator = (mode: PracticeMode): CharacterGenerator => {
  return new CharacterGenerator(mode);
};