import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const PROTECTED_ROUTES = ["/dashboard"];

// Routes accessible only by guests (unauthenticated users)
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

// Role → dashboard path mapping
const ROLE_REDIRECT_MAP: Record<string, string> = {
  organizer: "/dashboard/organizer",
  speaker: "/dashboard/speaker",
  attendee: "/dashboard/attendee",
};

const DEFAULT_REDIRECT = "/dashboard/attendee";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fetch session from better-auth API endpoint
  let session: { user?: { role?: string } } | null = null;

  try {
    const sessionResponse = await fetch(
      new URL("/api/auth/get-session", request.url),
      {
        headers: {
          // Forward cookies so better-auth can read the session cookie
          cookie: request.headers.get("cookie") ?? "",
        },
      }
    );

    if (sessionResponse.ok) {
      session = await sessionResponse.json();
    }
  } catch {
    // If session fetch fails, treat as unauthenticated
    session = null;
  }

  const isAuthenticated = !!(session?.user);
  const userRole = session?.user?.role ?? "attendee";
  const roleDashboard = ROLE_REDIRECT_MAP[userRole] ?? DEFAULT_REDIRECT;

  // ── Authenticated user hitting /dashboard (root) → redirect to role dashboard
  if (isAuthenticated && pathname === "/dashboard") {
    return NextResponse.redirect(new URL(roleDashboard, request.url));
  }

  // ── Authenticated user hitting auth pages → redirect to their dashboard
  if (isAuthenticated && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL(roleDashboard, request.url));
  }

  // ── Unauthenticated user hitting protected routes → redirect to sign-in
  if (
    !isAuthenticated &&
    PROTECTED_ROUTES.some((r) => pathname.startsWith(r))
  ) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // ── Role-based access control inside /dashboard/*
  if (isAuthenticated && pathname.startsWith("/dashboard/")) {
    const allowedPath = roleDashboard;
    // Block users from accessing another role's dashboard sub-section
    const otherRolePaths = Object.values(ROLE_REDIRECT_MAP).filter(
      (p) => p !== allowedPath
    );
    if (otherRolePaths.some((p) => pathname.startsWith(p))) {
      return NextResponse.redirect(new URL(roleDashboard, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder
     * - api/auth routes (better-auth internals)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)",
  ],
};
