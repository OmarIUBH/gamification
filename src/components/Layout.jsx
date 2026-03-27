/**
 * Layout Component
 * 
 * App shell wrapping all authenticated pages with
 * sidebar navigation, toast notifications, and
 * animated background particles.
 */

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ToastContainer from './ToastContainer';
import AnimatedBackground from './AnimatedBackground';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
