import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './Provider'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'My bookshelf',
    template: 'My bookshelf - %s',
  },
  description: 'My bookshelf is an app for discovering new books',
  other: {
    ['google-site-verification']: 'E5Nk_padNNLDRqBFmy66pZZYKOXIS8NfbhjLoHZG_kI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <div className="relative z-[100]" id="modal"></div>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
