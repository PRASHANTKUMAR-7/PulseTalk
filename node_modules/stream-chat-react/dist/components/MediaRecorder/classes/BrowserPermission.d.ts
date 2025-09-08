import type { RecordedMediaType } from '../../ReactFileUtilities';
import { Subject } from '../observable/Subject';
import { BehaviorSubject } from '../observable/BehaviorSubject';
export declare enum RecordingPermission {
    CAM = "camera",
    MIC = "microphone"
}
export type BrowserPermissionOptions = {
    mediaType: RecordedMediaType;
};
export declare class BrowserPermission {
    name: string;
    state: BehaviorSubject<PermissionState | undefined>;
    status: BehaviorSubject<PermissionStatus | undefined>;
    error: Subject<Error | undefined>;
    private changeSubscriptions;
    constructor({ mediaType }: BrowserPermissionOptions);
    get isWatching(): boolean;
    watch(): Promise<void>;
    unwatch(): void;
    check(): Promise<void>;
}
