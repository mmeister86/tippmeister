import React from 'react';

export type View = 'menu' | 'game' | 'highscores' | 'instructions' | 'badges';

interface NavbarProps {
    currentView: View;
    setView: (view: View) => void;
}

const NavItem: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive 
                ? 'bg-sky-500 text-white shadow' 
                : 'text-slate-600 hover:bg-slate-200'
        }`}
    >
        {label}
    </button>
);

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
    return (
        <nav className="bg-white shadow-sm p-4 rounded-xl mb-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 6a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zm-5 5a1 1 0 11-2 0 1 1 0 012 0zm5 0a1 1 0 11-2 0 1 1 0 012 0zm-3 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v1a1 1 0 102 0V8a1 1 0 00-1-1z" />
                    </svg>
                    <h1 className="text-xl font-bold text-slate-800">Tipp-Champion</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <NavItem label="Spiel" isActive={currentView === 'menu' || currentView === 'game'} onClick={() => setView('menu')} />
                    <NavItem label="Bestenliste" isActive={currentView === 'highscores'} onClick={() => setView('highscores')} />
                    <NavItem label="Anleitung" isActive={currentView === 'instructions'} onClick={() => setView('instructions')} />
                    <NavItem label="Abzeichen" isActive={currentView === 'badges'} onClick={() => setView('badges')} />
                </div>
            </div>
        </nav>
    );
};
