import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { HeaderWrapper } from '@/components/Header'

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
          <HeaderWrapper />
          {children}
        </div>
      </body>
    </html>
  )
}
