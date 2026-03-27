/**
 * Toast Notification Container
 * 
 * Renders animated reward/feedback notifications with sound effects.
 * Auto-dismisses after a timeout.
 */

import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { playPoints, playBadgeUnlock, playLevelUp, playMissionComplete } from '../engine/soundEngine';

export default function ToastContainer() {
  const { notifications, dismissNotification } = useGame();

  return (
    <div className="toast-container">
      {notifications.slice(-5).map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}
    </div>
  );
}

function Toast({ notification, onDismiss }) {
  useEffect(() => {
    // Play sound based on notification type
    switch (notification.type) {
      case 'points': playPoints(); break;
      case 'badge': playBadgeUnlock(); break;
      case 'levelup': playLevelUp(); break;
      case 'mission': playMissionComplete(); break;
    }

    const timer = setTimeout(onDismiss, 4500);
    return () => clearTimeout(timer);
  }, [notification.type, onDismiss]);

  const typeIcons = {
    points: '⭐',
    badge: '🏆',
    levelup: '🚀',
    mission: '🎯',
  };

  return (
    <div className={`toast toast-${notification.type}`}>
      <span style={{ fontSize: '1.6rem', filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.2))' }}>
        {typeIcons[notification.type] || '🔔'}
      </span>
      <div className="toast-content">
        <div className="toast-title">{notification.title}</div>
        <div className="toast-message">{notification.message}</div>
      </div>
      <button className="toast-close" onClick={onDismiss}>×</button>
    </div>
  );
}
