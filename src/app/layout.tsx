import { BookContextProvider } from '@/context/appContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Intro from '@/components/Intro'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-logopurple-100`}>
        <BookContextProvider>
          <Intro />
          {children}
        </BookContextProvider>
      </body>
    </html>
  )
}
