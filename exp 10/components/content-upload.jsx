"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Upload,
  FileText,
  Video,
  Image,
  File,
  X,
  CheckCircle2,
  Plus
} from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function ContentUpload() {
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [lessonTitle, setLessonTitle] = useState("")
  const [lessonDescription, setLessonDescription] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleFileDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      processFiles(files)
    }
  }

  const processFiles = (files) => {
    setIsUploading(true)
    setTimeout(() => {
      const newFiles = files.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.startsWith("video/")
          ? "video"
          : file.type.startsWith("image/")
          ? "image"
          : file.type.includes("pdf") || file.type.includes("document")
          ? "document"
          : "other",
        size: formatFileSize(file.size)
      }))
      setUploadedFiles([...uploadedFiles, ...newFiles])
      setIsUploading(false)
    }, 1000)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id))
  }

  const getFileIcon = (type) => {
    switch (type) {
      case "video":
        return Video
      case "image":
        return Image
      case "document":
        return FileText
      default:
        return File
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      // Reset form
      setCourseTitle("")
      setCourseDescription("")
      setCategory("")
      setLevel("")
      setLessonTitle("")
      setLessonDescription("")
      setUploadedFiles([])
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Upload Content</h1>
        <p className="text-muted-foreground mt-1">Add new courses and lessons for your students</p>
      </div>

      {showSuccess && (
        <Card className="bg-accent/20 border-accent">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-foreground">Content uploaded successfully!</span>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Course Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>Enter details about the new course or select existing</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Course Title</FieldLabel>
                  <Input
                    placeholder="Enter course title"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="bg-input border-border"
                  />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    placeholder="Describe what students will learn"
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    className="bg-input border-border min-h-24"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="cloud">Cloud</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel>Level</FieldLabel>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        {/* Lesson Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Lesson Details</CardTitle>
            <CardDescription>Add lesson content and materials</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Lesson Title</FieldLabel>
                  <Input
                    placeholder="Enter lesson title"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    className="bg-input border-border"
                  />
                </Field>
                <Field>
                  <FieldLabel>Lesson Description</FieldLabel>
                  <Textarea
                    placeholder="What will students learn in this lesson?"
                    value={lessonDescription}
                    onChange={(e) => setLessonDescription(e.target.value)}
                    className="bg-input border-border min-h-24"
                  />
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* File Upload */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Upload Materials</CardTitle>
          <CardDescription>Upload videos, documents, and other course materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            {isUploading ? (
              <div className="flex flex-col items-center">
                <Spinner className="w-8 h-8 mb-2" />
                <p className="text-muted-foreground">Uploading files...</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-foreground font-medium">Drag and drop files here</p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse from your computer
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Supports: MP4, PDF, DOCX, PPTX, PNG, JPG (Max 500MB)
                </p>
              </>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium text-foreground mb-3">Uploaded Files</p>
              {uploadedFiles.map((file) => {
                const Icon = getFileIcon(file.type)
                return (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
                  >
                    <div className="p-2 rounded bg-primary/20">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">{file.type}</Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? <Spinner className="mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {isSubmitting ? "Publishing..." : "Publish Content"}
        </Button>
      </div>
    </div>
  )
}
