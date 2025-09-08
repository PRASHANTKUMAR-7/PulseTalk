type UseTimeElapsedParams = {
    startOnMount?: boolean;
};
export declare const useTimeElapsed: ({ startOnMount }?: UseTimeElapsedParams) => {
    secondsElapsed: number;
    startCounter: () => void;
    stopCounter: () => void;
};
export {};
