/**
 * Points Engine
 * 
 * Pure functions for calculating and awarding points.
 * Handles the core XP/points economy of the gamification system.
 * 
 * Academic note: Points are the most fundamental gamification element,
 * providing immediate quantitative feedback for completed actions.
 */

/**
 * Calculate points earned for completing an activity.
 * Applies accuracy bonus for quiz-based activities.
 * 
 * @param {number} basePoints - The base point value of the activity
 * @param {number} correctAnswers - Number of correct answers
 * @param {number} totalQuestions - Total number of questions
 * @returns {object} Breakdown of points earned
 */
export function calculateActivityPoints(basePoints, correctAnswers, totalQuestions) {
  const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
  const accuracyMultiplier = accuracy >= 1 ? 1.5 : accuracy >= 0.8 ? 1.2 : accuracy >= 0.5 ? 1.0 : 0.5;
  const earnedPoints = Math.round(basePoints * accuracyMultiplier);

  return {
    basePoints,
    accuracy: Math.round(accuracy * 100),
    accuracyMultiplier,
    earnedPoints,
    isPerfect: accuracy === 1,
    correctAnswers,
    totalQuestions,
  };
}

/**
 * Calculate bonus points for streaks.
 * Longer streaks yield higher bonuses to incentivize consistency.
 * 
 * @param {number} currentStreak - Current streak count in days
 * @returns {number} Bonus points from streak
 */
export function calculateStreakBonus(currentStreak) {
  if (currentStreak < 2) return 0;
  if (currentStreak < 5) return 10;
  if (currentStreak < 10) return 25;
  return 50;
}

/**
 * Get a summary of total points from all sources.
 * 
 * @param {object} userState - Current user gamification state
 * @returns {object} Points summary
 */
export function getPointsSummary(userState) {
  return {
    totalPoints: userState.totalPoints || 0,
    pointsToday: userState.pointsToday || 0,
    pointsThisWeek: userState.pointsThisWeek || 0,
  };
}
