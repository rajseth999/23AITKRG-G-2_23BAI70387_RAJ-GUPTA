"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardSidebar } from "./dashboard-sidebar"
import { StudentDashboard } from "./student-dashboard"
import { TeacherDashboard } from "./teacher-dashboard"
import { AdminDashboard } from "./admin-dashboard"
import { CourseBrowser } from "./course-browser"
import { CourseView } from "./course-view"
import { ContentUpload } from "./content-upload"
import { StudentProgressView } from "./student-progress-view"
import { UserManagement } from "./user-management"
import { AnalyticsView } from "./analytics-view"
import { AnnouncementsView } from "./announcements-view"
import { SettingsView } from "./settings-view"
import { CertificatesView } from "./certificates-view"

export function Dashboard() {
  const { user } = useAuth()
  const [activeView, setActiveView] = useState("dashboard")

  const handleNavigate = (view) => {
    setActiveView(view)
  }

  const renderContent = () => {
    // Handle course detail view
    if (activeView.startsWith("course-")) {
      const courseId = activeView.replace("course-", "")
      return <CourseView courseId={courseId} onBack={() => setActiveView("courses")} />
    }

    // Role-specific dashboards
    if (activeView === "dashboard") {
      switch (user?.role) {
        case "student":
          return <StudentDashboard onNavigate={handleNavigate} />
        case "teacher":
          return <TeacherDashboard onNavigate={handleNavigate} />
        case "admin":
          return <AdminDashboard onNavigate={handleNavigate} />
        default:
          return <StudentDashboard onNavigate={handleNavigate} />
      }
    }

    // Shared views based on active view
    switch (activeView) {
      // Student views
      case "courses":
        return <CourseBrowser onNavigate={handleNavigate} showProgress />
      case "browse":
        return <CourseBrowser onNavigate={handleNavigate} showProgress={false} />
      case "certificates":
        return <CertificatesView />

      // Teacher views
      case "teacher-courses":
        return <CourseBrowser onNavigate={handleNavigate} showProgress />
      case "upload":
        return <ContentUpload />
      case "progress":
        return <StudentProgressView />

      // Admin views
      case "all-courses":
        return <CourseBrowser onNavigate={handleNavigate} showProgress={false} />
      case "users":
        return <UserManagement />
      case "analytics":
        return <AnalyticsView />

      // Shared views
      case "announcements":
        return <AnnouncementsView />
      case "settings":
        return <SettingsView />

      default:
        return <StudentDashboard onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
