/**
 * Badge Engine
 * 
 * Pure functions for evaluating badge unlock conditions
 * against the current user state.
 * 
 * Academic note: Badges serve as a recognition system, providing
 * qualitative feedback about specific achievements. Unlike points,
 * badges highlight diverse learning behaviors and accomplishments.
 */

import badgeDefinitions from '../data/badges.js';

/**
 * Evaluate which badges a user has newly earned.
 * 
 * @param {object} userState - Current gamification state
 * @param {string[]} alreadyEarned - IDs of badges already earned
 * @returns {object[]} Array of newly earned badge definitions
 */
export function evaluateNewBadges(userState, alreadyEarned = []) {
  const newBadges = [];

  for (const badge of badgeDefinitions) {
    if (alreadyEarned.includes(badge.id)) continue;

    try {
      if (badge.conditionFn(userState)) {
        newBadges.push(badge);
      }
    } catch {
      // Condition cannot be evaluated yet — skip
    }
  }

  return newBadges;
}

/**
 * Get all badge definitions with their unlock status.
 * 
 * @param {string[]} earnedBadgeIds - IDs of earned badges
 * @returns {object[]} All badges with `unlocked` boolean
 */
export function getAllBadgesWithStatus(earnedBadgeIds = []) {
  return badgeDefinitions.map((badge) => ({
    ...badge,
    unlocked: earnedBadgeIds.includes(badge.id),
  }));
}

/**
 * Get badge definition by ID.
 * @param {string} badgeId 
 * @returns {object|undefined}
 */
export function getBadgeById(badgeId) {
  return badgeDefinitions.find((b) => b.id === badgeId);
}
