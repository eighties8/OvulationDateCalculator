'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

  // Calendar utility functions
  const formatDateForCalendar = (date: Date): string => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const generateGoogleCalendarUrl = (title: string, startDate: Date, endDate?: Date, description?: string): string => {
    // Format dates in YYYYMMDD format for Google Calendar
    const formatDateForGoogle = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    };
    
    const start = formatDateForGoogle(startDate);
    const end = endDate ? formatDateForGoogle(endDate) : start;
    
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${start}/${end}`,
      details: description || 'Estimated based on your cycle input. Not medical advice.',
      sf: 'true',
      output: 'xml'
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const generateICSContent = (title: string, startDate: Date, endDate?: Date, description?: string): string => {
    const start = formatDateForCalendar(startDate);
    const end = endDate ? formatDateForCalendar(endDate) : start;
    const endExclusive = endDate ? formatDateForCalendar(new Date(endDate.getTime() + 24 * 60 * 60 * 1000)) : start;
    
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ovulation Calculator//Calendar Event//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@ovulationcalculator.com`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${endExclusive}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description || 'Estimated based on your cycle input. Not medical advice.'}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  };

  const downloadICSFile = (title: string, startDate: Date, endDate?: Date, description?: string): void => {
    const icsContent = generateICSContent(title, startDate, endDate, description);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 shadow-sm flex-shrink-0">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-20 -translate-y-8 translate-x-8"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-15 -translate-y-10"></div>
        <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-25 translate-y-6"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-15"></div>
        <div className="absolute top-1/4 right-1/2 w-8 h-8 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-25"></div>
        
        <div className="max-w-4xl mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 relative">
                <Image
                  src="/logo.svg"
                  alt="Ovulation Calculator Logo"
                  width={48}
                  height={48}
                  className="drop-shadow-sm"
                />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>
                  Ovulation Date Calculator
                </h1>
                <p className="text-sm text-gray-600">
                  Find your fertile window
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-700 text-lg" style={{fontFamily: "'Playfair Display', serif"}}>
                Track your cycle and discover your most fertile days
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Calculator */}
      <main className={`flex-1 max-w-4xl mx-auto px-4 py-8 w-full ${!results ? 'flex items-center justify-center' : ''}`}>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 w-full">
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
              What was the first day of your last period?
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
              What is your average cycle length? (days)
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
            <div className="mt-12 space-y-8 animate-fade-in">
              {/* Results Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
                  Your Fertility Results
                </h3>
                <p className="text-gray-600 text-lg">
                  Based on your cycle data, here are your key fertility dates
                </p>
              </div>

              {/* Results Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Ovulation Window Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-10 -translate-y-6 translate-x-6"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>Ovulation Window</h4>
                    </div>
                    <div className="bg-white rounded-2xl p-6 mb-4 shadow-md">
                      <p className="text-2xl font-bold text-purple-700 mb-1">
                        {formatDate(results.ovulationWindow.start)}
                      </p>
                      <p className="text-lg font-semibold text-purple-600">
                        to {formatDateShort(results.ovulationWindow.end)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 font-medium flex items-center">
                      <span className="text-2xl mr-2">🎯</span>
                      Most fertile period (2-3 days)
                    </p>
                    
                    {/* Calendar Buttons */}
                    <div className="mt-6 space-y-3">
                      <a
                        href={generateGoogleCalendarUrl(
                          'Ovulation Window',
                          results.ovulationWindow.start,
                          results.ovulationWindow.end,
                          'Your most fertile period - estimated based on your cycle input. Not medical advice.'
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Add to Google Calendar
                      </a>
                      <button
                        onClick={() => downloadICSFile(
                          'Ovulation Window',
                          results.ovulationWindow.start,
                          results.ovulationWindow.end,
                          'Your most fertile period - estimated based on your cycle input. Not medical advice.'
                        )}
                        className="w-full flex items-center justify-center px-4 py-2 bg-white border border-purple-300 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-50 transition-all duration-200 shadow-md"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                        Download ICS
                      </button>
                    </div>
                  </div>
                </div>

                {/* Most Likely Conception Card - Enhanced */}
                <div className="relative overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-8 border-2 border-pink-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 scale-105">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full opacity-15 -translate-y-8 translate-x-8"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-20"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>Peak Fertility</h4>
                        <p className="text-xs text-pink-600 font-semibold uppercase tracking-wide">Most Important</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 mb-4 shadow-lg border border-pink-200">
                      <p className="text-2xl font-bold text-pink-700 mb-1">
                        {formatDate(results.mostLikelyConception)}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-pink-500 mr-2">⭐</span>
                        <span className="text-sm font-semibold text-pink-600">Peak fertility day</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 font-medium flex items-center">
                      <span className="text-2xl mr-2">💫</span>
                      Highest chance of conception
                    </p>
                    
                    {/* Calendar Buttons */}
                    <div className="mt-6 space-y-3">
                      <a
                        href={generateGoogleCalendarUrl(
                          'Peak Fertility Day',
                          results.mostLikelyConception,
                          undefined,
                          'Your peak fertility day - estimated based on your cycle input. Not medical advice.'
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all duration-200 shadow-md"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Add to Google Calendar
                      </a>
                      <button
                        onClick={() => downloadICSFile(
                          'Peak Fertility Day',
                          results.mostLikelyConception,
                          undefined,
                          'Your peak fertility day - estimated based on your cycle input. Not medical advice.'
                        )}
                        className="w-full flex items-center justify-center px-4 py-2 bg-white border border-pink-300 text-pink-700 text-sm font-medium rounded-lg hover:bg-pink-50 transition-all duration-200 shadow-md"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                        Download ICS
                      </button>
                    </div>
                  </div>
                </div>

                {/* Fertile Week Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-10 -translate-y-6 translate-x-6"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>Fertile Week</h4>
                    </div>
                    <div className="bg-white rounded-2xl p-6 mb-4 shadow-md">
                      <p className="text-2xl font-bold text-blue-700 mb-1">
                        {formatDate(results.fertileWeek.start)}
                      </p>
                      <p className="text-lg font-semibold text-blue-600">
                        to {formatDateShort(results.fertileWeek.end)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 font-medium flex items-center">
                      <span className="text-2xl mr-2">📅</span>
                      Extended fertile period
                    </p>
                    
                    {/* Calendar Buttons */}
                    <div className="mt-6 space-y-3">
                      <a
                        href={generateGoogleCalendarUrl(
                          'Fertile Week',
                          results.fertileWeek.start,
                          results.fertileWeek.end,
                          'Your extended fertile period - estimated based on your cycle input. Not medical advice.'
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Add to Google Calendar
                      </a>
                      <button
                        onClick={() => downloadICSFile(
                          'Fertile Week',
                          results.fertileWeek.start,
                          results.fertileWeek.end,
                          'Your extended fertile period - estimated based on your cycle input. Not medical advice.'
                        )}
                        className="w-full flex items-center justify-center px-4 py-2 bg-white border border-blue-300 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-md"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                        Download ICS
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Box */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-200 shadow-lg mt-12">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>Fertility Summary</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-4"></span>
                    <span className="text-gray-700">Your most fertile days are <strong className="text-purple-700">{formatDate(results.ovulationWindow.start)}</strong> to <strong className="text-purple-700">{formatDateShort(results.ovulationWindow.end)}</strong></span>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="w-3 h-3 bg-pink-500 rounded-full mr-4"></span>
                    <span className="text-gray-700">Peak fertility occurs on <strong className="text-pink-700">{formatDate(results.mostLikelyConception)}</strong></span>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-4"></span>
                    <span className="text-gray-700">Extended fertile period: <strong className="text-blue-700">{formatDate(results.fertileWeek.start)}</strong> to <strong className="text-blue-700">{formatDateShort(results.fertileWeek.end)}</strong></span>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-xl shadow-sm">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-4"></span>
                    <span className="text-gray-700">Based on a <strong className="text-green-700">{cycleLength}-day cycle</strong></span>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-3xl p-8 mt-12">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center mr-5 flex-shrink-0 shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-yellow-900 mb-3 text-lg" style={{fontFamily: "'Playfair Display', serif"}}>Important Disclaimer</h5>
                    <p className="text-sm text-yellow-800 leading-relaxed">
                      This calculator provides estimates based on typical menstrual cycles. Results may vary and should not replace medical advice. Consult with a healthcare provider for personalized guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AdSense Ad Unit */}
          {/* 
          <div className="mt-12">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-xxxxxxxxxxxxxxx"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
          */}
          {/* Note: Replace ca-pub-xxxxxxxxxxxxxxx with your actual AdSense publisher ID */}
        </div>
      </main>

      {/* SEO Navigation Menu */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center" style={{fontFamily: "'Playfair Display', serif"}}>
            Fertility Resources & Guides
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <a 
              href="/calculate-ovulation-date.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              Calculate Ovulation Date
            </a>
            <a 
              href="/ovulation-calculator-by-due-date.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              Calculator by Due Date
            </a>
            <a 
              href="/ovulation-calculator-from-lmp.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              LMP Calculator
            </a>
            <a 
              href="/track-ovulation-calculator.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              Track Ovulation
            </a>
            <a 
              href="/ovulation-calculator-for-irregular-periods.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              Irregular Periods
            </a>
            <a 
              href="/ovulation-calculator-28-day-cycle.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              28 Day Cycle
            </a>
            <a 
              href="/ovulation-calculator-with-calendar.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              Calendar Calculator
            </a>
            <a 
              href="/calculate-fertile-days.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              Calculate Fertile Days
            </a>
            <a 
              href="/when-do-you-ovulate.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              When Do You Ovulate
            </a>
            <a 
              href="/ovulation-calculator-for-conception.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              Conception Calculator
            </a>
            <a 
              href="/fertilization-date-calculator.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              Fertilization Date Calculator
            </a>
            <a 
              href="/after-menses-how-many-days-to-ovulation.html" 
              className="block p-3 text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-purple-700"
            >
              Days After Menses to Ovulation
            </a>
          </div>
        </div>
      </div>

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
