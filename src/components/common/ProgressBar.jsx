import React from 'react';

export default function ProgressBar({ current, target, height = 'h-2.5', showText = false, className = '' }) {
  const percentage = Math.min(100, Math.round((current / (target || 1)) * 100));

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between items-center text-xs font-semibold mb-1">
          <span className="text-hope-charcoal">{percentage}% Funded</span>
          <span className="text-hope-charcoal-muted">Target: ₹ {target?.toLocaleString()}</span>
        </div>
      )}
      <div className={`w-full bg-teal-50 rounded-full overflow-hidden border border-teal-100/50 ${height}`}>
        <div
          className="bg-gradient-to-r from-hope-teal to-hope-orange h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
