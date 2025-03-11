import { OpUnitType, QUnitType } from 'dayjs';

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

export enum POST_TYPE {
  EVENT = 1,
  FEED = 2,
}

export const FEED_DAY_UNITS: {
  unit: QUnitType | OpUnitType;
  threshold: number;
  suffix: string;
}[] = [
  { unit: 'year', threshold: 31536000, suffix: 'y' },
  { unit: 'day', threshold: 86400, suffix: 'd' },
  { unit: 'hour', threshold: 3600, suffix: 'h' },
  { unit: 'minute', threshold: 60, suffix: 'm' },
];
