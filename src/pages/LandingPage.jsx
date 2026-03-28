/**
 * Landing Page
 * 
 * Public-facing page with animated background,
 * explaining the platform concept, highlighting gamification
 * features, and providing login/register/demo access.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import { useGame } from '../context/GameContext';

const features = [
  { icon: '⭐', title: 'Points System', description: 'Earn XP for every activity. Accuracy-based multipliers reward mastery over mere completion.' },
  { icon: '📈', title: 'Level Progression', description: 'Advance through 12 levels as you learn. Each level unlocks new content and recognition.' },
  { icon: '🏆', title: 'Badges & Achievements', description: '14 unique badges across milestones, consistency, mastery, and challenge categories.' },
  { icon: '🔥', title: 'Streak System', description: 'Build daily learning streaks. Consistency earns bonus points and exclusive badges.' },
  { icon: '🎯', title: 'Missions & Challenges', description: '8 structured missions that guide your learning journey with clear goals and rewards.' },
  { icon: '🏅', title: 'Leaderboard', description: 'Compare progress across multiple dimensions: points, badges, and streaks.' },
  { icon: '🔊', title: 'Sound Effects', description: 'Immersive audio feedback for every action — correct answers, level ups, and achievements.' },
  { icon: '📊', title: 'Analytics Dashboard', description: 'Track engagement metrics designed for educational research and evaluation.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginUser } = useGame();
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login'); // 'login' or 'register'
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const handleDemoAccess = () => {
    loginUser('Guest Student');
    navigate('/dashboard');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authName.trim()) {
      loginUser(authName);
      navigate('/dashboard');
    }
  };

  return (
    <div className="landing-page">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="landing-hero">
        <h1 className="landing-title">
          Learn Smarter with <span className="gradient">Gamification</span>
        </h1>

        <p className="landing-description">
          A research-oriented prototype demonstrating how gamification techniques
          — points, levels, badges, streaks, missions, and leaderboards — can enhance
          student motivation, engagement, and persistence in educational settings.
        </p>

        <div className="landing-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
          <button className="btn btn-primary btn-lg" onClick={() => { setModalType('register'); setShowModal(true); }}>
            ✨ Get Started
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => { setModalType('login'); setShowModal(true); }}>
            🔑 Log In
          </button>
          <button className="btn btn-secondary btn-lg" onClick={handleDemoAccess}>
            🚀 Guest Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features" id="features">
        <h2 className="landing-features-title">
          Gamification Techniques Demonstrated
        </h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Auth Modal (Mock) */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '32px', position: 'relative' }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', color: 'var(--text-muted)', fontSize: '1.2rem' }}
            >
              ✕
            </button>
            <h2 style={{ marginBottom: '24px', fontFamily: 'Space Grotesk', fontSize: '1.5rem', textAlign: 'center' }}>
              {modalType === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder={modalType === 'login' ? 'John Doe' : 'Jane Doe'}
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  style={{
                    padding: '12px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)',
                    color: 'white', outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="student@university.edu"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  style={{
                    padding: '12px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)',
                    color: 'white', outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  style={{
                    padding: '12px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)',
                    color: 'white', outline: 'none'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px', padding: '14px' }}>
                {modalType === 'login' ? 'Log In' : 'Register Account'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {modalType === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setModalType(modalType === 'login' ? 'register' : 'login')}
                style={{ background: 'transparent', color: 'var(--color-primary-light)', padding: 0, textDecoration: 'underline' }}
              >
                {modalType === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </div>
            
            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              *This is an academic prototype. No real credentials are required.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '48px',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700 }}>EduQuest — Gamification for Education Prototype</p>
        <p style={{ marginTop: '4px' }}>Master's Thesis in Computer Science • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
