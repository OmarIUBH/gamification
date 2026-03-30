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

import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import activities from '../data/activities';
import ProgressBar from '../components/ProgressBar';
import { playClick, playCorrect, playIncorrect, playQuizStart, playPerfect, playBGM, stopBGM } from '../engine/soundEngine';

export default function QuizPage() {
  const { activityId } = useParams();
  const { completeActivity, isAudioMuted } = useGame();

  const activity = activities.find((a) => a.id === activityId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [currentHint, setCurrentHint] = useState(null);

  // Handle active-page BGM with reactive mute state
  useEffect(() => {
    if (!isAudioMuted) {
      console.log("🎵 playBGM triggered in QuizPage");
      playBGM();
    } else {
      console.log("🔇 stopBGM triggered in QuizPage");
      stopBGM();
    }

    return () => {
      stopBGM();
    };
  }, [isAudioMuted]);

  // Reset state when activity changes + play start sound
  useEffect(() => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setShowResults(false);
    setHasSubmitted(false);
    setHintsUsed(0);
    setCurrentHint(null);
    playQuizStart();
  }, [activityId]);


  const question = activity?.questions?.[currentQuestion];
  const totalQuestions = activity?.questions?.length || 0;
  const letters = ['A', 'B', 'C', 'D'];

  // Shuffle options so users memorize the answer, not the position
  const shuffledOptions = useMemo(() => {
    if (!question) return [];
    // Map with original indices before shuffling
    const mapped = question.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
    // Fisher-Yates shuffle
    for (let i = mapped.length - 1; i > 0; i--) {
      // eslint-disable-next-line react-hooks/purity
      const j = Math.floor(Math.random() * (i + 1));
      [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
    }
    return mapped;
  }, [question]);

  if (!activity) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">❓</div>
        <p className="empty-state-text">Activity not found.</p>
        <Link to="/activities" className="btn btn-primary mt-lg">Back to Activities</Link>
      </div>
    );
  }

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
        completeActivity(activity.id, finalCorrect, totalQuestions, activity.topic, hintsUsed);
        setHasSubmitted(true);
        // Play perfect sound if 100%
        if (finalCorrect === totalQuestions) {
          setTimeout(() => playPerfect(), 500);
        }
      }
    }
  };

  const handleShowHint = () => {
    if (isAnswered || currentHint) return;
    if (window.confirm("Using a hint will deduct 15% from your final score for this activity. Are you sure you want to use a hint?")) {
      playClick();
      setHintsUsed((h) => h + 1);
      
      // Determine what to show for the hint.
      // Easiest is to tell them one option that is definitely NOT correct.
      const incorrectIndices = [0, 1, 2, 3]
        .filter(i => i < question.options.length && i !== question.correctIndex);
      const randomIncorrect = incorrectIndices[Math.floor(Math.random() * incorrectIndices.length)];
      
      setCurrentHint(`💡 Hint: The correct answer is NOT "${question.options[randomIncorrect]}".`);
    }
  };

  // Results and Quiz Views Combined
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  const scoreClass = accuracy >= 90 ? 'excellent' : accuracy >= 70 ? 'good' : accuracy >= 50 ? 'average' : 'poor';
  const getMessage = () => {
    if (accuracy === 100) return "PERFECT SCORE! You're absolutely crushing it! 🌟🔥";
    if (accuracy >= 80) return "Amazing job! You really know your stuff! 💪";
    if (accuracy >= 60) return "Good effort! Keep pushing higher! 📚";
    return "No worries — every attempt makes you stronger! 🌱";
  };

  return (
    <>
      {showResults ? (
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
                setHintsUsed(0);
                setCurrentHint(null);
                playQuizStart();
              }}>
                🔄 Retry Quiz
              </button>
              <Link to="/activities" className="btn btn-primary" onClick={playClick}>📚 More Activities</Link>
              <Link to="/dashboard" className="btn btn-secondary" onClick={playClick}>📊 Dashboard</Link>
            </div>
          </div>
        </div>
      ) : (
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
              {shuffledOptions.map((optObj, index) => {
                let className = 'quiz-option';
                const isCorrectOption = optObj.originalIndex === question.correctIndex;
                const isSelectedOption = optObj.originalIndex === selectedAnswer;

                if (isAnswered) {
                  className += ' disabled';
                  if (isCorrectOption) className += ' correct';
                  else if (isSelectedOption && !isCorrectOption) className += ' incorrect';
                } else if (isSelectedOption) {
                  className += ' selected';
                }

                return (
                  <div
                    key={index}
                    className={className}
                    onClick={() => handleSelectAnswer(optObj.originalIndex)}
                  >
                    <span className="quiz-option-letter">{letters[index]}</span>
                    <span>{optObj.text}</span>
                    {isAnswered && isCorrectOption && <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>✅</span>}
                    {isAnswered && isSelectedOption && !isCorrectOption && <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>❌</span>}
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

            {/* Current Hint */}
            {currentHint && !isAnswered && (
              <div className="quiz-explanation" style={{ background: 'rgba(255, 159, 67, 0.1)', borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}>
                {currentHint}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="quiz-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', alignItems: 'center' }}>
            {!isAnswered && !currentHint && (
              <button 
                className="btn btn-secondary" 
                style={{ marginRight: 'auto', fontSize: '0.85rem' }}
                onClick={handleShowHint}
              >
                💡 Need a Hint? (-15% pts)
              </button>
            )}
            
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
      )}
    </>
  );
}
