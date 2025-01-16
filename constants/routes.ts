export const ROUTES = {
  root: "/",
  account: "/account",
  login: "/login",
  registerPersonal: "/register/info/personal",
  registerResidential: "/register/info/residency",
  registerBank: "/register/info/bank",
  settingsAnalytics: "/settings/analytics",
  settingsGeneral: "/settings/general",
  verification: "/verification",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  feed: "/feed",
  chats: "/chats",
  jobs: "/jobs",
  events: "/events",
  articles: "/articles",
  people: "/people",
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
