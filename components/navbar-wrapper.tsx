"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  const hiddenRoutes = ["/choose-role"];

  const hideNavbar = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (hideNavbar) return null;

  return <Navbar />;
}