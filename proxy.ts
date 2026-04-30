import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const sessionToken = request.cookies.get("session")?.value;
  const role = request.cookies.get("role")?.value;

  const isAuthPage =
    path.startsWith("/sign-in") || path.startsWith("/sign-up");

  const isChooseRolePage = path.startsWith("/choose-role");

  const isDashboard = path.startsWith("/dashboard");

  // 1. Not logged in → redirect to signup
  if (!sessionToken && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  // 2. Logged in but no role → force choose role
  if (sessionToken && !role && !isChooseRolePage) {
    return NextResponse.redirect(new URL("/choose-role", request.url));
  }

  // 3. Role-based dashboard protection
  if (isDashboard && role) {
    if (path.startsWith("/dashboard/organizer") && role !== "organizer") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    if (path.startsWith("/dashboard/speaker") && role !== "speaker") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    if (path.startsWith("/dashboard/attendee") && role !== "attendee") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/choose-role", "/sign-in", "/sign-up"],
};