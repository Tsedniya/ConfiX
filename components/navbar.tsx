 import { Button } from "./ui/button";
 import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";



 export default function Navbar(){
   
    return(
        <nav className="fixed h-15 w-full border border-gray-200 bg-white ">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
                
            <Link
                href="/"
                className="flex items-center gap-2 text-2xl font-semibold text-primary"
                >
                ConfiX
            </Link>

                <div className="flex items-center gap-4">
                    <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
                    <Button className="bg-primary hover:bg-primary/90">Log In</Button>
                </div>
            </div>
        </nav>

 );
}