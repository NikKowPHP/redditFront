export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md ${className}`} />
  );
} 