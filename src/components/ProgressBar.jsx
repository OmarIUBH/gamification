/**
 * Reusable ProgressBar Component
 */

export default function ProgressBar({ value = 0, max = 100, label, sublabel, large = false }) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div>
      {(label || sublabel) && (
        <div className="progress-label">
          <span>{label}</span>
          <span>{sublabel || `${percent}%`}</span>
        </div>
      )}
      <div className={`progress-bar-container ${large ? 'progress-bar-lg' : ''}`}>
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
