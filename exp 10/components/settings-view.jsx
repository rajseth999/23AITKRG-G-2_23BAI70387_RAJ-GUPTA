"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Bell,
  Lock,
  Palette,
  Save,
  Camera,
  Mail,
  Shield
} from "lucide-react"

export function SettingsView() {
  const { user } = useAuth()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [courseUpdates, setCourseUpdates] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24 bg-primary">
                    <AvatarFallback className="text-2xl text-primary-foreground bg-transparent">
                      {user?.avatar || user?.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <FieldGroup>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel>First Name</FieldLabel>
                        <Input 
                          defaultValue={user?.name.split(" ")[0]} 
                          className="bg-input border-border"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Last Name</FieldLabel>
                        <Input 
                          defaultValue={user?.name.split(" ").slice(1).join(" ")} 
                          className="bg-input border-border"
                        />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input 
                        type="email"
                        defaultValue={user?.email} 
                        className="bg-input border-border"
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Role</FieldLabel>
                      <Input 
                        defaultValue={user?.role} 
                        className="bg-input border-border capitalize"
                        disabled
                      />
                    </Field>
                  </FieldGroup>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/20">
                      <Bell className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive in-app push notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={pushNotifications} 
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-chart-3/20">
                      <Shield className="w-5 h-5 text-chart-3" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Course Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified about course changes</p>
                    </div>
                  </div>
                  <Switch 
                    checked={courseUpdates} 
                    onCheckedChange={setCourseUpdates}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-chart-5/20">
                      <Palette className="w-5 h-5 text-chart-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Weekly Digest</p>
                      <p className="text-sm text-muted-foreground">Receive weekly summary emails</p>
                    </div>
                  </div>
                  <Switch 
                    checked={weeklyDigest} 
                    onCheckedChange={setWeeklyDigest}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4 max-w-md">
                <FieldGroup>
                  <Field>
                    <FieldLabel>Current Password</FieldLabel>
                    <Input type="password" className="bg-input border-border" />
                  </Field>
                  <Field>
                    <FieldLabel>New Password</FieldLabel>
                    <Input type="password" className="bg-input border-border" />
                  </Field>
                  <Field>
                    <FieldLabel>Confirm New Password</FieldLabel>
                    <Input type="password" className="bg-input border-border" />
                  </Field>
                </FieldGroup>
                <Button>
                  <Lock className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary">
                <div>
                  <p className="font-medium text-foreground">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground">
                    Use an authenticator app for additional security
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/10 border-destructive/30">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
