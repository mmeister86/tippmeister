import React from 'react';

const FingerIcon = ({ color }: { color: string }) => (
    <div className={`w-5 h-5 rounded-full ${color} inline-block mr-2 border-2 border-white/50`}></div>
);

export const Instructions: React.FC = () => {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 text-slate-700">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-slate-700">Anleitung</h2>
                <p className="text-slate-500 mt-2">So wirst du zum Tipp-Champion!</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-sky-600 mb-3">1. Die Grundstellung</h3>
                <p className="mb-4">
                    Lege deine Finger auf die "Grundreihe" der Tastatur. Das ist die mittlere Buchstabenreihe.
                    Deine linken Finger gehören auf <span className="font-bold">A, S, D, F</span> und deine rechten Finger auf <span className="font-bold">J, K, L, Ö</span>.
                    Die kleinen Erhebungen auf den Tasten <span className="font-bold">F</span> und <span className="font-bold">J</span> helfen dir, die richtige Position zu finden, ohne hinzuschauen.
                    Deine Daumen schweben über der Leertaste.
                </p>
                <div className="bg-slate-200 p-4 rounded-lg text-center font-mono text-xl tracking-widest">
                    <span className="text-red-500">A</span> <span className="text-orange-500">S</span> <span className="text-yellow-500">D</span> <span className="text-green-500">F</span> &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-green-500">J</span> <span className="text-yellow-500">K</span> <span className="text-orange-500">L</span> <span className="text-red-500">Ö</span>
                </div>
            </div>

             <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-green-600 mb-3">2. Das Spielprinzip</h3>
                <p className="mb-4">
                    Wähle zuerst einen Schwierigkeitsgrad. Dann erscheint ein Text, den du abtippen sollst.
                    Die virtuelle Tastatur unten zeigt dir, welche Taste als nächstes gedrückt werden muss und mit welchem Finger. Achte auf die Farben!
                </p>
                <ul className="list-none space-y-2">
                    <li><FingerIcon color="bg-red-300" /> Kleiner Finger</li>
                    <li><FingerIcon color="bg-orange-300" /> Ringfinger</li>
                    <li><FingerIcon color="bg-yellow-300" /> Mittelfinger</li>
                    <li><FingerIcon color="bg-green-300" /> Zeigefinger</li>
                    <li><FingerIcon color="bg-blue-300" /> Daumen (für die Leertaste)</li>
                </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-purple-600 mb-3">3. Ziel des Spiels</h3>
                <p>
                    Versuche, den Text so schnell und fehlerfrei wie möglich zu tippen. Deine Geschwindigkeit (WPM - Wörter pro Minute) und deine Genauigkeit werden gemessen.
                    Übung macht den Meister! Je öfter du spielst, desto schneller und sicherer wirst du. Viel Erfolg!
                </p>
            </div>
        </div>
    );
};