import { useState, useEffect } from 'react';
import { DashboardCard } from './DashboardCard';
import { ArrowUp, ArrowDown, Link2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { globalIndicesData, safeAssetsData, simulatePriceUpdate } from '@/lib/mockData';

interface CorrelationData {
  factor: string;
  value: number;
  change: number;
  koreanImpact: string;
  correlation: 'high' | 'medium' | 'low';
  direction: 'positive' | 'negative' | 'neutral';
}

const correlationFactors: CorrelationData[] = [
  { factor: 'US 10Y Yield', value: 4.32, change: 0.05, koreanImpact: 'Pressure on KOSPI', correlation: 'high', direction: 'negative' },
  { factor: 'S&P 500', value: 6032, change: 0.70, koreanImpact: 'Risk sentiment boost', correlation: 'high', direction: 'positive' },
  { factor: 'NVIDIA', value: 142.50, change: 2.3, koreanImpact: 'Samsung/SK Hynix correlated', correlation: 'high', direction: 'positive' },
  { factor: 'WTI Crude', value: 78.42, change: -1.2, koreanImpact: 'Import cost reduction', correlation: 'medium', direction: 'negative' },
  { factor: 'China PMI', value: 50.3, change: 0.4, koreanImpact: 'Export demand signal', correlation: 'medium', direction: 'positive' },
];

export function GlobalImpactFactors() {
  const [factors, setFactors] = useState(correlationFactors);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactors(prev => prev.map(f => ({
        ...f,
        value: simulatePriceUpdate(f.value, 0.001),
        change: f.change + (Math.random() - 0.5) * 0.1,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getCorrelationColor = (correlation: string) => {
    if (correlation === 'high') return 'bg-neon-amber';
    if (correlation === 'medium') return 'bg-neon-blue';
    return 'bg-muted-foreground';
  };

  const getDirectionIcon = (direction: string, change: number) => {
    if (change > 0) return <ArrowUp className="h-3 w-3 text-neon-green" />;
    if (change < 0) return <ArrowDown className="h-3 w-3 text-neon-red" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const getImpactColor = (direction: string, change: number) => {
    if (direction === 'positive') return change > 0 ? 'text-neon-green' : 'text-neon-red';
    if (direction === 'negative') return change > 0 ? 'text-neon-red' : 'text-neon-green';
    return 'text-muted-foreground';
  };

  return (
    <DashboardCard 
      title="Global Impact Factors" 
      subtitle="Correlations with Korean market"
      isLive
      className="h-full"
    >
      <div className="flex h-full flex-col gap-2">
        {factors.map((factor, index) => (
          <div 
            key={factor.factor}
            className="group relative rounded border border-border bg-card/50 p-3 transition-all hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-foreground">{factor.factor}</span>
                  <div className={`h-1.5 w-1.5 rounded-full ${getCorrelationColor(factor.correlation)}`} />
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-lg font-bold text-foreground">
                    {factor.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  {getDirectionIcon(factor.direction, factor.change)}
                  <span className={`font-mono text-xs font-semibold ${factor.change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                    {factor.change >= 0 ? '+' : ''}{factor.change.toFixed(2)}%
                  </span>
                </div>
              </div>
              
              {/* Impact on Korea */}
              <div className="flex items-center gap-2 rounded border border-border/50 bg-background/50 px-2 py-1">
                <Link2 className="h-3 w-3 text-muted-foreground" />
                <span className={`font-mono text-[10px] ${getImpactColor(factor.direction, factor.change)}`}>
                  {factor.change > 0 && factor.direction === 'positive' && '▲ '}
                  {factor.change > 0 && factor.direction === 'negative' && '▼ '}
                  {factor.change < 0 && factor.direction === 'positive' && '▼ '}
                  {factor.change < 0 && factor.direction === 'negative' && '▲ '}
                  {factor.koreanImpact}
                </span>
              </div>
            </div>
            
            {/* Correlation strength bar */}
            <div className="mt-2 flex items-center gap-2">
              <span className="font-mono text-[9px] text-muted-foreground uppercase">Correlation</span>
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getCorrelationColor(factor.correlation)}`}
                  style={{ width: factor.correlation === 'high' ? '100%' : factor.correlation === 'medium' ? '60%' : '30%' }}
                />
              </div>
              <span className="font-mono text-[9px] text-muted-foreground uppercase">{factor.correlation}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
