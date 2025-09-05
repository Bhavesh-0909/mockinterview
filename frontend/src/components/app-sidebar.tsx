"use client"

import * as React from "react"
import {
  Bot,
  Command,
  User,
  Home,
  LifeBuoy,
  MessagesSquare,
} from "lucide-react"
import { NavMain } from "@/components/sidebar-nav-main"
import { NavUser } from "@/components/sidebar-nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
const data = {
  userdetails: {
    name: "User Name",
    email: "user@example.com",
    avatar: "/avatars/default.jpg",
    logout: () => {},
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: User,
    },
    {
      title: "History",
      url: "/history",
      icon: Command,
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "AI Interviews",
      url: "/ai-interviews",
      icon: MessagesSquare,
      badge: "10",
    },
    {
      title: "Credits",
      url: "/credits",
      icon: LifeBuoy,
      badge: "10",
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();
  if (!user) return null;
  data.userdetails = {
    name: user.fullname || "User",
    email: user.email || "user@example.com",
    avatar: user.avatarlink || "/avatars/default.jpg",
    logout: logout,
  };
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Bot className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">MockInterview</span>
                  <span className="truncate text-xs">AI - Interviewer</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userdetails={data.userdetails} />
      </SidebarFooter>
    </Sidebar>
  )
}
