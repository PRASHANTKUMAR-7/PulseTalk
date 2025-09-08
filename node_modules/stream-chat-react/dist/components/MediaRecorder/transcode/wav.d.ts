export declare const readWavHeader: (dataView: DataView) => {
    audioDataSizeBytes: number;
    audioDataStartOffset: 44;
    channelCount: number;
    sampleRate: number;
} | undefined;
export declare const encodeToWaw: (file: File, sampleRate: number) => Promise<Blob>;
