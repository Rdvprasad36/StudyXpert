'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface User {
  name: string
  email?: string
}

function getInitials(name: string): string {
  if (!name) return ''
  const names = name.trim().split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setShowProfileDropdown(false);
  }

  const navItems = [
    { name: 'Home', href: '/static-pages/index.html',external: false },
    { name: 'About', href: '/static-pages/about.html', external: false },
    { name: 'Storage', href: '/static-pages/storage.html',external: false },
    { name: 'Posts', href: '/static-pages/posts.html',external: false },
    { name: 'Internships', href: '/static-pages/internships.html', external: false },
    { name: 'Jobs', href: '/static-pages/jobs.html', external: false },
    { name: 'Competitions', href: '/static-pages/competitions.html',  external: false },
    { name: 'Leadership', href: '/static-pages/leadership.html', external: false },
    { name: 'Research', href: 'http://localhost:3000', icon: '🔬', external: false },
  ]

  return (
    <nav className='border-b bg-background shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex items-center mr-6'>
              <a href='/static-pages/index.html' className='flex items-center space-x-2'>
                <Image
                  src='/logo.png'
                  alt='StudyXpert Logo'
                  width={45}
                  height={45}
                  className='rounded-full object-cover shadow-sm'
                />
                <span className='text-xl font-bold text-foreground'>
                  Study<span className='text-muted-foreground'>X</span>pert
                </span>
              </a>
            </div>

            <div className='hidden sm:ml-6 sm:flex sm:space-x-1'>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className='flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors'
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className='flex items-center'>
            {user ? (
              <div className='relative'>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className='w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm hover:bg-purple-700 transition-colors'
                >
                  {getInitials(user.name)}
                </button>
                
                {showProfileDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50'>
                    <div className='py-1'>
                      <a
                        href='/static-pages/storage.html'
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        Profile
                      </a>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                href='/static-pages/login.html'
                className='px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors'
              >
                Login
              </a>
            )}
          </div>

          <div className='sm:hidden flex items-center'>
            <button className='h-8 w-8 text-gray-700'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
