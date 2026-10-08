import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 rounded-full bg-[#1A1C22]/95 backdrop-blur-md border border-[#D4AF37]/40 px-4 py-2 text-xs font-medium text-[#EDE8DF] shadow-2xl animate-bounce">
      <WifiOff className="w-4 h-4 text-[#D4AF37]" />
      <span>Offline Mode — Cached Bible content remains available.</span>
    </div>
  );
};
