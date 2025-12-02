import { Activity, Wifi, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date, tz: string, label: string) => {
    const time = date.toLocaleTimeString('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return { time, label };
  };

  const times = [
    formatTime(currentTime, 'Asia/Seoul', 'SEOUL'),
    formatTime(currentTime, 'America/New_York', 'NYC'),
    formatTime(currentTime, 'Europe/London', 'LONDON'),
  ];

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-neon-purple">
            <Activity className="h-5 w-5 text-background" />
          </div>
          <div>
            <h1 className="font-mono text-lg font-bold tracking-tight text-foreground">
              CAPITAL FLOW
              <span className="ml-2 text-primary">MASTER BOARD</span>
            </h1>
            <p className="text-[10px] text-muted-foreground">
              Global Liquidity Movement Dashboard v2.0
            </p>
          </div>
        </div>

        {/* Status & Times */}
        <div className="flex items-center gap-6">
          {/* World Clocks */}
          <div className="flex items-center gap-4">
            {times.map(({ time, label }) => (
              <div key={label} className="text-center">
                <span className="font-mono text-xs text-muted-foreground">{label}</span>
                <p className="font-mono text-sm font-semibold text-foreground">{time}</p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border" />

          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Wifi className="h-4 w-4 text-neon-green" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-neon-green animate-pulse" />
            </div>
            <span className="font-mono text-xs text-neon-green">CONNECTED</span>
          </div>

          {/* Last Update */}
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-1.5">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground">
              Last update: {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
