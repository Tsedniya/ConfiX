"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useSession } from "@/lib/auth/auth-client";
import SignOutButton from "./sign-out-btn";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 z-20 h-16 w-full border-b bg-white">
      <div className="container mx-auto grid grid-cols-2 items-center h-16 px-4">

        {/* LEFT - BRAND */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-semibold text-primary">
            ConfiX
          </Link>
        </div>

        {/* RIGHT - NAV + USER */}
        <div className="flex items-center justify-end gap-4">

          {session?.user ? (
            <>
              <Link href="/conferences">
                <Button variant="ghost">Conferences</Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {session.user.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div>
                      <p>{session.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <SignOutButton />
                 
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost">Log In</Button>
              </Link>

              <Link href="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}