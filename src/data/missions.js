/**
 * Mission / Challenge Definitions
 * 
 * Missions are short-term goals that direct student activity
 * and provide structured objectives beyond free exploration.
 * 
 * Design rationale: Missions create engagement loops by giving
 * students clear, achievable short-term goals with visible
 * progress tracking and tangible rewards upon completion.
 * 
 * Types:
 * - completion: Complete N activities
 * - accuracy: Achieve a target score
 * - streak: Maintain consecutive usage
 * - topic: Explore specific content areas
 */

const missions = [
  {
    id: 'mission_first_three',
    title: 'Getting Started',
    description: 'Complete 3 learning activities to warm up',
    type: 'completion',
    target: 3,
    metric: 'activitiesCompleted',
    rewardPoints: 150,
    rewardBadge: null,
    icon: '🚀',
    difficulty: 'easy',
  },
  {
    id: 'mission_quiz_master',
    title: 'Quiz Master',
    description: 'Complete 5 quizzes with at least 70% accuracy',
    type: 'accuracy',
    target: 5,
    metric: 'quizzesAbove70',
    rewardPoints: 300,
    rewardBadge: null,
    icon: '🧠',
    difficulty: 'medium',
  },
  {
    id: 'mission_perfect_score',
    title: 'Perfectionist',
    description: 'Get a perfect score on any quiz',
    type: 'accuracy',
    target: 1,
    metric: 'perfectQuizzes',
    rewardPoints: 200,
    rewardBadge: 'high_accuracy',
    icon: '🎯',
    difficulty: 'hard',
  },
  {
    id: 'mission_streak_3',
    title: 'Three-Day Challenge',
    description: 'Use the platform for 3 consecutive days',
    type: 'streak',
    target: 3,
    metric: 'currentStreak',
    rewardPoints: 250,
    rewardBadge: 'streak_3',
    icon: '🔥',
    difficulty: 'medium',
  },
  {
    id: 'mission_explorer',
    title: 'Topic Explorer',
    description: 'Complete at least one activity in each topic area',
    type: 'topic',
    target: 3,
    metric: 'topicsExplored',
    rewardPoints: 200,
    rewardBadge: 'all_topics',
    icon: '🗺️',
    difficulty: 'medium',
  },
  {
    id: 'mission_points_500',
    title: 'Point Collector',
    description: 'Earn a total of 500 points',
    type: 'completion',
    target: 500,
    metric: 'totalPoints',
    rewardPoints: 100,
    rewardBadge: 'points_500',
    icon: '💰',
    difficulty: 'easy',
  },
  {
    id: 'mission_ten_activities',
    title: 'Commitment',
    description: 'Complete 10 learning activities',
    type: 'completion',
    target: 10,
    metric: 'activitiesCompleted',
    rewardPoints: 400,
    rewardBadge: 'ten_activities',
    icon: '📚',
    difficulty: 'hard',
  },
  {
    id: 'mission_speed_run',
    title: 'Speed Learner',
    description: 'Complete 3 quizzes in a single session',
    type: 'completion',
    target: 3,
    metric: 'sessionQuizzes',
    rewardPoints: 200,
    rewardBadge: null,
    icon: '⚡',
    difficulty: 'medium',
  },
];

export default missions;
