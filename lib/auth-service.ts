import { Student, Admin, AuthCredentials, StudentSignupData, AdminSignupData, AuthResponse } from './auth-types'
import { getUsers, saveUsers, getCurrentUser, setCurrentUser, generateId } from './localStorage-utils'

export class AuthService {
  // Student Authentication Methods
  static async studentSignup(data: StudentSignupData): Promise<AuthResponse> {
    try {
      const users = getUsers()
      // Check if email already exists
      if (users.some(u => u.email === data.email)) {
        return { success: false, error: 'Email already exists' }
      }

      const newUser: Student = {
        id: generateId(),
        email: data.email,
        username: data.username,
        full_name: data.full_name,
        student_id: data.student_id,
        department: data.department,
        year: data.year,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      users.push(newUser)
      saveUsers(users)

      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  static async studentLogin(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const users = getUsers()
      const user = users.find(u => u.email === credentials.email && 'password' in u && u.password === credentials.password && 'student_id' in u) as Student

      if (!user) {
        return { success: false, error: 'Invalid credentials' }
      }

      setCurrentUser(user)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  // Admin Authentication Methods
  static async adminSignup(data: AdminSignupData): Promise<AuthResponse> {
    try {
      const users = getUsers()
      // Check if email already exists
      if (users.some(u => u.email === data.email)) {
        return { success: false, error: 'Email already exists' }
      }

      const newUser: Admin = {
        id: generateId(),
        email: data.email,
        username: data.username,
        full_name: data.full_name,
        role: data.role,
        department: data.department,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      users.push(newUser)
      saveUsers(users)

      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  static async adminLogin(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const users = getUsers()
      const user = users.find(u => u.email === credentials.email && 'password' in u && u.password === credentials.password && 'role' in u) as Admin

      if (!user) {
        return { success: false, error: 'Invalid credentials' }
      }

      setCurrentUser(user)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  // Common Methods
  static async logout(): Promise<void> {
    setCurrentUser(null)
  }

  static async getCurrentUser(): Promise<Student | Admin | null> {
    return getCurrentUser()
  }

  static async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const users = getUsers()
      const userIndex = users.findIndex(u => u.email === email)

      if (userIndex === -1) {
        return { success: false, error: 'Email not found' }
      }

      // For local storage, we can prompt for new password or just simulate
      // In a real app, this would send an email, but since it's local, we'll just update
      const newPassword = prompt('Enter new password:')
      if (!newPassword) {
        return { success: false, error: 'Password reset cancelled' }
      }

      users[userIndex] = { ...users[userIndex], password: newPassword }
      saveUsers(users)

      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }
}
