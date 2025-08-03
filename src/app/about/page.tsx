import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - Ovulation Date Calculator',
  description: 'Learn about the Ovulation Date Calculator tool and its purpose in helping women track their fertility.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
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
                  About
                </h1>
                <p className="text-gray-600">Learn more about our ovulation calculator</p>
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
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-gray-900 font-bold">Our Mission</h2>
            <p className="text-gray-800">
              Ovulation Date Calculator is designed to help women understand their menstrual cycles and identify 
              their most fertile days. Our goal is to provide a simple, accurate, and easy-to-use tool that 
              empowers women to make informed decisions about their reproductive health.
            </p>

            <h2 className="text-gray-900 font-bold">How It Works</h2>
            <p className="text-gray-800">
              Our calculator uses established medical knowledge about menstrual cycles to estimate ovulation dates. 
              The tool calculates your fertile window based on:
            </p>
            <ul className="text-gray-800">
              <li>The first day of your last menstrual period</li>
              <li>Your average cycle length</li>
              <li>Standard ovulation patterns (typically 14 days before the next period)</li>
            </ul>

            <h2 className="text-gray-900 font-bold">What We Calculate</h2>
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-purple-800 font-bold mb-2">Ovulation Window</h3>
                <p className="text-sm text-gray-800 font-medium">
                  The 2-3 day period when you&apos;re most likely to ovulate, based on your cycle length.
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-4">
                <h3 className="text-pink-800 font-bold mb-2">Most Likely Conception Date</h3>
                <p className="text-sm text-gray-800 font-medium">
                  The peak fertility day when conception is most likely to occur.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-blue-800 font-bold mb-2">Fertile Week Range</h3>
                <p className="text-sm text-gray-800 font-medium">
                  An extended period of fertility that accounts for sperm survival and egg viability.
                </p>
              </div>
            </div>

            <h2 className="text-gray-900 font-bold">Privacy &amp; Security</h2>
            <p className="text-gray-800">
              We prioritize your privacy. Our calculator operates entirely within your browser - no personal 
              data is transmitted to our servers. Your cycle information stays private and is not stored or 
              shared with third parties.
            </p>

            <h2 className="text-gray-900 font-bold">Medical Disclaimer</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
              <p className="text-yellow-900 font-medium">
                <strong>Important:</strong> This calculator provides estimates based on typical menstrual cycles. 
                Results may vary and should not replace medical advice. Always consult with a healthcare provider 
                for personalized guidance, especially if you have irregular cycles or underlying health conditions.
              </p>
            </div>

            <h2 className="text-gray-900 font-bold">Why Choose Our Calculator?</h2>
            <ul className="text-gray-800">
              <li><strong>Simple &amp; Fast:</strong> Get results instantly with just two inputs</li>
              <li><strong>Mobile-Friendly:</strong> Works perfectly on phones, tablets, and computers</li>
              <li><strong>Privacy-Focused:</strong> No data collection or tracking</li>
              <li><strong>Accurate:</strong> Based on established medical knowledge</li>
              <li><strong>Free:</strong> No registration or payment required</li>
            </ul>

            <h2 className="text-gray-900 font-bold">Contact Us</h2>
            <p className="text-gray-800">
              Have questions, suggestions, or feedback? We&apos;d love to hear from you! Contact us at:{' '}
              <a href="mailto:contact@ovulationdatecalculator.com" className="text-purple-700 hover:text-purple-900 font-medium">
                contact@ovulationdatecalculator.com
              </a>
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link 
                href="/" 
                className="inline-flex items-center text-purple-700 hover:text-purple-900 font-semibold"
              >
                ← Back to Calculator
              </Link>
            </div>
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
              <a href="/about" className="hover:text-purple-600 transition-colors font-medium">About</a>
              <a href="/faq" className="hover:text-purple-600 transition-colors font-medium">FAQ</a>
              <a href="/privacy" className="hover:text-purple-600 transition-colors font-medium">Privacy</a>
              <a href="/terms" className="hover:text-purple-600 transition-colors font-medium">Terms</a>
              <a href="/contact" className="hover:text-purple-600 transition-colors font-medium">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 