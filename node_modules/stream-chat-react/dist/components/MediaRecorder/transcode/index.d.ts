export type TranscoderConfig = {
    sampleRate: number;
    encoder?: (file: File, sampleRate: number) => Promise<Blob>;
};
export type TranscodeParams = TranscoderConfig & {
    blob: Blob;
};
export declare const transcode: ({ blob, encoder, sampleRate, }: TranscodeParams) => Promise<Blob>;
