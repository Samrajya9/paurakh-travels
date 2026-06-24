"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import type { LoginSchema } from "@/types/login.type"
import { UserType } from "@/types/users-type.enum"

export interface User {
  id: string
  email: string
  user_type: UserType
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginSchema) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
  initialUser: User | null
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [isLoading] = useState(false)

  // useEffect(() => {
  //   setUser(initialUser)
  // }, [initialUser])

  const login = useCallback(async (credentials: LoginSchema) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const payload: unknown = await response.json().catch(() => null)
      const message =
        payload &&
        typeof payload === "object" &&
        "error" in payload &&
        typeof payload.error === "string"
          ? payload.error
          : "Login failed. Please try again."

      throw new Error(message)
    }

    const meResponse = await fetch("/api/auth/me")

    if (!meResponse.ok) {
      throw new Error("Failed to fetch user after login.")
    }

    const mePayload = await meResponse.json()

    setUser({
      id: mePayload.sub as string,
      email: mePayload.email as string,
      user_type: mePayload.user_type as User["user_type"],
    })
  }, [])

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
