import React from 'react';
import { Spinner } from '@/shared/ui';

interface Props {
  className?: string;
}

export function RoomConnectionNotice({ className = '' }: Props) {
  return (
    <div className={`fixed top-16 left-1/2 z-50 -translate-x-1/2 animate-in slide-in-from-top-2 ${className}`}>
      <div className="flex items-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-600 shadow-lg backdrop-blur dark:text-amber-400">
        <Spinner className="h-4 w-4" />
        <span>Переподключение...</span>
      </div>
    </div>
  );
}

export default RoomConnectionNotice;
