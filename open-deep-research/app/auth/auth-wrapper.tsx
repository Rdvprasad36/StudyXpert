'use client'

import { useEffect, useState, useCallback } from 'react'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginMessage, setShowLoginMessage] = useState(false)

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null')
    setIsAuthenticated(!!(token && user))
  }, [])

  // Handle interactive features
  const handleInteraction = useCallback((e: Event) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setShowLoginMessage(true)
      
      // Create and show toast message
      const toast = document.createElement('div')
      toast.style.position = 'fixed'
      toast.style.top = '20px'
      toast.style.left = '50%'
      toast.style.transform = 'translateX(-50%)'
      toast.style.backgroundColor = 'rgba(0,0,0,0.8)'
      toast.style.color = 'white'
      toast.style.padding = '10px 20px'
      toast.style.borderRadius = '5px'
      toast.style.zIndex = '1000'
      toast.textContent = 'Please login first to use this feature'
      document.body.appendChild(toast)
      
      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.remove()
      }, 3000)

      // Redirect to login page
      window.location.href = '/static-pages/login.html'
      return false
    }
    return true
  }, [isAuthenticated])

  // Add event listeners to interactive elements
  useEffect(() => {
    const elements = document.querySelectorAll('button, input, select, textarea')
    elements.forEach(element => {
      element.addEventListener('click', handleInteraction)
      if (element instanceof HTMLInputElement) {
        element.addEventListener('focus', handleInteraction)
      }
    })

    const forms = document.querySelectorAll('form')
    forms.forEach(form => {
      form.addEventListener('submit', handleInteraction)
    })

    // Cleanup
    return () => {
      elements.forEach(element => {
        element.removeEventListener('click', handleInteraction)
        if (element instanceof HTMLInputElement) {
          element.removeEventListener('focus', handleInteraction)
        }
      })
      forms.forEach(form => {
        form.removeEventListener('submit', handleInteraction)
      })
    }
  }, [handleInteraction])

  // Render page content
  return <>{children}</>
}
