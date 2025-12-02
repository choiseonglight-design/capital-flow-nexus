import { useState, useEffect } from 'react';
import { DashboardCard } from './DashboardCard';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Shield } from 'lucide-react';
import { koreaMarketData, safeAssetsData, generateChartData, simulatePriceUpdate } from '@/lib/mockData';

export function KoreanCoreZone() {
  const [kospiData, setKospiData] = useState(koreaMarketData[0]);
  const [kosdaqData, setKosdaqData] = useState(koreaMarketData[1]);
  const [usdKrw, setUsdKrw] = useState(safeAssetsData[2]);
  const [kospiChart] = useState(() => generateChartData(2456, 30, 0.008));
  const [kosdaqChart] = useState(() => generateChartData(712, 30, 0.012));

  useEffect(() => {
    const interval = setInterval(() => {
      setKospiData(prev => ({
        ...prev,
        price: simulatePriceUpdate(prev.price, 0.0003),
        change: prev.change + (Math.random() - 0.5) * 2,
      }));
      setKosdaqData(prev => ({
        ...prev,
        price: simulatePriceUpdate(prev.price, 0.0004),
        change: prev.change + (Math.random() - 0.5) * 1,
      }));
      setUsdKrw(prev => ({
        ...prev,
        price: simulatePriceUpdate(prev.price, 0.0002),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getKrwStatus = () => {
    if (usdKrw.price > 1420) return { status: 'danger', label: 'CRITICAL', color: 'text-neon-red', bg: 'bg-neon-red/10', border: 'border-neon-red/30' };
    if (usdKrw.price > 1380) return { status: 'warning', label: 'WARNING', color: 'text-neon-amber', bg: 'bg-neon-amber/10', border: 'border-neon-amber/30' };
    return { status: 'safe', label: 'STABLE', color: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/30' };
  };

  const krwStatus = getKrwStatus();

  return (
    <DashboardCard 
      title="Korean Core" 
      subtitle="KOSPI • KOSDAQ • KRW"
      isLive
      className="h-full"
    >
      <div className="flex h-full flex-col gap-3">
        {/* KOSPI & KOSDAQ Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* KOSPI */}
          <div className="rounded border border-border bg-card/50 p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">KOSPI</span>
              {kospiData.changePercent >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-neon-green" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-neon-red" />
              )}
            </div>
            <div className="mt-1 flex items-end justify-between">
              <span className="font-mono text-xl font-bold text-foreground">
                {kospiData.price.toFixed(2)}
              </span>
              <span className={`font-mono text-sm font-semibold ${kospiData.changePercent >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                {kospiData.changePercent >= 0 ? '+' : ''}{kospiData.changePercent.toFixed(2)}%
              </span>
            </div>
            <div className="mt-2 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kospiChart}>
                  <defs>
                    <linearGradient id="kospiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(145 100% 50%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(145 100% 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis domain={['dataMin', 'dataMax']} hide />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(145 100% 50%)"
                    strokeWidth={1.5}
                    fill="url(#kospiGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* KOSDAQ */}
          <div className="rounded border border-border bg-card/50 p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">KOSDAQ</span>
              {kosdaqData.changePercent >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-neon-green" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-neon-red" />
              )}
            </div>
            <div className="mt-1 flex items-end justify-between">
              <span className="font-mono text-xl font-bold text-foreground">
                {kosdaqData.price.toFixed(2)}
              </span>
              <span className={`font-mono text-sm font-semibold ${kosdaqData.changePercent >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                {kosdaqData.changePercent >= 0 ? '+' : ''}{kosdaqData.changePercent.toFixed(2)}%
              </span>
            </div>
            <div className="mt-2 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kosdaqChart}>
                  <defs>
                    <linearGradient id="kosdaqGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(0 100% 60%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(0 100% 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis domain={['dataMin', 'dataMax']} hide />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(0 100% 60%)"
                    strokeWidth={1.5}
                    fill="url(#kosdaqGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* USD/KRW Exchange Rate - Prominent */}
        <div className={`flex-1 rounded border ${krwStatus.border} ${krwStatus.bg} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">USD/KRW</span>
              {krwStatus.status === 'danger' && <AlertTriangle className="h-4 w-4 text-neon-red animate-pulse" />}
              {krwStatus.status === 'warning' && <AlertTriangle className="h-4 w-4 text-neon-amber" />}
              {krwStatus.status === 'safe' && <Shield className="h-4 w-4 text-neon-green" />}
            </div>
            <span className={`font-mono text-[10px] font-bold uppercase ${krwStatus.color}`}>
              {krwStatus.label}
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <span className={`font-mono text-3xl font-bold ${krwStatus.color}`}>
                ₩{usdKrw.price.toFixed(2)}
              </span>
              <span className="ml-2 font-mono text-sm text-muted-foreground">/USD</span>
            </div>
            <span className={`font-mono text-sm font-semibold ${usdKrw.changePercent >= 0 ? 'text-neon-red' : 'text-neon-green'}`}>
              {usdKrw.changePercent >= 0 ? '▲' : '▼'} {Math.abs(usdKrw.changePercent).toFixed(2)}%
            </span>
          </div>
          
          {/* KRW Strength Meter */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1">
              <span>Strong ₩</span>
              <span>Weak ₩</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min(100, Math.max(0, (usdKrw.price - 1300) / 2))}%`,
                  background: `linear-gradient(90deg, hsl(145 100% 50%), hsl(38 100% 55%), hsl(0 100% 60%))`
                }}
              />
            </div>
            <div className="flex justify-between mt-1 font-mono text-[9px] text-muted-foreground">
              <span>1,300</span>
              <span>1,350</span>
              <span>1,400</span>
              <span>1,450</span>
              <span>1,500</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
