"use client"

import { useState } from "react"
import { COURSES } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BookOpen,
  Clock,
  Users,
  Search,
  Filter,
  Play,
  CheckCircle2,
  GraduationCap
} from "lucide-react"

export function CourseBrowser({ onNavigate, showProgress = true }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [level, setLevel] = useState("all")

  const categories = ["all", ...new Set(COURSES.map((c) => c.category))]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "all" || course.category === category
    const matchesLevel = level === "all" || course.level === level
    return matchesSearch && matchesCategory && matchesLevel
  })

  const levelColors = {
    Beginner: "bg-accent/20 text-accent",
    Intermediate: "bg-chart-3/20 text-chart-3",
    Advanced: "bg-destructive/20 text-destructive"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {showProgress ? "My Courses" : "Browse Courses"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {showProgress
            ? "Continue learning from your enrolled courses"
            : "Discover new skills and knowledge"}
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
            <div className="flex gap-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40 bg-input border-border">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-36 bg-input border-border">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l === "all" ? "All Levels" : l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group overflow-hidden"
            onClick={() => onNavigate(`course-${course.id}`)}
          >
            <div className="h-36 bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center relative">
              <GraduationCap className="w-16 h-16 text-primary/50" />
              {course.progress === 100 && (
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={levelColors[course.level]}>{course.level}</Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.lessons} lessons
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {course.enrolled.toLocaleString()} enrolled
              </div>

              {showProgress && course.progress !== undefined && course.progress > 0 && (
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-primary font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">{course.instructor}</span>
                <Button size="sm" variant={course.progress ? "default" : "outline"}>
                  {course.progress ? (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      Continue
                    </>
                  ) : (
                    "Enroll"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground">No courses found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
