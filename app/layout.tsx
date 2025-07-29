import './globals.css'
import Script from 'next/script'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Next.js App with AdSense',
  description: 'A Next.js application with Google AdSense integration',
  keywords: 'nextjs, adsense, typescript, web development',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5914388722099938"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}