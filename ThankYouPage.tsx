import { useEffect, useState } from 'react';
import { Heart, ShoppingBag, Home } from 'lucide-react';

interface ThankYouPageProps {
  onBackHome: () => void;
}

export default function ThankYouPage({ onBackHome }: ThankYouPageProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-stone-800 flex items-center justify-center px-6">
      {/* Animated decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-600/5 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Floating hearts decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-amber-400/10 animate-pulse"
            style={{
              top: `${15 + i * 10}%`,
              left: `${5 + (i * 13) % 90}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.5 + i * 0.3}s`,
            }}
          >
            <Heart size={20 + i * 4} strokeWidth={1.5} />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Animated check circle */}
        <div className="relative mx-auto mb-8 w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/30">
            <ShoppingBag size={42} className="text-stone-950" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
            Thank You
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-stone-300 font-medium mb-3">
          for purchasing from A to Z Clothings
        </p>

        <p className="text-stone-400 max-w-md mx-auto mb-10 leading-relaxed">
          Your order has been received and confirmed. We'll process it right away and
          notify you with updates. Shop with us again soon!
        </p>

        <div className="inline-flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onBackHome}
            className="flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20"
          >
            <Home size={20} />
            Back to Home
          </button>

          <div className="text-sm text-stone-500">
            A to Z Clothings &mdash; Quality Men's Wear
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </div>
  );
}
