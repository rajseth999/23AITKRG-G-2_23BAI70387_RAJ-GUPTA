"use client"

import { useState } from "react"
import { STUDENT_PROGRESS, COURSES } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  Users,
  BookOpen,
  Award
} from "lucide-react"

export function StudentProgressView() {
  const [search, setSearch] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")

  const filteredProgress = STUDENT_PROGRESS.filter((student) => {
    const matchesSearch = student.studentName.toLowerCase().includes(search.toLowerCase()) ||
      student.studentEmail.toLowerCase().includes(search.toLowerCase())
    const matchesCourse = courseFilter === "all" || student.courseId === courseFilter
    return matchesSearch && matchesCourse
  })

  const stats = [
    {
      label: "Total Students",
      value: new Set(STUDENT_PROGRESS.map(s => s.studentId)).size,
      icon: Users,
      color: "text-primary"
    },
    {
      label: "Active Courses",
      value: new Set(STUDENT_PROGRESS.map(s => s.courseId)).size,
      icon: BookOpen,
      color: "text-accent"
    },
    {
      label: "Avg. Progress",
      value: `${Math.round(STUDENT_PROGRESS.reduce((acc, s) => acc + s.progress, 0) / STUDENT_PROGRESS.length)}%`,
      icon: TrendingUp,
      color: "text-chart-3"
    },
    {
      label: "Completions",
      value: STUDENT_PROGRESS.filter(s => s.progress === 100).length,
      icon: Award,
      color: "text-chart-5"
    }
  ]

  const getProgressColor = (progress) => {
    if (progress >= 80) return "text-accent"
    if (progress >= 50) return "text-chart-3"
    if (progress >= 25) return "text-primary"
    return "text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Student Progress</h1>
          <p className="text-muted-foreground mt-1">Track and analyze student performance</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
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

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full sm:w-60 bg-input border-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {COURSES.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Progress Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Progress Details</CardTitle>
          <CardDescription>Individual student progress across courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Student</TableHead>
                  <TableHead className="text-muted-foreground">Course</TableHead>
                  <TableHead className="text-muted-foreground">Progress</TableHead>
                  <TableHead className="text-muted-foreground">Lessons</TableHead>
                  <TableHead className="text-muted-foreground">Last Active</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProgress.map((student) => (
                  <TableRow key={student.id} className="border-border hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 bg-primary">
                          <AvatarFallback className="text-xs text-primary-foreground bg-transparent">
                            {student.studentName.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{student.studentName}</p>
                          <p className="text-xs text-muted-foreground">{student.studentEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-foreground text-sm">{student.courseName}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress value={student.progress} className="w-20 h-2" />
                        <span className={`text-sm font-medium ${getProgressColor(student.progress)}`}>
                          {student.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {student.completedLessons}/{student.totalLessons}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {new Date(student.lastAccessed).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={student.progress === 100 ? "default" : "secondary"}
                        className={student.progress === 100 ? "bg-accent text-accent-foreground" : ""}
                      >
                        {student.progress === 100
                          ? "Completed"
                          : student.progress > 0
                          ? "In Progress"
                          : "Not Started"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProgress.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-foreground font-medium">No students found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
