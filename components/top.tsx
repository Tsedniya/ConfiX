"use client";


import Title from "./title";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Top() {
    const [isActive, setIsActive] = useState("All");

    return (
        <div className="mt-28 lg:px-16">

            <Title 
                title="Welcome to ConfiX"
                subtitle=""
            />

            <div className="flex justify-between items-center mt-1">

                <p className="text-gray-600">
                    Your ultimate conference management solution
                </p>

                <div className="flex gap-4">
                    <Button
                        onClick={() => setIsActive("All")}
                        variant={isActive === "All" ? "default" : "outline"}
                    >
                        All
                    </Button>

                    <Button
                        onClick={() => setIsActive("Upcoming")}
                        variant={isActive === "Upcoming" ? "default" : "outline"}
                    >
                        Upcoming
                    </Button>

                    <Button
                        onClick={() => setIsActive("Registered")}
                        variant={isActive === "Registered" ? "default" : "outline"}
                    >
                        Registered
                    </Button>
                </div>
            </div>

        </div>
    );
}