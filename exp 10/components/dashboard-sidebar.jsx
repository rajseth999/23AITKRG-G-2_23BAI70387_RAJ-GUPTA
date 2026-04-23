"use client"

import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  Upload,
  BarChart3,
  Bell,
  UserCog,
  FolderOpen,
  Award,
  X,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, value: "dashboard", roles: ["student", "teacher", "admin"] },
  { label: "My Courses", icon: BookOpen, value: "courses", roles: ["student"] },
  { label: "Browse Courses", icon: FolderOpen, value: "browse", roles: ["student"] },
  { label: "Certificates", icon: Award, value: "certificates", roles: ["student"] },
  { label: "My Courses", icon: BookOpen, value: "teacher-courses", roles: ["teacher"] },
  { label: "Upload Content", icon: Upload, value: "upload", roles: ["teacher"] },
  { label: "Student Progress", icon: BarChart3, value: "progress", roles: ["teacher"] },
  { label: "All Courses", icon: BookOpen, value: "all-courses", roles: ["admin"] },
  { label: "User Management", icon: UserCog, value: "users", roles: ["admin"] },
  { label: "Analytics", icon: BarChart3, value: "analytics", roles: ["admin"] },
  { label: "Announcements", icon: Bell, value: "announcements", roles: ["admin", "teacher"] },
  { label: "Settings", icon: Settings, value: "settings", roles: ["student", "teacher", "admin"] }
]

export function DashboardSidebar({ activeView, onViewChange }) {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!user) return null

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user.role))

  const roleColors = {
    student: "bg-primary",
    teacher: "bg-accent",
    admin: "bg-chart-3"
  }

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-4 py-6 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-sidebar-foreground">LearnHub</span>
      </div>

      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className={cn("w-10 h-10", roleColors[user.role])}>
            <AvatarFallback className="text-white font-medium bg-transparent">
              {user.avatar || user.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => (
          <button
            key={item.value}
            onClick={() => {
              onViewChange(item.value)
              setMobileOpen(false)
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activeView === item.value
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transform transition-transform lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-sidebar-accent"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border flex-col">
        <SidebarContent />
      </aside>
    </>
  )
}
