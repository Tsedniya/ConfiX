"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronRight,
  Coins,
  FileCheck2,
  FileSearch,
  Files,
  FileText,
  LayoutDashboard,
  Search,
  ShieldAlert,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock User Context (for Role-Based UI demo)
const currentUser = {
  name: "Dr. Admin",
  role: "Finance", // e.g. VPRTT, RAD, Finance
};
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Cards will pop in one after another
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const projects = [
  {
    name: "AI Health Diagnostics",
    status: "Active",
    progress: 75,
    team: 6,
    badgeColor:
      "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium border-blue-200/50 dark:border-blue-800/50",
  },
  {
    name: "Quantum Computing Simulation",
    status: "In Review",
    progress: 40,
    team: 4,
    badgeColor:
      "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-medium border-amber-200/50 dark:border-amber-800/50",
  },
  {
    name: "Neural Interface Robotics",
    status: "Delayed",
    progress: 20,
    team: 5,
    badgeColor:
      "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-medium border-red-200/50 dark:border-red-800/50",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="z-0 flex min-h-screen w-full flex-1 flex-col bg-white p-2 md:p-3 lg:p-4 xl:p-6 dark:bg-slate-950/20">
      {/* ----------------- TOP HEADER ----------------- */}
      <header className="mb-3 flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <div className="flex flex-col gap-0.5">
          <h1 className="flex items-center gap-2 font-extrabold text-lg text-slate-900 tracking-tight dark:text-slate-100">
            <LayoutDashboard className="h-4 w-4 text-blue-600 dark:text-blue-500" />
               Welcome to Confix 
          </h1>

          <p className="font-medium text-sm text-slate-500 leading-tight dark:text-slate-400">
            Welcome back, {currentUser.name}. Here's an overview of the university research ecosystem today.
          </p>
        </div>
      </header>

        {/* ----------------- STAT SUMMARY CARDS ----------------- */}
          <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8 pb-8">
  
            {/* LEFT (bigger) */}
            <div className="flex flex-col gap-3 xl:col-span-2">
                <Card>
                 <CardHeader className="border-b pb-3 dark:border-slate-800">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                        <CardTitle className="font-bold text-md text-slate-900 dark:text-slate-100">
                            complete  your profile
                        </CardTitle>
                        <CardDescription className="text-xs text-slate-500">
                            your bio and professional interest are currently missing. Adding this detail help us suggest relerant sessions and netwoking opportunities tailored just for you.
                        </CardDescription>
                        </div>
                    </div>
                  </CardHeader>
                </Card>
            </div>

            {/* RIGHT (smaller) */}
             <div className="flex flex-col gap-3 xl:col-span-1">
                 <Card className="border-dashed border-2">
        
                    <CardHeader className="items-center text-center">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mb-4 opacity-30">
                        <span className="material-symbols-outlined text-2xl">
                          qr_code_2
                        </span>
                    </div>

                    <CardTitle>My Badge</CardTitle>

                    <CardDescription className="px-4">
                        Your QR code will be generated once registration is confirmed.
                    </CardDescription>
                    </CardHeader>

                    <CardContent>
                    <Button variant="outline" className="w-full">
                        Browse Conferences
                    </Button>
                    </CardContent>

                </Card> 
             </div>

            </div>

      {/* ----------------- STAT SUMMARY CARDS ----------------- */}
      <div className="mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="w-full group">
          <Card className="h-full border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800/60 dark:bg-slate-950">
            <CardContent className="p-2">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5">
                  <div
                    className="
                      flex h-7 w-7 items-center justify-center rounded-md
                      bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400
                      transition-all duration-300
                      group-hover:bg-blue-600 group-hover:text-white
                      group-hover:shadow-[0_0_12px_rgba(59,130,246,0.45)]
                      group-hover:scale-105
                    "
                  >
                    <Briefcase className="h-3 w-3" />
                  </div>

                  <div className="leading-none">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Projects</p>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">142</h2>
                  </div>
                </div>

                <span className="text-[12px] text-emerald-600 dark:text-emerald-400">+12%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="w-full group">
          <Card className="h-full border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800/60 dark:bg-slate-950">
            <CardContent className="p-2">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5">
                  <div
                    className="
                    flex h-7 w-7 items-center justify-center rounded-md
                    bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400
                    transition-all duration-300
                    group-hover:bg-amber-600 group-hover:text-white
                group-hover:shadow-[0_0_12px_rgba(245,158,11,0.45)]
                group-hover:scale-105
              "
                  >
                    <FileCheck2 className="h-3 w-3" />
                  </div>

                  <div className="leading-none">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Pending</p>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">28</h2>
                  </div>
                </div>

                <span className="text-[12px] font-bold text-red-600 dark:text-red-400">Alert</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="w-full group">
          <Card className="relative h-full border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800/60 dark:bg-slate-950">
            <CardContent className="p-2">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5">
                  <div
                    className="
                flex h-7 w-7 items-center justify-center rounded-md
                bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400
                transition-all duration-300
                group-hover:bg-indigo-600 group-hover:text-white
                group-hover:shadow-[0_0_12px_rgba(99,102,241,0.45)]
                group-hover:scale-105
              "
                  >
                    <Coins className="h-3 w-3" />
                  </div>

                  <div className="leading-none">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Budget</p>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">2.4M</h2>
                  </div>
                </div>

                <span className="text-[12px] text-blue-600 dark:text-blue-400">Birr</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants} whileHover={{ y: -5 }} className="w-full group">
          <Card className="h-full border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800/60 dark:bg-slate-950">
            <CardContent className="p-2">
              <div className="flex items-center justify-between gap-1">
                {/* LEFT SIDE */}
                <div className="flex items-center gap-1.5">
                  <div
                    className="
                  flex h-7 w-7 items-center justify-center rounded-md
                  bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400
                  transition-all duration-300
                  group-hover:bg-emerald-600 group-hover:text-white
                  group-hover:shadow-[0_0_12px_rgba(16,185,129,0.45)]
                  group-hover:scale-105
                "
                  >
                    <CheckCircle2 className="h-3 w-3" />
                  </div>

                  <div className="leading-none">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Done</p>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">56</h2>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <span className="text-[12px] text-amber-600 dark:text-amber-400">All</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ----------------- MAIN CONTROL AREA ----------------- */}
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8">

            {/* LEFT: Announcements */}
            <div className="xl:col-span-1">
                <Card className="border-slate-200/60 bg-white shadow-sm dark:border-slate-800/60 dark:bg-slate-950">

                <CardHeader className="border-b pb-3 dark:border-slate-800">
                    <CardTitle className="text-sm font-semibold">Announcements</CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                    Latest updates and notices
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 p-3 text-xs">
                    <div>
                    <p className="font-medium">Registration Open</p>
                    <p className="text-slate-500">Conference registration is now available.</p>
                    </div>

                    <div>
                    <p className="font-medium">Schedule Updated</p>
                    <p className="text-slate-500">New sessions added for keynote speakers.</p>
                    </div>
                </CardContent>

                </Card>
            </div>

            {/* RIGHT: Upcoming Schedule */}
            <div className="xl:col-span-2">
                <Card className="border-slate-200/60 bg-white shadow-sm dark:border-slate-800/60 dark:bg-slate-950">

                <CardHeader className="border-b pb-3 dark:border-slate-800">
                    <CardTitle className="text-md font-bold">
                    Upcoming Schedule
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                    Your next sessions and events
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 p-4">

                    <div className="flex justify-between text-sm">
                    <span className="font-medium">Opening Keynote</span>
                    <span className="text-slate-500">9:00 AM</span>
                    </div>

                    <div className="flex justify-between text-sm">
                    <span className="font-medium">AI in Healthcare</span>
                    <span className="text-slate-500">11:00 AM</span>
                    </div>

                    <div className="flex justify-between text-sm">
                    <span className="font-medium">Networking</span>
                    <span className="text-slate-500">2:00 PM</span>
                    </div>

                </CardContent>

                </Card>
            </div>

            </div>
    </div>
  );
}