import { encodeToWaw } from './wav';
import { createFileFromBlobs, getExtensionFromMimeType } from '../../ReactFileUtilities';
export const transcode = ({ blob, encoder = encodeToWaw, sampleRate, }) => encoder(createFileFromBlobs({
    blobsArray: [blob],
    fileName: `audio_recording_${new Date().toISOString()}.${getExtensionFromMimeType(blob.type)}`,
    mimeType: blob.type,
}), sampleRate);
