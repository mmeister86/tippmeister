import React from "react";

// Minecraft-Style Badge Icons using emojis and symbols
const DefaultBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} style={{ fontSize: "32px" }}>
    🏅
  </span>
);

const SpeedBadgeIcon: React.FC<{
  className?: string;
  level?: "beginner" | "intermediate" | "expert";
}> = ({ className, level = "beginner" }) => {
  const icons = {
    beginner: "🌱",
    intermediate: "⚡",
    expert: "🔥",
  };
  return (
    <span className={className} style={{ fontSize: "32px" }}>
      {icons[level]}
    </span>
  );
};

const AccuracyBadgeIcon: React.FC<{
  className?: string;
  perfect?: boolean;
}> = ({ className, perfect = false }) => (
  <span className={className} style={{ fontSize: "32px" }}>
    {perfect ? "💎" : "🎯"}
  </span>
);

const GamesPlayedIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span className={className} style={{ fontSize: "32px" }}>
    🛡️
  </span>
);

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  "wpm-beginner": (props) => <SpeedBadgeIcon {...props} level="beginner" />,
  "wpm-intermediate": (props) => (
    <SpeedBadgeIcon {...props} level="intermediate" />
  ),
  "wpm-expert": (props) => <SpeedBadgeIcon {...props} level="expert" />,
  "accuracy-95": (props) => <AccuracyBadgeIcon {...props} perfect={false} />,
  "accuracy-100": (props) => <AccuracyBadgeIcon {...props} perfect={true} />,
  "games-10": GamesPlayedIcon,
  default: DefaultBadgeIcon,
};

export const BadgeIcon: React.FC<{ badgeId: string; className?: string }> = ({
  badgeId,
  className,
}) => {
  const Icon = ICONS[badgeId] || ICONS["default"];
  return <Icon className={className} />;
};
