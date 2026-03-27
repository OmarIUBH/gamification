/**
 * Sidebar Navigation Component
 * 
 * Main navigation sidebar with sound effects on navigation,
 * links to all pages, user info footer, and mobile-responsive toggle.
 */

import { NavLink } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { playNav } from '../engine/soundEngine';

const navItems = [
  { path: '/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/activities', icon: '📚', label: 'Activities' },
  { path: '/achievements', icon: '🏆', label: 'Achievements' },
  { path: '/missions', icon: '🎯', label: 'Missions' },
  { path: '/leaderboard', icon: '🏅', label: 'Leaderboard' },
  { path: '/profile', icon: '👤', label: 'Profile' },
  { path: '/analytics', icon: '📈', label: 'Analytics' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { userName, userAvatar, levelInfo } = useGame();

  const handleNavClick = () => {
    playNav();
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="sidebar-logo-icon">🎮</span>
            <div className="sidebar-logo-text">
              <span>EduQuest</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <span className="nav-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Info Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <span className="sidebar-avatar">{userAvatar}</span>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{userName}</div>
              <div className="sidebar-user-level">
                {levelInfo.current.icon} Level {levelInfo.current.level} – {levelInfo.current.title}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
