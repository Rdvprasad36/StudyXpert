'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Student, Admin } from './auth-types'
import { AuthService } from './auth-service'

interface AuthContextType {
  user: Student | Admin | null
  loading: boolean
  login: (email: string, password: string, userType: 'student' | 'admin') => Promise<void>
  signup: (data: any, userType: 'student' | 'admin') => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Student | Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string, userType: 'student' | 'admin') => {
    console.log('AuthContext: login attempt', { email, userType })
    try {
      const credentials = { email, password }
      
      const response = userType === 'student' 
        ? await AuthService.studentLogin(credentials)
        : await AuthService.adminLogin(credentials)
      
      if (response.success && response.user) {
        console.log('AuthContext: login successful', response.user)
        setUser(response.user)
      } else {
        console.log('AuthContext: login failed with error:', response.error)
        throw new Error(response.error || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('AuthContext: login caught error:', error)
      throw new Error(error instanceof Error ? error.message : 'Login failed. Please try again.')
    }
  }

  const signup = async (data: any, userType: 'student' | 'admin') => {
    console.log('AuthContext: signup attempt', { email: data.email, userType, data })
    try {
      const response = userType === 'student'
        ? await AuthService.studentSignup(data)
        : await AuthService.adminSignup(data)
      
      if (response.success && response.user) {
        console.log('AuthContext: signup successful', response.user)
        setUser(response.user)
      } else {
        console.log('AuthContext: signup failed with error:', response.error)
        throw new Error(response.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('AuthContext: signup caught error:', error)
      throw new Error(error instanceof Error ? error.message : 'Registration failed. Please try again.')
    }
  }

  const logout = async () => {
    await AuthService.logout()
    setUser(null)
  }

  const resetPassword = async (email: string) => {
    const result = await AuthService.resetPassword(email)
    if (!result.success) {
      throw new Error(result.error || 'Failed to send reset email')
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
