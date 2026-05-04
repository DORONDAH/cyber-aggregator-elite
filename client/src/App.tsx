import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveBackground from './components/InteractiveBackground';

interface IntelItem {
  id: string;
  source: string;
  title: string;
  summary: string;
  vector: string;
  criticality: number;
}

function App() {
  const [intel, setIntel] = useState<IntelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIntel = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/intel');
        const json = await response.json();
        setIntel(json.data);
      } catch (err) {
        console.error('Intelligence synchronization failed');
      } finally {
        setIsLoading(false);
      }
    };
    fetchIntel();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0E14] flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-primary font-black text-[10px] uppercase tracking-[0.5em]">Establishing Neural Link...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full relative overflow-x-auto flex items-center justify-center py-32 bg-[#0A0E14]">
      <InteractiveBackground />

      {/* THE DOSSIER STANDARD - Cyber Aggregator Rebirth */}
      <div className="z-10 w-full max-w-5xl px-6 space-y-20 text-center">

        {/* 1. The Manifestation Hero */}
        <header className="space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[10rem] leading-none drop-shadow-[0_0_50px_rgba(0,229,255,0.3)]"
          >
            🛡️
          </motion.div>
          <div className="space-y-2">
            <p className="text-[11px] font-black text-primary uppercase tracking-[0.6em]">System Manifested</p>
            <h2 className="text-7xl md:text-8xl font-black text-on-surface serif italic tracking-tighter uppercase">Intelligence Nominal</h2>
          </div>
        </header>

        {/* 2. The Strategic Profile */}
        <section className="space-y-4 px-12">
          <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">Strategic Profile</h3>
          <p className="text-2xl font-medium text-on-surface-variant leading-relaxed serif italic">
            "Your operational environment is synchronized with Global Net.
            Current data integrity is verified at <span className="text-primary font-black font-mono">99.9%</span>. No immediate critical vectors detected."
          </p>
        </section>

        {/* 3. Architectural Traits (Active Intel Streams) */}
        <section className="space-y-12">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">Architectural Traits</h3>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Verified by Stitch Cyber-Pro 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {intel.map(item => (
              <div
                key={item.id}
                className={`p-10 bg-white/5 border rounded-[3rem] backdrop-blur-2xl text-left space-y-4 shadow-2xl group hover:scale-[1.02] transition-all ${item.criticality > 0.8 ? 'border-tertiary/40 shadow-tertiary/5' : 'border-primary/10'}`}
              >
                <span className={`material-symbols-outlined text-3xl ${item.criticality > 0.8 ? 'text-tertiary animate-pulse' : 'text-primary'}`}>
                  {item.criticality > 0.8 ? 'warning' : 'verified'}
                </span>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono text-primary uppercase tracking-widest">{item.source}</span>
                    <span className="text-[9px] font-mono text-on-surface-variant uppercase">{item.vector}</span>
                  </div>
                  <h4 className="text-2xl font-black text-on-surface leading-tight italic serif">{item.title}</h4>
                </div>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. The Intelligence Pass */}
        <section className="space-y-8 pt-10">
          <div className="flex flex-col items-center space-y-2">
             <h3 className="text-[11px] font-black text-primary uppercase tracking-[0.4em]">The Command Pass</h3>
             <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Elite Tier Authorized</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group cursor-pointer">
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-primary text-8xl">shield_with_heart</span>
             </div>
             <div className="relative z-10 space-y-4">
                <h3 className="text-3xl font-black serif italic text-on-surface">Initialize Elite Command</h3>
                <p className="text-xs font-bold leading-relaxed text-on-surface-variant max-w-sm mx-auto">
                   Unlock deep neural analysis and synchronize your operational theater with the Global Intelligence Gateway.
                </p>
                <div className="pt-6">
                   <button className="px-12 py-5 bg-primary text-on-primary rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                      Join Tier One
                   </button>
                </div>
             </div>
          </div>
        </section>

        {/* Footer Protocol */}
        <footer className="pt-16">
          <p className="text-[10px] font-mono text-on-surface-variant opacity-30 uppercase tracking-[0.6em]">
            STATION: ALPHA_CENTAURI • DOSSIER_MODE: ACTIVE
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;
