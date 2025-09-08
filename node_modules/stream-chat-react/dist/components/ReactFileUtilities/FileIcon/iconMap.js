import * as fileIconSet from './FileIconSet';
import { archiveFileTypes, codeFileTypes, excelMimeTypes, powerpointMimeTypes, wordMimeTypes, } from './mimeTypes';
function generateMimeTypeToIconMap({ FileArchiveIcon, FileCodeIcon, FileExcelIcon, FilePdfIcon, FilePowerPointIcon, FileWordIcon, }) {
    const mimeTypeToIconMap = {
        'application/pdf': FilePdfIcon,
    };
    for (const type of wordMimeTypes) {
        mimeTypeToIconMap[type] = FileWordIcon;
    }
    for (const type of excelMimeTypes) {
        mimeTypeToIconMap[type] = FileExcelIcon;
    }
    for (const type of powerpointMimeTypes) {
        mimeTypeToIconMap[type] = FilePowerPointIcon;
    }
    for (const type of archiveFileTypes) {
        mimeTypeToIconMap[type] = FileArchiveIcon;
    }
    for (const type of codeFileTypes) {
        mimeTypeToIconMap[type] = FileCodeIcon;
    }
    return mimeTypeToIconMap;
}
function generateGeneralTypeToIconMap({ FileAltIcon, FileAudioIcon, FileImageIcon, FileVideoIcon, }) {
    return {
        'audio/': FileAudioIcon,
        'image/': FileImageIcon,
        'text/': FileAltIcon,
        'video/': FileVideoIcon,
    };
}
export const iconMap = {
    alt: {
        ...generateMimeTypeToIconMap({
            FileArchiveIcon: fileIconSet.FileArchiveIconAlt,
            FileCodeIcon: fileIconSet.FileCodeIconAlt,
            FileExcelIcon: fileIconSet.FileExcelIconAlt,
            FilePdfIcon: fileIconSet.FilePdfIcon,
            FilePowerPointIcon: fileIconSet.FilePowerPointIconAlt,
            FileWordIcon: fileIconSet.FileWordIconAlt,
        }),
        ...generateGeneralTypeToIconMap({
            FileAltIcon: fileIconSet.FileFallbackIcon,
            FileAudioIcon: fileIconSet.FileAudioIconAlt,
            FileImageIcon: fileIconSet.FileImageIcon,
            FileVideoIcon: fileIconSet.FileVideoIconAlt,
        }),
        fallback: fileIconSet.FileFallbackIcon,
    },
    standard: {
        ...generateMimeTypeToIconMap({
            FileArchiveIcon: fileIconSet.FileArchiveIcon,
            FileCodeIcon: fileIconSet.FileCodeIcon,
            FileExcelIcon: fileIconSet.FileExcelIcon,
            FilePdfIcon: fileIconSet.FilePdfIcon,
            FilePowerPointIcon: fileIconSet.FilePowerPointIcon,
            FileWordIcon: fileIconSet.FileWordIcon,
        }),
        ...generateGeneralTypeToIconMap({
            FileAltIcon: fileIconSet.FileFallbackIcon,
            FileAudioIcon: fileIconSet.FileAudioIcon,
            FileImageIcon: fileIconSet.FileImageIcon,
            FileVideoIcon: fileIconSet.FileVideoIcon,
        }),
        fallback: fileIconSet.FileFallbackIcon,
    },
};
