/**
 * Game Context — Central State Management
 * 
 * Provides the complete gamification state to all components.
 * Persists state to localStorage for session continuity.
 * Exposes action dispatchers for activity completion, mission claiming, etc.
 * 
 * This context is the single source of truth for all gamification data
 * and drives the entire reward/feedback loop of the application.
 */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { calculateActivityPoints, calculateStreakBonus } from '../engine/pointsEngine.js';
import { computeLevel, checkLevelUp } from '../engine/levelEngine.js';
import { evaluateNewBadges } from '../engine/badgeEngine.js';
import { computeStreak, getStreakMessage } from '../engine/streakEngine.js';
import { computeMissionProgress } from '../engine/missionEngine.js';
import { rankUsers, getUserRank } from '../engine/leaderboardEngine.js';
import seedUsers from '../data/users.js';
import activities from '../data/activities.js';

const STORAGE_KEY = 'gamification_state';

/* ─── Initial State ─── */

function getInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch { /* ignore */ }

  return {
    // User identity
    userId: 'user_current',
    userName: 'Demo Student',
    userAvatar: '🧑‍🎓',

    // Points & Level
    totalPoints: 0,
    
    // Activity tracking
    activitiesCompleted: 0,
    quizzesCompleted: 0,
    quizzesAbove70: 0,
    perfectQuizzes: 0,
    sessionQuizzes: 0,
    completedActivityIds: [],
    activityLog: [],
    activityDates: [],

    // Badges
    badgesEarned: [],

    // Streaks
    currentStreak: 0,
    longestStreak: 0,

    // Missions
    completedMissionIds: [],
    missionsCompleted: 0,

    // Topic exploration
    topicsExplored: 0,
    exploredTopics: [],

    // Derived / meta
    hasPerfectQuiz: false,
    hasImprovedScore: false,
    leaderboardRank: 0,

    // Notifications queue
    notifications: [],

    // Session metadata
    joinDate: new Date().toISOString().split('T')[0],
    lastActiveDate: null,
  };
}

/* ─── Reducer ─── */

function gameReducer(state, action) {
  switch (action.type) {

    case 'COMPLETE_ACTIVITY': {
      const { activityId, correctAnswers, totalQuestions, topic, hintsUsed } = action.payload;
      
      // Calculate points
      const activity = activities.find((a) => a.id === activityId);
      if (!activity) return state;

      const pointsResult = calculateActivityPoints(activity.points, correctAnswers, totalQuestions, hintsUsed);
      const streakBonus = calculateStreakBonus(state.currentStreak);
      const totalEarned = pointsResult.earnedPoints + streakBonus;

      // Streak update
      const now = new Date().toISOString();
      const newActivityDates = [...state.activityDates, now];
      const streakInfo = computeStreak(newActivityDates);

      // Topic tracking
      const newExploredTopics = state.exploredTopics.includes(topic)
        ? state.exploredTopics
        : [...state.exploredTopics, topic];

      // Previous scores for this activity (for persistence badge)
      const previousAttempts = state.activityLog.filter((a) => a.activityId === activityId);
      const previousBest = previousAttempts.length > 0
        ? Math.max(...previousAttempts.map((a) => a.accuracy))
        : null;
      const hasImprovedScore = previousBest !== null && pointsResult.accuracy > previousBest;

      // Build new state
      const newState = {
        ...state,
        totalPoints: state.totalPoints + totalEarned,
        activitiesCompleted: state.activitiesCompleted + 1,
        quizzesCompleted: state.quizzesCompleted + 1,
        quizzesAbove70: state.quizzesAbove70 + (pointsResult.accuracy >= 70 ? 1 : 0),
        perfectQuizzes: state.perfectQuizzes + (pointsResult.isPerfect ? 1 : 0),
        sessionQuizzes: state.sessionQuizzes + 1,
        completedActivityIds: [...new Set([...state.completedActivityIds, activityId])],
        activityLog: [...state.activityLog, {
          activityId,
          topic,
          accuracy: pointsResult.accuracy,
          pointsEarned: totalEarned,
          completedAt: now,
          correctAnswers,
          totalQuestions,
        }],
        activityDates: newActivityDates,
        currentStreak: streakInfo.currentStreak,
        longestStreak: Math.max(state.longestStreak, streakInfo.currentStreak),
        hasPerfectQuiz: state.hasPerfectQuiz || pointsResult.isPerfect,
        hasImprovedScore: state.hasImprovedScore || hasImprovedScore,
        exploredTopics: newExploredTopics,
        topicsExplored: newExploredTopics.length,
        lastActiveDate: now,
      };

      // Check for new badges
      const newBadges = evaluateNewBadges(newState, state.badgesEarned);
      if (newBadges.length > 0) {
        newState.badgesEarned = [...state.badgesEarned, ...newBadges.map((b) => b.id)];
      }

      // Check for level up
      const levelUp = checkLevelUp(state.totalPoints, newState.totalPoints);

      // Build notifications
      const notifications = [];
      notifications.push({
        type: 'points',
        title: `+${totalEarned} Points!`,
        message: `${pointsResult.accuracy}% accuracy${streakBonus > 0 ? ` (+${streakBonus} streak bonus)` : ''}`,
        id: Date.now(),
      });
      if (levelUp) {
        notifications.push({
          type: 'levelup',
          title: 'Level Up!',
          message: `You reached Level ${levelUp.newLevel.level}: ${levelUp.newLevel.title} ${levelUp.newLevel.icon}`,
          id: Date.now() + 1,
        });
      }
      newBadges.forEach((badge, i) => {
        notifications.push({
          type: 'badge',
          title: 'Badge Unlocked!',
          message: `${badge.icon} ${badge.name}`,
          id: Date.now() + 2 + i,
        });
      });

      newState.notifications = [...state.notifications, ...notifications];

      // Update leaderboard rank
      const allUsers = seedUsers.map((u) =>
        u.id === 'user_current' ? { ...u, totalPoints: newState.totalPoints, badgesEarned: newState.badgesEarned, currentStreak: newState.currentStreak } : u
      );
      const ranked = rankUsers(allUsers, 'points');
      newState.leaderboardRank = getUserRank(ranked, 'user_current');

      return newState;
    }

    case 'CLAIM_MISSION': {
      const { missionId, rewardPoints } = action.payload;
      if (state.completedMissionIds.includes(missionId)) return state;

      const newState = {
        ...state,
        completedMissionIds: [...state.completedMissionIds, missionId],
        missionsCompleted: state.missionsCompleted + 1,
        totalPoints: state.totalPoints + (rewardPoints || 0),
        notifications: [...state.notifications, {
          type: 'mission',
          title: 'Mission Complete!',
          message: `+${rewardPoints || 0} bonus points!`,
          id: Date.now(),
        }],
      };

      // Re-check badges after mission completion
      const newBadges = evaluateNewBadges(newState, state.badgesEarned);
      if (newBadges.length > 0) {
        newState.badgesEarned = [...newState.badgesEarned, ...newBadges.map((b) => b.id)];
        newBadges.forEach((badge, i) => {
          newState.notifications.push({
            type: 'badge',
            title: 'Badge Unlocked!',
            message: `${badge.icon} ${badge.name}`,
            id: Date.now() + 1 + i,
          });
        });
      }

      return newState;
    }

    case 'DISMISS_NOTIFICATION': {
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    }

    case 'RECORD_LOGIN': {
      const now = new Date().toISOString();
      const newDates = [...state.activityDates];
      // We don't add the date if there's no activity, just update lastActive
      const streakInfo = computeStreak(newDates);
      return {
        ...state,
        currentStreak: streakInfo.currentStreak,
        longestStreak: Math.max(state.longestStreak, streakInfo.currentStreak),
        lastActiveDate: now,
      };
    }

    case 'LOGIN_USER': {
      return {
        ...state,
        userName: action.payload.name,
      };
    }

    case 'RESET_STATE': {
      localStorage.removeItem(STORAGE_KEY);
      return getInitialState();
    }

    default:
      return state;
  }
}

/* ─── Context ─── */

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, getInitialState);

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* storage full — ignore */ }
  }, [state]);

  // Record login on mount
  useEffect(() => {
    dispatch({ type: 'RECORD_LOGIN' });
  }, []);

  // Action creators
  const completeActivity = useCallback((activityId, correctAnswers, totalQuestions, topic, hintsUsed = 0) => {
    dispatch({
      type: 'COMPLETE_ACTIVITY',
      payload: { activityId, correctAnswers, totalQuestions, topic, hintsUsed },
    });
  }, []);

  const claimMission = useCallback((missionId, rewardPoints) => {
    dispatch({
      type: 'CLAIM_MISSION',
      payload: { missionId, rewardPoints },
    });
  }, []);

  const dismissNotification = useCallback((notificationId) => {
    dispatch({ type: 'DISMISS_NOTIFICATION', payload: notificationId });
  }, []);

  const loginUser = useCallback((name) => {
    dispatch({ type: 'LOGIN_USER', payload: { name } });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, []);

  // Derived values
  const levelInfo = computeLevel(state.totalPoints);
  const streakInfo = computeStreak(state.activityDates);
  const streakMessage = getStreakMessage(streakInfo.currentStreak, streakInfo.isActiveToday);
  const missionProgress = computeMissionProgress(state, state.completedMissionIds);

  // Build full leaderboard users list
  const allUsers = seedUsers.map((u) =>
    u.id === 'user_current'
      ? {
          ...u,
          name: state.userName,
          totalPoints: state.totalPoints,
          badgesEarned: state.badgesEarned,
          currentStreak: state.currentStreak,
          activitiesCompleted: state.activitiesCompleted,
          quizzesCompleted: state.quizzesCompleted,
          missionsCompleted: state.missionsCompleted,
          longestStreak: state.longestStreak,
          level: levelInfo.current.level,
        }
      : u
  );

  const value = {
    ...state,
    levelInfo,
    streakInfo,
    streakMessage,
    missionProgress,
    allUsers,

    // Actions
    completeActivity,
    claimMission,
    dismissNotification,
    loginUser,
    resetState,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

