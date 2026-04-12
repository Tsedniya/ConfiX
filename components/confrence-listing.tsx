import {
  CardFooter,
  CardContent,
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";


 
 export default function ConferenceListing() {

  return (
    <div className="grid grid-cols-3 gap-8 min-h-screen items-center justify-center bg-white lg:px-16">
        <Card className="space-y-4">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-black">
                    Conference Listing
                </CardTitle>
                <CardDescription className="text-gray-600">
                    <p>Berlin, Gremany</p>
                    <p className="text-gray-700">No conferences available at the moment.</p>
                </CardDescription>
            </CardHeader>
              <CardContent className="space-y-6">

                <div className="flex justify-between">

                    {/* Left column */}
                    <div className="flex flex-col items-start gap-2">
                        <p className="text-sm text-gray-600">
                            Jan 14, 2025
                        </p>

                        <Button className="w-full">
                            Register
                        </Button>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col items-start gap-2">
                        <p className="text-sm text-gray-600">
                            3000 attendees
                        </p>

                        <Button variant="outline" className="w-full">
                            View Details
                        </Button>
                    </div>

                </div>

            </CardContent>
        </Card>

       
    </div>
  )



 }