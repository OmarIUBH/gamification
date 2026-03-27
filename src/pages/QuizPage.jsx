/**
 * Quiz Page
 * 
 * Interactive quiz experience with sound effects:
 * - Question-by-question progression
 * - Immediate answer feedback with explanations + sounds
 * - Points calculation with accuracy multiplier
 * - Results screen with reward breakdown
 * - Badge/mission/level-up notifications
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import activities from '../data/activities';
import ProgressBar from '../components/ProgressBar';
import { playClick, playCorrect, playIncorrect, playQuizStart, playPerfect } from '../engine/soundEngine';

export default function QuizPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { completeActivity } = useGame();

  const activity = activities.find((a) => a.id === activityId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Reset state when activity changes + play start sound
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setShowResults(false);
    setHasSubmitted(false);
    playQuizStart();
  }, [activityId]);

  if (!activity) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">❓</div>
        <p className="empty-state-text">Activity not found.</p>
        <Link to="/activities" className="btn btn-primary mt-lg">Back to Activities</Link>
      </div>
    );
  }

  const question = activity.questions[currentQuestion];
  const totalQuestions = activity.questions.length;
  const letters = ['A', 'B', 'C', 'D'];

  const handleSelectAnswer = (index) => {
    if (isAnswered) return;
    playClick();
    setSelectedAnswer(index);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    setIsAnswered(true);
    if (selectedAnswer === question.correctIndex) {
      setCorrectCount((c) => c + 1);
      playCorrect();
    } else {
      playIncorrect();
    }
  };

  const handleNext = () => {
    playClick();
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz complete — show results
      setShowResults(true);

      if (!hasSubmitted) {
        const finalCorrect = correctCount;
        completeActivity(activity.id, finalCorrect, totalQuestions, activity.topic);
        setHasSubmitted(true);
        // Play perfect sound if 100%
        if (finalCorrect === totalQuestions) {
          setTimeout(() => playPerfect(), 500);
        }
      }
    }
  };

  // Results Screen
  if (showResults) {
    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    const scoreClass = accuracy >= 90 ? 'excellent' : accuracy >= 70 ? 'good' : accuracy >= 50 ? 'average' : 'poor';
    const getMessage = () => {
      if (accuracy === 100) return "PERFECT SCORE! You're absolutely crushing it! 🌟🔥";
      if (accuracy >= 80) return "Amazing job! You really know your stuff! 💪";
      if (accuracy >= 60) return "Good effort! Keep pushing higher! 📚";
      return "No worries — every attempt makes you stronger! 🌱";
    };

    return (
      <div className="quiz-container">
        <div className="results-container">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>
            Quiz Complete! 🎉
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{activity.title}</p>

          <div className={`results-score ${scoreClass}`}>{accuracy}%</div>
          <p className="results-message">{getMessage()}</p>

          <div className="results-breakdown">
            <div className="results-stat">
              <div className="results-stat-value text-success">{correctCount}</div>
              <div className="results-stat-label">Correct</div>
            </div>
            <div className="results-stat">
              <div className="results-stat-value text-danger">{totalQuestions - correctCount}</div>
              <div className="results-stat-label">Incorrect</div>
            </div>
            <div className="results-stat">
              <div className="results-stat-value text-accent">{totalQuestions}</div>
              <div className="results-stat-label">Total</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={() => {
              playClick();
              setCurrentQuestion(0);
              setSelectedAnswer(null);
              setIsAnswered(false);
              setCorrectCount(0);
              setShowResults(false);
              setHasSubmitted(false);
              playQuizStart();
            }}>
              🔄 Retry Quiz
            </button>
            <Link to="/activities" className="btn btn-primary" onClick={playClick}>📚 More Activities</Link>
            <Link to="/dashboard" className="btn btn-secondary" onClick={playClick}>📊 Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Question Screen
  return (
    <div className="quiz-container">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link to="/activities" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }} onClick={playClick}>← Back to Activities</Link>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '8px', fontFamily: 'Space Grotesk, sans-serif' }}>
          {activity.title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <span className={`activity-topic-tag topic-${activity.topic}`}>{activity.topic}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-xp)', fontWeight: 700 }}>⭐ {activity.points} pts</span>
        </div>
      </div>

      {/* Progress */}
      <div className="quiz-progress">
        <ProgressBar
          value={currentQuestion + 1}
          max={totalQuestions}
          label={`Question ${currentQuestion + 1} of ${totalQuestions}`}
        />
      </div>

      {/* Question */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <p className="quiz-question-text">{question.text}</p>

        <div className="quiz-options">
          {question.options.map((option, index) => {
            let className = 'quiz-option';
            if (isAnswered) {
              className += ' disabled';
              if (index === question.correctIndex) className += ' correct';
              else if (index === selectedAnswer && selectedAnswer !== question.correctIndex) className += ' incorrect';
            } else if (index === selectedAnswer) {
              className += ' selected';
            }

            return (
              <div
                key={index}
                className={className}
                onClick={() => handleSelectAnswer(index)}
              >
                <span className="quiz-option-letter">{letters[index]}</span>
                <span>{option}</span>
                {isAnswered && index === question.correctIndex && <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>✅</span>}
                {isAnswered && index === selectedAnswer && selectedAnswer !== question.correctIndex && <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>❌</span>}
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className="quiz-explanation">
            💡 {question.explanation}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="quiz-actions">
        {!isAnswered ? (
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={selectedAnswer === null}
          >
            ⚡ Confirm Answer
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            {currentQuestion < totalQuestions - 1 ? 'Next Question →' : 'See Results 🎉'}
          </button>
        )}
      </div>
    </div>
  );
}
