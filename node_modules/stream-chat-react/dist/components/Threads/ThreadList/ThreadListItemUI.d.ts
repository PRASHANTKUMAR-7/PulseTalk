import React from 'react';
import type { ComponentPropsWithoutRef } from 'react';
export type ThreadListItemUIProps = ComponentPropsWithoutRef<'button'>;
/**
 * TODO:
 * - maybe hover state? ask design
 */
export declare const attachmentTypeIconMap: {
    readonly audio: "🔈";
    readonly file: "📄";
    readonly image: "📷";
    readonly video: "🎥";
    readonly voiceRecording: "🎙️";
};
export declare const ThreadListItemUI: (props: ThreadListItemUIProps) => React.JSX.Element;
