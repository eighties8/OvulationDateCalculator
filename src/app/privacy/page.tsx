import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Ovulation Date Calculator',
  description: 'Privacy policy for Ovulation Date Calculator. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
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
                  Privacy Policy
                </h1>
                <p className="text-gray-600">Last updated: December 2024</p>
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
            <h2 className="text-gray-900 font-bold">Information We Collect</h2>
            <p className="text-gray-800">
              Ovulation Date Calculator (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
            </p>

            <h3 className="text-gray-900 font-semibold">Personal Information</h3>
            <p className="text-gray-800">
              We do not collect personal information such as names, email addresses, or phone numbers. 
              The calculator tool operates entirely within your browser and does not transmit any personal data to our servers.
            </p>

            <h3 className="text-gray-900 font-semibold">Usage Data</h3>
            <p className="text-gray-800">
              We may collect anonymous usage data to improve our service, including:
            </p>
            <ul className="text-gray-800">
              <li>Pages visited and time spent on our website</li>
              <li>Browser type and device information</li>
              <li>General location data (country/region level only)</li>
            </ul>

            <h2 className="text-gray-900 font-bold">Cookies and Tracking Technologies</h2>
            <p className="text-gray-800">
              We use cookies and similar tracking technologies to enhance your experience and provide personalized content.
            </p>

            <h3 className="text-gray-900 font-semibold">Essential Cookies</h3>
            <p className="text-gray-800">
              These cookies are necessary for the website to function properly and cannot be disabled.
            </p>

            <h3 className="text-gray-900 font-semibold">Analytics Cookies</h3>
            <p className="text-gray-800">
              We use Google Analytics to understand how visitors interact with our website. 
              This helps us improve our content and user experience.
            </p>



            <h2 className="text-gray-900 font-bold">Third-Party Services</h2>
            <p className="text-gray-800">
              We may use third-party services that collect, monitor, and analyze user data:
            </p>
            <ul className="text-gray-800">
              <li><strong>Google Analytics:</strong> Website analytics and user behavior tracking</li>
            </ul>

            <h2 className="text-gray-900 font-bold">Data Security</h2>
            <p className="text-gray-800">
              We implement appropriate security measures to protect against unauthorized access, alteration, 
              disclosure, or destruction of your information. However, no method of transmission over the 
              internet is 100% secure.
            </p>

            <h2 className="text-gray-900 font-bold">Your Rights</h2>
            <p className="text-gray-800">
              You have the right to:
            </p>
            <ul className="text-gray-800">
              <li>Opt out of non-essential cookies</li>
              <li>Request information about data we may have collected</li>
              <li>Request deletion of any stored data</li>
              <li>Contact us with privacy concerns</li>
            </ul>

            <h2 className="text-gray-900 font-bold">Children&apos;s Privacy</h2>
            <p className="text-gray-800">
              Our service is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and believe your child 
              has provided us with personal information, please contact us.
            </p>

            <h2 className="text-gray-900 font-bold">Changes to This Privacy Policy</h2>
            <p className="text-gray-800">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2 className="text-gray-900 font-bold">Contact Us</h2>
            <p className="text-gray-800">
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@ovulationdatecalculator.com" className="text-purple-700 hover:text-purple-900 font-medium">
                privacy@ovulationdatecalculator.com
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