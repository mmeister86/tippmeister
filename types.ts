export enum Difficulty {
    Beginner = 'Anfänger',
    Intermediate = 'Fortgeschritten',
    Expert = 'Experte',
}

export type GameState = 'waiting' | 'typing' | 'finished';

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
    metric: 'wpm' | 'accuracy' | 'totalTyped' | 'gamesPlayed' | 'combo';
    difficulty?: Difficulty;
}
