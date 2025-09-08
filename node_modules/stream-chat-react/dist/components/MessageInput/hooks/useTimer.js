import { useEffect, useState } from 'react';
export const useTimer = ({ startFrom }) => {
    const [secondsLeft, setSecondsLeft] = useState();
    useEffect(() => {
        let countdownTimeout;
        if (typeof secondsLeft === 'number' && secondsLeft > 0) {
            countdownTimeout = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
        }
        return () => {
            clearTimeout(countdownTimeout);
        };
    }, [secondsLeft]);
    useEffect(() => {
        setSecondsLeft(startFrom ?? 0);
    }, [startFrom]);
    return secondsLeft;
};
