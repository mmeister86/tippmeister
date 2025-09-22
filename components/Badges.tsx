import React from 'react';
import type { Badge } from '../types';
import { BadgeIcon } from './BadgeIcons';

interface BadgesProps {
    badges: Badge[];
}

export const Badges: React.FC<BadgesProps> = ({ badges }) => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-slate-700">Abzeichen</h2>
                <p className="text-slate-500 mt-2">Sammle alle Abzeichen für deine Tipp-Fähigkeiten!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badges.map((badge) => (
                    <div 
                        key={badge.id}
                        className={`p-6 rounded-lg shadow-md flex items-center gap-4 transition-all duration-300 relative ${
                            badge.achieved ? 'bg-white' : 'bg-slate-100'
                        }`}
                    >
                        <div className={`p-3 rounded-full ${badge.achieved ? 'bg-yellow-400' : 'bg-slate-300'}`}>
                           <BadgeIcon badgeId={badge.id} className={`w-8 h-8 ${badge.achieved ? 'text-white' : 'text-slate-500'}`} />
                        </div>
                        <div>
                            <h3 className={`font-bold text-lg ${badge.achieved ? 'text-slate-800' : 'text-slate-500'}`}>
                                {badge.name}
                            </h3>
                            <p className={`text-sm ${badge.achieved ? 'text-slate-600' : 'text-slate-400'}`}>
                                {badge.description}
                            </p>
                        </div>
                         {badge.achieved && (
                            <div className="absolute top-2 right-2 text-yellow-500" title="Erreicht!">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
