'use client'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  // This wrapper now only serves as a placeholder and doesn't block access
  // Users can access all pages without being forced to login
  
  return <>{children}</>
}
