import React from 'react';
import { KEYBOARD_ROWS_QWERTZ, KEY_LAYOUT, FINGER_COLORS } from '../constants';

interface KeyboardProps {
    currentCharacter?: string;
}

const HandIndicator: React.FC<{ hand: 'left' | 'right' }> = ({ hand }) => {
    const isLeft = hand === 'left';
    return (
        <div className={`absolute -top-10 text-xs font-bold p-1 rounded-full text-white ${isLeft ? 'left-2 bg-blue-500' : 'right-2 bg-purple-500'}`}>
            {isLeft ? 'Linke Hand' : 'Rechte Hand'}
        </div>
    );
};


export const Keyboard: React.FC<KeyboardProps> = React.memo(({ currentCharacter }) => {
    const charLower = currentCharacter ? currentCharacter.toLowerCase() : null;
    const keyInfo = charLower ? KEY_LAYOUT[charLower] : null;

    return (
        <div className="w-full bg-slate-200 p-4 rounded-xl shadow-inner relative">
            {keyInfo && <HandIndicator hand={keyInfo.hand} />}
            <div className="space-y-2">
                {KEYBOARD_ROWS_QWERTZ.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-1.5">
                        {row.map((key) => {
                            const isCurrent = key === charLower;
                            const keyLayoutInfo = KEY_LAYOUT[key];
                            const fingerColor = keyLayoutInfo ? FINGER_COLORS[keyLayoutInfo.finger] : 'bg-slate-50';

                            let keyClass = `h-12 rounded-lg font-mono text-lg flex items-center justify-center transition-all duration-150 shadow-sm border-b-4 border-slate-300 ${fingerColor} text-slate-800`;
                            
                            if (key === ' ') {
                                keyClass += ' w-1/3';
                            } else {
                                keyClass += ' w-12';
                            }
                            
                            if (isCurrent) {
                                keyClass += ' transform -translate-y-1 scale-110 key-glow z-10 border-yellow-400';
                            }
                            
                            if (['f', 'j'].includes(key)) {
                                keyClass += ' relative';
                            }

                            return (
                                <div key={key} className={keyClass}>
                                    {key === ' ' ? 'Leertaste' : key.toUpperCase()}
                                    {['f', 'j'].includes(key) && (
                                        <div className="absolute bottom-1.5 w-4 h-1 bg-slate-400 rounded-full"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
});