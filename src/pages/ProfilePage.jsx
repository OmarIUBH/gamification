/**
 * Profile / Progress Page
 * 
 * Shows the user's engagement history, personal statistics,
 * growth over time, and a summary of all gamification metrics.
 */

import { useGame } from '../context/GameContext';
import { computeLevel } from '../engine/levelEngine';
import { computeAnalytics } from '../engine/analyticsEngine';
import { getAllBadgesWithStatus } from '../engine/badgeEngine';
import ProgressBar from '../components/ProgressBar';

export default function ProfilePage() {
  const game = useGame();
  const analytics = computeAnalytics(game, game.activityLog);
  const badges = getAllBadgesWithStatus(game.badgesEarned);
  const earnedBadges = badges.filter((b) => b.unlocked);

  return (
    <div>
      {/* Profile Header */}
      <div className="profile-header">
        <span className="profile-avatar">{game.userAvatar}</span>
        <div>
          <h1 className="profile-name">{game.userName}</h1>
          <p className="profile-joined">Joined {game.joinDate}</p>
          <div className="profile-level-badge">
            {game.levelInfo.current.icon} Level {game.levelInfo.current.level} — {game.levelInfo.current.title}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        <div className="stat-card">
          <div className="stat-card-icon">⭐</div>
          <div className="stat-card-value">{game.totalPoints.toLocaleString()}</div>
          <div className="stat-card-label">Total Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📚</div>
          <div className="stat-card-value">{analytics.totalActivities}</div>
          <div className="stat-card-label">Activities</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-value">{analytics.avgAccuracy}%</div>
          <div className="stat-card-label">Avg Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🔥</div>
          <div className="stat-card-value">{game.currentStreak}</div>
          <div className="stat-card-label">Current Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">⚡</div>
          <div className="stat-card-value">{game.longestStreak}</div>
          <div className="stat-card-label">Longest Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🏆</div>
          <div className="stat-card-value">{earnedBadges.length}/{badges.length}</div>
          <div className="stat-card-label">Badges</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-value">{analytics.missionsCompleted}/{analytics.totalMissionsAvailable}</div>
          <div className="stat-card-label">Missions</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📊</div>
          <div className="stat-card-value">{analytics.engagementScore}</div>
          <div className="stat-card-label">Engagement</div>
        </div>
      </div>

      <div className="two-col">
        <div>
          {/* Activity History (Last 7 Days) */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>📈 Activity This Week</h3>
            <div className="bar-chart">
              {analytics.last7Days.map((day) => {
                const maxCount = Math.max(1, ...analytics.last7Days.map((d) => d.count));
                const heightPercent = (day.count / maxCount) * 100;
                return (
                  <div key={day.date} className="bar-chart-bar">
                    <div className="bar-chart-value">{day.count}</div>
                    <div className="bar-chart-fill" style={{ height: `${Math.max(4, heightPercent)}%` }} />
                    <div className="bar-chart-label">{day.day}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Topic Distribution */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>🗂️ Topic Progress</h3>
            {['programming', 'logic', 'digital'].map((topic) => {
              const count = analytics.topicDistribution[topic] || 0;
              const topicNames = { programming: '💻 Programming', logic: '🧩 Logic', digital: '🌐 Digital Skills' };
              return (
                <div key={topic} style={{ marginBottom: '12px' }}>
                  <ProgressBar
                    value={count}
                    max={5}
                    label={topicNames[topic]}
                    sublabel={`${count} activities`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div>
          {/* Level Progress */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, marginBottom: '12px' }}>📈 Level Progress</h3>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '2.5rem' }}>{game.levelInfo.current.icon}</span>
              <div style={{ fontWeight: 700, marginTop: '4px' }}>
                Level {game.levelInfo.current.level}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {game.levelInfo.current.title}
              </div>
            </div>
            {!game.levelInfo.isMaxLevel && (
              <ProgressBar
                value={game.levelInfo.xpIntoLevel}
                max={game.levelInfo.xpForNextLevel}
                label="Next Level"
                sublabel={`${game.levelInfo.xpIntoLevel}/${game.levelInfo.xpForNextLevel} XP`}
                large
              />
            )}
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Perk: {game.levelInfo.current.perks}
            </p>
          </div>

          {/* Earned Badges Showcase */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, marginBottom: '12px' }}>🏆 Badge Collection</h3>
            {earnedBadges.length === 0 ? (
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>No badges earned yet.</p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {earnedBadges.map((badge) => (
                  <div key={badge.id} style={{
                    padding: '8px 12px',
                    background: 'var(--bg-glass)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                  }} title={badge.description}>
                    <span style={{ fontSize: '1.4rem' }}>{badge.icon}</span>
                    <div style={{ fontWeight: 600, marginTop: '2px' }}>{badge.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reset button for demo purposes */}
          <div className="card" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Demo Controls</p>
            <button className="btn btn-secondary btn-sm" onClick={game.resetState}>
              🔄 Reset All Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
