'use client';

import { useState, useEffect } from 'react';

interface CalculationResults {
  ovulationWindow: {
    start: Date;
    end: Date;
  };
  mostLikelyConception: Date;
  fertileWeek: {
    start: Date;
    end: Date;
  };
}

interface WindowWithAdsense extends Window {
  adsbygoogle?: unknown[];
}

export default function Home() {
  const [firstDayOfPeriod, setFirstDayOfPeriod] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(true);
  const [today] = useState<Date>(new Date());

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted) {
      setShowCookieBanner(false);
    }

    // Load AdSense script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src*="adsbygoogle"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    // Initialize AdSense ads when results are shown
    if (results && typeof window !== 'undefined') {
      const windowWithAdsense = window as WindowWithAdsense;
      if (windowWithAdsense.adsbygoogle) {
        try {
          windowWithAdsense.adsbygoogle = windowWithAdsense.adsbygoogle || [];
          windowWithAdsense.adsbygoogle.push({});
        } catch {
          console.log('AdSense not loaded yet');
        }
      }
    }
  }, [results]);

  const calculateOvulation = () => {
    if (!firstDayOfPeriod) return;

    const periodStart = new Date(firstDayOfPeriod);
    const nextPeriod = new Date(periodStart);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    // Ovulation typically occurs 14 days before next period
    const ovulationDate = new Date(nextPeriod);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    // Ovulation window (2-3 days)
    const ovulationWindowStart = new Date(ovulationDate);
    ovulationWindowStart.setDate(ovulationWindowStart.getDate() - 1);
    const ovulationWindowEnd = new Date(ovulationDate);
    ovulationWindowEnd.setDate(ovulationWindowEnd.getDate() + 1);

    // Most likely conception date (middle of fertile window)
    const mostLikelyConception = new Date(ovulationDate);

    // Fertile week (days 10-17 of cycle, but adjusted for cycle length)
    const fertileStart = new Date(periodStart);
    fertileStart.setDate(fertileStart.getDate() + Math.floor(cycleLength * 0.35)); // ~35% of cycle
    const fertileEnd = new Date(periodStart);
    fertileEnd.setDate(fertileEnd.getDate() + Math.floor(cycleLength * 0.6)); // ~60% of cycle

    setResults({
      ovulationWindow: {
        start: ovulationWindowStart,
        end: ovulationWindowEnd,
      },
      mostLikelyConception,
      fertileWeek: {
        start: fertileStart,
        end: fertileEnd,
      },
    });
  };

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateShort = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Ovulation Date Calculator
          </h1>
          <p className="text-gray-700 text-center mt-2">
            Find your fertile window and ovulation date
          </p>
        </div>
      </header>

      {/* Main Calculator */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Today's Date */}
          <div className="text-center mb-6">
            <p className="text-gray-700 text-sm font-medium">
              Today: {today.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Input Form */}
          <div className="space-y-6">
            <div>
              <label htmlFor="periodDate" className="block text-sm font-semibold text-gray-800 mb-2">
                First day of last period
              </label>
              <input
                type="date"
                id="periodDate"
                value={firstDayOfPeriod}
                onChange={(e) => setFirstDayOfPeriod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-gray-900"
                max={today.toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label htmlFor="cycleLength" className="block text-sm font-semibold text-gray-800 mb-2">
                Average cycle length (days)
              </label>
              <input
                type="number"
                id="cycleLength"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                min="21"
                max="35"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg text-gray-900"
              />
              <p className="text-sm text-gray-600 mt-1 font-medium">
                Typical range: 21-35 days (default: 28)
              </p>
            </div>

            <button
              onClick={calculateOvulation}
              disabled={!firstDayOfPeriod}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-lg text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              Calculate Ovulation Date
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Your Results
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Estimated Ovulation Window</h4>
                    <p className="text-lg text-purple-700 font-bold">
                      {formatDate(results.ovulationWindow.start)} - {formatDateShort(results.ovulationWindow.end)}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 font-medium">
                      Most fertile period (2-3 days)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Most Likely Conception Date</h4>
                    <p className="text-lg text-pink-700 font-bold">
                      {formatDate(results.mostLikelyConception)}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 font-medium">
                      Peak fertility day
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Fertile Week Range</h4>
                    <p className="text-lg text-blue-700 font-bold">
                      {formatDate(results.fertileWeek.start)} - {formatDateShort(results.fertileWeek.end)}
                    </p>
                    <p className="text-sm text-gray-700 mt-1 font-medium">
                      Extended fertile period
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900 font-medium">
                  <strong>Disclaimer:</strong> This calculator provides estimates based on typical menstrual cycles. 
                  Results may vary and should not replace medical advice. Consult with a healthcare provider for 
                  personalized guidance.
                </p>
              </div>
            </div>
          )}

          {/* AdSense Ad Unit */}
          <div className="mt-8">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-xxxxxxxxxxxxxxx"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            {/* Note: Replace ca-pub-xxxxxxxxxxxxxxx with your actual AdSense publisher ID */}
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

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-4">
              <p className="text-sm font-medium">
                We use cookies to improve your experience and show personalized ads. 
                By continuing to use this site, you agree to our use of cookies.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={acceptCookies}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
