"use client";

import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data (replace with real API)
const upcomingConferences = [
  { id: 1, title: "AI Summit 2026", date: "2026-06-20" },
  { id: 2, title: "Dev Conference", date: "2026-07-05" },
];

const stats = {
  conferences: 5,
  attendees: 1240,
  speakers: 48,
  revenue: 32000,
};

const recentRegistrations = [
  { name: "Abel Tesfaye", conference: "AI Summit", date: "2026-05-08" },
  { name: "Sara Mikel", conference: "Dev Conference", date: "2026-05-07" },
];

const pendingActions = [
  { type: "Speaker Proposal", title: "Future of AI" },
  { type: "Session", title: "React Performance" },
];

const popularConference = {
  title: "AI Summit 2026",
  attendees: 540,
  rating: 4.8,
};

const attendanceData = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 70 },
  { name: "Thu", value: 65 },
  { name: "Fri", value: 90 },
];

export default function OrganizerDashboard() {
  const { theme, setTheme } = useTheme();

  const countdowns = useMemo(() => {
    return upcomingConferences.map((c) => ({
      ...c,
      countdown: formatDistanceToNow(new Date(c.date), { addSuffix: true }),
    }));
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle>Conferences</CardTitle></CardHeader>
          <CardContent>{stats.conferences}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Attendees</CardTitle></CardHeader>
          <CardContent>{stats.attendees}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Speakers</CardTitle></CardHeader>
          <CardContent>{stats.speakers}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
          <CardContent>${stats.revenue}</CardContent>
        </Card>
      </div>

      {/* Upcoming Conferences */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Upcoming Conferences</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {countdowns.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Starts {c.countdown}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Conference</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRegistrations.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.conference}</TableCell>
                    <TableCell>{r.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingActions.map((a, i) => (
              <div key={i} className="flex justify-between">
                <span>{a.title}</span>
                <Badge>{a.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Popular Conference */}
      <Card>
        <CardHeader>
          <CardTitle>Most Popular Conference</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{popularConference.title}</p>
          <p>{popularConference.attendees} attendees</p>
          <p>Rating: {popularConference.rating}</p>
        </CardContent>
      </Card>

      {/* Attendance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Rate</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
