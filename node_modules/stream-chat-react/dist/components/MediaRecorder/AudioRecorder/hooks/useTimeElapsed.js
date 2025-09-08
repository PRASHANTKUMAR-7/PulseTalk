import { useCallback, useEffect, useRef, useState } from 'react';
// todo: provide start timestamp
export const useTimeElapsed = ({ startOnMount } = {}) => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const updateInterval = useRef(undefined);
    const startCounter = useCallback(() => {
        if (updateInterval.current)
            return;
        updateInterval.current = setInterval(() => {
            setSecondsElapsed((prev) => prev + 1);
        }, 1000);
    }, []);
    const stopCounter = useCallback(() => {
        clearInterval(updateInterval.current);
        updateInterval.current = undefined;
    }, []);
    useEffect(() => {
        if (!startOnMount)
            return;
        startCounter();
        return () => {
            stopCounter();
        };
    }, [startCounter, startOnMount, stopCounter]);
    return {
        secondsElapsed,
        startCounter,
        stopCounter,
    };
};
