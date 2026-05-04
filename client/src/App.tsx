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
  const [activePane, setActivePane] = useState<'feeds' | 'analysis' | 'threats'>('feeds');
  const [intel, setIntel] = useState<IntelItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState(1); // JS Option: User-controlled intensity

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
    const interval = setInterval(fetchIntel, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Phase 9: Interactive Stitched Atmosphere */}
      <InteractiveBackground />

      <div className="z-10 w-full max-w-7xl flex flex-col space-y-6 px-6 py-12">
        {/* Global Top Bar */}
        <header className="flex justify-between items-end border-b border-primary/20 pb-4 px-2 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 180 }}
              className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-m3-m flex items-center justify-center cursor-help"
            >
              <span className="material-symbols-outlined text-primary">security</span>
            </motion.div>
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Stitch: Dynamic-Pro</p>
              <h1 className="text-2xl font-black text-on-surface tracking-tighter uppercase">Intelligence Command</h1>
            </div>
          </div>

          {/* JS Option: Interface Controls */}
          <div className="flex items-center space-x-6">
             <div className="hidden md:flex items-center space-x-3 bg-surface-container/40 p-2 px-4 rounded-full border border-outline/10">
                <span className="text-[9px] font-black uppercase text-on-surface-variant">Glow</span>
                <input
                  type="range" min="0.5" max="2" step="0.1"
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(Number(e.target.value))}
                  className="w-20 h-1 accent-primary appearance-none bg-primary/20 rounded-full cursor-pointer"
                />
             </div>
             <div className="hidden md:flex space-x-8 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Sync: Nominal</span>
              </div>
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
                className={`w-14 h-14 rounded-m3-m flex items-center justify-center transition-all ${activePane === pane ? 'bg-primary text-on-primary shadow-lg' : 'bg-surface-container/60 text-on-surface-variant hover:text-primary border border-primary/5 hover:bg-primary/5'}`}
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
              <span className="text-[10px] font-mono text-primary/60 uppercase tracking-tighter">Latency: 12ms</span>
            </div>
            <div className="p-8 space-y-6 overflow-y-auto h-full pb-24 no-scrollbar">
              {isLoading ? (
                <div className="h-full flex items-center justify-center text-primary/40 font-mono text-xs">INITIALIZING_NEURAL_LINK...</div>
              ) : (
                intel.map((item) => (
                  <motion.div
                    whileHover={{
                      scale: 1.01,
                      rotateX: -2,
                      rotateY: 2,
                      z: 10
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id}
                    className={`space-y-3 p-6 bg-surface-container/40 backdrop-blur-md rounded-m3-l border transition-all cursor-pointer group/item ${item.criticality > 0.8 ? 'border-tertiary/40 shadow-[0_0_30px_rgba(255,61,0,0.1)]' : 'border-primary/5 hover:border-primary/20'}`}
                    style={{
                      filter: `drop-shadow(0 0 ${glowIntensity * (item.criticality > 0.8 ? 10 : 2)}px ${item.criticality > 0.8 ? 'rgba(255,61,0,0.2)' : 'rgba(0,229,255,0.1)'})`,
                      transformStyle: 'preserve-3d',
                      perspective: '1000px'
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-2">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${item.criticality > 0.8 ? 'bg-tertiary text-white' : 'bg-primary/10 text-primary'}`}>
                          SOURCE: {item.source}
                        </span>
                        <span className="text-[9px] font-mono text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded border border-white/5">
                          {item.vector}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-mono font-black ${item.criticality > 0.8 ? 'text-tertiary animate-pulse' : 'text-primary'}`}>
                          {item.criticality > 0.8 ? '!! CRITICAL_THREAT !!' : 'NOMINAL_STATUS'}
                        </span>
                        <span className="text-[8px] font-mono text-on-surface-variant opacity-40">VECTOR_SIG: ${item.id.repeat(4)}</span>
                      </div>
                    </div>
                    <h4 className="text-xl font-black text-on-surface group-hover:text-primary transition-colors serif italic">
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
            <div className="command-pane flex-1 p-8 space-y-8 relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
               <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Analytics</h3>
               <div className="space-y-6 relative z-10">
                 {[
                   { label: 'Data Throughput', val: 84 },
                   { label: 'Intelligence Depth', val: 92 },
                   { label: 'Buffer Integrity', val: 42 }
                 ].map(stat => (
                   <div key={stat.label} className="space-y-2">
                     <div className="flex justify-between items-end">
                       <span className="text-[10px] font-black text-on-surface-variant uppercase">{stat.label}</span>
                       <span className="text-lg font-mono font-black text-primary mono glow-text">{stat.val}%</span>
                     </div>
                     <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.val}%` }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                        />
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-primary/10 border border-primary/20 p-8 rounded-[2.5rem] space-y-4 shadow-2xl relative group cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-primary text-5xl">verified_user</span>
              </div>
              <h3 className="relative z-10 text-[10px] font-black text-primary uppercase tracking-[0.4em]">The Command Pass</h3>
              <p className="relative z-10 text-sm font-bold text-on-surface serif italic leading-snug">Elevate your operational intelligence to the Elite Command Tier.</p>
              <div className="pt-4 flex justify-end">
                <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Status Footer */}
        <footer className="flex justify-between items-center px-4 pt-6 text-[9px] font-mono text-on-surface-variant opacity-40 uppercase tracking-[0.6em]">
          <p>STITCH_VERSION: 2.1.84</p>
          <p>SYNC_STATUS: ENCRYPTED</p>
        </footer>
      </div>
    </main>
  );
}

export default App;
