/**
 * Analytics Engine
 * 
 * Pure functions for aggregating interaction data to support
 * research analysis and thesis evaluation.
 * 
 * Academic note: This module aggregates data points that can be
 * used to evaluate the effectiveness of gamification techniques
 * in terms of engagement, persistence, and learning outcomes.
 */

/**
 * Compute comprehensive analytics from user state and activity log.
 * 
 * @param {object} userState - Current gamification state
 * @param {object[]} activityLog - Array of completed activity records
 * @returns {object} Analytics summary
 */
export function computeAnalytics(userState, activityLog = []) {
  const totalActivities = userState.activitiesCompleted || 0;
  const totalQuizzes = userState.quizzesCompleted || 0;
  const totalPoints = userState.totalPoints || 0;
  const badgesCount = userState.badgesEarned?.length || 0;
  const missionsCompleted = userState.missionsCompleted || 0;
  const currentStreak = userState.currentStreak || 0;
  const longestStreak = userState.longestStreak || 0;

  // Compute average accuracy from activity log
  const quizResults = activityLog.filter((a) => a.accuracy !== undefined);
  const avgAccuracy = quizResults.length > 0
    ? Math.round(quizResults.reduce((sum, a) => sum + a.accuracy, 0) / quizResults.length)
    : 0;

  // Compute activity distribution by topic
  const topicDistribution = {};
  activityLog.forEach((a) => {
    topicDistribution[a.topic] = (topicDistribution[a.topic] || 0) + 1;
  });

  // Compute activity over time (last 7 days)
  const last7Days = getLast7DaysActivity(activityLog);

  // Engagement score (composite metric)
  const engagementScore = computeEngagementScore({
    totalActivities,
    currentStreak,
    badgesCount,
    missionsCompleted,
    avgAccuracy,
  });

  return {
    totalActivities,
    totalQuizzes,
    totalPoints,
    badgesCount,
    missionsCompleted,
    currentStreak,
    longestStreak,
    avgAccuracy,
    topicDistribution,
    last7Days,
    engagementScore,
    totalBadgesAvailable: 14,
    totalMissionsAvailable: 8,
  };
}

/**
 * Count activities per day for the last 7 days.
 * @param {object[]} activityLog 
 * @returns {object[]} Array of { day, count }
 */
function getLast7DaysActivity(activityLog) {
  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const count = activityLog.filter(
      (a) => a.completedAt && a.completedAt.startsWith(dateStr)
    ).length;
    days.push({
      day: dayNames[date.getDay()],
      date: dateStr,
      count,
    });
  }

  return days;
}

/**
 * Compute a composite engagement score (0-100).
 * Weights different factors to create a single engagement metric.
 * 
 * @param {object} factors - Engagement factors
 * @returns {number} Score 0-100
 */
function computeEngagementScore({ totalActivities, currentStreak, badgesCount, missionsCompleted, avgAccuracy }) {
  const activityScore = Math.min(totalActivities / 20, 1) * 25;  // max 25
  const streakScore = Math.min(currentStreak / 7, 1) * 20;        // max 20
  const badgeScore = Math.min(badgesCount / 14, 1) * 20;          // max 20
  const missionScore = Math.min(missionsCompleted / 8, 1) * 15;   // max 15
  const accuracyScore = (avgAccuracy / 100) * 20;                 // max 20

  return Math.round(activityScore + streakScore + badgeScore + missionScore + accuracyScore);
}
