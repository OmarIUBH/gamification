/**
 * Level Engine
 * 
 * Pure functions for computing the user's current level and
 * progress toward the next level based on accumulated XP.
 * 
 * Academic note: Levels serve as a macro-progression system that
 * provides learners with a sense of long-term advancement and
 * status within the platform.
 */

import levels from '../data/levels.js';

/**
 * Determine the user's current level based on total XP.
 * 
 * @param {number} totalXP - Total experience points earned
 * @returns {object} Current level details and progress to next
 */
export function computeLevel(totalXP) {
  let currentLevel = levels[0];
  let nextLevel = levels[1] || null;

  for (let i = levels.length - 1; i >= 0; i--) {
    if (totalXP >= levels[i].xpRequired) {
      currentLevel = levels[i];
      nextLevel = levels[i + 1] || null;
      break;
    }
  }

  const xpIntoLevel = totalXP - currentLevel.xpRequired;
  const xpForNextLevel = nextLevel ? nextLevel.xpRequired - currentLevel.xpRequired : 0;
  const progressPercent = nextLevel
    ? Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100))
    : 100;

  return {
    current: currentLevel,
    next: nextLevel,
    xpIntoLevel,
    xpForNextLevel,
    progressPercent,
    isMaxLevel: !nextLevel,
  };
}

/**
 * Check if user leveled up after gaining points.
 * 
 * @param {number} previousXP - XP before the action
 * @param {number} newXP - XP after the action
 * @returns {object|null} Level-up info or null if no level change
 */
export function checkLevelUp(previousXP, newXP) {
  const previousLevel = computeLevel(previousXP);
  const newLevel = computeLevel(newXP);

  if (newLevel.current.level > previousLevel.current.level) {
    return {
      previousLevel: previousLevel.current,
      newLevel: newLevel.current,
      levelsGained: newLevel.current.level - previousLevel.current.level,
    };
  }

  return null;
}
