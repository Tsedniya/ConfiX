"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useSession } from "@/lib/auth/auth-client";
import SignOutButton from "./sign-out-btn";

import { Search } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 z-20 h-16 w-full border-b bg-white">
      <div className="container mx-auto grid grid-cols-3 items-center h-16 px-4">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-semibold text-primary"
          >
            ConfiX
          </Link>

          {session?.user && (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/conferences">
                <Button variant="ghost">Conferences</Button>
              </Link>

              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          )}
        </div>

        {/* CENTER (SEARCH) */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conferences..."
              className="pl-9"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-4">

          {session?.user ? (
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