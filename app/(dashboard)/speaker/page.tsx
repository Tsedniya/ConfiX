"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Search,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock User Context (for Role-Based UI demo)
const currentUser = {
  name: "Dr. John Doe",
  role: "Speaker",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

// Speaker-specific stats
const speakerStats = [
  {
    title: "Proposals",
    value: 5,
    icon: FileText,
    color: "blue",
    change: "+2",
  },
  {
    title: "Accepted",
    value: 2,
    icon: CheckCircle2,
    color: "emerald",
    change: "40%",
  },
  {
    title: "Sessions",
    value: 3,
    icon: Briefcase,
    color: "purple",
    change: "Upcoming",
  },
  {
    title: "Notifications",
    value: 4,
    icon: Bell,
    color: "amber",
    change: "New",
  },
];

// Speaker proposals data
const proposals = [
  {
    title: "AI in Healthcare",
    conference: "EthioConf 2026",
    status: "Accepted",
  },
  {
    title: "NLP for African Languages",
    conference: "Addis AI Summit",
    status: "Pending",
  },
  {
    title: "LLMs in Education",
    conference: "Education Tech Expo",
    status: "Rejected",
  },
];

// Speaker notifications
const notifications = [
  {
    title: "Proposal Accepted",
    message: "Your proposal 'AI in Healthcare' has been accepted.",
    time: "5m ago",
  },
  {
    title: "Session Updated",
    message: "Your talk schedule has been changed.",
    time: "1h ago",
  },
  {
    title: "Slides Requested",
    message: "Organizer requested presentation materials.",
    time: "Yesterday",
  },
];

export default function SpeakerDashboardPage() {
  return (
    <div className="z-0 flex min-h-screen w-full flex-1 flex-col bg-white p-2 md:p-3 lg:p-4 xl:p-6 dark:bg-slate-950/20">
      {/* ----------------- TOP HEADER ----------------- */}
      <header className="mb-3 flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <div className="flex flex-col gap-0.5">
          <h1 className="flex items-center gap-2 font-extrabold text-lg text-slate-900 tracking-tight dark:text-slate-100">
            <LayoutDashboard className="h-4 w-4 text-blue-600 dark:text-blue-500" />
            Speaker Dashboard
          </h1>

          <p className="font-medium text-sm text-slate-500 leading-tight dark:text-slate-400">
            Welcome back, {currentUser.name}. Manage your talks, proposals and conference sessions.
          </p>
        </div>
      </header>

      {/* ----------------- STAT SUMMARY CARDS ----------------- */}
      <div className="mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
        {speakerStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="w-full group"
          >
            <Card className="h-full border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800/60 dark:bg-slate-950">
              <CardContent className="p-2">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`
                        flex h-7 w-7 items-center justify-center rounded-md
                        bg-${stat.color}-50 text-${stat.color}-600 
                        dark:bg-${stat.color}-900/20 dark:text-${stat.color}-400
                        transition-all duration-300
                        group-hover:bg-${stat.color}-600 group-hover:text-white
                        group-hover:shadow-[0_0_12px_rgba(59,130,246,0.45)]
                        group-hover:scale-105
                      `}
                    >
                      <stat.icon className="h-3 w-3" />
                    </div>

                    <div className="leading-none">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                        {stat.title}
                      </p>
                      <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {stat.value}
                      </h2>
                    </div>
                  </div>

                  <span className="text-[12px] text-emerald-600 dark:text-emerald-400">
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ----------------- MAIN CONTROL AREA ----------------- */}
      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8">
        {/* ================= LEFT: NOTIFICATION CENTER ================= */}
        <div className="flex flex-col gap-3 xl:col-span-1">
          <Card className="border-amber-200/40 bg-white shadow-sm dark:border-amber-900/30 dark:bg-slate-950/50">
            <CardHeader className="border-b border-amber-100 px-3 py-2 dark:border-amber-900/20">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <Bell className="h-4 w-4 text-amber-500" />
                  Notifications
                </CardTitle>

                <Badge className="bg-amber-100 px-2 py-0 text-[10px] text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  3
                </Badge>
              </div>

              <CardDescription className="text-[10px] text-slate-500 leading-tight">
                Recent updates and requests
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-2 p-2">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 rounded-md border border-slate-100 bg-white p-2 dark:border-slate-800 dark:bg-slate-900"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-amber-100 text-[10px] text-amber-700">
                      {notification.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-1 flex-col leading-tight">
                    <div className="flex justify-between">
                      <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                        {notification.title}
                      </p>
                      <span className="text-[9px] text-slate-400">{notification.time}</span>
                    </div>

                    <p className="text-[10px] text-slate-500">{notification.message}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ================= RIGHT: PROPOSALS TABLE ================= */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          <Card className="border-slate-200/60 bg-white shadow-sm dark:border-slate-800/60 dark:bg-slate-950">
            <CardHeader className="border-b pb-3 dark:border-slate-800">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="font-bold text-md text-slate-900 dark:text-slate-100">
                    My Proposals
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Track and manage your conference proposals
                  </CardDescription>
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search proposals..."
                    className="h-9 pl-8 rounded-full"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                  <TableRow>
                    <TableHead className="text-xs">Proposal</TableHead>
                    <TableHead className="text-xs">Conference</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-right text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {proposals.map((proposal) => (
                    <TableRow
                      key={proposal.title}
                      className="hover:bg-slate-50 dark:hover:bg-slate-900"
                    >
                      <TableCell className="font-medium text-sm">
                        {proposal.title}
                      </TableCell>

                      <TableCell className="text-sm text-slate-500">
                        {proposal.conference}
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`text-[10px] px-2 py-0 ${
                            proposal.status === "Accepted"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : proposal.status === "Pending"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                          }`}
                        >
                          {proposal.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="h-7 text-xs">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* ================= UPCOMING SESSIONS ================= */}
          <Card className="border-slate-200/60 bg-white shadow-sm dark:border-slate-800/60 dark:bg-slate-950">
            <CardHeader className="border-b pb-3 dark:border-slate-800">
              <CardTitle className="font-bold text-md text-slate-900 dark:text-slate-100">
                Upcoming Sessions
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Your scheduled talks and presentations
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 p-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">AI in Healthcare</h3>
                <p className="text-sm text-muted-foreground">EthioConf 2026</p>
                <p className="text-sm">Aug 15 • 10:00 AM</p>
                <p className="text-sm">Room A</p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">NLP for African Languages</h3>
                <p className="text-sm text-muted-foreground">Addis AI Summit</p>
                <p className="text-sm">Sep 10 • 2:00 PM</p>
                <p className="text-sm">Hall B</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}