import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use - Ovulation Date Calculator',
  description: 'Terms of use for Ovulation Date Calculator. Read our terms and conditions for using this informational tool.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Terms of Use
          </h1>
          <p className="text-gray-700 text-center mt-2 font-medium">
            Last updated: December 2024
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-gray-900 font-bold">Acceptance of Terms</h2>
            <p className="text-gray-800">
              By accessing and using Ovulation Date Calculator (&quot;the Service&quot;), you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-gray-900 font-bold">Description of Service</h2>
            <p className="text-gray-800">
              Ovulation Date Calculator is an informational tool designed to help users estimate their ovulation dates 
              and fertile windows based on menstrual cycle data. The calculator provides estimates based on typical 
              menstrual cycle patterns and should be used for informational purposes only.
            </p>

            <h2 className="text-gray-900 font-bold">Medical Disclaimer</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
              <p className="text-yellow-900 font-semibold">
                <strong>IMPORTANT:</strong> This calculator is for informational purposes only and is not intended 
                to replace professional medical advice, diagnosis, or treatment.
              </p>
            </div>
            <p className="text-gray-800">
              The information provided by this calculator:
            </p>
            <ul className="text-gray-800">
              <li>Is based on general population averages and may not be accurate for all individuals</li>
              <li>Should not be used as a substitute for professional medical advice</li>
              <li>May not account for individual variations in menstrual cycles</li>
              <li>Is not intended to diagnose, treat, cure, or prevent any medical condition</li>
            </ul>
            <p className="text-gray-800">
              Always consult with a qualified healthcare provider for personalized medical advice, especially if you:
            </p>
            <ul className="text-gray-800">
              <li>Have irregular menstrual cycles</li>
              <li>Are trying to conceive or avoid pregnancy</li>
              <li>Have underlying medical conditions</li>
              <li>Are taking medications that may affect your cycle</li>
            </ul>

            <h2 className="text-gray-900 font-bold">Use License</h2>
            <p className="text-gray-800">
              Permission is granted to temporarily use this website for personal, non-commercial transitory viewing only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="text-gray-800">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2 className="text-gray-900 font-bold">Accuracy of Information</h2>
            <p className="text-gray-800">
              While we strive to provide accurate and up-to-date information, we make no representations or warranties 
              of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability 
              of the information, products, services, or related graphics contained on the website for any purpose.
            </p>

            <h2 className="text-gray-900 font-bold">Limitation of Liability</h2>
            <p className="text-gray-800">
              In no event shall Ovulation Date Calculator or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the use 
              or inability to use the materials on the website, even if we or our authorized representative has been 
              notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-gray-900 font-bold">Privacy</h2>
            <p className="text-gray-800">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
              to understand our practices.
            </p>

            <h2 className="text-gray-900 font-bold">Intellectual Property</h2>
            <p className="text-gray-800">
              The Service and its original content, features, and functionality are and will remain the exclusive property 
              of Ovulation Date Calculator and its licensors. The Service is protected by copyright, trademark, and other 
              laws.
            </p>

            <h2 className="text-gray-900 font-bold">Links to Other Websites</h2>
            <p className="text-gray-800">
              Our Service may contain links to third-party websites or services that are not owned or controlled by us. 
              We have no control over, and assume no responsibility for, the content, privacy policies, or practices of 
              any third-party websites or services.
            </p>

            <h2 className="text-gray-900 font-bold">Termination</h2>
            <p className="text-gray-800">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason 
              whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2 className="text-gray-900 font-bold">Governing Law</h2>
            <p className="text-gray-800">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which the Service operates, 
              without regard to its conflict of law provisions.
            </p>

            <h2 className="text-gray-900 font-bold">Changes to Terms</h2>
            <p className="text-gray-800">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
              is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-gray-900 font-bold">Contact Information</h2>
            <p className="text-gray-800">
              If you have any questions about these Terms of Use, please contact us at:{' '}
              <a href="mailto:legal@ovulationdatecalculator.com" className="text-purple-700 hover:text-purple-900 font-medium">
                legal@ovulationdatecalculator.com
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
              <a href="/privacy" className="hover:text-purple-600 transition-colors font-medium">Privacy</a>
              <a href="/terms" className="hover:text-purple-600 transition-colors font-medium">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 