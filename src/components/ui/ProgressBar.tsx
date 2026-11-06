interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md';
  color?: string;
}

function getAutoColor(value: number): string {
  if (value < 25) return 'bg-red-500';
  if (value < 50) return 'bg-amber-500';
  if (value < 75) return 'bg-blue-500';
  return 'bg-emerald-500';
}

export default function ProgressBar({
  value,
  label,
  showPercentage = true,
  size = 'md',
  color,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const barColor = color ?? getAutoColor(clamped);
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && (
            <span className="text-xs font-medium text-slate-600">{label}</span>
          )}
          {showPercentage && (
            <span className="text-xs font-semibold text-slate-700">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-slate-100 ${height}`}>
        <div
          className={`${height} rounded-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
