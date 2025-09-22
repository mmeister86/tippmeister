import React from 'react';
import type { Highscore } from '../types';

interface HighscoresProps {
    highscores: Highscore[];
    onClear: () => void;
}

const TrophyIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-500">
        <path fillRule="evenodd" d="M15.97 2.47a.75.75 0 0 1 1.06 0l.25.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0l-4.25-4.25a.75.75 0 0 1 0-1.06l.25-.25a.75.75 0 0 1 1.06 0l1.72 1.72V2.25a.75.75 0 0 1 1.5 0v3.69l1.72-1.72ZM10.5 12a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75Zm-7.5 0a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75ZM12 6a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM5.603 13.342a.75.75 0 0 1 0 1.06l-.25.25a.75.75 0 0 1-1.06 0l-2.09-2.09a.75.75 0 0 1 0-1.06l.25-.25a.75.75 0 0 1 1.06 0l1.03 1.03a3.73 3.73 0 0 0 1.06-2.023.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H5.85a2.25 2.25 0 0 1-2.008 2.247l1.761-1.76Z" clipRule="evenodd" />
        <path d="M3 19.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" />
    </svg>
)

export const Highscores: React.FC<HighscoresProps> = ({ highscores, onClear }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
             <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-4">
                    <TrophyIcon />
                    <h2 className="text-4xl font-bold text-slate-700">Bestenliste</h2>
                </div>
                <p className="text-slate-500 mt-2">Hier siehst du deine 10 besten Ergebnisse.</p>
            </div>
            
            {highscores.length === 0 ? (
                <div className="text-center bg-slate-100 p-8 rounded-lg">
                    <p className="text-slate-500">Noch keine Highscores gespeichert. Spiele eine Runde, um anzufangen!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-4 text-sm font-bold text-slate-500 px-4">
                        <span>Geschwindigkeit</span>
                        <span>Genauigkeit</span>
                        <span>Modus</span>
                        <span className="text-right">Datum</span>
                    </div>
                    {highscores.map((score, index) => (
                         <div key={index} className="grid grid-cols-4 gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
                            <div className="font-bold text-sky-600 text-lg">{score.wpm} <span className="text-sm font-normal text-slate-500">WPM</span></div>
                            <div className="font-bold text-green-600 text-lg">{score.accuracy.toFixed(1)}<span className="text-sm font-normal text-slate-500">%</span></div>
                            <div className="text-slate-700">{score.difficulty}</div>
                            <div className="text-slate-500 text-right text-sm">{formatDate(score.date)}</div>
                        </div>
                    ))}
                    <div className="text-center mt-6">
                        <button 
                            onClick={onClear} 
                            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform transform hover:scale-105"
                        >
                            Highscores löschen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};