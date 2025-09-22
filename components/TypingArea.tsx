import React from "react";

interface TypingAreaProps {
  text: string;
  typed: string;
  errorFlash: boolean;
}

const Character: React.FC<{
  char: string;
  state: "correct" | "incorrect" | "current" | "pending";
  errorFlash: boolean;
}> = React.memo(({ char, state, errorFlash }) => {
  let className = "transition-all duration-200 p-1 ";
  let style: React.CSSProperties = {};

  switch (state) {
    case "correct":
      style.color = "var(--minecraft-emerald)";
      style.textShadow = "1px 1px 0px rgba(0,0,0,0.8)";
      break;
    case "incorrect":
      style.color = "var(--minecraft-redstone)";
      style.backgroundColor = "rgba(244, 67, 54, 0.2)";
      style.textShadow = "1px 1px 0px rgba(0,0,0,0.8)";
      className += "minecraft-shake border-2";
      style.borderColor = "var(--minecraft-redstone)";
      break;
    case "current":
      style.backgroundColor = "var(--minecraft-gold)";
      style.color = "var(--text-primary)";
      className += "minecraft-glow";
      if (errorFlash) {
        style.backgroundColor = "var(--minecraft-redstone)";
        style.color = "var(--text-light)";
      }
      break;
    case "pending":
      style.color = "rgba(255,255,255,0.4)";
      style.textShadow = "1px 1px 0px rgba(0,0,0,0.8)";
      break;
  }

  // Handle spaces specifically for visibility
  if (char === " ") {
    if (state === "current") {
      return (
        <span className={className} style={style}>
          &nbsp;
        </span>
      );
    }
    if (state === "incorrect") {
      return (
        <span className={className} style={style}>
          ▯
        </span>
      );
    }
  }

  return (
    <span className={className} style={style}>
      {char}
    </span>
  );
});

export const TypingArea: React.FC<TypingAreaProps> = ({
  text,
  typed,
  errorFlash,
}) => {
  return (
    <div
      className="minecraft-panel"
      style={{ background: "var(--minecraft-dark-gray)" }}
    >
      <div className="text-center mb-4">
        <span className="text-sm minecraft-text opacity-80">
          📜 Tipp-Pergament
        </span>
      </div>
      <div
        className="minecraft-panel"
        style={{ background: "var(--minecraft-black)", padding: "24px" }}
      >
        <p className="text-lg md:text-xl minecraft-font leading-relaxed tracking-wider">
          {text.split("").map((char, index) => {
            let state: "correct" | "incorrect" | "current" | "pending" =
              "pending";
            if (index < typed.length) {
              state = typed[index] === char ? "correct" : "incorrect";
            } else if (index === typed.length) {
              state = "current";
            }
            return (
              <Character
                key={`${char}-${index}`}
                char={char}
                state={state}
                errorFlash={errorFlash}
              />
            );
          })}
        </p>
      </div>
    </div>
  );
};
