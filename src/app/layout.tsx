import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ovulation Date Calculator – Find Your Fertile Window",
  description: "Calculate your ovulation date and fertile window with our easy-to-use calculator. Track your menstrual cycle and find your most fertile days.",
  keywords: "ovulation calculator, fertile window, menstrual cycle, pregnancy calculator, fertility tracker, ovulation date, fertility calculator",
  authors: [{ name: "Ovulation Date Calculator" }],
  creator: "Ovulation Date Calculator",
  publisher: "Ovulation Date Calculator",
  robots: "index, follow",
  openGraph: {
    title: "Ovulation Date Calculator – Find Your Fertile Window",
    description: "Calculate your ovulation date and fertile window with our easy-to-use calculator.",
    type: "website",
    locale: "en_US",
    url: "https://ovulationdatecalculator.com",
    siteName: "Ovulation Date Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ovulation Date Calculator – Find Your Fertile Window",
    description: "Calculate your ovulation date and fertile window with our easy-to-use calculator.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* AdSense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Ovulation Date Calculator",
              "description": "Calculate your ovulation date and fertile window",
              "url": "https://ovulationdatecalculator.com",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "Ovulation Date Calculator"
              },
              "potentialAction": {
                "@type": "UseAction",
                "target": "https://ovulationdatecalculator.com"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
