"use client"

import * as React from "react"

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Mic2,
  FileText,
  BarChart3,
  Ticket,
  QrCode,
  Bell,
  Settings,
  HelpCircle,
  User,
  PlusCircle,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"


const sidebarItems = {
  common: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Conferences",
      url: "/conferences",
      icon: CalendarDays,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
  ],


  admin: [
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "System Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ],


  organizer: [
    {
      title: "My Conferences",
      url: "/organizer/conferences",
      icon: CalendarDays,
    },
    {
      title: "Create Conference",
      url: "/organizer/create",
      icon: PlusCircle,
    },
    {
      title: "Speakers",
      url: "/organizer/speakers",
      icon: Mic2,
    },
    {
      title: "Sessions",
      url: "/organizer/sessions",
      icon: FileText,
    },
    {
      title: "Attendees",
      url: "/organizer/attendees",
      icon: Users,
    },
    {
      title: "Analytics",
      url: "/organizer/analytics",
      icon: BarChart3,
    },
  ],


  speaker: [
    {
      title: "My Profile",
      url: "/speaker/profile",
      icon: User,
    },
    {
      title: "My Proposals",
      url: "/speaker/proposals",
      icon: FileText,
    },
    {
      title: "My Sessions",
      url: "/speaker/sessions",
      icon: Mic2,
    },
    {
      title: "Schedule",
      url: "/speaker/schedule",
      icon: CalendarDays,
    },
    {
      title: "Feedback",
      url: "/speaker/feedback",
      icon: BarChart3,
    },
  ],


  attendee: [
    {
      title: "Browse Conferences",
      url: "/attendee/conferences",
      icon: CalendarDays,
    },
    {
      title: "My Registrations",
      url: "/attendee/registrations",
      icon: Ticket,
    },
    {
      title: "My QR Ticket",
      url: "/attendee/ticket",
      icon: QrCode,
    },
    {
      title: "Feedback",
      url: "/attendee/feedback",
      icon: FileText,
    },
  ],
}


export function AppSidebar({
  role = "attendee",
  ...props
}: {
  role?: "admin" | "organizer" | "speaker" | "attendee"
} & React.ComponentProps<typeof Sidebar>) {


  const menuItems = [
    ...sidebarItems.common,
    ...sidebarItems[role],
  ]


  return (
    <Sidebar collapsible="offcanvas" {...props}>

      <SidebarHeader>
        <div className="font-bold text-xl">
          ConfiX
        </div>
      </SidebarHeader>


      <SidebarContent>

        <NavMain items={menuItems}/>

      </SidebarContent>


      <SidebarFooter>

        <NavUser/>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HelpCircle size={16}/>
          Help Center
        </div>

      </SidebarFooter>

    </Sidebar>
  )
}