/**
 * Student Dashboard Page
 * 
 * Central hub showing the student's current gamification status:
 * points, level, badges, active missions, streak, achievements,
 * overall progress, and motivational summary.
 */

import { useGame } from '../context/GameContext';
import { computeAnalytics } from '../engine/analyticsEngine';
import { getAllBadgesWithStatus } from '../engine/badgeEngine';
import ProgressBar from '../components/ProgressBar';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const game = useGame();
  const analytics = computeAnalytics(game, game.activityLog);
  const badges = getAllBadgesWithStatus(game.badgesEarned);
  const recentBadges = badges.filter((b) => b.unlocked).slice(-4);
  const activeMissions = game.missionProgress.filter((m) => !m.isCompleted).slice(0, 3);

  // Motivational message
  const getMotivation = () => {
    if (game.activitiesCompleted === 0) return "Welcome! Start your first activity to begin earning points and unlocking badges. 🌟";
    if (game.levelInfo.current.level >= 8) return "Outstanding progress! You're becoming a true master of this platform. 🏆";
    if (game.currentStreak >= 5) return `Incredible ${game.currentStreak}-day streak! Your consistency is paying off! 🔥`;
    if (game.badgesEarned.length >= 5) return "Your badge collection is growing! Keep exploring new challenges. ⚡";
    return "Great work so far! Keep completing activities to level up and earn new badges. 💪";
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">{getMotivation()}</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">⭐</div>
          <div className="stat-card-value">{game.totalPoints.toLocaleString()}</div>
          <div className="stat-card-label">Total Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">{game.levelInfo.current.icon}</div>
          <div className="stat-card-value">Level {game.levelInfo.current.level}</div>
          <div className="stat-card-label">{game.levelInfo.current.title}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🔥</div>
          <div className="stat-card-value">{game.currentStreak}</div>
          <div className="stat-card-label">Day Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🏆</div>
          <div className="stat-card-value">{game.badgesEarned.length}</div>
          <div className="stat-card-label">Badges Earned</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📚</div>
          <div className="stat-card-value">{game.activitiesCompleted}</div>
          <div className="stat-card-label">Activities Done</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="card mb-xl">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>Level Progress</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {game.levelInfo.isMaxLevel
                ? 'Maximum level reached!'
                : `${game.levelInfo.xpForNextLevel - game.levelInfo.xpIntoLevel} XP to ${game.levelInfo.next.title}`
              }
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.6rem' }}>{game.levelInfo.current.icon}</span>
            {game.levelInfo.next && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>→ {game.levelInfo.next.icon}</span>}
          </div>
        </div>
        <ProgressBar
          value={game.levelInfo.xpIntoLevel}
          max={game.levelInfo.xpForNextLevel || 1}
          large
        />
      </div>

      <div className="two-col">
        {/* Left Column */}
        <div>
          {/* Active Missions */}
          <div className="card mb-xl">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>🎯 Active Missions</h3>
              <Link to="/missions" className="btn btn-sm btn-secondary">View All</Link>
            </div>
            {activeMissions.length === 0 ? (
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>All missions completed! 🎉</p>
            ) : (
              activeMissions.map((mission) => (
                <div key={mission.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{mission.icon} {mission.title}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-light)' }}>+{mission.rewardPoints} pts</span>
                  </div>
                  <ProgressBar value={mission.progress} max={mission.target} sublabel={`${mission.progress}/${mission.target}`} />
                </div>
              ))
            )}
          </div>

          {/* Streak Info */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '12px' }}>🔥 Streak Status</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{game.streakMessage}</p>
            <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem' }}>
              <div>
                <span className="text-muted">Current: </span>
                <strong>{game.currentStreak} days</strong>
              </div>
              <div>
                <span className="text-muted">Longest: </span>
                <strong>{game.longestStreak} days</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Recent Badges */}
          <div className="card mb-xl">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>🏆 Recent Badges</h3>
              <Link to="/achievements" className="btn btn-sm btn-secondary">View All</Link>
            </div>
            {recentBadges.length === 0 ? (
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>Complete activities to earn badges!</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {recentBadges.map((badge) => (
                  <div key={badge.id} style={{
                    textAlign: 'center',
                    padding: '12px 8px',
                    background: 'var(--bg-glass)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <div style={{ fontSize: '1.8rem' }}>{badge.icon}</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '4px' }}>{badge.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Engagement Score */}
          <div className="card mb-xl" style={{ textAlign: 'center' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '12px' }}>📊 Engagement Score</h3>
            <div className="engagement-ring">
              <svg viewBox="0 0 120 120" width="120" height="120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg-glass-strong)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="url(#engGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${analytics.engagementScore * 3.267} 326.7`}
                />
                <defs>
                  <linearGradient id="engGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-secondary)" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <div className="engagement-ring-value">{analytics.engagementScore}</div>
                <div className="engagement-ring-label">/ 100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
