"use client"

import { COURSES } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Download,
  Share2,
  Calendar,
  GraduationCap,
  ExternalLink
} from "lucide-react"

export function CertificatesView() {
  const completedCourses = COURSES.filter((c) => c.progress === 100)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Certificates</h1>
        <p className="text-muted-foreground mt-1">Your earned certificates and achievements</p>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="p-4 rounded-2xl bg-primary/20">
              <Award className="w-12 h-12 text-primary" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-foreground">{completedCourses.length}</h2>
              <p className="text-muted-foreground">Certificates Earned</p>
            </div>
            <div className="sm:ml-auto flex items-center gap-2">
              <Badge variant="outline" className="bg-accent/20 text-accent border-accent/30">
                <GraduationCap className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedCourses.map((course) => (
          <Card key={course.id} className="bg-card border-border overflow-hidden group">
            <div className="h-32 bg-gradient-to-br from-primary/30 via-accent/20 to-chart-3/20 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('/certificate-pattern.svg')] opacity-10" />
              <Award className="w-16 h-16 text-primary/60" />
              <div className="absolute top-3 right-3">
                <Badge className="bg-accent text-accent-foreground">
                  Completed
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Completed on Jan 15, 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Instructor: {course.instructor}</p>
                <p>Duration: {course.duration}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {completedCourses.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="py-16 text-center">
            <Award className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold text-foreground">No Certificates Yet</h3>
            <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
              Complete your enrolled courses to earn certificates and showcase your achievements
            </p>
            <Button className="mt-6">
              <GraduationCap className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Verification Info */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Certificate Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All certificates are digitally signed and can be verified using the unique certificate ID.
            Share your certificate link with employers or add it to your LinkedIn profile to showcase your achievements.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
