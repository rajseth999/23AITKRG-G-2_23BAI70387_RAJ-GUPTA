"use client"

import { useState } from "react"
import { ANNOUNCEMENTS } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Bell,
  Plus,
  Edit,
  Trash2,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2
} from "lucide-react"

export function AnnouncementsView() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = () => {
    setIsAddOpen(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const priorityColors = {
    high: "bg-destructive/20 text-destructive border-destructive/30",
    medium: "bg-chart-3/20 text-chart-3 border-chart-3/30",
    low: "bg-muted text-muted-foreground border-border"
  }

  const priorityIcons = {
    high: AlertCircle,
    medium: Bell,
    low: CheckCircle2
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground mt-1">Manage platform-wide announcements</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>
                Post a new announcement for all users
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input placeholder="Announcement title" className="bg-input border-border" />
                </Field>
                <Field>
                  <FieldLabel>Content</FieldLabel>
                  <Textarea 
                    placeholder="Write your announcement..."
                    className="bg-input border-border min-h-32"
                  />
                </Field>
                <Field>
                  <FieldLabel>Priority</FieldLabel>
                  <Select defaultValue="medium">
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive" />
                          High Priority
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-chart-3" />
                          Medium Priority
                        </div>
                      </SelectItem>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                          Low Priority
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Target Audience</FieldLabel>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students Only</SelectItem>
                      <SelectItem value="teachers">Teachers Only</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleSubmit}>
                  Publish Announcement
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {showSuccess && (
        <Card className="bg-accent/20 border-accent">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-foreground">Announcement published successfully!</span>
          </CardContent>
        </Card>
      )}

      {/* Announcements List */}
      <div className="grid gap-4">
        {ANNOUNCEMENTS.map((announcement) => {
          const PriorityIcon = priorityIcons[announcement.priority]
          return (
            <Card key={announcement.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className={`p-3 rounded-lg shrink-0 ${priorityColors[announcement.priority]}`}>
                    <PriorityIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{announcement.title}</h3>
                      <Badge 
                        variant="outline" 
                        className={`w-fit capitalize ${priorityColors[announcement.priority]}`}
                      >
                        {announcement.priority} priority
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{announcement.content}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {announcement.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(announcement.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {ANNOUNCEMENTS.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Bell className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground">No announcements yet</h3>
            <p className="text-muted-foreground mt-1">Create your first announcement to notify users</p>
            <Button className="mt-4" onClick={() => setIsAddOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Announcement
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
