export class Subscription {
    constructor(unsubscribe) {
        this.closed = false;
        this._unsubscribe = unsubscribe;
    }
    unsubscribe() {
        this.closed = true;
        this._unsubscribe?.();
    }
}
