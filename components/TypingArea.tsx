import React from 'react';

interface TypingAreaProps {
    text: string;
    typed: string;
    errorFlash: boolean;
}

const Character: React.FC<{
    char: string;
    state: 'correct' | 'incorrect' | 'current' | 'pending';
    errorFlash: boolean;
}> = React.memo(({ char, state, errorFlash }) => {
    let className = 'transition-all duration-200 p-0.5 rounded-md ';
    switch (state) {
        case 'correct':
            className += 'text-green-500';
            break;
        case 'incorrect':
            className += 'text-red-500 bg-red-100 shake border border-red-400';
            break;
        case 'current':
            className += 'bg-yellow-200 animate-pulse';
            if (errorFlash) {
                className += ' !bg-red-200 border-2 border-red-500';
            }
            break;
        case 'pending':
            className += 'text-slate-400';
            break;
    }
    // Handle spaces specifically for visibility
    if (char === ' ') {
        if (state === 'current') {
            return <span className={className}>&nbsp;</span>;
        }
        if (state === 'incorrect') {
            return <span className={className}>_</span>
        }
    }

    return <span className={className}>{char}</span>;
});

export const TypingArea: React.FC<TypingAreaProps> = ({ text, typed, errorFlash }) => {
    return (
        <div className="bg-slate-100 p-6 rounded-lg shadow-inner">
            <p className="text-2xl md:text-3xl font-mono leading-relaxed tracking-wider">
                {text.split('').map((char, index) => {
                    let state: 'correct' | 'incorrect' | 'current' | 'pending' = 'pending';
                    if (index < typed.length) {
                        state = typed[index] === char ? 'correct' : 'incorrect';
                    } else if (index === typed.length) {
                        state = 'current';
                    }
                    return <Character key={`${char}-${index}`} char={char} state={state} errorFlash={errorFlash} />;
                })}
            </p>
        </div>
    );
};