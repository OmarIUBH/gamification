/**
 * Missions / Challenges Page
 * 
 * Shows active, ready-to-claim, and completed missions
 * with sound effects on mission claim.
 */

import { useState } from 'react';
import { useGame } from '../context/GameContext';
import ProgressBar from '../components/ProgressBar';
import { playClick, playMissionComplete } from '../engine/soundEngine';

export default function MissionsPage() {
  const { missionProgress, claimMission } = useGame();
  const [tab, setTab] = useState('active');

  const tabs = [
    { key: 'active', label: 'Active', count: missionProgress.filter((m) => !m.isCompleted && !m.isReady).length },
    { key: 'ready', label: 'Ready to Claim', count: missionProgress.filter((m) => m.isReady).length },
    { key: 'completed', label: 'Completed', count: missionProgress.filter((m) => m.isCompleted).length },
  ];

  const filtered = missionProgress.filter((m) => {
    if (tab === 'active') return !m.isCompleted && !m.isReady;
    if (tab === 'ready') return m.isReady;
    return m.isCompleted;
  });

  const handleClaimMission = (missionId, rewardPoints) => {
    playMissionComplete();
    claimMission(missionId, rewardPoints);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Missions & Challenges</h1>
        <p className="page-subtitle">
          Complete missions to earn bonus points and unlock special badges! 🎯
        </p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => { playClick(); setTab(t.key); }}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Mission Cards */}
      <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
        {filtered.map((mission) => (
          <div key={mission.id} className={`mission-card ${mission.isCompleted ? 'completed' : ''} ${mission.isReady ? 'ready' : ''}`}>
            <div className="mission-header">
              <span className="mission-icon">{mission.icon}</span>
              <div>
                <div className="mission-title">{mission.title}</div>
                <div className={`mission-difficulty difficulty-${mission.difficulty}`}>
                  {mission.difficulty}
                </div>
              </div>
            </div>

            <p className="mission-description">{mission.description}</p>

            {!mission.isCompleted && (
              <ProgressBar
                value={mission.progress}
                max={mission.target}
                label="Progress"
                sublabel={`${mission.progress} / ${mission.target}`}
              />
            )}

            <div className="mission-reward">
              ⭐ Reward: {mission.rewardPoints} points
              {mission.rewardBadge && ' + Badge'}
            </div>

            {mission.isReady && (
              <button
                className="btn btn-success mt-lg"
                onClick={() => handleClaimMission(mission.id, mission.rewardPoints)}
                style={{ width: '100%' }}
              >
                🎉 Claim Reward!
              </button>
            )}

            {mission.isCompleted && (
              <div style={{ marginTop: '12px', color: 'var(--color-success)', fontWeight: 700, fontSize: '0.85rem' }}>
                ✅ Mission Completed
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">{tab === 'completed' ? '🎉' : '🎯'}</div>
          <p className="empty-state-text">
            {tab === 'completed' ? 'No missions completed yet. Get started!' : 'No missions in this category.'}
          </p>
        </div>
      )}
    </div>
  );
}
