// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

const PUBLIC_ROUTES = ["/", "/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession(request);
  const isAuthenticated = !!session;

  // Skip API routes, static files, assets
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Role routes
  const roleRoutes = ["/attendee", "/organizer", "/speaker", "/admin"];

  // 1. Authenticated users should not access auth pages
  if (
    isAuthenticated &&
    (pathname === "/sign-in" || pathname === "/sign-up")
  ) {
    const redirectPath = getRoleDashboard(session!.role);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // 2. Unauthenticated users trying to access protected pages
  const isProtectedRoute = roleRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // 3. Redirect authenticated user from "/" to their dashboard
  if (isAuthenticated && pathname === "/") {
    const redirectPath = getRoleDashboard(session!.role);
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // 4. Prevent users from accessing another role's route
  if (isAuthenticated && isProtectedRoute) {
    const requestedRole = pathname.split("/")[1];

    if (requestedRole !== session!.role) {
      const correctDashboard = getRoleDashboard(session!.role);

      return NextResponse.redirect(
        new URL(correctDashboard, request.url)
      );
    }
  }

  return NextResponse.next();
}

// Helper
function getRoleDashboard(role: string): string {
  const roleMap: Record<string, string> = {
    attendee: "/attendee",
    organizer: "/organizer",
    speaker: "/speaker",
    admin: "/admin",
  };

  return roleMap[role] || "/attendee";
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};