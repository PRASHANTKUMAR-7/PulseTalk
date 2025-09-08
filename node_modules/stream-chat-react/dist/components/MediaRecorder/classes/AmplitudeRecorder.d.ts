import { BehaviorSubject } from '../observable/BehaviorSubject';
import { Subject } from '../observable/Subject';
/**
 * fftSize
 * An unsigned integer, representing the window size of the FFT, given in number of samples.
 * A higher value will result in more details in the frequency domain but fewer details
 * in the amplitude domain.
 *
 * Must be a power of 2 between 2^5 and 2^15, so one of: 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768.
 * Defaults to 32.
 *
 * maxDecibels
 * A double, representing the maximum decibel value for scaling the FFT analysis data,
 * where 0 dB is the loudest possible sound, -10 dB is a 10th of that, etc.
 * The default value is -30 dB.
 *
 * minDecibels
 * A double, representing the minimum decibel value for scaling the FFT analysis data,
 * where 0 dB is the loudest possible sound, -10 dB is a 10th of that, etc.
 * The default value is -100 dB.
 */
export type AmplitudeAnalyserConfig = Pick<AnalyserNode, 'fftSize' | 'maxDecibels' | 'minDecibels'>;
export type AmplitudeRecorderConfig = {
    analyserConfig: AmplitudeAnalyserConfig;
    sampleCount: number;
    samplingFrequencyMs: number;
};
export declare const DEFAULT_AMPLITUDE_RECORDER_CONFIG: AmplitudeRecorderConfig;
type AmplitudeAnalyserOptions = {
    stream: MediaStream;
    config?: AmplitudeRecorderConfig;
};
export declare enum AmplitudeRecorderState {
    CLOSED = "closed",
    RECORDING = "recording",
    STOPPED = "stopped"
}
export declare class AmplitudeRecorder {
    audioContext: AudioContext | undefined;
    analyserNode: AnalyserNode | undefined;
    microphone: MediaStreamAudioSourceNode | undefined;
    stream: MediaStream;
    config: AmplitudeRecorderConfig;
    amplitudeSamplingInterval: ReturnType<typeof setInterval> | undefined;
    amplitudes: BehaviorSubject<number[]>;
    state: BehaviorSubject<AmplitudeRecorderState | undefined>;
    error: Subject<Error | undefined>;
    constructor({ config, stream }: AmplitudeAnalyserOptions);
    init(): void;
    stop(): void;
    start: () => void;
    close(): void;
}
export {};
