import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Ovulation Date Calculator — Predict Your Fertility Window",
  description: "Accurately estimate your ovulation date and fertility window using our free ovulation calculator. Simple, fast, and secure.",
  keywords: "ovulation calculator, fertile window, menstrual cycle, pregnancy calculator, fertility tracker, ovulation date, fertility calculator",
  authors: [{ name: "Ovulation Date Calculator" }],
  creator: "Ovulation Date Calculator",
  publisher: "Ovulation Date Calculator",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.ovulationdatecalculator.org"
  },
  openGraph: {
    title: "Ovulation Date Calculator — Predict Your Fertility Window",
    description: "Accurately estimate your ovulation date and fertility window using our free ovulation calculator. Simple, fast, and secure.",
    type: "website",
    locale: "en_US",
    url: "https://www.ovulationdatecalculator.org",
    siteName: "Ovulation Date Calculator",
    images: [
      {
        url: "https://www.ovulationdatecalculator.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ovulation Date Calculator - Predict Your Fertility Window"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovulation Date Calculator — Predict Your Fertility Window",
    description: "Accurately estimate your ovulation date and fertility window using our free ovulation calculator. Simple, fast, and secure.",
    images: ["https://www.ovulationdatecalculator.org/og-image.png"]
  },
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml" }
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#8B5CF6",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ovulation Calculator",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Ovulation Date Calculator",
              "description": "Calculate your ovulation date and fertile window",
              "url": "https://www.ovulationdatecalculator.org",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  )
}
