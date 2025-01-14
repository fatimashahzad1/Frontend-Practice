export const ROUTES = {
  root: "/",
  account: "/account",
  login: "/login",
  registerPersonal: "/register/info/personal",
  registerResidential: "/register/info/residency",
  registerBank: "/register/info/bank",
  settingsAnalytics: "/settings/analytics",
};

export const PUBLIC_ROUTES = [
  ROUTES.account,
  ROUTES.registerPersonal,
  ROUTES.registerResidential,
  ROUTES.registerBank,
  ROUTES.login,
];
export const PRIVATE_ROUTES = [ROUTES.settingsAnalytics];
