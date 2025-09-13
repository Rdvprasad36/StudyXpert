import type { Metadata } from 'next'
import { Geist, Zen_Dots } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@/components/analytics'
import { DarkModeToggle } from '@/components/ui/dark-mode-toggle'
import Navbar from '@/components/navbar-frontend'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const zenDots = Zen_Dots({
  variable: '--font-zen-dots',
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Open Deep Research',
  description:
    'Open source alternative to Deep Research. Generate reports with AI based on search results.',
  icons: {
    icon: [
      {
        url: '/apple-icon.png',
        type: 'image/png',
      },
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <Analytics />
      <body className={`${geistSans.variable} ${zenDots.variable} antialiased`}>
        <Navbar />
        <div className='fixed top-4 right-4 z-50'>
          <DarkModeToggle />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
