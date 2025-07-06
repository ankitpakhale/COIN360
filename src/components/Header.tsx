import { Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { FullscreenToggle } from './FullscreenToggle';

interface HeaderProps {
  onRefresh: () => void;
  lastUpdate: Date | null;
}

export const Header = ({ onRefresh, lastUpdate }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                COIN360
              </h1>
              <p className="text-sm text-muted-foreground">
                Crypto Observation & Intelligence Network 360°
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {lastUpdate && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Last Update</p>
                <p className="text-sm font-mono">
                  {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <FullscreenToggle />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRefresh}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};