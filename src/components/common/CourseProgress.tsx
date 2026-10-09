import React from 'react';

interface CourseProgressProps {
  completedCount: number;
  totalCount: number;
  showLabels?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({
  completedCount,
  totalCount,
  showLabels = true,
  size = 'md',
  className = '',
}) => {
  const percentage = totalCount > 0 ? Math.min(100, Math.round((completedCount / totalCount) * 100)) : 0;

  const barHeight = size === 'sm' ? 'h-1.5' : 'h-2.5';

  return (
    <div className={`w-full ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
          <span className="font-medium text-slate-700">
            {completedCount} of {totalCount} lessons completed
          </span>
          <span className="font-semibold text-indigo-600 tabular-nums">
            {percentage}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-slate-200/80 rounded-full overflow-hidden ${barHeight}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
