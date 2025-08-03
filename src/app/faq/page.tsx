import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "FAQ - Ovulation Date Calculator",
  description: "Frequently asked questions about ovulation calculation, fertility tracking, and using our ovulation date calculator.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.ovulationdatecalculator.org/faq"
  }
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  FAQ
                </h1>
                <p className="text-gray-600">Frequently Asked Questions</p>
              </div>
            </div>
            <Link 
              href="/"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Back to Calculator
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8" style={{fontFamily: "'Playfair Display', serif"}}>
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How accurate is the ovulation calculator?</h3>
              <p className="text-gray-700 leading-relaxed">
                Our ovulation calculator provides estimates based on standard menstrual cycle patterns. 
                It assumes ovulation occurs approximately 14 days before your next period. 
                However, individual cycles can vary, so this should be used as a guide rather than 
                medical advice.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is the fertile window?</h3>
              <p className="text-gray-700 leading-relaxed">
                The fertile window is the period when you&apos;re most likely to conceive. 
                It typically includes the 5 days before ovulation and the day of ovulation itself. 
                Sperm can survive in the female reproductive tract for up to 5 days, 
                while the egg is viable for about 24 hours after ovulation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I know my cycle length?</h3>
              <p className="text-gray-700 leading-relaxed">
                Track your menstrual cycles for several months to determine your average cycle length. 
                Count from the first day of one period to the first day of the next period. 
                Most women have cycles between 21-35 days, with 28 days being the average.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What if I have irregular periods?</h3>
              <p className="text-gray-700 leading-relaxed">
                If your cycles are irregular, it may be more challenging to predict ovulation. 
                Consider tracking additional fertility signs like basal body temperature, 
                cervical mucus changes, or using ovulation predictor kits for more accurate results.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Is this calculator suitable for trying to conceive?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, this calculator can help identify your most fertile days when trying to conceive. 
                However, it&apos;s important to remember that this is an estimate and should be used 
                alongside other fertility awareness methods for best results.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I use this for birth control?</h3>
              <p className="text-gray-700 leading-relaxed">
                While understanding your fertile window can be part of natural family planning, 
                this calculator alone is not a reliable method of birth control. 
                Always consult with healthcare professionals for contraceptive advice.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-purple-50 rounded-xl">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Important Disclaimer</h3>
            <p className="text-purple-800 text-sm leading-relaxed">
              This calculator provides estimates based on general menstrual cycle patterns. 
              It is not intended as medical advice and should not replace consultation with 
              healthcare professionals. Individual fertility patterns can vary significantly, 
              and this tool should be used for informational purposes only.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">
            <div className="mb-4 md:mb-0">
              <p className="font-medium">&copy; 2024 Ovulation Date Calculator. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="hover:text-purple-600 transition-colors font-medium">About</Link>
              <Link href="/faq" className="hover:text-purple-600 transition-colors font-medium">FAQ</Link>
              <Link href="/privacy" className="hover:text-purple-600 transition-colors font-medium">Privacy</Link>
              <Link href="/terms" className="hover:text-purple-600 transition-colors font-medium">Terms</Link>
              <Link href="/contact" className="hover:text-purple-600 transition-colors font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 