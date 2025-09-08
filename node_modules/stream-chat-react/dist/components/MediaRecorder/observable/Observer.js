export function createObserver(observerOrNext) {
    return typeof observerOrNext === 'function' ? { next: observerOrNext } : observerOrNext;
}
