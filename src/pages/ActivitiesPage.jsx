/**
 * Activities Page
 * 
 * Lists all available learning activities with filtering
 * by topic and difficulty. Shows reward points, completion
 * status, and related mission info.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import activities from '../data/activities';

const topics = [
  { key: 'all', label: 'All Topics' },
  { key: 'programming', label: '💻 Programming' },
  { key: 'logic', label: '🧩 Logic' },
  { key: 'digital', label: '🌐 Digital Skills' },
];

const difficulties = [
  { key: 'all', label: 'All Levels' },
  { key: 'easy', label: 'Easy' },
  { key: 'medium', label: 'Medium' },
  { key: 'hard', label: 'Hard' },
];

export default function ActivitiesPage() {
  const { completedActivityIds } = useGame();
  const navigate = useNavigate();
  const [topicFilter, setTopicFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filtered = activities.filter((a) => {
    if (topicFilter !== 'all' && a.topic !== topicFilter) return false;
    if (difficultyFilter !== 'all' && a.difficulty !== difficultyFilter) return false;
    return true;
  });

  const completedCount = activities.filter((a) => completedActivityIds.includes(a.id)).length;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Learning Activities</h1>
        <p className="page-subtitle">
          {completedCount} of {activities.length} activities completed • Choose a topic and start earning points!
        </p>
      </div>

      {/* Filters */}
      <div className="filter-tags">
        {topics.map((t) => (
          <button
            key={t.key}
            className={`filter-tag ${topicFilter === t.key ? 'active' : ''}`}
            onClick={() => setTopicFilter(t.key)}
          >
            {t.label}
          </button>
        ))}
        <span style={{ width: '1px', background: 'var(--border-subtle)', margin: '0 4px' }} />
        {difficulties.map((d) => (
          <button
            key={d.key}
            className={`filter-tag ${difficultyFilter === d.key ? 'active' : ''}`}
            onClick={() => setDifficultyFilter(d.key)}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="content-grid">
        {filtered.map((activity) => {
          const isCompleted = completedActivityIds.includes(activity.id);
          return (
            <div
              key={activity.id}
              className={`activity-card ${isCompleted ? 'completed' : ''}`}
              onClick={() => navigate(`/quiz/${activity.id}`)}
            >
              <div className="activity-card-header">
                <span className={`activity-topic-tag topic-${activity.topic}`}>
                  {activity.topic}
                </span>
                {isCompleted ? (
                  <span className="activity-completed-badge" style={{ position: 'relative', right: 'auto', top: 'auto', display: 'inline-block' }}>✓ Done</span>
                ) : (
                  <span className={`activity-difficulty difficulty-${activity.difficulty}`}>
                    {activity.difficulty}
                  </span>
                )}
              </div>
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-meta">
                <span className="activity-points">⭐ {activity.points} pts</span>
                <span>📝 {activity.questions.length} questions</span>
                <span>⏱ ~{activity.estimatedMinutes} min</span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <p className="empty-state-text">No activities match your filters.</p>
        </div>
      )}
    </div>
  );
}
