/**
 * Индикатор загрузки (спиннер).
 *
 * Вращающийся круг с тремя размерами: sm (20px), md (32px), lg (48px).
 * Опциональная текстовая подпись.
 *
 * @param size — размер спиннера ('sm' | 'md' | 'lg'), по умолчанию 'md'
 * @param label — текстовая подпись под спиннером
 */
const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', label, className = '' }: SpinnerProps) {
  const spinner = (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (!label) {
    return spinner;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {spinner}
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
}
