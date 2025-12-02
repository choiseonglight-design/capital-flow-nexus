import { useEffect, useState } from 'react';
import { DashboardCard } from './DashboardCard';
import { globalIndicesData, simulatePriceUpdate } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Globe } from 'lucide-react';

export function GlobalIndices() {
  const [indices, setIndices] = useState(globalIndicesData);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((idx) => {
          const newPrice = simulatePriceUpdate(idx.price, 0.0008);
          const basePrice = idx.price - idx.change;
          const change = newPrice - basePrice;
          const changePercent = (change / basePrice) * 100;
          return { ...idx, price: newPrice, change, changePercent };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardCard
      title="Global Indices"
      subtitle="Major market benchmarks"
      isLive
    >
      <div className="space-y-2">
        {indices.map((index) => {
          const isPositive = index.changePercent >= 0;

          return (
            <div
              key={index.symbol}
              className="flex items-center justify-between rounded-lg bg-secondary/30 px-3 py-2 transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-mono text-xs font-bold text-foreground">
                    {index.symbol}
                  </span>
                  <p className="text-[10px] text-muted-foreground">{index.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold text-foreground animate-data-flicker">
                  {index.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
                <div
                  className={cn(
                    'flex items-center gap-1 rounded px-1.5 py-0.5',
                    isPositive ? 'bg-neon-green/10' : 'bg-neon-red/10'
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 text-neon-green" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-neon-red" />
                  )}
                  <span
                    className={cn(
                      'font-mono text-xs font-semibold',
                      isPositive ? 'text-neon-green' : 'text-neon-red'
                    )}
                  >
                    {isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
