import { useEffect, useState } from 'react';
import { DashboardCard } from './DashboardCard';
import { PriceDisplay } from './PriceDisplay';
import { safeAssetsData, simulatePriceUpdate } from '@/lib/mockData';
import { Shield, DollarSign, Coins, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons: Record<string, React.ReactNode> = {
  'XAU/USD': <Coins className="h-4 w-4" />,
  'US10Y': <Percent className="h-4 w-4" />,
  'USD/KRW': <DollarSign className="h-4 w-4" />,
  'DXY': <DollarSign className="h-4 w-4" />,
};

export function SafeAssetsTracker() {
  const [assets, setAssets] = useState(safeAssetsData);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((a) => {
          const volatility = a.symbol === 'US10Y' ? 0.0005 : 0.001;
          const newPrice = simulatePriceUpdate(a.price, volatility);
          const basePrice = a.price - a.change;
          const change = newPrice - basePrice;
          const changePercent = (change / basePrice) * 100;
          return { ...a, price: newPrice, change, changePercent };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardCard
      title="Safe Havens"
      subtitle="Flight-to-safety indicators"
      isLive
      glowColor="gold"
    >
      <div className="space-y-2">
        {assets.map((asset) => (
          <div
            key={asset.symbol}
            className="flex items-center gap-3 rounded-lg bg-secondary/30 px-3 py-2.5 transition-colors hover:bg-secondary/50"
          >
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg',
                asset.symbol === 'XAU/USD'
                  ? 'bg-neon-gold/20 text-neon-gold'
                  : 'bg-primary/20 text-primary'
              )}
            >
              {icons[asset.symbol]}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-foreground">
                    {asset.symbol}
                  </span>
                  <p className="text-[10px] text-muted-foreground">{asset.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold text-foreground animate-data-flicker">
                    {asset.symbol === 'US10Y'
                      ? `${asset.price.toFixed(2)}%`
                      : asset.price.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </p>
                  <p
                    className={cn(
                      'font-mono text-xs',
                      asset.changePercent >= 0 ? 'text-neon-green' : 'text-neon-red'
                    )}
                  >
                    {asset.changePercent >= 0 ? '+' : ''}
                    {asset.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Safe Haven Sentiment */}
        <div className="mt-3 rounded-lg border border-neon-gold/30 bg-neon-gold/5 p-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-neon-gold" />
            <span className="font-mono text-xs font-semibold text-neon-gold">
              Safe Haven Demand
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-gradient-to-r from-neon-gold/50 to-neon-gold transition-all duration-500"
                style={{ width: '68%' }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-foreground">68%</span>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Elevated demand for defensive assets
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
