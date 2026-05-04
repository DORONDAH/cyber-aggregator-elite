import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntelItem {
  id: string;
  source: string;
  title: string;
  summary: string;
  vector: string;
  criticality: number;
}

function App() {
  const [activePane, setActivePane] = useState<'feeds' | 'analysis' | 'threats'>('feeds');
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
    const interval = setInterval(fetchIntel, 10000); // Sync every 10s
    return () => clearInterval(interval);
  }, []);

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
            <div className="flex items-center space-x-2 text-tertiary">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span>Active Threats: {intel.filter(i => i.criticality > 0.8).length}</span>
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
              <span className="text-[10px] font-mono text-primary/60 uppercase">Sync_Rate: 10s</span>
            </div>
            <div className="p-8 space-y-6 overflow-y-auto h-full pb-24">
              {isLoading ? (
                <div className="h-full flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              ) : (
                intel.map((item) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={item.id}
                    className={`space-y-3 p-6 bg-surface-container-high/40 rounded-m3-l border transition-all cursor-pointer group/item ${item.criticality > 0.8 ? 'border-tertiary/40 bg-tertiary/5 shadow-[0_0_20px_rgba(255,61,0,0.1)]' : 'border-primary/5 hover:border-primary/20'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-2">
                        <span className={`text-[9px] font-mono px-2 py-1 rounded ${item.criticality > 0.8 ? 'bg-tertiary text-white' : 'bg-primary/10 text-primary'}`}>
                          SOURCE: {item.source}
                        </span>
                        <span className="text-[9px] font-mono text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                          VECTOR: {item.vector}
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono font-black ${item.criticality > 0.8 ? 'text-tertiary animate-pulse' : 'text-on-surface-variant'}`}>
                        CRITICALITY: {(item.criticality * 100).toFixed(0)}%
                      </span>
                    </div>
                    <h4 className={`text-lg font-black transition-colors ${item.criticality > 0.8 ? 'text-on-surface group-hover:text-tertiary' : 'group-hover:text-primary'}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 font-medium">
                      {item.summary}
                    </p>
                  </motion.div>
                ))
              )}
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
                   { label: 'Network Load', val: '42%' },
                   { label: 'Data Integrity', val: '99.9%' },
                   { label: 'Threat Mitigation', val: 'Active' },
                   { label: 'Intelligence Sync', val: 'Nominal' }
                 ].map(stat => (
                   <div key={stat.label} className="flex justify-between items-end border-b border-primary/5 pb-2">
                     <span className="text-xs font-bold text-on-surface-variant uppercase">{stat.label}</span>
                     <span className="text-lg font-mono font-black text-primary glow-text">{stat.val}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 p-8 rounded-m3-xl space-y-4 shadow-xl shadow-primary/5 relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
              </div>
              <h3 className="relative z-10 text-[10px] font-black text-primary uppercase tracking-widest">Stitch Loyalty</h3>
              <p className="relative z-10 text-sm font-bold text-on-surface serif italic">Cyber-Pro Command Tier Active.</p>
            </div>
          </section>
        </div>

        {/* Status Footer */}
        <footer className="flex justify-between items-center px-4 pt-6 text-[9px] font-mono text-on-surface-variant opacity-40 uppercase tracking-[0.4em]">
          <p>© 2026 STITCH-ELITE PROTOCOL</p>
          <p>GEO_STATION: ALPHA_CENTAURI</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
