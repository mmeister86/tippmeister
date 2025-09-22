
import { Difficulty } from '../types';

const texts = {
    [Difficulty.Beginner]: [
        'f j f j d k d k s l s l a ö a ö',
        'fuchs jagt die katze im sommer',
        'der ball rollt schnell und weit',
        'klaus malt ein haus für lisa',
        'fisch und salat sind auf dem tisch',
        'jeder fängt mal klein an',
    ],
    [Difficulty.Intermediate]: [
        'Der schnelle braune Fuchs springt über den faulen Hund.',
        'Im Zoo sehen wir Löwen, Tiger und auch viele Affen.',
        'Am Wochenende besuchen wir Oma und Opa auf dem Land.',
        'Meine Lieblingsfarbe ist Blau, genau wie der weite Himmel.',
        'Ein Regenbogen hat sieben wunderschöne Farben.',
        'Programmieren macht Spass, aber man muss viel üben.',
    ],
    [Difficulty.Expert]: [
        'Die Digitalisierung verändert unsere Welt mit einer Geschwindigkeit von 100 km/h!',
        'Frage nicht, was dein Land für dich tun kann – frage, was du für dein Land tun kannst.',
        'Die komplexen Algorithmen (z.B. für KI) erfordern präzises Tippen & logisches Denken.',
        'Beim Testen der Software wurden diverse Bugs gefunden, die jetzt behoben werden müssen (Version 2.3.5).',
        'Der QWERTZ-Tastatur-Layout wurde für die deutsche Sprache optimiert; es ist wichtig, die Zeichen wie Ä, Ö, Ü und ß zu beherrschen!',
        'Wow! Du schaffst schon Texte mit Zahlen wie 12345 und Satzzeichen wie ?!,.',
    ],
};

export const generateText = (difficulty: Difficulty): string => {
    const availableTexts = texts[difficulty];
    const randomIndex = Math.floor(Math.random() * availableTexts.length);
    return availableTexts[randomIndex];
};
