"use client"

import { COURSES, ALL_USERS, ANNOUNCEMENTS } from "@/lib/data"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  Settings,
  ChevronRight,
  Bell,
  UserCog,
  BarChart3,
  Shield
} from "lucide-react"

export function AdminDashboard({ onNavigate }) {
  const { user } = useAuth()
  const students = ALL_USERS.filter((u) => u.role === "student")
  const teachers = ALL_USERS.filter((u) => u.role === "teacher")
  const activeUsers = ALL_USERS.filter((u) => u.status === "active")

  const stats = [
    { label: "Total Courses", value: COURSES.length, icon: BookOpen, color: "text-primary" },
    { label: "Total Students", value: students.length, icon: GraduationCap, color: "text-accent" },
    { label: "Total Teachers", value: teachers.length, icon: Users, color: "text-chart-3" },
    { label: "Active Users", value: activeUsers.length, icon: TrendingUp, color: "text-chart-5" }
  ]

  const recentUsers = ALL_USERS.slice(0, 5)

  const roleColors = {
    student: "bg-primary/20 text-primary",
    teacher: "bg-accent/20 text-accent",
    admin: "bg-chart-3/20 text-chart-3"
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm text-primary font-medium">Admin Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage users, courses, and platform settings
          </p>
        </div>
        <Button onClick={() => onNavigate("settings")}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          <Card
            className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => onNavigate("users")}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <UserCog className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">User Management</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage students, teachers, and admins
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2 text-primary">
                    Manage Users <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer"
            onClick={() => onNavigate("all-courses")}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/20">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Course Management</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Review and manage all courses
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2 text-accent">
                    View Courses <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-card border-border hover:border-chart-3/50 transition-colors cursor-pointer"
            onClick={() => onNavigate("analytics")}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-chart-3/20">
                  <BarChart3 className="w-6 h-6 text-chart-3" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Analytics</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    View platform metrics and reports
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2 text-chart-3">
                    View Analytics <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-card border-border hover:border-chart-5/50 transition-colors cursor-pointer"
            onClick={() => onNavigate("announcements")}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-chart-5/20">
                  <Bell className="w-6 h-6 text-chart-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Announcements</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Post updates and notifications
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-2 text-chart-5">
                    Manage <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registered users</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("users")}>
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 bg-primary">
                    <AvatarFallback className="text-primary-foreground bg-transparent">
                      {u.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{u.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <Badge className={roleColors[u.role]}>
                    {u.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Announcements */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Latest platform updates</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate("announcements")}>
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {ANNOUNCEMENTS.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-sm text-foreground line-clamp-1">
                    {announcement.title}
                  </h4>
                  <Badge
                    variant={
                      announcement.priority === "high"
                        ? "destructive"
                        : announcement.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                    className="shrink-0 text-xs"
                  >
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {announcement.content}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
