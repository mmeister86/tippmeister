
import React from 'react';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
    onSelect: (difficulty: Difficulty) => void;
}

const DifficultyCard: React.FC<{ title: string; description: string; color: string; onClick: () => void }> = ({ title, description, color, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full text-left p-6 rounded-xl shadow-lg border-b-8 transition-transform transform hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-4 ${color}`}
        >
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80">{description}</p>
        </button>
    );
};

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect }) => {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-700 mb-2">Wähle einen Modus</h2>
            <p className="text-slate-500 mb-8">Fange einfach an oder fordere dich selbst heraus!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DifficultyCard
                    title={Difficulty.Beginner}
                    description="Einzelne Buchstaben und einfache Wörter. Perfekt für den Start!"
                    color="border-green-600 bg-green-500"
                    onClick={() => onSelect(Difficulty.Beginner)}
                />
                <DifficultyCard
                    title={Difficulty.Intermediate}
                    description="Ganze Wörter und kurze Sätze. Der nächste Schritt zum Profi!"
                    color="border-sky-600 bg-sky-500"
                    onClick={() => onSelect(Difficulty.Intermediate)}
                />
                <DifficultyCard
                    title={Difficulty.Expert}
                    description="Lange Texte mit Zahlen und Satzzeichen. Zeig was du kannst!"
                    color="border-purple-600 bg-purple-500"
                    onClick={() => onSelect(Difficulty.Expert)}
                />
            </div>
        </div>
    );
};
