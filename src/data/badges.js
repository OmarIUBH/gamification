/**
 * Badge Definitions
 * 
 * Badges are awarded when specific conditions are met.
 * Each badge has a unique ID, condition description, and
 * a programmatic condition key used by the badge engine.
 * 
 * Design rationale: Badges provide recognition for specific
 * achievements, encouraging diverse learning behaviors rather
 * than solely optimizing for points.
 * 
 * Categories:
 * - milestone: Progression-based achievements
 * - consistency: Streak and regularity-based
 * - mastery: Accuracy and skill-based
 * - social: Leaderboard and community-based
 * - challenge: Mission and challenge-based
 */

const badges = [
  {
    id: 'first_activity',
    name: 'First Steps',
    description: 'Complete your first learning activity',
    icon: '🎓',
    category: 'milestone',
    condition: 'activitiesCompleted >= 1',
    conditionFn: (state) => state.activitiesCompleted >= 1,
  },
  {
    id: 'quiz_starter',
    name: 'Quiz Starter',
    description: 'Complete your first quiz',
    icon: '📝',
    category: 'milestone',
    condition: 'quizzesCompleted >= 1',
    conditionFn: (state) => state.quizzesCompleted >= 1,
  },
  {
    id: 'five_activities',
    name: 'Getting Serious',
    description: 'Complete 5 learning activities',
    icon: '📚',
    category: 'milestone',
    condition: 'activitiesCompleted >= 5',
    conditionFn: (state) => state.activitiesCompleted >= 5,
  },
  {
    id: 'ten_activities',
    name: 'Dedicated Learner',
    description: 'Complete 10 learning activities',
    icon: '🏅',
    category: 'milestone',
    condition: 'activitiesCompleted >= 10',
    conditionFn: (state) => state.activitiesCompleted >= 10,
  },
  {
    id: 'streak_3',
    name: '3-Day Streak',
    description: 'Use the platform for 3 consecutive days',
    icon: '🔥',
    category: 'consistency',
    condition: 'currentStreak >= 3',
    conditionFn: (state) => state.currentStreak >= 3,
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '⚡',
    category: 'consistency',
    condition: 'currentStreak >= 7',
    conditionFn: (state) => state.currentStreak >= 7,
  },
  {
    id: 'high_accuracy',
    name: 'Sharp Mind',
    description: 'Score 100% on any quiz',
    icon: '🎯',
    category: 'mastery',
    condition: 'hasPerfectQuiz === true',
    conditionFn: (state) => state.hasPerfectQuiz === true,
  },
  {
    id: 'points_500',
    name: 'Point Collector',
    description: 'Earn 500 total points',
    icon: '💰',
    category: 'milestone',
    condition: 'totalPoints >= 500',
    conditionFn: (state) => state.totalPoints >= 500,
  },
  {
    id: 'points_1000',
    name: 'XP Hunter',
    description: 'Earn 1,000 total points',
    icon: '💎',
    category: 'milestone',
    condition: 'totalPoints >= 1000',
    conditionFn: (state) => state.totalPoints >= 1000,
  },
  {
    id: 'mission_complete',
    name: 'Mission Accomplished',
    description: 'Complete your first mission',
    icon: '🏆',
    category: 'challenge',
    condition: 'missionsCompleted >= 1',
    conditionFn: (state) => state.missionsCompleted >= 1,
  },
  {
    id: 'three_missions',
    name: 'Challenge Conqueror',
    description: 'Complete 3 missions',
    icon: '⚔️',
    category: 'challenge',
    condition: 'missionsCompleted >= 3',
    conditionFn: (state) => state.missionsCompleted >= 3,
  },
  {
    id: 'top_leaderboard',
    name: 'Top of the Class',
    description: 'Reach the #1 position on the leaderboard',
    icon: '👑',
    category: 'social',
    condition: 'leaderboardRank === 1',
    conditionFn: (state) => state.leaderboardRank === 1,
  },
  {
    id: 'persistence',
    name: 'Persistence Badge',
    description: 'Retry a failed quiz and improve your score',
    icon: '💪',
    category: 'mastery',
    condition: 'hasImprovedScore === true',
    conditionFn: (state) => state.hasImprovedScore === true,
  },
  {
    id: 'all_topics',
    name: 'Renaissance Learner',
    description: 'Complete at least one activity in every topic',
    icon: '🌟',
    category: 'milestone',
    condition: 'topicsExplored >= 3',
    conditionFn: (state) => state.topicsExplored >= 3,
  },
];

export default badges;
