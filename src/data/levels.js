/**
 * Level Definitions
 * 
 * Each level has an XP threshold and optional perks/unlocks.
 * The progression curve uses a quadratic formula to create
 * an increasingly challenging but rewarding advancement system.
 * 
 * Design rationale: Levels provide a macro-progression system
 * that gives learners a long-term sense of advancement beyond
 * individual activity completion.
 */

const levels = [
  { level: 1,  title: 'Newcomer',       xpRequired: 0,     icon: '🌱', perks: 'Access to basic quizzes' },
  { level: 2,  title: 'Curious Mind',    xpRequired: 100,   icon: '🔍', perks: 'Unlock Logic topic' },
  { level: 3,  title: 'Quick Learner',   xpRequired: 250,   icon: '📖', perks: 'Unlock first mission set' },
  { level: 4,  title: 'Achiever',        xpRequired: 450,   icon: '🎯', perks: 'Unlock challenge quizzes' },
  { level: 5,  title: 'Knowledge Seeker',xpRequired: 700,   icon: '💡', perks: 'Unlock Digital Skills topic' },
  { level: 6,  title: 'Dedicated',       xpRequired: 1000,  icon: '🔥', perks: 'Unlock streak challenges' },
  { level: 7,  title: 'Skilled',         xpRequired: 1400,  icon: '⚡', perks: 'Unlock hard difficulty' },
  { level: 8,  title: 'Expert',          xpRequired: 1900,  icon: '🧠', perks: 'Unlock expert badges' },
  { level: 9,  title: 'Master',          xpRequired: 2500,  icon: '🏆', perks: 'Unlock master missions' },
  { level: 10, title: 'Grandmaster',     xpRequired: 3200,  icon: '👑', perks: 'All content unlocked' },
  { level: 11, title: 'Luminary',        xpRequired: 4000,  icon: '🌟', perks: 'Prestige badge available' },
  { level: 12, title: 'Virtuoso',        xpRequired: 5000,  icon: '💎', perks: 'Legendary status' },
];

export default levels;
