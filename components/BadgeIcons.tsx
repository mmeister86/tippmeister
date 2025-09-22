import React from 'react';

// A placeholder for icons. In a real app, these would be unique SVGs.
const DefaultBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

const SpeedBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
        <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.914 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);

const AccuracyBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.975.435-.975.975v.038c0 .54.435.975.975.975h.038c.54 0 .975-.435.975-.975v-.038c0-.54-.435-.975-.975-.975h-.038zm4.275 0c-.54 0-.975.435-.975.975v.038c0 .54.435.975.975.975h.038c.54 0 .975-.435.975-.975v-.038c0-.54-.435-.975-.975-.975h-.038zm-2.625 3.75c-.54 0-.975.435-.975.975v4.5c0 .54.435.975.975.975h.038c.54 0 .975-.435.975-.975v-4.5c0-.54-.435-.975-.975-.975h-.038z" />
    </svg>
);


const ICONS: Record<string, React.FC<{ className?: string }>> = {
    'wpm-beginner': SpeedBadgeIcon,
    'wpm-intermediate': SpeedBadgeIcon,
    'wpm-expert': SpeedBadgeIcon,
    'accuracy-95': AccuracyBadgeIcon,
    'accuracy-100': AccuracyBadgeIcon,
    'games-10': DefaultBadgeIcon,
    'default': DefaultBadgeIcon,
};

export const BadgeIcon: React.FC<{ badgeId: string; className?: string }> = ({ badgeId, className }) => {
    const Icon = ICONS[badgeId] || ICONS['default'];
    return <Icon className={className} />;
};
