import React, { useState, useEffect, useCallback } from "react";
import { PracticeDisplayMode } from "../types";

interface CharacterDisplayProps {
  currentCharacter: string;
  currentSequence: Array<{
    character: string;
    status: "completed" | "current" | "upcoming";
  }>;
  displayMode: PracticeDisplayMode;
  errorFlash: boolean;
  particleEffect: { x: number; y: number; character: string } | null;
  isActive?: boolean;
}

const SingleCharacterDisplay: React.FC<{
  character: string;
  errorFlash: boolean;
  particleEffect: { x: number; y: number; character: string } | null;
}> = ({ character, errorFlash, particleEffect }) => {
  return (
    <div className="relative flex justify-center items-center">
      <div
        className={`minecraft-inventory-slot text-6xl font-bold transition-all duration-200 ${
          errorFlash
            ? "bg-red-500 shadow-red-500/50 shadow-lg"
            : "bg-gradient-to-br from-green-400 to-emerald-600 shadow-emerald-500/50 shadow-lg"
        }`}
        style={{
          width: "150px",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "4px solid #8B4513",
          borderRadius: "8px",
          position: "relative",
          transform: errorFlash ? "scale(1.1)" : "scale(1.0)",
        }}
      >
        <span className="text-white drop-shadow-lg font-minecraft">
          {character}
        </span>

        {/* 8-Bit Rahmen-Effekt */}
        <div className="absolute inset-0 border-2 border-white/20 rounded-md pointer-events-none" />
        <div className="absolute inset-1 border border-black/20 rounded-sm pointer-events-none" />
      </div>

      {/* Partikel-Effekt */}
      {particleEffect && (
        <div
          className="absolute text-2xl font-bold text-green-400 animate-bounce pointer-events-none"
          style={{
            left: `${particleEffect.x}%`,
            top: `${particleEffect.y}%`,
            animation: "particleFade 1s ease-out forwards",
          }}
        >
          ✨ {particleEffect.character}
        </div>
      )}

      {/* CSS für Partikel-Animation */}
      <style jsx>{`
        @keyframes particleFade {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};

const SequenceDisplay: React.FC<{
  sequence: Array<{
    character: string;
    status: "completed" | "current" | "upcoming";
  }>;
  errorFlash: boolean;
}> = ({ sequence, errorFlash }) => {
  return (
    <div className="flex justify-center items-center gap-3">
      {sequence.map((item, index) => {
        let bgColor = "bg-gray-600";
        let textColor = "text-gray-300";
        let scale = "scale-90";
        let shadow = "";

        switch (item.status) {
          case "completed":
            bgColor = "bg-green-600";
            textColor = "text-white";
            scale = "scale-75";
            shadow = "shadow-green-500/30";
            break;
          case "current":
            bgColor = errorFlash ? "bg-red-500" : "bg-blue-500";
            textColor = "text-white";
            scale = "scale-110";
            shadow = errorFlash ? "shadow-red-500/50" : "shadow-blue-500/50";
            break;
          case "upcoming":
            bgColor = "bg-amber-500";
            textColor = "text-white";
            scale = "scale-90";
            shadow = "shadow-amber-500/30";
            break;
        }

        return (
          <div
            key={index}
            className={`minecraft-inventory-slot text-2xl font-bold transition-all duration-300 ${bgColor} ${textColor} ${scale} ${shadow} shadow-lg`}
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #8B4513",
              borderRadius: "6px",
            }}
          >
            <span className="font-minecraft">{item.character}</span>
          </div>
        );
      })}
    </div>
  );
};

const RhythmDisplay: React.FC<{
  character: string;
  errorFlash: boolean;
}> = ({ character, errorFlash }) => {
  return (
    <div className="relative">
      {/* Rhythmus-Indikator */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-2 bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"
            style={{
              animation: "rhythmPulse 1s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Charakter mit Beat-Animation */}
      <div
        className={`minecraft-inventory-slot text-4xl font-bold transition-all duration-200 mx-auto ${
          errorFlash
            ? "bg-red-500 shadow-red-500/50"
            : "bg-gradient-to-br from-purple-500 to-blue-600 shadow-purple-500/50"
        } shadow-lg`}
        style={{
          width: "120px",
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid #8B4513",
          borderRadius: "8px",
          animation: "rhythmBeat 1s ease-in-out infinite",
        }}
      >
        <span className="text-white drop-shadow-lg font-minecraft">
          {character}
        </span>
      </div>

      <style jsx>{`
        @keyframes rhythmPulse {
          0%,
          100% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
        }

        @keyframes rhythmBeat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  currentCharacter,
  currentSequence,
  displayMode,
  errorFlash,
  particleEffect,
  isActive,
}) => {
  const renderDisplay = () => {
    switch (displayMode) {
      case PracticeDisplayMode.Single:
        return (
          <SingleCharacterDisplay
            character={currentCharacter}
            errorFlash={errorFlash}
            particleEffect={particleEffect}
          />
        );

      case PracticeDisplayMode.Sequence:
        return (
          <SequenceDisplay sequence={currentSequence} errorFlash={errorFlash} />
        );

      case PracticeDisplayMode.Rhythm:
        return (
          <RhythmDisplay character={currentCharacter} errorFlash={errorFlash} />
        );

      default:
        return (
          <SingleCharacterDisplay
            character={currentCharacter}
            errorFlash={errorFlash}
            particleEffect={particleEffect}
          />
        );
    }
  };

  return (
    <div className="minecraft-panel p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold minecraft-text text-yellow-300">
          🎯 Tippe das Zeichen
        </h3>
      </div>

      <div className="flex justify-center items-center min-h-[200px]">
        {renderDisplay()}
      </div>

      {/* Instruktionen */}
      <div className="text-center mt-6">
        <p className="text-sm minecraft-text text-gray-300">
          {displayMode === PracticeDisplayMode.Sequence &&
            "Tippe die Sequenz von links nach rechts"}
          {displayMode === PracticeDisplayMode.Rhythm && "Folge dem Rhythmus"}
          {displayMode === PracticeDisplayMode.Single &&
            "Tippe das hervorgehobene Zeichen"}
        </p>
      </div>
    </div>
  );
};
