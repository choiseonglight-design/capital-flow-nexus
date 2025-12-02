import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PriceDisplayProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  variant?: 'default' | 'compact' | 'large';
  category?: 'crypto' | 'stock' | 'safe' | 'forex';
}

export function PriceDisplay({
  symbol,
  name,
  price,
  change,
  changePercent,
  variant = 'default',
  category = 'stock',
}: PriceDisplayProps) {
  const isPositive = change >= 0;
  const isNeutral = Math.abs(changePercent) < 0.01;

  const categoryColors = {
    crypto: 'text-neon-blue',
    stock: isPositive ? 'text-neon-green' : 'text-neon-red',
    safe: 'text-neon-gold',
    forex: 'text-foreground',
  };

  const formatPrice = (p: number) => {
    if (p >= 10000) return p.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (p >= 100) return p.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (p >= 1) return p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return p.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between py-1.5">
        <div className="flex items-center gap-2">
          <span className={cn('font-mono text-xs font-semibold', categoryColors[category])}>
            {symbol}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium text-foreground">
            {formatPrice(price)}
          </span>
          <span
            className={cn(
              'font-mono text-xs',
              isNeutral ? 'text-muted-foreground' : isPositive ? 'text-neon-green' : 'text-neon-red'
            )}
          >
            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className={cn('font-mono text-sm font-bold', categoryColors[category])}>
            {symbol}
          </span>
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-3xl font-bold text-foreground animate-data-flicker">
            {formatPrice(price)}
          </span>
          <div
            className={cn(
              'flex items-center gap-1 rounded px-2 py-0.5',
              isNeutral
                ? 'bg-muted'
                : isPositive
                ? 'bg-neon-green/10'
                : 'bg-neon-red/10'
            )}
          >
            {isNeutral ? (
              <Minus className="h-3 w-3 text-muted-foreground" />
            ) : isPositive ? (
              <TrendingUp className="h-3 w-3 text-neon-green" />
            ) : (
              <TrendingDown className="h-3 w-3 text-neon-red" />
            )}
            <span
              className={cn(
                'font-mono text-sm font-semibold',
                isNeutral ? 'text-muted-foreground' : isPositive ? 'text-neon-green' : 'text-neon-red'
              )}
            >
              {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-secondary/30 px-3 py-2.5 transition-colors hover:bg-secondary/50">
      <div>
        <div className="flex items-center gap-2">
          <span className={cn('font-mono text-sm font-bold', categoryColors[category])}>
            {symbol}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">{name}</span>
      </div>
      <div className="text-right">
        <div className="font-mono text-sm font-medium text-foreground">
          {formatPrice(price)}
        </div>
        <div
          className={cn(
            'flex items-center justify-end gap-1 font-mono text-xs',
            isNeutral ? 'text-muted-foreground' : isPositive ? 'text-neon-green' : 'text-neon-red'
          )}
        >
          {!isNeutral && (isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />)}
          <span>{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}
