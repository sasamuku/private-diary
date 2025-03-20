import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Private Diary',
  description: 'A simple diary app to keep track of the good things in life.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full">
          <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
            <div className="container max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
              <Header />
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
