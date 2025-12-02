import { useState, useEffect } from 'react';
import { DashboardCard } from './DashboardCard';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Building2, TrendingUp, TrendingDown, Home, BarChart3 } from 'lucide-react';
import { generateChartData, simulatePriceUpdate } from '@/lib/mockData';

interface RealAsset {
  id: string;
  name: string;
  value: number;
  change: number;
  unit: string;
}

const initialAssets: RealAsset[] = [
  { id: 'kr-reits', name: 'Korean REITs Index', value: 892.45, change: -1.8, unit: 'pts' },
  { id: 'seoul-apt', name: 'Seoul Apartment Index', value: 112.3, change: -0.4, unit: '' },
  { id: 'wti', name: 'WTI Crude Oil', value: 78.42, change: 1.2, unit: 'USD' },
  { id: 'copper', name: 'Copper', value: 4.12, change: 0.8, unit: 'USD/lb' },
];

export function RealAssetsFooter() {
  const [assets, setAssets] = useState(initialAssets);
  const [reitsChart] = useState(() => generateChartData(890, 24, 0.015));
  const [seoulChart] = useState(() => generateChartData(112, 24, 0.005));

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(a => ({
        ...a,
        value: simulatePriceUpdate(a.value, 0.001),
        change: a.change + (Math.random() - 0.5) * 0.1,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border border-border bg-card px-2 py-1">
          <p className="font-mono text-[10px] text-foreground">{payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardCard 
      title="Real Assets & Housing" 
      subtitle="Physical assets vs paper assets"
      isLive
      className="h-full"
    >
      <div className="flex h-full gap-6">
        {/* Charts Section */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* Korean REITs Chart */}
          <div className="rounded border border-border bg-card/50 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-neon-blue" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Korean REITs</span>
              </div>
              <div className="flex items-center gap-1">
                {assets[0].change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-neon-green" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-neon-red" />
                )}
                <span className={`font-mono text-xs font-semibold ${assets[0].change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                  {assets[0].change >= 0 ? '+' : ''}{assets[0].change.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="font-mono text-xl font-bold text-foreground mb-2">
              {assets[0].value.toFixed(2)}
            </div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={reitsChart}>
                  <defs>
                    <linearGradient id="reitsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(185 100% 50%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(185 100% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis domain={['dataMin', 'dataMax']} hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(185 100% 50%)"
                    strokeWidth={1.5}
                    fill="url(#reitsGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Seoul Apartment Index Chart */}
          <div className="rounded border border-border bg-card/50 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-neon-amber" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Seoul Apt Index</span>
              </div>
              <div className="flex items-center gap-1">
                {assets[1].change >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-neon-green" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-neon-red" />
                )}
                <span className={`font-mono text-xs font-semibold ${assets[1].change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                  {assets[1].change >= 0 ? '+' : ''}{assets[1].change.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="font-mono text-xl font-bold text-foreground mb-2">
              {assets[1].value.toFixed(1)}
            </div>
            <div className="h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={seoulChart}>
                  <defs>
                    <linearGradient id="seoulGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(25 100% 55%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(25 100% 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis domain={['dataMin', 'dataMax']} hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(25 100% 55%)"
                    strokeWidth={1.5}
                    fill="url(#seoulGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Commodities Section */}
        <div className="w-64 border-l border-border pl-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-neon-gold" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Commodities</span>
          </div>
          <div className="space-y-3">
            {assets.slice(2).map(asset => (
              <div key={asset.id} className="flex items-center justify-between rounded border border-border bg-card/50 p-2">
                <div>
                  <div className="font-mono text-[10px] text-muted-foreground">{asset.name}</div>
                  <div className="font-mono text-sm font-bold text-foreground">
                    {asset.unit === 'USD' && '$'}{asset.value.toFixed(2)}
                    {asset.unit && asset.unit !== 'USD' && <span className="text-[10px] text-muted-foreground ml-1">{asset.unit}</span>}
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${asset.change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                  {asset.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span className="font-mono text-xs font-semibold">
                    {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Paper vs Physical comparison */}
          <div className="mt-4 rounded border border-border/50 bg-card/30 p-2">
            <div className="font-mono text-[9px] text-muted-foreground uppercase mb-2">Paper vs Physical</div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="font-mono text-[10px] text-neon-blue">REITs</div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-neon-blue rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">vs</span>
              <div className="flex-1">
                <div className="font-mono text-[10px] text-neon-amber">Physical</div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-neon-amber rounded-full" style={{ width: '55%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
