 import Link from "next/link";
import { Button } from "@/components/ui/button";
 
 export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-20 h-16 w-full border border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-semibold text-primary"
        >
          ConfiX
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-gray-700 hover:text-black">
              Log In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}