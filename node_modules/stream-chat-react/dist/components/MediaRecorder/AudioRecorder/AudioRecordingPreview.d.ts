import React from 'react';
export type AudioRecordingPlayerProps = React.ComponentProps<'audio'> & {
    durationSeconds: number;
    mimeType?: string;
    waveformData?: number[];
};
export declare const AudioRecordingPreview: ({ durationSeconds, mimeType, waveformData, ...props }: AudioRecordingPlayerProps) => React.JSX.Element;
