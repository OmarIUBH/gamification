/**
 * Leaderboard Page
 * 
 * Ranks users by points, badges, or streaks.
 * Highlights the current user's position.
 * Supports multiple ranking dimensions for diverse motivation.
 */

import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { rankUsers } from '../engine/leaderboardEngine';

const metrics = [
  { key: 'points', label: '⭐ Points', suffix: 'pts' },
  { key: 'badges', label: '🏆 Badges', suffix: 'badges' },
  { key: 'streak', label: '🔥 Streaks', suffix: 'days' },
];

export default function LeaderboardPage() {
  const { allUsers } = useGame();
  const [metric, setMetric] = useState('points');

  const ranked = rankUsers(allUsers, metric);
  const currentMetric = metrics.find((m) => m.key === metric);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Leaderboard</h1>
        <p className="page-subtitle">
          See how you rank among other learners. Choose a metric below.
        </p>
      </div>

      {/* Metric Tabs */}
      <div className="tabs">
        {metrics.map((m) => (
          <button
            key={m.key}
            className={`tab ${metric === m.key ? 'active' : ''}`}
            onClick={() => setMetric(m.key)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px', alignItems: 'flex-end' }}>
        {[1, 0, 2].map((podiumIdx) => {
          const user = ranked[podiumIdx];
          if (!user) return null;
          const heights = ['140px', '100px', '80px'];
          const bgColors = ['linear-gradient(180deg, rgba(255,215,0,0.15), transparent)', 'linear-gradient(180deg, rgba(192,192,192,0.15), transparent)', 'linear-gradient(180deg, rgba(205,127,50,0.15), transparent)'];
          const rankIdx = podiumIdx === 1 ? 0 : podiumIdx === 0 ? 1 : 2;
          return (
            <div key={user.id} style={{
              textAlign: 'center',
              padding: '20px 24px',
              background: bgColors[rankIdx],
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              minWidth: '140px',
              height: heights[rankIdx],
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: '2rem' }}>{user.avatar}</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '4px' }}>{user.name}</div>
              <div style={{ fontWeight: 800, color: 'var(--color-accent-light)', fontSize: '1.1rem' }}>
                {user.metricValue.toLocaleString()} {currentMetric.suffix}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>#{user.rank}</div>
            </div>
          );
        })}
      </div>

      {/* Full Ranking Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="leaderboard-table">
          <tbody>
            {ranked.map((user) => (
              <tr key={user.id} className={`leaderboard-row ${user.id === 'user_current' ? 'current-user' : ''}`}>
                <td className={`leaderboard-rank ${user.rank <= 3 ? `rank-${user.rank}` : ''}`}>
                  {user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : `#${user.rank}`}
                </td>
                <td>
                  <div className="leaderboard-user">
                    <span className="leaderboard-avatar">{user.avatar}</span>
                    <div>
                      <div className="leaderboard-name">
                        {user.name}
                        {user.id === 'user_current' && <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-light)', marginLeft: '8px' }}>(You)</span>}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Level {user.level || '?'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="leaderboard-value">
                  {user.metricValue.toLocaleString()} {currentMetric.suffix}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
