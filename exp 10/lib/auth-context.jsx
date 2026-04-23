"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(undefined)

// Demo users for authentication
const DEMO_USERS = [
  {
    id: "1",
    email: "student@lms.com",
    password: "student123",
    name: "Alex Johnson",
    role: "student",
    avatar: "AJ"
  },
  {
    id: "2",
    email: "teacher@lms.com",
    password: "teacher123",
    name: "Dr. Sarah Williams",
    role: "teacher",
    avatar: "SW"
  },
  {
    id: "3",
    email: "admin@lms.com",
    password: "admin123",
    name: "Michael Chen",
    role: "admin",
    avatar: "MC"
  }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("lms_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    const foundUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("lms_user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("lms_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
