
import { Student, Admin, AuthCredentials, StudentSignupData, AdminSignupData, AuthResponse } from './auth-types'
import { supabase } from './supabase-client'

export class AuthService {
  // Student Authentication Methods
  static async studentSignup(data: StudentSignupData): Promise<AuthResponse> {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      })

      if (signUpError) {
        return { success: false, error: signUpError.message }
      }

      if (!signUpData.user) {
        return { success: false, error: 'User signup failed' }
      }

      // Insert profile data into 'profiles' table
      const { error: profileError } = await supabase.from('profiles').insert({
        id: signUpData.user.id,
        email: data.email,
        username: data.username,
        full_name: data.full_name,
        student_id: data.student_id,
        department: data.department,
        year: data.year,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      if (profileError) {
        return { success: false, error: profileError.message }
      }

      return { success: true, user: { ...data, id: signUpData.user.id } }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  static async studentLogin(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      })

      if (signInError) {
        return { success: false, error: signInError.message }
      }

      if (!signInData.user) {
        return { success: false, error: 'User login failed' }
      }

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', signInData.user.id)
        .single()

      if (profileError) {
        return { success: false, error: profileError.message }
      }

      return { success: true, user: profileData }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  // Admin Authentication Methods
  static async adminSignup(data: AdminSignupData): Promise<AuthResponse> {
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      })

      if (signUpError) {
        return { success: false, error: signUpError.message }
      }

      if (!signUpData.user) {
        return { success: false, error: 'User signup failed' }
      }

      // Insert profile data into 'profiles' table
      const { error: profileError } = await supabase.from('profiles').insert({
        id: signUpData.user.id,
        email: data.email,
        username: data.username,
        full_name: data.full_name,
        role: data.role,
        department: data.department,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      if (profileError) {
        return { success: false, error: profileError.message }
      }

      return { success: true, user: { ...data, id: signUpData.user.id } }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  static async adminLogin(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      })

      if (signInError) {
        return { success: false, error: signInError.message }
      }

      if (!signInData.user) {
        return { success: false, error: 'User login failed' }
      }

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', signInData.user.id)
        .single()

      if (profileError) {
        return { success: false, error: profileError.message }
      }

      return { success: true, user: profileData }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }

  // Common Methods
  static async logout(): Promise<void> {
    await supabase.auth.signOut()
  }

  static async getCurrentUser(): Promise<Student | Admin | null> {
    try {
      const user = supabase.auth.getUser()
      if (!user) return null

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', (await user).data.user?.id)
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        return null
      }

      return profileData
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  static async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) {
        return { success: false, error: error.message }
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: (error as Error).message }
    }
  }
}
