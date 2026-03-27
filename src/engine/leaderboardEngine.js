/**
 * Leaderboard Engine
 * 
 * Pure functions for ranking users by various metrics.
 * 
 * Academic note: Leaderboards leverage social comparison theory.
 * This implementation offers multiple ranking dimensions to support
 * diverse motivational profiles (competitive vs. mastery-oriented).
 */

/**
 * Rank users by a specific metric.
 * 
 * @param {object[]} users - Array of user objects
 * @param {'points'|'badges'|'streak'} metric - Ranking criterion
 * @returns {object[]} Ranked user list with rank numbers
 */
export function rankUsers(users, metric = 'points') {
  const sorted = [...users].sort((a, b) => {
    switch (metric) {
      case 'badges':
        return (b.badgesEarned?.length || 0) - (a.badgesEarned?.length || 0);
      case 'streak':
        return (b.currentStreak || 0) - (a.currentStreak || 0);
      case 'points':
      default:
        return (b.totalPoints || 0) - (a.totalPoints || 0);
    }
  });

  return sorted.map((user, index) => ({
    ...user,
    rank: index + 1,
    metricValue: getMetricValue(user, metric),
  }));
}

/**
 * Get the display value for a ranking metric.
 */
function getMetricValue(user, metric) {
  switch (metric) {
    case 'badges': return user.badgesEarned?.length || 0;
    case 'streak': return user.currentStreak || 0;
    case 'points':
    default: return user.totalPoints || 0;
  }
}

/**
 * Find a specific user's rank.
 * @param {object[]} rankedUsers 
 * @param {string} userId 
 * @returns {number} Rank (1-based) or -1 if not found
 */
export function getUserRank(rankedUsers, userId) {
  const entry = rankedUsers.find((u) => u.id === userId);
  return entry ? entry.rank : -1;
}
