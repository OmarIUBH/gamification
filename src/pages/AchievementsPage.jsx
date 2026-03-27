/**
 * Achievements Page
 * 
 * Displays all badges in a grid with locked/unlocked states.
 * Unlocked badges glow; locked badges show unlock conditions.
 * Filterable by category.
 */

import { useState } from 'react';
import { getAllBadgesWithStatus } from '../engine/badgeEngine';
import { useGame } from '../context/GameContext';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'milestone', label: '🎯 Milestones' },
  { key: 'consistency', label: '🔥 Consistency' },
  { key: 'mastery', label: '🧠 Mastery' },
  { key: 'challenge', label: '⚔️ Challenges' },
  { key: 'social', label: '👑 Social' },
];

export default function AchievementsPage() {
  const { badgesEarned } = useGame();
  const [filter, setFilter] = useState('all');

  const allBadges = getAllBadgesWithStatus(badgesEarned);
  const filtered = filter === 'all' ? allBadges : allBadges.filter((b) => b.category === filter);
  const earnedCount = allBadges.filter((b) => b.unlocked).length;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Achievements</h1>
        <p className="page-subtitle">
          {earnedCount} of {allBadges.length} badges unlocked — complete activities and challenges to earn more!
        </p>
      </div>

      {/* Category Filters */}
      <div className="filter-tags">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`filter-tag ${filter === cat.key ? 'active' : ''}`}
            onClick={() => setFilter(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Badge Grid */}
      <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {filtered.map((badge) => (
          <div key={badge.id} className={`badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}>
            <div className="badge-icon">{badge.icon}</div>
            <div className="badge-name">{badge.name}</div>
            <p className="badge-description">{badge.description}</p>
            <span className={`badge-status ${badge.unlocked ? 'earned' : 'locked-status'}`}>
              {badge.unlocked ? '✓ Earned' : '🔒 Locked'}
            </span>
            {!badge.unlocked && (
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                Condition: {badge.condition}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
