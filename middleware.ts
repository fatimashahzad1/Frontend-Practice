import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES, ROUTES } from "./constants/routes";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const token = request.cookies.get("access_token")?.value;

  // Redirect to login if no token and user is on the home page
  if (!token && currentPath === ROUTES.root) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  // If token exists, redirect to dashboard (settingsAnalytics) from home page or public routes
  if (token) {
    if (currentPath === ROUTES.root) {
      return NextResponse.redirect(
        new URL(ROUTES.settingsAnalytics, request.url)
      );
    }

    // If user is on a public route, redirect them to the dashboard
    if (PUBLIC_ROUTES.includes(currentPath)) {
      return NextResponse.redirect(
        new URL(ROUTES.settingsAnalytics, request.url)
      );
    }

    // If token exists, user can access private routes, so just proceed
    return NextResponse.next();
  }

  // If no token and the user is on a private route, redirect to login
  if (!token && !PUBLIC_ROUTES.includes(currentPath)) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  // Allow the request to proceed for valid cases
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|css|js|webp|woff|woff2|ttf|otf|eot)$).*)",
  ],
};
