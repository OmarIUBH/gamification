/**
 * Landing Page
 * 
 * Public-facing page with animated background,
 * explaining the platform concept, highlighting gamification
 * features, and providing demo access.
 */

import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';

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

  const handleDemoAccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="landing-page">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-badge">🎓 Academic Research Prototype</div>

        <h1 className="landing-title">
          Learn Smarter with <span className="gradient">Gamification</span>
        </h1>

        <p className="landing-description">
          A research-oriented prototype demonstrating how gamification techniques
          — points, levels, badges, streaks, missions, and leaderboards — can enhance
          student motivation, engagement, and persistence in educational settings.
        </p>

        <div className="landing-actions">
          <button className="btn btn-primary btn-lg" onClick={handleDemoAccess}>
            🚀 Enter Demo
          </button>
          <a href="#features" className="btn btn-secondary btn-lg">
            ✨ Explore Features
          </a>
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
