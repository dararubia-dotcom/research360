import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export default function StatCard({
  icon,
  value,
  label,
  trend,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
          {icon}
        </div>
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
              trend.positive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {trend.positive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend.value}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}
