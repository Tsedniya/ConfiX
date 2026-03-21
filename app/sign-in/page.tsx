
"use client";

import { CardFooter, CardContent, CardHeader, Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {useState} from "react"
import { useRouter } from "next/navigation";

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] =useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 bg-white">
      <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">Sign In</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form  className="space-y-4">
            {error && 
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
            </div>
            }
          <CardContent className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}placeholder="JULIBEN@gmail.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700" >Password</Label>
              <Input id="password" type="password" onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="JULI BEN" required minLength={8}/>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90"
              disabled={loading} >
                {loading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "} 
              <Link href="/sign-up"  className="font-medium text-primary hover:underline">
                  Sign Up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}