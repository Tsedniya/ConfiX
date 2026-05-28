"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { motion } from "framer-motion";

import {
  Briefcase,
  CheckCircle2,
  Coins,
  FileCheck2,
  LayoutDashboard,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const currentUser = {
  name: "Dr. Admin",
  role: "Admin",
};

const fetchApplications = async () => {
  const res = await fetch(
    "/api/admin/organizer-applications"
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch applications"
    );
  }

  return res.json();
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function AdminDashboardPage() {

  const queryClient = useQueryClient();

  // ---------------- FETCH APPLICATIONS ----------------
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["organizer-applications"],
    queryFn: fetchApplications,
  });

  // ---------------- UPDATE STATUS ----------------
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "approved" | "rejected";
    }) => {

      const res = await fetch(
        `/api/admin/organizer-applications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to update application"
        );
      }

      return res.json();
    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["organizer-applications"],
      });

    },
  });

  return (
    <div className="z-0 flex min-h-screen w-full flex-1 flex-col bg-white p-2 md:p-3 lg:p-4 xl:p-6 dark:bg-slate-950/20">

      {/* ---------------- HEADER ---------------- */}
      <header className="mb-6 flex w-full flex-col items-start justify-between gap-2 md:flex-row md:items-center">

        <div className="flex flex-col gap-1">

          <h1 className="flex items-center gap-2 font-extrabold text-lg text-slate-900 tracking-tight dark:text-slate-100">
            <LayoutDashboard className="h-4 w-4 text-blue-600 dark:text-blue-500" />
            Welcome to Confix
          </h1>

          <p className="font-medium text-sm text-slate-500 leading-tight dark:text-slate-400">
            Welcome back, {currentUser.name}.
          </p>

        </div>

      </header>

      {/* ---------------- STATS ---------------- */}
      <div className="mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">

        {/* Projects */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="w-full group"
        >

          <Card className="h-full border-slate-200/60 bg-white shadow-sm hover:shadow-md dark:border-slate-800/60 dark:bg-slate-950">

            <CardContent className="p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                    <Briefcase className="h-4 w-4" />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Projects
                    </p>

                    <h2 className="text-lg font-semibold">
                      142
                    </h2>

                  </div>

                </div>

                <span className="text-sm text-emerald-600">
                  +12%
                </span>

              </div>

            </CardContent>

          </Card>

        </motion.div>

        {/* Pending */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="w-full group"
        >

          <Card className="h-full border-slate-200/60 bg-white shadow-sm hover:shadow-md dark:border-slate-800/60 dark:bg-slate-950">

            <CardContent className="p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                    <FileCheck2 className="h-4 w-4" />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Pending
                    </p>

                    <h2 className="text-lg font-semibold">
                      {data?.applications?.filter(
                        (app: any) =>
                          app.status === "pending"
                      ).length || 0}
                    </h2>

                  </div>

                </div>

                <span className="text-sm text-red-500">
                  Alert
                </span>

              </div>

            </CardContent>

          </Card>

        </motion.div>

        {/* Budget */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="w-full group"
        >

          <Card className="h-full border-slate-200/60 bg-white shadow-sm hover:shadow-md dark:border-slate-800/60 dark:bg-slate-950">

            <CardContent className="p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
                    <Coins className="h-4 w-4" />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Budget
                    </p>

                    <h2 className="text-lg font-semibold">
                      2.4M
                    </h2>

                  </div>

                </div>

                <span className="text-sm text-blue-600">
                  Birr
                </span>

              </div>

            </CardContent>

          </Card>

        </motion.div>

        {/* Done */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="w-full group"
        >

          <Card className="h-full border-slate-200/60 bg-white shadow-sm hover:shadow-md dark:border-slate-800/60 dark:bg-slate-950">

            <CardContent className="p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Approved
                    </p>

                    <h2 className="text-lg font-semibold">
                      {data?.applications?.filter(
                        (app: any) =>
                          app.status === "approved"
                      ).length || 0}
                    </h2>

                  </div>

                </div>

                <span className="text-sm text-emerald-600">
                  Active
                </span>

              </div>

            </CardContent>

          </Card>

        </motion.div>

      </div>

      {/* ---------------- ORGANIZER APPLICATIONS ---------------- */}
      <div className="grid w-full grid-cols-1 gap-6">

        <Card className="border-slate-200/60 bg-white shadow-sm dark:border-slate-800/60 dark:bg-slate-950">

          <CardHeader className="border-b pb-3 dark:border-slate-800">

            <div className="flex items-center justify-between">

              <div>

                <CardTitle className="text-md font-bold">
                  Organizer Applications
                </CardTitle>

                <CardDescription className="text-xs text-slate-500">
                  Review and manage organizer access requests
                </CardDescription>

              </div>

            </div>

          </CardHeader>

          <CardContent className="p-0">

            {isLoading ? (

              <div className="p-6 text-sm text-slate-500">
                Loading applications...
              </div>

            ) : error ? (

              <div className="p-6 text-sm text-red-500">
                Failed to load applications
              </div>

            ) : data?.applications?.length === 0 ? (

              <div className="p-6 text-sm text-slate-500">
                No organizer applications found
              </div>

            ) : (

              <Table>

                <TableHeader>

                  <TableRow>

                    <TableHead>
                      Applicant
                    </TableHead>

                    <TableHead>
                      Organization
                    </TableHead>

                    <TableHead>
                      Status
                    </TableHead>

                    <TableHead className="text-right">
                      Actions
                    </TableHead>

                  </TableRow>

                </TableHeader>

                <TableBody>

                  {data?.applications?.map((app: any) => (

                    <TableRow key={app._id}>

                      {/* Applicant */}
                      <TableCell>

                        <div className="flex flex-col">

                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {app.userId?.name}
                          </span>

                          <span className="text-xs text-slate-500">
                            {app.userId?.email}
                          </span>

                        </div>

                      </TableCell>

                      {/* Organization */}
                      <TableCell>

                        <div className="flex flex-col">

                          <span className="font-medium">
                            {app.organizationName}
                          </span>

                          <span className="text-xs text-slate-500">
                            {app.position}
                          </span>

                        </div>

                      </TableCell>

                      {/* Status */}
                      <TableCell>

                        <Badge
                          variant={
                            app.status === "approved"
                              ? "default"
                              : app.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {app.status}
                        </Badge>

                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">

                        <div className="flex justify-end gap-2">

                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                            disabled={
                              updateStatusMutation.isPending ||
                              app.status === "approved"
                            }
                            onClick={() =>
                              updateStatusMutation.mutate({
                                id: app._id,
                                status: "approved",
                              })
                            }
                          >
                            Approve
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={
                              updateStatusMutation.isPending ||
                              app.status === "rejected"
                            }
                            onClick={() =>
                              updateStatusMutation.mutate({
                                id: app._id,
                                status: "rejected",
                              })
                            }
                          >
                            Reject
                          </Button>

                        </div>

                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            )}

          </CardContent>

        </Card>

      </div>

    </div>
  );
}