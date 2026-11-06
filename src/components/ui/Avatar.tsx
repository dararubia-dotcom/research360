const palette = [
  'bg-indigo-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-cyan-500',
  'bg-violet-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-sky-500',
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'h-7 w-7 text-[10px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-11 w-11 text-sm',
};

export default function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  const colorClass = palette[hashName(name) % palette.length];
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-semibold text-white ${colorClass} ${sizeStyles[size]} ${className}`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}
