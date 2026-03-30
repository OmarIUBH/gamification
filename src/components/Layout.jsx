/**
 * Layout Component
 * 
 * App shell wrapping all authenticated pages with
 * sidebar navigation, toast notifications, and
 * animated background particles.
 */

import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ToastContainer from './ToastContainer';
import AnimatedBackground from './AnimatedBackground';
import { initAudio } from '../engine/soundEngine';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Resume AudioContext on first global interaction
  useEffect(() => {
    const handleFirstInteraction = async () => {
      await initAudio();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="app-layout">
      <AnimatedBackground />

      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="app-main">
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
}
