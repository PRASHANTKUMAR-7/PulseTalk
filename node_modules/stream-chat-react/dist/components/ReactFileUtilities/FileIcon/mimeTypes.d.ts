export type GeneralType = 'audio/' | 'video/' | 'image/' | 'text/';
export type SupportedMimeType = (typeof wordMimeTypes)[number] | (typeof excelMimeTypes)[number] | (typeof powerpointMimeTypes)[number] | (typeof archiveFileTypes)[number] | (typeof codeFileTypes)[number];
export declare const wordMimeTypes: string[];
export declare const excelMimeTypes: string[];
export declare const powerpointMimeTypes: string[];
export declare const archiveFileTypes: string[];
export declare const codeFileTypes: string[];
