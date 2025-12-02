import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  glowColor?: 'green' | 'red' | 'blue' | 'gold' | 'none';
  isLive?: boolean;
}

export function DashboardCard({
  title,
  subtitle,
  children,
  className,
  glowColor = 'none',
  isLive = false,
}: DashboardCardProps) {
  const glowClasses = {
    green: 'glow-green',
    red: 'glow-red',
    blue: 'glow-blue',
    gold: 'glow-gold',
    none: '',
  };

  return (
    <div
      className={cn(
        'dashboard-card relative flex flex-col',
        glowClasses[glowColor],
        className
      )}
    >
      {/* Scan line effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
      </div>

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-[10px] text-muted-foreground/60">{subtitle}</p>
          )}
        </div>
        {isLive && (
          <div className="live-indicator">
            <span className="font-mono text-[10px] uppercase text-neon-green">Live</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
