
import React from 'react';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
    onSelect: (difficulty: Difficulty) => void;
}

const DifficultyCard: React.FC<{ title: string; description: string; icon: string; buttonClass: string; onClick: () => void }> = ({ title, description, icon, buttonClass, onClick }) => {
    return (
        <div className="minecraft-panel text-center">
            <div className="minecraft-inventory-slot mx-auto mb-4" style={{width: '64px', height: '64px', fontSize: '32px'}}>
                {icon}
            </div>
            <h3 className="text-lg font-bold minecraft-text mb-2">{title}</h3>
            <p className="text-xs minecraft-text mb-4 opacity-80">{description}</p>
            <button
                onClick={onClick}
                className={`minecraft-button w-full ${buttonClass}`}
            >
                Level Starten
            </button>
        </div>
    );
};

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect }) => {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold minecraft-text mb-4">🎮 Wähle deinen Schwierigkeitsgrad</h2>
            <p className="text-sm minecraft-text mb-8 opacity-80">Fange einfach an oder fordere dich selbst heraus wie ein echter Minecraft-Pro!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DifficultyCard
                    title="🌱 " + Difficulty.Beginner}
                    description="Einzelne Buchstaben und einfache Wörter. Perfekt für den Start ins Abenteuer!"
                    icon="🟩"
                    buttonClass="emerald"
                    onClick={() => onSelect(Difficulty.Beginner)}
                />
                <DifficultyCard
                    title="💎 " + Difficulty.Intermediate}
                    description="Ganze Wörter und kurze Sätze. Der nächste Schritt zum Minecraft-Profi!"
                    icon="🟦"
                    buttonClass="diamond"
                    onClick={() => onSelect(Difficulty.Intermediate)}
                />
                <DifficultyCard
                    title="🔥 " + Difficulty.Expert}
                    description="Lange Texte mit Zahlen und Satzzeichen. Zeig was ein wahrer Redstone-Meister kann!"
                    icon="🟥"
                    buttonClass="redstone"
                    onClick={() => onSelect(Difficulty.Expert)}
                />
            </div>
        </div>
    );
};
