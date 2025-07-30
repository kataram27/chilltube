import React, { useState, useEffect } from 'react';

interface Quote {
  text: string;
  author: string;
  category: string;
  meta?: {
    requestNumber: number;
    timestamp: number;
    processingTime: number;
  };
}

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [requestCount, setRequestCount] = useState(0);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);

    const requestNumber = requestCount + 1;
    const requestId = Math.random().toString(36).substring(7);
    
    console.log(`\n🚀 STARTING QUOTE REQUEST #${requestNumber}`);
    console.log('Request ID:', requestId);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestNumber: requestNumber,
          requestId: requestId,
          timestamp: Date.now()
        })
      });

      console.log('📡 Response received:');
      console.log('  - Status:', response.status);
      console.log('  - OK:', response.ok);

      const responseText = await response.text();
      console.log('📄 Raw response:', responseText);

      if (!responseText) {
        throw new Error('Empty response from server');
      }

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }

      // Check if it's an error response
      if (responseData.error) {
        console.error('❌ API returned error:', responseData.error);
        setError(responseData.error);
        setDebugInfo(responseData.debug);
        
        // Don't set a quote if there's an error
        return;
      }

      // Validate quote structure
      if (!responseData.text || !responseData.author || !responseData.category) {
        console.error('❌ Invalid quote structure:', responseData);
        throw new Error('Invalid quote structure received from API');
      }

      const newQuote: Quote = {
        text: responseData.text,
        author: responseData.author,
        category: responseData.category,
        meta: responseData.meta
      };

      console.log('✅ SUCCESS! Setting new quote:', newQuote);
      setQuote(newQuote);
      setRequestCount(requestNumber);
      setError(null);

    } catch (err: unknown) {
      console.error('❌ Request failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      
      // Only set fallback on first load
      if (requestNumber === 1 && !quote) {
        const fallbackQuote: Quote = {
          text: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          category: "motivation"
        };
        setQuote(fallbackQuote);
      }
    } finally {
      setLoading(false);
    }
  };

  const getNewQuote = () => {
    console.log('\n🔄 USER CLICKED NEW QUOTE');
    fetchQuote();
  };

  const shareQuote = () => {
    if (quote) {
      const text = `"${quote.text}" - ${quote.author}`;
      navigator.clipboard.writeText(text).then(() => {
        alert('Quote copied to clipboard!');
      }).catch(() => {
        alert('Unable to copy quote');
      });
    }
  };

  useEffect(() => {
    console.log('🎬 Component mounted - fetching initial quote');
    fetchQuote();
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-300">
            {requestCount === 0 ? 'Loading inspiring quote...' : `Generating quote #${requestCount + 1}...`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-500/30">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
          Quote of the Day
        </h1>
        {requestCount > 0 && (
          <p className="text-gray-400 text-sm mt-2">
            Quote #{requestCount} 
            {quote?.meta && ` • Generated in ${quote.meta.processingTime}ms`}
          </p>
        )}
      </div>

      {/* Debug Info */}
      {(error || debugInfo) && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <h3 className="text-red-300 font-semibold mb-2">🐛 Debug Information</h3>
          {error && (
            <div className="mb-3">
              <p className="text-red-200 text-sm"><strong>Error:</strong> {error}</p>
            </div>
          )}
          {debugInfo && (
            <div className="text-xs text-gray-300 bg-gray-800/50 p-2 rounded">
              <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
            </div>
          )}
          <button
            onClick={getNewQuote}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Quote Content */}
      {quote && (
        <div className="text-center mb-8">
          {/* Quote Text */}
          <div className="relative">
            <svg className="absolute -top-4 -left-4 w-8 h-8 text-purple-500/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
            <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed px-8 py-4">
              "{quote.text}"
            </blockquote>
            <svg className="absolute -bottom-4 -right-4 w-8 h-8 text-purple-500/30 rotate-180" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
          </div>

          {/* Author and Category */}
          <div className="mt-6">
            <p className="text-lg font-semibold text-purple-300">— {quote.author}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full font-medium capitalize border border-purple-500/30">
              {quote.category}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={getNewQuote}
          disabled={loading}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? 'Generating...' : 'New Quote'}
        </button>

        <button
          onClick={shareQuote}
          disabled={!quote}
          className="flex items-center justify-center px-6 py-3 bg-slate-800/50 text-purple-300 border-2 border-purple-500/50 rounded-lg hover:bg-slate-700/50 hover:border-purple-400 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Share Quote
        </button>
      </div>

      {/* Debug Console */}
      <div className="text-center mt-6 pt-6 border-t border-slate-700/50">
        <p className="text-gray-400 text-sm">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p className="text-purple-400 text-xs mt-1">
          💡 Check browser console (F12) for detailed debug logs
        </p>
      </div>
    </div>
  );
}