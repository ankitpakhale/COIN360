import { Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const FullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleFullscreen}
      className="flex items-center space-x-2"
    >
      {isFullscreen ? (
        <Minimize className="h-4 w-4" />
      ) : (
        <Maximize className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">
        {isFullscreen ? 'Exit' : 'Fullscreen'}
      </span>
    </Button>
  );
};