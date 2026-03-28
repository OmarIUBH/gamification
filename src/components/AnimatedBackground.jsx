/**
 * Animated Background Component (Teen / Gaming Edition)
 * 
 * Features a dynamic, synthwave-inspired perspective moving grid
 * and floating neon gaming symbols to create an engaging gamer aesthetic.
 */

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animId;
    let time = 0;

    // Programming & Math Symbols
    const symbols = [];
    const SYMBOL_COUNT = 30;
    const symbolTypes = ['{ }', '< />', '[ ]', '()', '∑', '∫', 'π', 'ƒ(x)', '=>', '++'];
    const colors = [
      '#FF006E', // Neon Pink
      '#00F5FF', // Neon Cyan
      '#7C3AED', // Neon Purple
      '#06D6A0'  // Neon Green
    ];

    for (let i = 0; i < SYMBOL_COUNT; i++) {
      symbols.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 20 + 20, // Slightly larger for text readability
        type: symbolTypes[Math.floor(Math.random() * symbolTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: (Math.random() * 0.5 + 0.2) * -1, // Float upwards
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.3 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      time += 0.5;

      // 1. Draw glowing ambient orbs in the background
      const orbRad1 = Math.min(width, height) * 0.8;
      const grad1 = ctx.createRadialGradient(width * 0.8, height * 0.2, 0, width * 0.8, height * 0.2, orbRad1);
      grad1.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const orbRad2 = Math.min(width, height) * 0.9;
      const grad2 = ctx.createRadialGradient(width * 0.2, height * 0.9, 0, width * 0.2, height * 0.9, orbRad2);
      grad2.addColorStop(0, 'rgba(0, 245, 255, 0.06)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Moving Cyberpunk/Synthwave Grid at the bottom
      ctx.save();
      ctx.translate(width / 2, height / 2);
      // Create perspective by pitching the grid
      ctx.scale(1, 0.3); // Flatten vertically
      
      const gridSize = 60;
      const gridOffset = time % gridSize;
      const viewDist = Math.max(width, height) * 1.5;
      
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)'; // Purple grid
      ctx.lineWidth = 2; // Thicker line for better visibility
      
      // Horizontal lines (moving forward)
      for (let y = -viewDist; y < viewDist; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(-viewDist, y + gridOffset);
        ctx.lineTo(viewDist, y + gridOffset);
        
        // Fade out lines based on distance from center Y
        const dist = Math.abs(y + gridOffset);
        const alpha = Math.max(0, 0.25 - (dist / viewDist) * 0.25);
        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
        ctx.stroke();
      }

      // Vertical lines (expanding from center)
      for (let x = -viewDist; x < viewDist; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, -viewDist);
        ctx.lineTo(x, viewDist);
        
        const dist = Math.abs(x);
        const alpha = Math.max(0, 0.25 - (dist / viewDist) * 0.25);
        ctx.strokeStyle = `rgba(0, 245, 255, ${alpha})`; // Cyan vertical lines
        ctx.stroke();
      }
      ctx.restore();

      // 3. Draw Floating Programming & Math Symbols
      symbols.forEach(sym => {
        sym.y += sym.speedY;
        sym.x += sym.speedX;
        sym.rotation += sym.rotSpeed;

        // Wrap around screen
        if (sym.y < -50) sym.y = height + 50;
        if (sym.x < -50) sym.x = width + 50;
        if (sym.x > width + 50) sym.x = -50;

        ctx.save();
        ctx.translate(sym.x, sym.y);
        ctx.rotate(sym.rotation);
        
        // Add neon glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = sym.color;
        ctx.globalAlpha = sym.opacity + (Math.sin(time * 0.05 + sym.x) * 0.1); 

        // Draw text symbol
        ctx.font = `bold ${sym.size}px "Space Grotesk", sans-serif`;
        ctx.fillStyle = sym.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sym.type, 0, 0);

        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        background: '#0a0a16', // Deep dark blue base
      }}
    />
  );
}
