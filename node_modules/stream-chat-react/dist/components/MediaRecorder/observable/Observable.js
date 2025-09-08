import { createObserver } from './Observer';
import { Subscription } from './Subscription';
export class Observable {
    constructor(producer) {
        this._closed = false;
        if (producer)
            this._producer = producer;
    }
    get closed() {
        return this._closed;
    }
    subscribe(observerOrNext) {
        const observer = createObserver(observerOrNext);
        if (!this.closed) {
            this._producer?.(observer);
        }
        return new Subscription(() => {
            this._closed = true;
        });
    }
}
