import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, View } from './components/Navbar';
import { DifficultySelector } from './components/DifficultySelector';
import { TypingArea } from './components/TypingArea';
import { StatsPanel } from './components/StatsPanel';
import { Keyboard } from './components/Keyboard';
import { Modal } from './components/Modal';
import { Highscores } from './components/Highscores';
import { Instructions } from './components/Instructions';
import { Badges } from './components/Badges';
import { useTypingGame } from './hooks/useTypingGame';
import { generateText } from './services/textGenerator';
import { Difficulty, Highscore, Badge } from './types';

// Badge definitions
const initialBadges: Badge[] = [
    { id: 'wpm-beginner', name: 'Flotter Anfänger', description: 'Erreiche 40 WPM im Anfänger-Modus.', achieved: false, metric: 'wpm', threshold: 40, difficulty: Difficulty.Beginner },
    { id: 'wpm-intermediate', name: 'Profi-Tipper', description: 'Erreiche 60 WPM im Fortgeschrittenen-Modus.', achieved: false, metric: 'wpm', threshold: 60, difficulty: Difficulty.Intermediate },
    { id: 'wpm-expert', name: 'Tastatur-Meister', description: 'Erreiche 80 WPM im Experten-Modus.', achieved: false, metric: 'wpm', threshold: 80, difficulty: Difficulty.Expert },
    { id: 'accuracy-95', name: 'Adlerauge', description: 'Schließe eine Runde mit über 95% Genauigkeit ab.', achieved: false, metric: 'accuracy', threshold: 95 },
    { id: 'accuracy-100', name: 'Perfektionist', description: 'Schließe eine Runde mit 100% Genauigkeit ab.', achieved: false, metric: 'accuracy', threshold: 100 },
    { id: 'games-10', name: 'Dauerbrenner', description: 'Spiele 10 Runden.', achieved: false, metric: 'gamesPlayed', threshold: 10 },
];


const App: React.FC = () => {
    const [view, setView] = useState<View>('menu');
    const { 
        gameState, difficulty, text, typed, errors, wpm, accuracy,
        totalTyped, elapsedTime, errorFlash, setDifficulty, startGame, resetGame, handleKeyDown 
    } = useTypingGame();

    const [highscores, setHighscores] = useState<Highscore[]>([]);
    const [badges, setBadges] = useState<Badge[]>(initialBadges);
    const [gamesPlayed, setGamesPlayed] = useState(0);

    // Load data from localStorage on mount
    useEffect(() => {
        try {
            const savedHighscores = localStorage.getItem('highscores');
            if (savedHighscores) {
                setHighscores(JSON.parse(savedHighscores));
            }
            const savedBadges = localStorage.getItem('badges');
            if (savedBadges) {
                setBadges(JSON.parse(savedBadges));
            }
            const savedGamesPlayed = localStorage.getItem('gamesPlayed');
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
        localStorage.setItem('highscores', JSON.stringify(sortedScores));
    }, []);
    
    // Check for and update badges
    const checkBadges = useCallback((currentWpm: number, currentAccuracy: number, currentDifficulty: Difficulty) => {
        const newGamesPlayed = gamesPlayed + 1;
        setGamesPlayed(newGamesPlayed);
        localStorage.setItem('gamesPlayed', JSON.stringify(newGamesPlayed));

        const updatedBadges = badges.map(badge => {
            if (badge.achieved) return badge;

            let isAchieved = false;
            switch(badge.metric) {
                case 'wpm':
                    if (badge.difficulty === currentDifficulty && currentWpm >= (badge.threshold as number)) {
                        isAchieved = true;
                    }
                    break;
                case 'accuracy':
                    if (currentAccuracy >= (badge.threshold as number)) {
                        isAchieved = true;
                    }
                    break;
                case 'gamesPlayed':
                    if (newGamesPlayed >= (badge.threshold as number)) {
                        isAchieved = true;
                    }
                    break;
            }

            return { ...badge, achieved: isAchieved };
        });
        
        setBadges(updatedBadges);
        localStorage.setItem('badges', JSON.stringify(updatedBadges));
    }, [badges, gamesPlayed]);


    // Effect for when game finishes
    useEffect(() => {
        if (gameState === 'finished') {
            const newHighscore: Highscore = { wpm, accuracy, difficulty, date: new Date().toISOString() };
            saveHighscores([...highscores, newHighscore]);
            checkBadges(wpm, accuracy, difficulty);
        }
    }, [gameState, wpm, accuracy, difficulty, highscores, saveHighscores, checkBadges]);
    
    // Keyboard event listener
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleSelectDifficulty = (selectedDifficulty: Difficulty) => {
        setDifficulty(selectedDifficulty);
        const newText = generateText(selectedDifficulty);
        startGame(newText);
        setView('game');
    };

    const handleReset = () => {
        resetGame();
        setView('menu');
    };

    const handleClearHighscores = () => {
        setHighscores([]);
        localStorage.removeItem('highscores');
    };
    
    const renderContent = () => {
        switch (view) {
            case 'menu':
                return <DifficultySelector onSelect={handleSelectDifficulty} />;
            case 'game':
                return (
                    <div className="space-y-6">
                        <StatsPanel wpm={wpm} accuracy={accuracy} errors={errors} elapsedTime={elapsedTime} />
                        <TypingArea text={text} typed={typed} errorFlash={errorFlash} />
                        <Keyboard currentCharacter={text[typed.length]} />
                        <div className="text-center">
                            <button onClick={handleReset} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105">
                                Zurück zum Menü
                            </button>
                        </div>
                    </div>
                );
            case 'highscores':
                return <Highscores highscores={highscores} onClear={handleClearHighscores} />;
            case 'instructions':
                return <Instructions />;
            case 'badges':
                 return <Badges badges={badges} />;
            default:
                return <DifficultySelector onSelect={handleSelectDifficulty} />;
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
            <div className="container mx-auto p-4 md:p-8">
                <Navbar currentView={view} setView={setView} />
                <main>
                    {renderContent()}
                </main>
                <Modal isOpen={gameState === 'finished'} onClose={handleReset} title="Runde beendet!">
                    <div className="text-center space-y-4">
                        <p className="text-lg text-slate-600">Super gemacht! Hier sind deine Ergebnisse:</p>
                        <div className="flex justify-around p-4 bg-slate-100 rounded-lg">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-sky-500">{wpm}</div>
                                <div className="text-sm text-slate-500">WPM</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-green-500">{accuracy.toFixed(1)}%</div>
                                <div className="text-sm text-slate-500">Genauigkeit</div>
                            </div>
                        </div>
                        <button onClick={handleReset} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            Neue Runde
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default App;