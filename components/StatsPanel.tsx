
import React from 'react';

interface StatsPanelProps {
    wpm: number;
    accuracy: number;
    errors: number;
    elapsedTime: number;
}

const StatCard: React.FC<{ label: string; value: string | number; unit?: string; className?: string }> = ({ label, value, unit, className }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl text-white shadow-lg ${className}`}>
        <span className="text-sm font-semibold opacity-80">{label}</span>
        <div className="text-3xl font-bold">
            {value}
            {unit && <span className="text-base font-normal ml-1">{unit}</span>}
        </div>
    </div>
);


export const StatsPanel: React.FC<StatsPanelProps> = ({ wpm, accuracy, errors, elapsedTime }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Geschwindigkeit" value={wpm} unit="WPM" className="bg-sky-500" />
            <StatCard label="Genauigkeit" value={accuracy.toFixed(1)} unit="%" className="bg-green-500" />
            <StatCard label="Fehler" value={errors} className="bg-rose-500" />
            <StatCard label="Zeit" value={formatTime(elapsedTime)} className="bg-slate-500" />
        </div>
    );
};
