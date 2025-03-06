export const TOKEN_COOKIE_NAME = 'access_token';
export const PAGINATION_DEFAULT_PAGE = 1;
export const PAGINATION_DEFAULT_LIMIT = 8;

export const enum DASHBOARD_SIMILAR_PAGES {
    FEED = 'feed',
    EVENTS = 'events',
    JOBS = 'jobs',
}

export const ONLINE_PRESENCE_PLATFORMS = [
    'GitHub',
    'Figma',
    'Instagram',
    'Facebook',
    'LinkedIn',
] as const;

export enum CALL_STATUS {
    RECEIVED = 'RECEIVED',
    REJECTED = 'REJECTED',
    MISSED = 'MISSED',
}

export enum BILLING_PLANS {
    PRO_ANNUAL = 'Pro Annual',
    PRO_PORTFOLIO = 'Pro Portfolio',
    SPONSORED_POST = 'Sponsored Post',
}

export enum PAYMENT_METHOD_IMAGES {
    VISA = '/assets/visa.svg',
    MASTER_CARD = '/assets/mastercard.svg',
}

export enum PAYMENT_METHOD {
    VISA = 'Visa',
    MASTER_CARD = 'MasterCard',
}
