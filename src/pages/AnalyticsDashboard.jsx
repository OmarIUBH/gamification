/**
 * Analytics Dashboard Page (Researcher View)
 * 
 * Aggregated engagement data designed for thesis evaluation:
 * - Completion rates, accuracy, activity frequency
 * - Badge/mission distribution
 * - Engagement composite score
 * - Session metrics
 * 
 * This page is designed for instructors or researchers
 * evaluating the effectiveness of gamification techniques.
 */

import { useGame } from '../context/GameContext';
import { computeAnalytics } from '../engine/analyticsEngine';
import { getAllBadgesWithStatus } from '../engine/badgeEngine';
import ProgressBar from '../components/ProgressBar';

export default function AnalyticsDashboard() {
  const game = useGame();
  const analytics = computeAnalytics(game, game.activityLog);
  const badges = getAllBadgesWithStatus(game.badgesEarned);

  // Badge category distribution
  const badgeCategories = {};
  badges.forEach((b) => {
    if (!badgeCategories[b.category]) badgeCategories[b.category] = { total: 0, earned: 0 };
    badgeCategories[b.category].total++;
    if (b.unlocked) badgeCategories[b.category].earned++;
  });

  const categoryLabels = {
    milestone: '🎯 Milestones',
    consistency: '🔥 Consistency',
    mastery: '🧠 Mastery',
    challenge: '⚔️ Challenges',
    social: '👑 Social',
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="page-subtitle">
            Research-oriented view of engagement metrics and gamification effectiveness.
          </p>
        </div>
        <button 
          className="btn btn-secondary" 
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ 
              gameState: game, 
              analytics: analytics 
            }, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `eduquest_export_${new Date().toISOString().split('T')[0]}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          }}
        >
          📥 Export Research Data
        </button>
      </div>

      {/* Key Metrics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon">📊</div>
          <div className="stat-card-value">{analytics.engagementScore}/100</div>
          <div className="stat-card-label">Engagement Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">📚</div>
          <div className="stat-card-value">{analytics.totalActivities}</div>
          <div className="stat-card-label">Activities Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-value">{analytics.avgAccuracy}%</div>
          <div className="stat-card-label">Average Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🔥</div>
          <div className="stat-card-value">{analytics.longestStreak}</div>
          <div className="stat-card-label">Best Streak</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🏆</div>
          <div className="stat-card-value">{analytics.badgesCount}/{analytics.totalBadgesAvailable}</div>
          <div className="stat-card-label">Badges Unlocked</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🎯</div>
          <div className="stat-card-value">{analytics.missionsCompleted}/{analytics.totalMissionsAvailable}</div>
          <div className="stat-card-label">Missions Done</div>
        </div>
      </div>

      <div className="two-col">
        <div>
          {/* Engagement Score Breakdown */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>📊 Engagement Score Breakdown</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Composite score (0-100) weighted across activity volume (25%), streak consistency (20%), badge diversity (20%), mission completion (15%), and accuracy (20%).
            </p>
            {[
              { label: 'Activity Volume', value: Math.min(analytics.totalActivities / 20, 1) * 25, max: 25, detail: `${analytics.totalActivities}/20 activities` },
              { label: 'Streak Consistency', value: Math.min(analytics.currentStreak / 7, 1) * 20, max: 20, detail: `${analytics.currentStreak}/7-day streak` },
              { label: 'Badge Diversity', value: Math.min(analytics.badgesCount / 14, 1) * 20, max: 20, detail: `${analytics.badgesCount}/14 badges` },
              { label: 'Mission Completion', value: Math.min(analytics.missionsCompleted / 8, 1) * 15, max: 15, detail: `${analytics.missionsCompleted}/8 missions` },
              { label: 'Learning Accuracy', value: (analytics.avgAccuracy / 100) * 20, max: 20, detail: `${analytics.avgAccuracy}% avg` },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: '12px' }}>
                <ProgressBar
                  value={Math.round(item.value)}
                  max={item.max}
                  label={item.label}
                  sublabel={`${Math.round(item.value)}/${item.max} — ${item.detail}`}
                />
              </div>
            ))}
          </div>

          {/* Activity Log */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>📝 Recent Activity Log</h3>
            {game.activityLog.length === 0 ? (
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>No activities recorded yet.</p>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {[...game.activityLog].reverse().slice(0, 20).map((entry, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    fontSize: '0.85rem',
                  }}>
                    <div>
                      <span className={`activity-topic-tag topic-${entry.topic}`} style={{ marginRight: '8px' }}>
                        {entry.topic}
                      </span>
                      {entry.activityId}
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <span className={entry.accuracy >= 70 ? 'text-success' : 'text-warning'}>
                        {entry.accuracy}%
                      </span>
                      <span className="text-accent">+{entry.pointsEarned}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          {/* Weekly Activity Chart */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>📈 Weekly Activity</h3>
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

          {/* Badge Distribution */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>🏆 Badge Distribution</h3>
            {Object.entries(badgeCategories).map(([cat, data]) => (
              <div key={cat} style={{ marginBottom: '12px' }}>
                <ProgressBar
                  value={data.earned}
                  max={data.total}
                  label={categoryLabels[cat] || cat}
                  sublabel={`${data.earned}/${data.total}`}
                />
              </div>
            ))}
          </div>

          {/* Topic Distribution */}
          <div className="card mb-xl">
            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>🗂️ Topic Activity</h3>
            {['programming', 'logic', 'digital'].map((topic) => {
              const count = analytics.topicDistribution[topic] || 0;
              const topicLabels = { programming: '💻 Programming', logic: '🧩 Logic', digital: '🌐 Digital Skills' };
              return (
                <div key={topic} style={{ marginBottom: '12px' }}>
                  <ProgressBar
                    value={count}
                    max={Math.max(5, count)}
                    label={topicLabels[topic]}
                    sublabel={`${count} activities`}
                  />
                </div>
              );
            })}
          </div>

          {/* Research Data Export Note */}
          <div className="card" style={{ background: 'rgba(108, 92, 231, 0.08)', borderColor: 'rgba(108, 92, 231, 0.2)' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>📋 Research Note</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              All interaction data shown here is tracked by the analytics engine 
              and can be exported for thesis evaluation. Metrics include:
              activity completion rates, quiz accuracy, streak persistence,
              badge achievement patterns, mission engagement, and composite
              engagement scores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
