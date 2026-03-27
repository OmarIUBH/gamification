/**
 * Animated Background Component
 * 
 * Floating particles, gradient orbs, and geometric shapes
 * that create an immersive gaming-inspired atmosphere.
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

    const particles = [];
    const PARTICLE_COUNT = 50;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.5 ? 270 + Math.random() * 30 : 180 + Math.random() * 20,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    const orbs = [
      { x: width * 0.2, y: height * 0.3, radius: 200, hue: 270, speed: 0.0003 },
      { x: width * 0.8, y: height * 0.7, radius: 250, hue: 180, speed: 0.0004 },
      { x: width * 0.5, y: height * 0.1, radius: 180, hue: 330, speed: 0.0002 },
    ];

    let animId;
    let time = 0;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      time++;

      // Floating gradient orbs
      for (let o = 0; o < orbs.length; o++) {
        const orb = orbs[o];
        const ox = Math.sin(time * orb.speed) * 50;
        const oy = Math.cos(time * orb.speed * 1.3) * 40;
        const grad = ctx.createRadialGradient(
          orb.x + ox, orb.y + oy, 0,
          orb.x + ox, orb.y + oy, orb.radius
        );
        grad.addColorStop(0, 'hsla(' + orb.hue + ', 70%, 50%, 0.06)');
        grad.addColorStop(0.5, 'hsla(' + orb.hue + ', 70%, 50%, 0.02)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;

        if (p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }

        const glowSize = p.size + Math.sin(p.pulse);
        const alpha = p.opacity + Math.sin(p.pulse) * 0.12;

        // Glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.abs(glowSize * 4), 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ', 80%, 60%, ' + (alpha * 0.08) + ')';
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.abs(glowSize), 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ', 80%, 70%, ' + alpha + ')';
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(124, 58, 237, ' + (0.06 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

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
      }}
    />
  );
}
