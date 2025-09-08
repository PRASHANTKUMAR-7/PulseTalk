import React from 'react';
import type { SeekFn } from '../hooks/useAudioController';
type WaveProgressBarProps = {
    /** Function that allows to change the track progress */
    seek: SeekFn;
    /** The array of fractional number values between 0 and 1 representing the height of amplitudes */
    waveformData: number[];
    /** Allows to specify the number of bars into which the original waveformData array should be resampled */
    amplitudesCount?: number;
    /** Progress expressed in fractional number value btw 0 and 100. */
    progress?: number;
    relativeAmplitudeBarWidth?: number;
    relativeAmplitudeGap?: number;
};
export declare const WaveProgressBar: ({ amplitudesCount, progress, relativeAmplitudeBarWidth, relativeAmplitudeGap, seek, waveformData, }: WaveProgressBarProps) => React.JSX.Element | null;
export {};
