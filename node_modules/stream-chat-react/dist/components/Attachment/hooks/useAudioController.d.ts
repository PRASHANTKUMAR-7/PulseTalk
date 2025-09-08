/// <reference types="react" />
export declare const elementIsPlaying: (audioElement: HTMLAudioElement | null) => boolean | null;
export type SeekFn = (params: {
    clientX: number;
    currentTarget: HTMLDivElement;
}) => void;
type AudioControllerParams = {
    /** Audio duration in seconds. */
    durationSeconds?: number;
    /** The audio MIME type that is checked before the audio is played. If the type is not supported the controller registers error in playbackError. */
    mimeType?: string;
    /** An array of fractional numeric values of playback speed to override the defaults (1.0, 1.5, 2.0) */
    playbackRates?: number[];
};
export declare const useAudioController: ({ durationSeconds, mimeType, playbackRates, }?: AudioControllerParams) => {
    audioRef: import("react").RefObject<HTMLAudioElement | null>;
    canPlayRecord: boolean;
    increasePlaybackRate: () => void;
    isPlaying: boolean;
    playbackError: Error | undefined;
    playbackRate: number;
    progress: number;
    secondsElapsed: number;
    seek: SeekFn;
    togglePlay: () => Promise<void>;
};
export {};
