type Finger = 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';
type Hand = 'left' | 'right';

export const FINGER_COLORS: Record<Finger, string> = {
    pinky: 'bg-red-300',
    ring: 'bg-orange-300',
    middle: 'bg-yellow-300',
    index: 'bg-green-300',
    thumb: 'bg-blue-300',
};

export const KEYBOARD_ROWS_QWERTZ: string[][] = [
    ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ü'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '-'],
    [' '],
];

interface KeyLayout {
    [key: string]: { finger: Finger; hand: Hand };
}

export const KEY_LAYOUT: KeyLayout = {
    // Numbers for Expert level
    '1': { finger: 'pinky', hand: 'left' },
    '2': { finger: 'ring', hand: 'left' },
    '3': { finger: 'middle', hand: 'left' },
    '4': { finger: 'index', hand: 'left' },
    '5': { finger: 'index', hand: 'left' },
    '6': { finger: 'index', hand: 'right' },
    '7': { finger: 'index', hand: 'right' },
    '8': { finger: 'middle', hand: 'right' },
    '9': { finger: 'ring', hand: 'right' },
    '0': { finger: 'pinky', hand: 'right' },
    'ß': { finger: 'pinky', hand: 'right' },

    // Top row
    'q': { finger: 'pinky', hand: 'left' },
    'w': { finger: 'ring', hand: 'left' },
    'e': { finger: 'middle', hand: 'left' },
    'r': { finger: 'index', hand: 'left' },
    't': { finger: 'index', hand: 'left' },
    'z': { finger: 'index', hand: 'right' },
    'u': { finger: 'index', hand: 'right' },
    'i': { finger: 'middle', hand: 'right' },
    'o': { finger: 'ring', hand: 'right' },
    'p': { finger: 'pinky', hand: 'right' },
    'ü': { finger: 'pinky', hand: 'right' },

    // Home row
    'a': { finger: 'pinky', hand: 'left' },
    's': { finger: 'ring', hand: 'left' },
    'd': { finger: 'middle', hand: 'left' },
    'f': { finger: 'index', hand: 'left' },
    'g': { finger: 'index', hand: 'left' },
    'h': { finger: 'index', hand: 'right' },
    'j': { finger: 'index', hand: 'right' },
    'k': { finger: 'middle', hand: 'right' },
    'l': { finger: 'ring', hand: 'right' },
    'ö': { finger: 'pinky', hand: 'right' },
    'ä': { finger: 'pinky', hand: 'right' },

    // Bottom row
    'y': { finger: 'pinky', hand: 'left' },
    'x': { finger: 'ring', hand: 'left' },
    'c': { finger: 'middle', hand: 'left' },
    'v': { finger: 'index', hand: 'left' },
    'b': { finger: 'index', hand: 'left' },
    'n': { finger: 'index', hand: 'right' },
    'm': { finger: 'index', hand: 'right' },
    ',': { finger: 'middle', hand: 'right' },
    '.': { finger: 'ring', hand: 'right' },
    '-': { finger: 'pinky', hand: 'right' },
    
    // Space
    ' ': { finger: 'thumb', hand: 'left' },
    
    // Other symbols from Expert texts
    '(': { finger: 'ring', hand: 'right' }, // Shift + 8
    ')': { finger: 'pinky', hand: 'right' }, // Shift + 9
    '&': { finger: 'index', hand: 'left' }, // Shift + 6
    '!': { finger: 'pinky', hand: 'left' }, // Shift + 1
    '?': { finger: 'pinky', hand: 'right' }, // Shift + ß
    '/': { finger: 'index', hand: 'right' }, // Shift + 7
};
