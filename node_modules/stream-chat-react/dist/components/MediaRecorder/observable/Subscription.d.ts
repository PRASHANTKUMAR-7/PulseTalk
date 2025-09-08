export interface SubscriptionLike {
    closed: boolean;
    unsubscribe(): void;
}
export declare class Subscription implements SubscriptionLike {
    closed: boolean;
    private _unsubscribe;
    constructor(unsubscribe?: () => void);
    unsubscribe(): void;
}
