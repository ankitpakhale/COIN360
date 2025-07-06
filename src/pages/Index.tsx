import { useState, useEffect } from "react";
import { CryptoTable } from "@/components/CryptoTable";
import { Header } from "@/components/Header";
import { useCryptoData } from "@/hooks/useCryptoData";
import { Card } from "@/components/ui/card";
import { AlertCircle, Wifi, WifiOff } from "lucide-react";

const Index = () => {
  const { data, loading, error, refetch } = useCryptoData();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (data.length > 0 && !loading) {
      setLastUpdate(new Date());
    }
  }, [data, loading]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (error && !data.length) {
    return (
      <div className="min-h-screen bg-background">
        <Header onRefresh={refetch} lastUpdate={lastUpdate} />
        <div className="container mx-auto px-6 py-8">
          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unable to Load Data</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onRefresh={refetch} lastUpdate={lastUpdate} />

      <main className="container mx-auto px-6 py-8">
        {!isOnline && (
          <Card className="mb-6 p-4 border-destructive bg-destructive/10">
            <div className="flex items-center space-x-2 text-destructive">
              <WifiOff className="h-5 w-5" />
              <span className="font-medium">You are currently offline</span>
            </div>
          </Card>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Live Market Data
            </h2>
            <p className="text-muted-foreground mt-1">
              Real-time cryptocurrency prices
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                isOnline ? "bg-bull/20 text-bull" : "bg-bear/20 text-bear"
              }`}
            >
              {isOnline ? (
                <Wifi className="h-4 w-4" />
              ) : (
                <WifiOff className="h-4 w-4" />
              )}
              <span>{isOnline ? "Live" : "Offline"}</span>
            </div>
            {!loading && data.length > 0 && (
              <div className="text-muted-foreground">
                Tracking {data.length} assets
              </div>
            )}
          </div>
        </div>

        <CryptoTable data={data} loading={loading} />

        {error && data.length > 0 && (
          <Card className="mt-4 p-4 border-destructive bg-destructive/10">
            <div className="flex items-center space-x-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span>Latest update failed: {error}</span>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
