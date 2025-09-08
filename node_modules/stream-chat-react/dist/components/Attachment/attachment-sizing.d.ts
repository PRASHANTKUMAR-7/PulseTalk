import type { Attachment } from 'stream-chat';
export declare const getImageAttachmentConfiguration: (attachment: Attachment, element: HTMLElement) => {
    url: string;
};
export declare const getVideoAttachmentConfiguration: (attachment: Attachment, element: HTMLElement, shouldGenerateVideoThumbnail: boolean) => {
    thumbUrl: string | undefined;
    url: string;
};
