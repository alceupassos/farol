import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Download, Wifi, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

export const ServiceWorkerManager = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    const handleOfflineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    // Register service worker
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
              setWaitingWorker(newWorker);
              toast.info('Nova versão disponível! Clique para atualizar.');
            }
          });
        }
      });

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setUpdateAvailable(false);
      
      // Reload page to activate new service worker
      window.location.reload();
    }
  };

  return (
    <>
      {/* Network Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
          isOnline 
            ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
            : 'bg-red-500/10 text-red-500 border border-red-500/20'
        }`}>
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4" />
              Online
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              Offline
            </>
          )}
        </div>
      </div>

      {/* Update Available Prompt */}
      {updateAvailable && (
        <Card className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Atualização Disponível
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription className="mb-4">
              Uma nova versão do app está disponível com melhorias e correções
            </CardDescription>
            <div className="flex gap-2">
              <Button onClick={handleUpdate} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Atualizar Agora
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setUpdateAvailable(false)}
              >
                Mais tarde
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};