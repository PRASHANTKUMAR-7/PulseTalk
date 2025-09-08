import React from 'react';
import { useTimer } from './hooks/useTimer';
export const CooldownTimer = ({ cooldownInterval }) => {
    const secondsLeft = useTimer({ startFrom: cooldownInterval });
    return (React.createElement("div", { className: 'str-chat__message-input-cooldown', "data-testid": 'cooldown-timer' }, secondsLeft));
};
