// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

const PROTECTED_PREFIXES = ["/dashboard"];
const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/"];
const API_ROUTES = ["/api/"];

const ROLE_REDIRECT_MAP: Record<string, string> = {
  admin: "/dashboard/admin",
  organizer: "/dashboard/organizer",
  speaker: "/dashboard/speaker",
  attendee: "/dashboard/attendee",
};

const DEFAULT_REDIRECT = "/dashboard/attendee";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getSession(request);
  const isAuthenticated = !!user;

  // Skip middleware for API routes and static files
  if (API_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 1. Authenticated user trying to access auth pages → redirect to their dashboard
  if (isAuthenticated && PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route))) {
    const redirectPath = ROLE_REDIRECT_MAP[user!.role] ?? DEFAULT_REDIRECT;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // 2. Unauthenticated user trying to access protected routes → redirect to login
  if (!isAuthenticated && PROTECTED_PREFIXES.some((route) => pathname.startsWith(route))) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Redirect root /dashboard to correct role dashboard
  if (isAuthenticated && pathname === "/dashboard") {
    const redirectPath = ROLE_REDIRECT_MAP[user!.role] ?? DEFAULT_REDIRECT;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // 4. Prevent accessing other roles' dashboards
  if (isAuthenticated && pathname.startsWith("/dashboard/")) {
    const userRole = user!.role;
    const requestedRole = pathname.split("/")[2];

    if (requestedRole && requestedRole !== userRole) {
      const redirectPath = ROLE_REDIRECT_MAP[userRole] ?? DEFAULT_REDIRECT;
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, public files, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};