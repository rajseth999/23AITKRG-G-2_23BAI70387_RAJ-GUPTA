"use client"

import { COURSES, ALL_USERS, STUDENT_PROGRESS } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import {
  TrendingUp,
  Users,
  BookOpen,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

export function AnalyticsView() {
  const enrollmentData = COURSES.map((course) => ({
    name: course.title.split(" ").slice(0, 2).join(" "),
    enrolled: course.enrolled,
    lessons: course.lessons
  }))

  const roleDistribution = [
    { name: "Students", value: ALL_USERS.filter(u => u.role === "student").length, color: "var(--color-primary)" },
    { name: "Teachers", value: ALL_USERS.filter(u => u.role === "teacher").length, color: "var(--color-accent)" },
    { name: "Admins", value: ALL_USERS.filter(u => u.role === "admin").length, color: "var(--color-chart-3)" }
  ]

  const progressData = [
    { month: "Jan", completions: 45, enrollments: 120 },
    { month: "Feb", completions: 52, enrollments: 135 },
    { month: "Mar", completions: 61, enrollments: 142 },
    { month: "Apr", completions: 67, enrollments: 158 },
    { month: "May", completions: 78, enrollments: 175 },
    { month: "Jun", completions: 89, enrollments: 190 }
  ]

  const stats = [
    {
      label: "Total Enrollments",
      value: COURSES.reduce((acc, c) => acc + c.enrolled, 0).toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: Users
    },
    {
      label: "Course Completions",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Award
    },
    {
      label: "Active Courses",
      value: COURSES.length,
      change: "+2",
      trend: "up",
      icon: BookOpen
    },
    {
      label: "Avg. Progress",
      value: `${Math.round(STUDENT_PROGRESS.reduce((acc, s) => acc + s.progress, 0) / STUDENT_PROGRESS.length)}%`,
      change: "-2.1%",
      trend: "down",
      icon: TrendingUp
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Platform performance and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-1 text-sm ${
                    stat.trend === "up" ? "text-accent" : "text-destructive"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-secondary">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
            <CardDescription>Monthly enrollments and completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="enrollments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="completions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="enrollments"
                    stroke="var(--color-primary)"
                    fill="url(#enrollments)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="completions"
                    stroke="var(--color-accent)"
                    fill="url(#completions)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Enrollments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-sm text-muted-foreground">Completions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              {roleDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Enrollments */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Course Enrollments</CardTitle>
          <CardDescription>Students enrolled per course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData} layout="vertical">
                <XAxis 
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                />
                <YAxis 
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="enrolled" 
                  fill="var(--color-primary)" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Courses */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Top Performing Courses</CardTitle>
          <CardDescription>Courses with highest enrollment and completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {COURSES.sort((a, b) => b.enrolled - a.enrolled).slice(0, 5).map((course, index) => (
              <div key={course.id} className="flex items-center gap-4">
                <span className="text-2xl font-bold text-muted-foreground w-8">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{course.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {course.instructor} - {course.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{course.enrolled.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">enrolled</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
