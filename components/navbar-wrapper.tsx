"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const allowedRoutes = ["/", "/sign-in", "/sign-up"];

  const showNavbar = allowedRoutes.some((route) =>
    pathname === route
  );

  if (!showNavbar) return null;

  return <Navbar />;
}