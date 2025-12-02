import { useEffect, useState } from 'react';
import { DashboardCard } from './DashboardCard';
import { koreaMarketData, generateChartData, simulatePriceUpdate } from '@/lib/mockData';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function KoreaMarketMonitor() {
  const [markets, setMarkets] = useState(koreaMarketData);
  const [kospiChart] = useState(generateChartData(2456, 48, 0.008));
  const [kosdaqChart] = useState(generateChartData(712, 48, 0.012));
  const [selectedIndex, setSelectedIndex] = useState<'KOSPI' | 'KOSDAQ'>('KOSPI');

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prev) =>
        prev.map((m) => {
          const newPrice = simulatePriceUpdate(m.price, 0.001);
          const change = newPrice - (m.price - m.change);
          const changePercent = (change / (m.price - m.change)) * 100;
          return { ...m, price: newPrice, change, changePercent };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const chartData = selectedIndex === 'KOSPI' ? kospiChart : kosdaqChart;
  const selectedMarket = markets.find((m) => m.symbol === selectedIndex)!;
  const isPositive = selectedMarket.changePercent >= 0;

  return (
    <DashboardCard
      title="Korea Market"
      subtitle="KOSPI & KOSDAQ Indices"
      isLive
      className="row-span-2"
    >
      <div className="flex h-full flex-col">
        {/* Index Tabs */}
        <div className="mb-3 flex gap-2">
          {markets.map((market) => {
            const positive = market.changePercent >= 0;
            const isSelected = market.symbol === selectedIndex;
            
            return (
              <button
                key={market.symbol}
                onClick={() => setSelectedIndex(market.symbol as 'KOSPI' | 'KOSDAQ')}
                className={cn(
                  'flex-1 rounded-lg border p-3 text-left transition-all duration-200',
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-secondary/30 hover:bg-secondary/50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-foreground">
                    {market.symbol}
                  </span>
                  {positive ? (
                    <TrendingUp className="h-3 w-3 text-neon-green" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-neon-red" />
                  )}
                </div>
                <p className="mt-1 font-mono text-lg font-bold text-foreground animate-data-flicker">
                  {market.price.toFixed(2)}
                </p>
                <p
                  className={cn(
                    'font-mono text-xs',
                    positive ? 'text-neon-green' : 'text-neon-red'
                  )}
                >
                  {positive ? '+' : ''}{market.changePercent.toFixed(2)}%
                </p>
              </button>
            );
          })}
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="koreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isPositive ? 'hsl(160, 100%, 50%)' : 'hsl(345, 100%, 60%)'}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor={isPositive ? 'hsl(160, 100%, 50%)' : 'hsl(345, 100%, 60%)'}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={['dataMin - 10', 'dataMax + 10']}
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(230, 20%, 10%)',
                  border: '1px solid hsl(230, 20%, 18%)',
                  borderRadius: '8px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: 12,
                }}
                labelStyle={{ color: 'hsl(215, 15%, 50%)' }}
                itemStyle={{ color: 'hsl(210, 20%, 90%)' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={isPositive ? 'hsl(160, 100%, 50%)' : 'hsl(345, 100%, 60%)'}
                strokeWidth={2}
                fill="url(#koreaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Market Stats */}
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border/50 pt-3">
          <div>
            <span className="text-[10px] text-muted-foreground">Change</span>
            <p
              className={cn(
                'font-mono text-sm font-semibold',
                isPositive ? 'text-neon-green' : 'text-neon-red'
              )}
            >
              {isPositive ? '+' : ''}{selectedMarket.change.toFixed(2)}
            </p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground">Volume</span>
            <p className="font-mono text-sm font-semibold text-foreground">
              {selectedMarket.volume}
            </p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground">Status</span>
            <p className="font-mono text-sm font-semibold text-neon-green">OPEN</p>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
