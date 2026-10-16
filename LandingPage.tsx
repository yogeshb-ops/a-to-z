import { ShoppingBag, ArrowRight, Shirt, Footprints, Sparkles, Star } from 'lucide-react';
import type { Page } from '@/types';

interface LandingPageProps {
  onShopNow: () => void;
}

export default function LandingPage({ onShopNow }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-stone-950">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3839432/pexels-photo-3839432.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-950/90" />

      {/* Floating clothing pattern decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: '8%', left: '5%', size: 60, rot: -15, icon: Shirt },
          { top: '15%', right: '8%', size: 50, rot: 20, icon: ShoppingBag },
          { top: '45%', left: '10%', size: 45, rot: 10, icon: Star },
          { top: '60%', right: '6%', size: 55, rot: -25, icon: Footprints },
          { top: '75%', left: '15%', size: 40, rot: 30, icon: Shirt },
          { top: '30%', right: '20%', size: 35, rot: -10, icon: Sparkles },
        ].map((item, i) => (
          <div
            key={i}
            className="absolute text-amber-400/15 animate-pulse"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              transform: `rotate(${item.rot}deg)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s',
            }}
          >
            <item.icon size={item.size} strokeWidth={1.5} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Nav */}
        <nav className="px-6 md:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
              <Shirt className="text-stone-950" size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
              A to Z <span className="text-amber-400">Clothings</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-stone-300">
            <span className="hover:text-amber-400 transition-colors cursor-pointer">Home</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">Men's Wear</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">About</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">Contact</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs font-medium text-amber-300 tracking-wide uppercase">Premium Men's Fashion Store</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
            A to Z
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Clothings
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mb-2 leading-relaxed">
            One destination for all men's wear. Shirts, pants, t-shirts, shoes —
          </p>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mb-10 leading-relaxed">
            <span className="text-amber-400 font-semibold">200+ designs</span> available for online order.
          </p>

          {/* Category highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12">
            {[
              { icon: Shirt, label: 'Shirts', range: 'Rs.450 - 3000' },
              { icon: ShoppingBag, label: 'Pants', range: 'Rs.600 - 3500' },
              { icon: Star, label: 'T-Shirts', range: 'Round Necks' },
              { icon: Footprints, label: 'Shoes', range: 'Sneakers & More' },
            ].map((cat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 px-5 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/40 hover:bg-white/10 transition-all duration-300 cursor-default group"
              >
                <cat.icon size={28} className="text-amber-400 group-hover:scale-110 transition-transform" strokeWidth={1.8} />
                <span className="text-sm font-semibold text-white">{cat.label}</span>
                <span className="text-xs text-stone-400">{cat.range}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onShopNow}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30"
          >
            <ShoppingBag size={22} strokeWidth={2.5} />
            Shop Now
            <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="mt-6 text-sm text-stone-400">
            Select your designs, place your order, and we'll handle the rest.
          </p>
        </div>

        {/* Footer bar */}
        <div className="px-6 py-4 text-center text-xs text-stone-500 border-t border-white/5">
          A to Z Clothings &mdash; Quality Men's Wear Since Day One
        </div>
      </div>
    </div>
  );
}
