'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check system preference and localStorage
    const storedPreference = localStorage.getItem('darkMode')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Set initial mode based on localStorage or system preference
    const initialMode = storedPreference 
      ? storedPreference === 'true' 
      : systemPrefersDark
      
    setIsDarkMode(initialMode)
    document.documentElement.classList.toggle('dark', initialMode)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle('dark', newMode)
    localStorage.setItem('darkMode', String(newMode))
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleDarkMode}
      className='rounded-full'
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className='h-5 w-5 text-yellow-500' />
      ) : (
        <Moon className='h-5 w-5 text-gray-700' />
      )}
    </Button>
  )
}
