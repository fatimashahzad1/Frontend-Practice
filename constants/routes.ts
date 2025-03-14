export const ROUTES = {
  root: '/',
  account: '/account',
  login: '/login',
  registerPersonal: '/register/info/personal',
  registerResidential: '/register/info/residency',
  registerBank: '/register/info/bank',
  settingsAnalytics: '/settings/analytics',
  settingsGeneral: '/settings/general',
  verification: '/verification',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  feed: '/feed',
  jobs: '/jobs',
  events: '/events',
  articles: '/articles',
  people: '/people',
  chatsList: '/chats/list',
  chatsCall: '/chats/call',
  chats: '/chats',
  chatsContacts: '/chats/contacts',
};

export const PUBLIC_ROUTES = [
  ROUTES.account,
  ROUTES.registerPersonal,
  ROUTES.registerResidential,
  ROUTES.registerBank,
  ROUTES.login,
  ROUTES.verification,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
];
export const PRIVATE_ROUTES = [ROUTES.settingsAnalytics];

export const enum ROUTE_QUERY_KEYS {
  GET_ALL_POSTS = 'posts',
  GET_ALL_ARTICLES = 'articles',
  USER_DETAILS = 'user-detail'
}
