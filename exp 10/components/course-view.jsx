"use client"

import { useState } from "react"
import { COURSES, LESSONS } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  CheckCircle2,
  ChevronRight
} from "lucide-react"
import ReactMarkdown from "react-markdown"

export function CourseView({ courseId, onBack }) {
  const course = COURSES.find((c) => c.id === courseId)
  const courseLessons = LESSONS.filter((l) => l.courseId === courseId)
  const [selectedLesson, setSelectedLesson] = useState(
    courseLessons.length > 0 ? courseLessons[0] : null
  )

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Course not found</h2>
        <Button variant="link" onClick={onBack}>
          Go back
        </Button>
      </div>
    )
  }

  const completedLessons = courseLessons.filter((l) => l.completed).length
  const progress = courseLessons.length > 0
    ? Math.round((completedLessons / courseLessons.length) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
          <p className="text-muted-foreground">{course.instructor}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Course Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedLesson ? (
            <Card className="bg-card border-border">
              <CardHeader className="border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Lesson {selectedLesson.order}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {selectedLesson.duration}
                      </span>
                    </div>
                    <CardTitle>{selectedLesson.title}</CardTitle>
                    <CardDescription>{selectedLesson.description}</CardDescription>
                  </div>
                  {selectedLesson.completed && (
                    <Badge className="bg-accent text-accent-foreground">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="text-2xl font-bold text-foreground mb-4">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-semibold text-foreground mt-6 mb-3">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-medium text-foreground mt-4 mb-2">{children}</h3>,
                      p: ({ children }) => <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                      code: ({ className, children }) => {
                        const isBlock = className?.includes("language-")
                        if (isBlock) {
                          return (
                            <pre className="bg-secondary rounded-lg p-4 overflow-x-auto mb-4">
                              <code className="text-sm text-foreground font-mono">{children}</code>
                            </pre>
                          )
                        }
                        return <code className="bg-secondary px-1.5 py-0.5 rounded text-sm text-primary font-mono">{children}</code>
                      },
                      pre: ({ children }) => <>{children}</>
                    }}
                  >
                    {selectedLesson.content}
                  </ReactMarkdown>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    disabled={selectedLesson.order === 1}
                    onClick={() => {
                      const prev = courseLessons.find((l) => l.order === selectedLesson.order - 1)
                      if (prev) setSelectedLesson(prev)
                    }}
                  >
                    Previous Lesson
                  </Button>
                  <Button
                    disabled={selectedLesson.order === courseLessons.length}
                    onClick={() => {
                      const next = courseLessons.find((l) => l.order === selectedLesson.order + 1)
                      if (next) setSelectedLesson(next)
                    }}
                  >
                    Next Lesson
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No lessons available</h3>
                <p className="text-muted-foreground">Content is being prepared</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    {completedLessons} of {courseLessons.length} lessons
                  </span>
                  <span className="text-primary font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-secondary">
                  <Clock className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">{course.duration}</p>
                </div>
                <div className="p-2 rounded-lg bg-secondary">
                  <BookOpen className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">{course.lessons} lessons</p>
                </div>
                <div className="p-2 rounded-lg bg-secondary">
                  <Users className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground">{course.enrolled}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lessons List */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Course Content</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-1 p-4">
                  {courseLessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                        selectedLesson?.id === lesson.id
                          ? "bg-primary/20 border border-primary/50"
                          : "hover:bg-secondary"
                      }`}
                    >
                      <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        lesson.completed
                          ? "bg-accent text-accent-foreground"
                          : selectedLesson?.id === lesson.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-medium">{lesson.order}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium line-clamp-1 ${
                          selectedLesson?.id === lesson.id ? "text-primary" : "text-foreground"
                        }`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {lesson.duration}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
