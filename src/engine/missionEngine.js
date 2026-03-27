/**
 * Mission Engine
 * 
 * Pure functions for evaluating mission/challenge progress
 * and completion based on current user state.
 * 
 * Academic note: Missions create structured engagement loops by
 * providing clear, achievable short-term goals. They transform
 * open-ended learning into directed, goal-oriented activities.
 */

import missionDefinitions from '../data/missions.js';

/**
 * Compute progress for all missions based on user state.
 * 
 * @param {object} userState - Current gamification state
 * @param {string[]} completedMissionIds - Already completed mission IDs
 * @returns {object[]} Missions with progress info
 */
export function computeMissionProgress(userState, completedMissionIds = []) {
  return missionDefinitions.map((mission) => {
    const isCompleted = completedMissionIds.includes(mission.id);
    const currentValue = getUserMetric(userState, mission.metric);
    const progress = Math.min(currentValue, mission.target);
    const progressPercent = Math.round((progress / mission.target) * 100);
    const isReady = progress >= mission.target && !isCompleted;

    return {
      ...mission,
      currentValue,
      progress,
      progressPercent,
      isCompleted,
      isReady, // ready to claim
    };
  });
}

/**
 * Extract a specific metric value from user state.
 * 
 * @param {object} userState - Current gamification state
 * @param {string} metric - Metric key to retrieve
 * @returns {number} Metric value
 */
function getUserMetric(userState, metric) {
  const metricMap = {
    activitiesCompleted: userState.activitiesCompleted || 0,
    quizzesAbove70: userState.quizzesAbove70 || 0,
    perfectQuizzes: userState.perfectQuizzes || 0,
    currentStreak: userState.currentStreak || 0,
    topicsExplored: userState.topicsExplored || 0,
    totalPoints: userState.totalPoints || 0,
    sessionQuizzes: userState.sessionQuizzes || 0,
  };

  return metricMap[metric] || 0;
}

/**
 * Get missions filtered by status.
 * @param {object[]} missionsWithProgress
 * @param {'active'|'completed'|'ready'} filter
 * @returns {object[]}
 */
export function filterMissions(missionsWithProgress, filter) {
  switch (filter) {
    case 'completed': return missionsWithProgress.filter((m) => m.isCompleted);
    case 'ready': return missionsWithProgress.filter((m) => m.isReady);
    case 'active': return missionsWithProgress.filter((m) => !m.isCompleted && !m.isReady);
    default: return missionsWithProgress;
  }
}
