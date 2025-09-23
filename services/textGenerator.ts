import { Difficulty } from "../types";

const texts = {
  [Difficulty.Beginner]: [
    "f j f j d k d k s l s l a ö a ö",
    "ich baue ein haus aus stein",
    "der creeper ist grün und gefährlich",
    "holz hacken macht spass im wald",
    "erde und sand sind überall hier",
    "steve sammelt äpfel und brot",
    "schwein oink oink auf der farm",
    "alex gräbt tief nach diamanten",
  ],
  [Difficulty.Intermediate]: [
    "Steve baut eine grosse Burg aus Steinen und Holz.",
    "Im Nether sehen wir Ghasts, Blazes und viele Zombies.",
    "Am Abend verstecken wir uns vor Monstern im Haus.",
    "Meine Lieblings-Erz ist Diamant, genau wie der blaue Himmel.",
    "Ein Enderdrache hat zwei grosse schwarze Flügel.",
    "Redstone-Schaltungen bauen macht Spass, aber man muss viel üben.",
    "Dorfbewohner tauschen Smaragde gegen coole Items.",
    "Mit einem Boot fahren wir über das tiefe Meer.",
  ],
  [Difficulty.Expert]: [
    "Die Redstone-Automation verändert deine Minecraft-Welt mit einer Geschwindigkeit von 20 Ticks/Sekunde!",
    "Frage nicht, was der Server für dich tun kann – frage, was du für deinen Server tun kannst.",
    "Die komplexen Command-Blocks (z.B. für /tp @p ~ ~10 ~) erfordern präzises Tippen & logisches Denken.",
    "Beim Testen der Redstone-Maschine wurden diverse Bugs gefunden, die jetzt behoben werden müssen (Version 1.20.4).",
    "Das QWERTZ-Tastatur-Layout ist wichtig für Commands; du musst Zeichen wie §, @, ~ und # beherrschen!",
    "Wow! Du schaffst schon Koordinaten wie X:128 Y:64 Z:-256 und Befehle wie /give @s diamond_sword{Enchantments:[{id:sharpness,lvl:5}]}.",
    "Der Wither-Boss hat 300❤ Leben und droppt einen Nether-Stern (sehr selten = 100% Drop-Rate).",
  ],
};

export const generateText = (difficulty: Difficulty): string => {
  const availableTexts = texts[difficulty];
  const randomIndex = Math.floor(Math.random() * availableTexts.length);
  return availableTexts[randomIndex];
};
