/**
 * Streak Engine
 * 
 * Pure functions for computing learning streaks from activity history.
 * 
 * Academic note: Streaks leverage the psychological principle of
 * loss aversion — once a streak is started, the desire to maintain
 * it provides a powerful motivational driver for consistent engagement.
 */

/**
 * Compute the current streak from a list of activity dates.
 * A streak is maintained when there is at least one activity per calendar day.
 * 
 * @param {string[]} activityDates - ISO date strings of activity completions
 * @returns {object} Streak information
 */
export function computeStreak(activityDates) {
  if (!activityDates || activityDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, isActiveToday: false };
  }

  // Normalize to unique calendar days and sort descending
  const uniqueDays = [...new Set(
    activityDates.map((d) => new Date(d).toISOString().split('T')[0])
  )].sort().reverse();

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Check if the streak is currently active
  const isActiveToday = uniqueDays[0] === today;
  const wasActiveYesterday = uniqueDays[0] === yesterday;

  if (!isActiveToday && !wasActiveYesterday) {
    // Streak is broken
    return { currentStreak: 0, longestStreak: computeLongestStreak(uniqueDays), isActiveToday: false };
  }

  // Count current streak
  let currentStreak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const prevDay = new Date(uniqueDays[i - 1]);
    const currDay = new Date(uniqueDays[i]);
    const diffDays = (prevDay - currDay) / 86400000;

    if (diffDays === 1) {
      currentStreak++;
    } else {
      break;
    }
  }

  return {
    currentStreak,
    longestStreak: Math.max(currentStreak, computeLongestStreak(uniqueDays)),
    isActiveToday,
  };
}

/**
 * Find the longest streak in the activity history.
 * @param {string[]} sortedDaysDesc - Unique dates sorted descending
 * @returns {number} Longest streak length
 */
function computeLongestStreak(sortedDaysDesc) {
  if (sortedDaysDesc.length === 0) return 0;

  let longest = 1;
  let current = 1;

  const days = [...sortedDaysDesc].reverse(); // ascending

  for (let i = 1; i < days.length; i++) {
    const prevDay = new Date(days[i - 1]);
    const currDay = new Date(days[i]);
    const diffDays = (currDay - prevDay) / 86400000;

    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

/**
 * Get motivational message based on streak status.
 * @param {number} currentStreak 
 * @param {boolean} isActiveToday 
 * @returns {string}
 */
export function getStreakMessage(currentStreak, isActiveToday) {
  if (currentStreak === 0) return "Start a new streak today! 🌱";
  if (!isActiveToday) return `Your ${currentStreak}-day streak is at risk! Complete an activity now! ⚠️`;
  if (currentStreak < 3) return `${currentStreak}-day streak! Keep going! 🔥`;
  if (currentStreak < 7) return `Amazing ${currentStreak}-day streak! You're on fire! 🔥🔥`;
  return `Incredible ${currentStreak}-day streak! Unstoppable! 🔥🔥🔥`;
}
