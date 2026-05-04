import React, { useEffect, useState } from 'react';

const InteractiveBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0E14]">
      {/* Dynamic JS-Driven Mesh Gradients */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out opacity-40"
        style={{
          background: `
            radial-gradient(at ${mousePos.x}% ${mousePos.y}%, rgba(0, 229, 255, 0.15) 0px, transparent 50%),
            radial-gradient(at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(96, 125, 139, 0.1) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(10, 14, 20, 1) 0px, #0A0E14 100%)
          `
        }}
      />
      {/* Static 4K Texture Overlay */}
      <div className="absolute inset-0 bg-cyber-hero bg-cover bg-center mix-blend-overlay opacity-20" />
      <div className="absolute inset-0 cyan-scanline opacity-20" />
    </div>
  );
};

export default InteractiveBackground;
