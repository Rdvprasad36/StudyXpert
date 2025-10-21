// Authentication types for localStorage integration

export interface Student {
  id: string;
  email: string;
  username: string;
  full_name: string;
  student_id: string;
  department: string;
  year: number;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: string;
  email: string;
  username: string;
  full_name: string;
  role: 'admin' | 'super_admin';
  department?: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface StudentSignupData extends AuthCredentials {
  username: string;
  full_name: string;
  student_id: string;
  department: string;
  year: number;
}

export interface AdminSignupData extends AuthCredentials {
  username: string;
  full_name: string;
  role: 'admin' | 'super_admin';
  department?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: Student | Admin;
  error?: string;
  session?: any;
}
