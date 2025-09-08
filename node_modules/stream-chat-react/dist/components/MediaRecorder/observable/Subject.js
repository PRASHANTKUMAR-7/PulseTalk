import { Observable } from './Observable';
import { Subscription } from './Subscription';
import { createObserver } from './Observer';
export class Subject extends Observable {
    constructor() {
        super();
        this._observers = new Map();
        this._observerCounter = 0;
    }
    get observers() {
        return Array.from(this._observers.values());
    }
    next(value) {
        if (this.closed)
            return;
        const observers = this.observers;
        for (let i = 0; i < observers.length; i++) {
            observers[i].next(value);
        }
    }
    error(err) {
        if (this.closed)
            return;
        this.thrownError = err;
        const { observers } = this;
        for (let i = 0; i < observers.length; i++) {
            observers[i].error?.(err);
        }
        this._observers.clear();
    }
    complete() {
        if (this.closed)
            return;
        this._closed = true;
        const { observers } = this;
        for (let i = 0; i < observers.length; i++) {
            observers[i].complete?.();
        }
        this._observers.clear();
    }
    subscribe(observerOrNext) {
        const observer = createObserver(observerOrNext);
        if (this.thrownError || this.closed) {
            const subscription = new Subscription();
            subscription.closed = true;
            return subscription;
        }
        const observerId = this._observerCounter++;
        this._observers.set(observerId, observer);
        return new Subscription(() => {
            this._observers.delete(observerId);
        });
    }
    unsubscribe() {
        this._closed = true;
        this._observers.clear();
    }
}
