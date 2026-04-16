"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Role = "attendee" | "speaker" | "organizer";

export default function ChooseRole() {
  const router = useRouter();

  const [loadingRole, setLoadingRole] = useState<Role | null>(null);

  const selectRole = async (role: Role) => {
    if (loadingRole) return;

    setLoadingRole(role);

    try {
      const res = await fetch("/api/user/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        router.push("/dashboard-attendee");
      }
    } catch (err) {
      console.error("Failed to set role", err);
    } finally {
      setLoadingRole(null);
    }
  };

  const isLoading = (role: Role) => loadingRole === role;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="text-center space-y-10 max-w-5xl w-full">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Choose Your Role</h1>
          <p className="text-gray-500 mt-2">
            Pick how you want to use the platform
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Attendee */}
          <Card
            onClick={() => selectRole("attendee")}
            className={`cursor-pointer transition hover:shadow-lg ${
              isLoading("attendee") ? "opacity-60 scale-[0.98]" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>Attendee</CardTitle>
              <CardDescription>
                Join conferences and explore sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Perfect for participants
              </p>
              {isLoading("attendee") && (
                <p className="text-xs text-blue-500 mt-2">
                  Saving...
                </p>
              )}
            </CardContent>
          </Card>

          {/* Speaker */}
          <Card
            onClick={() => selectRole("speaker")}
            className={`cursor-pointer transition hover:shadow-lg ${
              isLoading("speaker") ? "opacity-60 scale-[0.98]" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>Speaker</CardTitle>
              <CardDescription>
                Share knowledge and present sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                For experts and presenters
              </p>
              {isLoading("speaker") && (
                <p className="text-xs text-blue-500 mt-2">
                  Saving...
                </p>
              )}
            </CardContent>
          </Card>

          {/* Organizer */}
          <Card
            onClick={() => selectRole("organizer")}
            className={`cursor-pointer transition hover:shadow-lg ${
              isLoading("organizer") ? "opacity-60 scale-[0.98]" : ""
            }`}
          >
            <CardHeader>
              <CardTitle>Organizer</CardTitle>
              <CardDescription>
                Create and manage conferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                For event managers
              </p>
              {isLoading("organizer") && (
                <p className="text-xs text-blue-500 mt-2">
                  Saving...
                </p>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}