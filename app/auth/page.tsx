'use client'

import { useState } from 'react'
import LoginPage from './login-page'
import SignupForm from './signup-form'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-l-md ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-r-md ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? <LoginPage /> : <SignupForm />}
      </div>
    </div>
  )
}
