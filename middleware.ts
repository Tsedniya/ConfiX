// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

const PROTECTED_PREFIXES = ["/dashboard"];
const AUTH_PAGES = ["/sign-in", "/sign-up"];
const PUBLIC_ROUTES = ["/", ...AUTH_PAGES];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getSession(request);
  const isAuthenticated = !!user;

  // Skip for API routes and static assets
  if (pathname.startsWith("/api/") || 
      pathname.startsWith("/_next/") || 
      pathname.includes(".")) {
    return NextResponse.next();
  }

  // 1. Authenticated user on auth pages → redirect to their dashboard
  if (isAuthenticated && AUTH_PAGES.includes(pathname)) {
    const redirectPath = getRoleDashboard(user!.role);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // 2. Unauthenticated user trying to access protected routes
  if (!isAuthenticated && PROTECTED_PREFIXES.some((route) => pathname.startsWith(route))) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Redirect root /dashboard to correct role dashboard
  if (isAuthenticated && pathname === "/dashboard") {
    const redirectPath = getRoleDashboard(user!.role);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // 4. Prevent accessing wrong role's dashboard
  if (isAuthenticated && pathname.startsWith("/dashboard/")) {
    const requestedRole = pathname.split("/")[2];
    const userRole = user!.role;

    if (requestedRole && requestedRole !== userRole) {
      const redirectPath = getRoleDashboard(userRole);
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  return NextResponse.next();
}

// Helper function
function getRoleDashboard(role: string): string {
  const map: Record<string, string> = {
    admin: "/dashboard/admin",
    organizer: "/dashboard/organizer",
    speaker: "/dashboard/speaker",
    attendee: "/dashboard/attendee",
  };
  return map[role] || "/";
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};