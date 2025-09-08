import { Subscription } from '../observable/Subscription';
import { Subject } from '../observable/Subject';
import { BehaviorSubject } from '../observable/BehaviorSubject';
export var RecordingPermission;
(function (RecordingPermission) {
    RecordingPermission["CAM"] = "camera";
    RecordingPermission["MIC"] = "microphone";
})(RecordingPermission || (RecordingPermission = {}));
const MEDIA_TO_PERMISSION = {
    audio: RecordingPermission.MIC,
    video: RecordingPermission.CAM,
};
export class BrowserPermission {
    constructor({ mediaType }) {
        this.state = new BehaviorSubject(undefined);
        this.status = new BehaviorSubject(undefined);
        this.error = new Subject();
        this.changeSubscriptions = [];
        this.name = MEDIA_TO_PERMISSION[mediaType];
    }
    get isWatching() {
        return this.changeSubscriptions.some((subscription) => !subscription.closed);
    }
    async watch() {
        if (!this.status.value) {
            await this.check();
            if (!this.status.value)
                return;
        }
        const status = this.status.value;
        const handlePermissionChange = (e) => {
            const { state } = e.target;
            this.state.next(state);
        };
        status.addEventListener('change', handlePermissionChange);
        this.changeSubscriptions.push(new Subscription(() => {
            status.removeEventListener('change', handlePermissionChange);
        }));
    }
    unwatch() {
        this.changeSubscriptions.forEach((subscription) => subscription.unsubscribe());
    }
    async check() {
        if (!this.name) {
            this.error.next(new Error('Unknown media recording permission'));
            return;
        }
        let permissionState;
        try {
            const permissionStatus = await navigator.permissions.query({
                name: this.name,
            });
            permissionState = permissionStatus.state;
            this.status.next(permissionStatus);
        }
        catch (e) {
            // permission does not exist - cannot be queried
            // an example would be Firefox - camera, neither microphone perms can be queried
            permissionState = 'granted';
        }
        this.state.next(permissionState);
    }
}
