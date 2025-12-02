import { useEffect, useState } from 'react';
import { DashboardCard } from './DashboardCard';
import { assetAllocation } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { ArrowRight, TrendingUp, TrendingDown, Shield, Flame } from 'lucide-react';

interface FlowIndicator {
  direction: 'risk-on' | 'risk-off' | 'neutral';
  strength: number;
  description: string;
}

export function MoneyMoveVisualizer() {
  const [flowIndicator, setFlowIndicator] = useState<FlowIndicator>({
    direction: 'risk-on',
    strength: 65,
    description: 'Capital flowing into Risk Assets',
  });

  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  // Calculate total risk-on vs risk-off sentiment
  useEffect(() => {
    const riskOnChange = assetAllocation
      .filter((a) => a.category === 'risk-on')
      .reduce((sum, a) => sum + a.change, 0);
    const safeChange = assetAllocation
      .filter((a) => a.category === 'safe')
      .reduce((sum, a) => sum + a.change, 0);

    const netFlow = riskOnChange - safeChange;
    const strength = Math.min(100, Math.abs(netFlow) * 15 + 50);

    setFlowIndicator({
      direction: netFlow > 1 ? 'risk-on' : netFlow < -1 ? 'risk-off' : 'neutral',
      strength,
      description:
        netFlow > 1
          ? 'Capital flowing into Risk Assets'
          : netFlow < -1
          ? 'Capital rotating to Safe Havens'
          : 'Market in equilibrium',
    });
  }, []);

  const getAssetColor = (category: string, change: number) => {
    if (category === 'safe') {
      return change >= 0 ? 'bg-neon-gold/80' : 'bg-neon-gold/40';
    }
    return change >= 0 ? 'bg-neon-green/80' : 'bg-neon-red/60';
  };

  const getAssetSize = (value: number) => {
    const minSize = 60;
    const maxSize = 140;
    const size = minSize + (value / 40) * (maxSize - minSize);
    return size;
  };

  return (
    <DashboardCard
      title="Capital Flow Visualizer"
      subtitle="Real-time money movement across asset classes"
      isLive
      className="col-span-2 row-span-2"
      glowColor={flowIndicator.direction === 'risk-on' ? 'green' : flowIndicator.direction === 'risk-off' ? 'gold' : 'blue'}
    >
      <div className="flex h-full flex-col">
        {/* Flow Direction Indicator */}
        <div className="mb-4 flex items-center justify-between rounded-lg bg-secondary/40 p-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg',
                flowIndicator.direction === 'risk-on'
                  ? 'bg-neon-green/20 pulse-green'
                  : flowIndicator.direction === 'risk-off'
                  ? 'bg-neon-gold/20 pulse-gold'
                  : 'bg-primary/20 pulse-blue'
              )}
            >
              {flowIndicator.direction === 'risk-on' ? (
                <Flame className="h-5 w-5 text-neon-green" />
              ) : flowIndicator.direction === 'risk-off' ? (
                <Shield className="h-5 w-5 text-neon-gold" />
              ) : (
                <ArrowRight className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <p className="font-mono text-sm font-semibold text-foreground">
                {flowIndicator.direction === 'risk-on'
                  ? 'RISK ON'
                  : flowIndicator.direction === 'risk-off'
                  ? 'RISK OFF'
                  : 'NEUTRAL'}
              </p>
              <p className="text-xs text-muted-foreground">{flowIndicator.description}</p>
            </div>
          </div>

          {/* Strength meter */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">Strength</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
              <div
                className={cn(
                  'h-full transition-all duration-500',
                  flowIndicator.direction === 'risk-on'
                    ? 'bg-neon-green'
                    : flowIndicator.direction === 'risk-off'
                    ? 'bg-neon-gold'
                    : 'bg-primary'
                )}
                style={{ width: `${flowIndicator.strength}%` }}
              />
            </div>
            <span className="font-mono text-xs font-semibold text-foreground">
              {flowIndicator.strength}%
            </span>
          </div>
        </div>

        {/* Asset Allocation Treemap */}
        <div className="relative flex-1">
          <div className="absolute inset-0 grid-lines opacity-30" />
          
          {/* Two columns: Risk-On and Safe */}
          <div className="flex h-full gap-4">
            {/* Risk-On Section */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 border-b border-border pb-2">
                <Flame className="h-4 w-4 text-neon-green" />
                <span className="font-mono text-xs font-semibold uppercase text-neon-green">
                  Risk-On Assets
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {assetAllocation
                  .filter((a) => a.category === 'risk-on')
                  .map((asset) => {
                    const size = getAssetSize(asset.value);
                    return (
                      <div
                        key={asset.name}
                        className={cn(
                          'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-border/50 p-2 transition-all duration-300 hover:scale-105',
                          getAssetColor(asset.category, asset.change),
                          hoveredAsset === asset.name && 'ring-2 ring-foreground/50'
                        )}
                        style={{
                          width: size,
                          height: size * 0.8,
                        }}
                        onMouseEnter={() => setHoveredAsset(asset.name)}
                        onMouseLeave={() => setHoveredAsset(null)}
                      >
                        <span className="font-mono text-[10px] font-bold text-background">
                          {asset.name}
                        </span>
                        <span className="font-mono text-lg font-bold text-background">
                          {asset.value}%
                        </span>
                        <div className="flex items-center gap-0.5">
                          {asset.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-background" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-background" />
                          )}
                          <span className="font-mono text-[10px] font-semibold text-background">
                            {asset.change >= 0 ? '+' : ''}{asset.change}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Flow Arrow */}
            <div className="flex flex-col items-center justify-center">
              <div
                className={cn(
                  'flex h-16 w-8 items-center justify-center rounded-full',
                  flowIndicator.direction === 'risk-on'
                    ? 'bg-neon-green/20'
                    : flowIndicator.direction === 'risk-off'
                    ? 'bg-neon-gold/20'
                    : 'bg-muted'
                )}
              >
                <ArrowRight
                  className={cn(
                    'h-6 w-6 transition-transform duration-500',
                    flowIndicator.direction === 'risk-on' && 'rotate-180 text-neon-green',
                    flowIndicator.direction === 'risk-off' && 'text-neon-gold',
                    flowIndicator.direction === 'neutral' && 'text-muted-foreground'
                  )}
                />
              </div>
            </div>

            {/* Safe Assets Section */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 border-b border-border pb-2">
                <Shield className="h-4 w-4 text-neon-gold" />
                <span className="font-mono text-xs font-semibold uppercase text-neon-gold">
                  Safe Havens
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {assetAllocation
                  .filter((a) => a.category === 'safe')
                  .map((asset) => {
                    const size = getAssetSize(asset.value);
                    return (
                      <div
                        key={asset.name}
                        className={cn(
                          'relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-border/50 p-2 transition-all duration-300 hover:scale-105',
                          getAssetColor(asset.category, asset.change),
                          hoveredAsset === asset.name && 'ring-2 ring-foreground/50'
                        )}
                        style={{
                          width: size,
                          height: size * 0.8,
                        }}
                        onMouseEnter={() => setHoveredAsset(asset.name)}
                        onMouseLeave={() => setHoveredAsset(null)}
                      >
                        <span className="font-mono text-[10px] font-bold text-background">
                          {asset.name}
                        </span>
                        <span className="font-mono text-lg font-bold text-background">
                          {asset.value}%
                        </span>
                        <div className="flex items-center gap-0.5">
                          {asset.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 text-background" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-background" />
                          )}
                          <span className="font-mono text-[10px] font-semibold text-background">
                            {asset.change >= 0 ? '+' : ''}{asset.change}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
