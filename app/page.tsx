'use client'

import AuthWrapper from './auth/auth-wrapper'
import HomeComponent from './components'

export default function Page() {
  return (
    <AuthWrapper>
      <HomeComponent />
    </AuthWrapper>
  )
}
