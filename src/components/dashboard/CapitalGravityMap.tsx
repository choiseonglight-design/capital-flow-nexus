import { useState, useEffect } from 'react';
import { DashboardCard } from './DashboardCard';
import { TrendingUp, TrendingDown, ArrowRight, Shield, Coins, Building2, BarChart3 } from 'lucide-react';

interface FlowNode {
  id: string;
  label: string;
  category: 'safe' | 'risk' | 'real';
  value: number;
  change: number;
  icon: React.ReactNode;
}

interface FlowConnection {
  from: string;
  to: string;
  strength: number; // 1-10
  direction: 'inflow' | 'outflow';
}

const nodes: FlowNode[] = [
  { id: 'gold', label: 'Gold', category: 'safe', value: 2634, change: 0.7, icon: <Coins className="h-4 w-4" /> },
  { id: 'usd', label: 'USD', category: 'safe', value: 106.4, change: 0.2, icon: <Shield className="h-4 w-4" /> },
  { id: 'bonds', label: 'Bonds', category: 'safe', value: 4.32, change: 1.2, icon: <BarChart3 className="h-4 w-4" /> },
  { id: 'btc', label: 'Bitcoin', category: 'risk', value: 97842, change: 2.5, icon: <Coins className="h-4 w-4" /> },
  { id: 'stocks', label: 'Stocks', category: 'risk', value: 6032, change: 0.7, icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'reits', label: 'REITs', category: 'real', value: 89.5, change: -1.2, icon: <Building2 className="h-4 w-4" /> },
  { id: 'commodities', label: 'Commodities', category: 'real', value: 78.3, change: 0.4, icon: <BarChart3 className="h-4 w-4" /> },
];

const connections: FlowConnection[] = [
  { from: 'bonds', to: 'btc', strength: 7, direction: 'outflow' },
  { from: 'gold', to: 'stocks', strength: 3, direction: 'outflow' },
  { from: 'stocks', to: 'gold', strength: 5, direction: 'outflow' },
  { from: 'usd', to: 'btc', strength: 4, direction: 'outflow' },
  { from: 'reits', to: 'bonds', strength: 6, direction: 'outflow' },
];

export function CapitalGravityMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [flowPhase, setFlowPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowPhase(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getNodeColor = (category: string, change: number) => {
    if (category === 'safe') return change >= 0 ? 'text-neon-gold' : 'text-neon-gold/60';
    if (category === 'risk') return change >= 0 ? 'text-neon-green' : 'text-neon-red';
    return change >= 0 ? 'text-neon-amber' : 'text-neon-red';
  };

  const getBorderColor = (category: string) => {
    if (category === 'safe') return 'border-neon-gold/40 hover:border-neon-gold';
    if (category === 'risk') return 'border-neon-green/40 hover:border-neon-green';
    return 'border-neon-amber/40 hover:border-neon-amber';
  };

  const safeNodes = nodes.filter(n => n.category === 'safe');
  const riskNodes = nodes.filter(n => n.category === 'risk');
  const realNodes = nodes.filter(n => n.category === 'real');

  // Calculate overall flow direction
  const riskAssetChange = riskNodes.reduce((acc, n) => acc + n.change, 0) / riskNodes.length;
  const safeAssetChange = safeNodes.reduce((acc, n) => acc + n.change, 0) / safeNodes.length;
  const flowDirection = riskAssetChange > safeAssetChange ? 'risk-on' : 'risk-off';

  return (
    <DashboardCard 
      title="Capital Gravity Map" 
      subtitle="Real-time capital rotation radar"
      isLive
      className="h-full"
    >
      <div className="flex h-full flex-col gap-4">
        {/* Flow Direction Indicator */}
        <div className={`flex items-center justify-center gap-3 rounded-md border p-3 ${
          flowDirection === 'risk-on' 
            ? 'border-neon-green/30 bg-neon-green/5' 
            : 'border-neon-gold/30 bg-neon-gold/5'
        }`}>
          {flowDirection === 'risk-on' ? (
            <>
              <Shield className="h-5 w-5 text-neon-gold/50" />
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-2 w-3 rounded-sm bg-neon-green"
                      style={{ 
                        opacity: 0.3 + (i * 0.15),
                        animation: `pulse 1s ease-in-out ${i * 0.1}s infinite`
                      }}
                    />
                  ))}
                </div>
                <ArrowRight className="h-5 w-5 text-neon-green animate-pulse" />
              </div>
              <TrendingUp className="h-5 w-5 text-neon-green" />
              <span className="font-mono text-sm font-semibold text-neon-green">RISK ON</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-5 w-5 text-neon-red/50" />
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-2 w-3 rounded-sm bg-neon-gold"
                      style={{ 
                        opacity: 0.3 + (i * 0.15),
                        animation: `pulse 1s ease-in-out ${i * 0.1}s infinite`
                      }}
                    />
                  ))}
                </div>
                <ArrowRight className="h-5 w-5 text-neon-gold animate-pulse" />
              </div>
              <Shield className="h-5 w-5 text-neon-gold" />
              <span className="font-mono text-sm font-semibold text-neon-gold">RISK OFF</span>
            </>
          )}
        </div>

        {/* Three Column Layout */}
        <div className="grid flex-1 grid-cols-3 gap-3">
          {/* Safe Assets Column */}
          <div className="flex flex-col gap-2">
            <div className="mb-1 flex items-center gap-2">
              <Shield className="h-4 w-4 text-neon-gold" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-neon-gold">Safe Haven</span>
            </div>
            {safeNodes.map(node => (
              <div
                key={node.id}
                className={`group relative cursor-pointer rounded border bg-card p-3 transition-all ${getBorderColor(node.category)} ${
                  activeNode === node.id ? 'scale-[1.02]' : ''
                }`}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-neon-gold">{node.icon}</span>
                    <span className="font-mono text-xs font-medium text-foreground">{node.label}</span>
                  </div>
                  <span className={`font-mono text-xs font-semibold ${node.change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                    {node.change >= 0 ? '+' : ''}{node.change.toFixed(1)}%
                  </span>
                </div>
                {activeNode === node.id && (
                  <div className="absolute inset-0 rounded border-2 border-neon-gold/50 pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Center Flow Visualization */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-32 w-32">
                {/* Animated flow rings */}
                <div 
                  className="absolute inset-0 rounded-full border border-neon-blue/20"
                  style={{ transform: `scale(${1 + (flowPhase % 50) / 100})`, opacity: 1 - (flowPhase % 50) / 50 }}
                />
                <div 
                  className="absolute inset-4 rounded-full border border-neon-blue/30"
                  style={{ transform: `scale(${1 + ((flowPhase + 25) % 50) / 100})`, opacity: 1 - ((flowPhase + 25) % 50) / 50 }}
                />
                
                {/* Center indicator */}
                <div className="absolute inset-8 flex items-center justify-center rounded-full bg-card border border-border">
                  <div className="text-center">
                    <div className={`font-mono text-lg font-bold ${flowDirection === 'risk-on' ? 'text-neon-green' : 'text-neon-gold'}`}>
                      {Math.abs(riskAssetChange - safeAssetChange).toFixed(1)}%
                    </div>
                    <div className="font-mono text-[8px] text-muted-foreground uppercase">delta</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow arrows */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <ArrowRight className={`h-6 w-6 ${flowDirection === 'risk-off' ? 'text-neon-gold rotate-180' : 'text-muted-foreground/30 rotate-180'}`} />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <ArrowRight className={`h-6 w-6 ${flowDirection === 'risk-on' ? 'text-neon-green' : 'text-muted-foreground/30'}`} />
            </div>
          </div>

          {/* Risk Assets Column */}
          <div className="flex flex-col gap-2">
            <div className="mb-1 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-neon-green" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-neon-green">Risk Assets</span>
            </div>
            {riskNodes.map(node => (
              <div
                key={node.id}
                className={`group relative cursor-pointer rounded border bg-card p-3 transition-all ${getBorderColor(node.category)} ${
                  activeNode === node.id ? 'scale-[1.02]' : ''
                }`}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-neon-green">{node.icon}</span>
                    <span className="font-mono text-xs font-medium text-foreground">{node.label}</span>
                  </div>
                  <span className={`font-mono text-xs font-semibold ${node.change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                    {node.change >= 0 ? '+' : ''}{node.change.toFixed(1)}%
                  </span>
                </div>
                {activeNode === node.id && (
                  <div className="absolute inset-0 rounded border-2 border-neon-green/50 pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Real Economy Row */}
        <div className="border-t border-border pt-3">
          <div className="mb-2 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-neon-amber" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-neon-amber">Real Economy</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {realNodes.map(node => (
              <div
                key={node.id}
                className={`group relative cursor-pointer rounded border bg-card p-2 transition-all ${getBorderColor(node.category)}`}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-neon-amber">{node.icon}</span>
                    <span className="font-mono text-xs font-medium text-foreground">{node.label}</span>
                  </div>
                  <span className={`font-mono text-xs font-semibold ${node.change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                    {node.change >= 0 ? '+' : ''}{node.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
