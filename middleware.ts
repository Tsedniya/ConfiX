// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

const ROLE_REDIRECT_MAP: Record<string, string> = {
  admin: "/dashboard/admin",
  organizer: "/dashboard/organizer",
  speaker: "/dashboard/speaker",
  attendee: "/dashboard/attendee",
};

const DEFAULT_REDIRECT = "/dashboard/attendee";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser(request);
  const isAuthenticated = !!user;

  // 1. Redirect authenticated users away from login/signup pages
  if (isAuthenticated && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    const userRole = user!.role || "attendee";
    const roleDashboard = ROLE_REDIRECT_MAP[userRole] ?? DEFAULT_REDIRECT;
    return NextResponse.redirect(new URL(roleDashboard, request.url));
  }

  // 2. Protect dashboard routes - redirect to login if no valid access token
  if (!isAuthenticated && PROTECTED_PREFIXES.some((r) => pathname.startsWith(r))) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 3. Redirect root /dashboard to role-specific dashboard
  if (isAuthenticated && pathname === "/dashboard") {
    const userRole = user!.role || "attendee";
    const roleDashboard = ROLE_REDIRECT_MAP[userRole] ?? DEFAULT_REDIRECT;
    return NextResponse.redirect(new URL(roleDashboard, request.url));
  }

  // 4. Prevent users from accessing other roles' dashboards
  if (isAuthenticated && pathname.startsWith("/dashboard/")) {
    const userRole = user!.role || "attendee";
    const roleDashboard = ROLE_REDIRECT_MAP[userRole] ?? DEFAULT_REDIRECT;
    const requestedRole = pathname.split("/")[2];

    if (requestedRole && requestedRole !== userRole) {
      return NextResponse.redirect(new URL(roleDashboard, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};