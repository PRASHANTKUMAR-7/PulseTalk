import React from 'react';
export type CooldownTimerProps = {
    cooldownInterval: number;
    setCooldownRemaining: React.Dispatch<React.SetStateAction<number | undefined>>;
};
export declare const CooldownTimer: ({ cooldownInterval }: CooldownTimerProps) => React.JSX.Element;
