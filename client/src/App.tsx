import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activePane, setActivePane] = useState<'feeds' | 'analysis' | 'threats'>('feeds');

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative bg-cyber-hero bg-cover bg-center">
      {/* Professional Cyber Overlay */}
      <div className="absolute inset-0 cyber-mesh z-0 pointer-events-none" />
      <div className="absolute inset-0 cyan-scanline z-0 pointer-events-none opacity-40" />

      <div className="z-10 w-full max-w-7xl flex flex-col space-y-6 px-6 py-12">
        {/* Global Top Bar - Aligned with SkyBound Hierarchy */}
        <header className="flex justify-between items-end border-b border-primary/20 pb-4 px-2">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-m3-m flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">security</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Stitch: Cyber-Pro</p>
              <h1 className="text-2xl font-black text-on-surface tracking-tighter uppercase">Intelligence Command</h1>
            </div>
          </div>
          <div className="hidden md:flex space-x-8 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>System: Nominal</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-tertiary">Threat Level: Low</span>
            </div>
          </div>
        </header>

        {/* Multi-Pane Intelligence Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[70vh]">
          {/* Side Rail Navigation */}
          <aside className="lg:col-span-1 flex flex-row lg:flex-col items-center justify-center lg:justify-start lg:pt-8 space-x-4 lg:space-x-0 lg:space-y-6">
            {['feeds', 'analysis', 'threats'].map((pane) => (
              <button
                key={pane}
                onClick={() => setActivePane(pane as any)}
                className={`w-14 h-14 rounded-m3-m flex items-center justify-center transition-all ${activePane === pane ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container text-on-surface-variant hover:text-primary border border-primary/5'}`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {pane === 'feeds' ? 'rss_feed' : pane === 'analysis' ? 'monitoring' : 'warning'}
                </span>
              </button>
            ))}
          </aside>

          {/* Main Intelligence Feed */}
          <section className="lg:col-span-7 command-pane relative group">
            <div className="bg-primary/5 px-6 py-4 border-b border-primary/10 flex justify-between items-center">
              <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center space-x-2">
                <span className="material-symbols-outlined text-sm">terminal</span>
                <span>Active Intel Streams</span>
              </h3>
              <span className="text-[10px] font-mono text-primary/60">AUTO_REFRESH: ACTIVE</span>
            </div>
            <div className="p-8 space-y-6 overflow-y-auto h-full pb-24">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3 p-6 bg-surface-container-high/40 rounded-m3-l border border-primary/5 hover:border-primary/20 transition-all cursor-pointer group/item">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-primary px-2 py-1 bg-primary/10 rounded">SOURCE: GLOBAL_NET</span>
                    <span className="text-[9px] font-mono text-on-surface-variant">T-MINUS: {i}H</span>
                  </div>
                  <h4 className="text-lg font-black group-hover:text-primary transition-colors">Critical Infrastructure Update: Neural Network Expansion</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 font-medium">
                    New architecture paradigms detected in metropolitan data centers. Stitch intelligence protocol suggests immediate synchronization...
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Analysis & Visualization */}
          <section className="lg:col-span-4 flex flex-col space-y-6">
            <div className="command-pane flex-1 p-8 space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                 <span className="material-symbols-outlined text-6xl">query_stats</span>
               </div>
               <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">Statistical Analysis</h3>
               <div className="space-y-4">
                 {[
                   { label: 'Network Load', val: '84%' },
                   { label: 'Data Integrity', val: '99.9%' },
                   { label: 'Threat Mitigation', val: 'Active' }
                 ].map(stat => (
                   <div key={stat.label} className="flex justify-between items-end border-b border-primary/5 pb-2">
                     <span className="text-xs font-bold text-on-surface-variant uppercase">{stat.label}</span>
                     <span className="text-lg font-mono font-black text-primary glow-text">{stat.val}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="bg-tertiary/10 border border-tertiary/20 p-8 rounded-m3-xl space-y-4 shadow-xl shadow-tertiary/5 relative group cursor-pointer">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-tertiary">emergency</span>
              </div>
              <h3 className="text-[10px] font-black text-tertiary uppercase tracking-widest">Emergency Broadcast</h3>
              <p className="text-sm font-bold text-on-surface serif italic">Total Intelligence Synchronization Initialized.</p>
            </div>
          </section>
        </div>

        {/* Status Footer */}
        <footer className="flex justify-between items-center px-4 pt-6 text-[9px] font-mono text-on-surface-variant opacity-40 uppercase tracking-[0.4em]">
          <p>© 2026 STITCH-ELITE PROTOCOL</p>
          <p>STATION: ALPHA_CENTAURI</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
