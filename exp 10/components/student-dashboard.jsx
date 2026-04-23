"use client"

import { COURSES, LESSONS, ANNOUNCEMENTS } from "@/lib/data"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  Clock,
  Play,
  Trophy,
  TrendingUp,
  Calendar,
  ChevronRight,
  CheckCircle2
} from "lucide-react"

export function StudentDashboard({ onNavigate }) {
  const { user } = useAuth()
  const enrolledCourses = COURSES.filter((c) => c.progress !== undefined && c.progress > 0)
  const completedCourses = enrolledCourses.filter((c) => c.progress === 100)
  const inProgressCourses = enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100)

  const totalProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)
    : 0

  const stats = [
    { label: "Enrolled Courses", value: enrolledCourses.length, icon: BookOpen, color: "text-primary" },
    { label: "Completed", value: completedCourses.length, icon: Trophy, color: "text-accent" },
    { label: "In Progress", value: inProgressCourses.length, icon: TrendingUp, color: "text-chart-3" },
    { label: "Avg. Progress", value: `${totalProgress}%`, icon: CheckCircle2, color: "text-chart-5" }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome back, {user?.name.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey today
          </p>
        </div>
        <Button onClick={() => onNavigate("browse")} className="w-fit">
          <BookOpen className="w-4 h-4 mr-2" />
          Browse Courses
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
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("courses")}>
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inProgressCourses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                    onClick={() => onNavigate(`course-${course.id}`)}
                  >
                    <div className="w-full sm:w-20 h-14 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{course.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-primary font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                ))}
                {inProgressCourses.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No courses in progress</p>
                    <Button variant="link" onClick={() => onNavigate("browse")}>
                      Start learning today
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements */}
        <Card className="bg-card border-border h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-4">
                {ANNOUNCEMENTS.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
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
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Lessons</CardTitle>
          <CardDescription>Your recently accessed content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LESSONS.slice(0, 4).map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  {lesson.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  ) : (
                    <Play className="w-4 h-4 text-primary" />
                  )}
                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                </div>
                <h4 className="font-medium text-sm text-foreground line-clamp-2">{lesson.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{lesson.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
