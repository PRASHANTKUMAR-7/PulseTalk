/**
 * In the context of resampling audio data, AudioContext is used to decode the input audio file into an AudioBuffer,
 * which is a fundamental data structure representing audio data.
 * @param file
 */
export declare const toAudioBuffer: (file: File) => Promise<AudioBuffer>;
/**
 * OfflineAudioContext is a specialized type of AudioContext that does not render audio in real-time and is used for offline audio processing tasks.
 * It allows performing audio processing and rendering without actually playing the audio through speakers or outputting it to a destination.
 * In the context of resampling audio data, OfflineAudioContext is used to resample the decoded AudioBuffer from a file to the desired sample rate.
 * It provides more flexibility and control over audio processing, as it can operate at different sample rates and durations compared to real-time audio contexts.
 * @param audioBuffer
 * @param sampleRate
 */
export declare const renderAudio: (audioBuffer: AudioBuffer, sampleRate: number) => Promise<AudioBuffer>;
