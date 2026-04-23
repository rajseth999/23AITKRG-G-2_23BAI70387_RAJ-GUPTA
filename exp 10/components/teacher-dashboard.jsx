"use client"

import { COURSES, STUDENT_PROGRESS } from "@/lib/data"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BookOpen,
  Users,
  TrendingUp,
  Upload,
  BarChart3,
  ChevronRight,
  GraduationCap
} from "lucide-react"

export function TeacherDashboard({ onNavigate }) {
  const { user } = useAuth()
  const teacherCourses = COURSES.filter((c) => c.instructorId === user?.id)
  const totalStudents = teacherCourses.reduce((acc, c) => acc + c.enrolled, 0)
  const avgProgress = STUDENT_PROGRESS.length > 0
    ? Math.round(STUDENT_PROGRESS.reduce((acc, s) => acc + s.progress, 0) / STUDENT_PROGRESS.length)
    : 0

  const stats = [
    { label: "My Courses", value: teacherCourses.length, icon: BookOpen, color: "text-primary" },
    { label: "Total Students", value: totalStudents.toLocaleString(), icon: Users, color: "text-accent" },
    { label: "Avg. Progress", value: `${avgProgress}%`, icon: TrendingUp, color: "text-chart-3" },
    { label: "Total Lessons", value: teacherCourses.reduce((acc, c) => acc + c.lessons, 0), icon: GraduationCap, color: "text-chart-5" }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your courses and track student progress
          </p>
        </div>
        <Button onClick={() => onNavigate("upload")}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Content
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Courses you are teaching</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("teacher-courses")}>
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherCourses.slice(0, 3).map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  onClick={() => onNavigate(`course-${course.id}`)}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{course.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.enrolled} students
                      </span>
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
              ))}
              {teacherCourses.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No courses yet</p>
                  <Button variant="link" onClick={() => onNavigate("upload")}>
                    Create your first course
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Student Activity */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student Progress</CardTitle>
              <CardDescription>Recent activity from your students</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("progress")}>
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {STUDENT_PROGRESS.slice(0, 4).map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <Avatar className="w-10 h-10 bg-primary">
                    <AvatarFallback className="text-primary-foreground bg-transparent">
                      {student.studentName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      {student.studentName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {student.courseName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{student.progress}%</p>
                    <p className="text-xs text-muted-foreground">
                      {student.completedLessons}/{student.totalLessons}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card
          className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => onNavigate("upload")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Upload Content</h3>
              <p className="text-sm text-muted-foreground">Add new course materials</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer"
          onClick={() => onNavigate("progress")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-accent/20">
              <BarChart3 className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">View Analytics</h3>
              <p className="text-sm text-muted-foreground">Track student progress</p>
            </div>
          </CardContent>
        </Card>
        <Card
          className="bg-card border-border hover:border-chart-3/50 transition-colors cursor-pointer"
          onClick={() => onNavigate("announcements")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-chart-3/20">
              <TrendingUp className="w-6 h-6 text-chart-3" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Announcements</h3>
              <p className="text-sm text-muted-foreground">Post updates for students</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
