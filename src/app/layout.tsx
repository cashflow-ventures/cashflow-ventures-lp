import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cashflow Ventures',
  description: 'Cashflow Ventures builds new businesses from the ground up via dedicated partnerships. We build and scale ventures ranging from tech to brick-and-mortar to ecom. We also consult and invest.',
  keywords: 'venture capital, startup funding, business building, investment, consulting, entrepreneurship, cashflow ventures',
  authors: [{ name: 'Cashflow Ventures' }],
  icons: {
    icon: '/Logo Screen.png',
    shortcut: '/Logo Screen.png',
    apple: '/Logo Screen.png',
  },
  openGraph: {
    title: 'Cashflow Ventures',
    description: 'We build new businesses from the ground up via dedicated partnerships from around the world.',
    url: 'https://cashflow.ventures',
    siteName: 'Cashflow Ventures',
    locale: 'en_US',
    type: 'website',
    images: ['/Logo Screen.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cashflow Ventures',
    description: 'We build new businesses from the ground up via dedicated partnerships from around the world.',
    images: ['/Logo Screen.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} font-sans bg-[#0D0D1F] text-white`}>
        {children}
      </body>
    </html>
  )
}
