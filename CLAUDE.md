# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is "Tippmeister" - a Minecraft-themed typing game built with React, TypeScript, and Vite. The game teaches typing skills through progressively difficult levels with a gamified experience including badges, highscores, and Minecraft-inspired visuals.

## Development Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Architecture Overview

### Core Game Logic
- **useTypingGame hook** (`hooks/useTypingGame.ts`) - Main game state management including:
  - Game states: waiting, typing, finished
  - Typing validation with special character support (QWERTZ layout)
  - WPM and accuracy calculations
  - Timer management with proper cleanup

### Text Generation
- **textGenerator service** (`services/textGenerator.ts`) - Provides difficulty-based text content:
  - Beginner: Basic finger exercises and simple German phrases
  - Intermediate: Longer sentences with common Minecraft vocabulary
  - Expert: Complex commands, coordinates, and special characters

### Component Structure
- **App.tsx** - Main application with view routing (menu, game, highscores, instructions, badges)
- **components/** - Modular UI components:
  - `TypingArea` - Text display with character highlighting
  - `Keyboard` - Visual QWERTZ keyboard with finger positioning
  - `StatsPanel` - Real-time WPM/accuracy display
  - `Badges` - Achievement system with Minecraft themes
  - `Highscores` - Persistent score tracking

### Data Persistence
- Uses `localStorage` for:
  - Highscore history (top 10)
  - Badge achievement progress
  - Games played counter
- No backend dependencies - fully client-side

### Styling
- Minecraft-themed CSS with custom properties
- Responsive design for desktop/mobile
- QWERTZ keyboard layout with finger color coding

## Key Technical Details

### Environment Setup
- Requires `GEMINI_API_KEY` environment variable (set in `.env.local`)
- Vite config exposes API key as `process.env.GEMINI_API_KEY`

### TypeScript Configuration
- ES2022 target with React JSX
- Path alias `@/*` points to project root
- No type checking during build (`noEmit: true`)

### Special Character Handling
- Game supports German QWERTZ layout including: ö, ä, ü, ß, -, :, §, @, ~, #
- Expert level includes complex Minecraft commands with special syntax

### State Management
- React hooks for local state
- No external state management library
- Persistent data via localStorage with error handling