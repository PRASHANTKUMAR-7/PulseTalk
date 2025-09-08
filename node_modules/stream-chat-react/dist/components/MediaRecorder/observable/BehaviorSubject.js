import { Subject } from './Subject';
import { createObserver } from './Observer';
export class BehaviorSubject extends Subject {
    constructor(_value) {
        super();
        this._value = _value;
    }
    get value() {
        const { _value, thrownError } = this;
        if (thrownError) {
            throw thrownError;
        }
        return _value;
    }
    subscribe(observerOrNext) {
        const observer = createObserver(observerOrNext);
        const subscription = super.subscribe(observerOrNext);
        if (!subscription.closed)
            observer.next(this._value);
        return subscription;
    }
    next(value) {
        super.next((this._value = value));
    }
}
