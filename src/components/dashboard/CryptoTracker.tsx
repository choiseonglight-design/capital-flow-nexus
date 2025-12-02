import { useEffect, useState } from 'react';
import { DashboardCard } from './DashboardCard';
import { PriceDisplay } from './PriceDisplay';
import { cryptoData, generateChartData, simulatePriceUpdate } from '@/lib/mockData';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { cn } from '@/lib/utils';

export function CryptoTracker() {
  const [crypto, setCrypto] = useState(cryptoData);
  const [btcChart] = useState(generateChartData(97842, 24, 0.015));
  const [ethChart] = useState(generateChartData(3456, 24, 0.02));

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCrypto((prev) =>
        prev.map((c) => {
          const newPrice = simulatePriceUpdate(c.price, 0.002);
          const change = newPrice - (c.price - c.change);
          const changePercent = (change / (c.price - c.change)) * 100;
          return {
            ...c,
            price: newPrice,
            change,
            changePercent,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardCard
      title="Crypto Assets"
      subtitle="Digital currency markets"
      isLive
      glowColor="blue"
    >
      <div className="space-y-4">
        {crypto.map((asset, index) => {
          const chartData = index === 0 ? btcChart : ethChart;
          const isPositive = asset.changePercent >= 0;

          return (
            <div key={asset.symbol} className="space-y-2">
              <PriceDisplay
                symbol={asset.symbol}
                name={asset.name}
                price={asset.price}
                change={asset.change}
                changePercent={asset.changePercent}
                variant="large"
                category="crypto"
              />
              
              {/* Mini chart */}
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id={`gradient-${asset.symbol}`} x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={isPositive ? 'hsl(160, 100%, 50%)' : 'hsl(345, 100%, 60%)'}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={isPositive ? 'hsl(160, 100%, 50%)' : 'hsl(345, 100%, 60%)'}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <YAxis domain={['dataMin', 'dataMax']} hide />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={isPositive ? 'hsl(160, 100%, 50%)' : 'hsl(345, 100%, 60%)'}
                      strokeWidth={1.5}
                      fill={`url(#gradient-${asset.symbol})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* 24h stats */}
              <div className="flex justify-between border-t border-border/50 pt-2">
                <div>
                  <span className="text-[10px] text-muted-foreground">24h High</span>
                  <p className="font-mono text-xs text-neon-green">
                    ${asset.high24h?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground">24h Low</span>
                  <p className="font-mono text-xs text-neon-red">
                    ${asset.low24h?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground">Volume</span>
                  <p className="font-mono text-xs text-foreground">{asset.volume}</p>
                </div>
              </div>

              {index === 0 && <div className="border-b border-border/30" />}
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
