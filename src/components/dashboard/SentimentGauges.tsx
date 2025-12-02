import { useState, useEffect } from 'react';
import { DashboardCard } from './DashboardCard';
import { Globe, Bitcoin, Building2 } from 'lucide-react';

interface GaugeData {
  id: string;
  label: string;
  value: number; // 0-100
  icon: React.ReactNode;
  sublabel: string;
}

const initialGauges: GaugeData[] = [
  { id: 'global', label: 'Global Sentiment', value: 62, icon: <Globe className="h-5 w-5" />, sublabel: 'Fear & Greed Index' },
  { id: 'crypto', label: 'Crypto Sentiment', value: 71, icon: <Bitcoin className="h-5 w-5" />, sublabel: 'Kimchi Premium: +2.3%' },
  { id: 'realestate', label: 'KR Real Estate', value: 38, icon: <Building2 className="h-5 w-5" />, sublabel: 'Seoul Apartment Index' },
];

function GaugeMeter({ value, size = 120 }: { value: number; size?: number }) {
  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  const getGaugeColor = (val: number) => {
    if (val <= 25) return 'hsl(0 100% 60%)'; // Red - Extreme Fear
    if (val <= 45) return 'hsl(25 100% 55%)'; // Amber - Fear
    if (val <= 55) return 'hsl(38 100% 55%)'; // Gold - Neutral
    if (val <= 75) return 'hsl(145 100% 50%)'; // Green - Greed
    return 'hsl(145 100% 60%)'; // Bright Green - Extreme Greed
  };

  const getSentimentLabel = (val: number) => {
    if (val <= 25) return 'Extreme Fear';
    if (val <= 45) return 'Fear';
    if (val <= 55) return 'Neutral';
    if (val <= 75) return 'Greed';
    return 'Extreme Greed';
  };

  const color = getGaugeColor(value);

  return (
    <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
      <svg width={size} height={size / 2 + 10} className="overflow-visible">
        {/* Background arc */}
        <path
          d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none"
          stroke="hsl(222 30% 20%)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={`M 10 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{ 
            transition: 'stroke-dashoffset 0.5s ease-out, stroke 0.3s ease',
            filter: `drop-shadow(0 0 6px ${color})`
          }}
        />
        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick, i) => {
          const angle = Math.PI - (tick / 100) * Math.PI;
          const x1 = size / 2 + (radius - 15) * Math.cos(angle);
          const y1 = size / 2 - (radius - 15) * Math.sin(angle);
          const x2 = size / 2 + (radius - 8) * Math.cos(angle);
          const y2 = size / 2 - (radius - 8) * Math.sin(angle);
          return (
            <line
              key={tick}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(222 30% 35%)"
              strokeWidth="2"
            />
          );
        })}
        {/* Needle */}
        <g style={{ transform: `rotate(${-90 + (value / 100) * 180}deg)`, transformOrigin: `${size / 2}px ${size / 2}px`, transition: 'transform 0.5s ease-out' }}>
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2}
            y2={size / 2 - radius + 25}
            stroke="hsl(210 20% 92%)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="4"
            fill="hsl(210 20% 92%)"
          />
        </g>
      </svg>
      {/* Value display */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <div className="font-mono text-2xl font-bold" style={{ color }}>{value}</div>
        <div className="font-mono text-[10px] text-muted-foreground uppercase">{getSentimentLabel(value)}</div>
      </div>
    </div>
  );
}

export function SentimentGauges() {
  const [gauges, setGauges] = useState(initialGauges);

  useEffect(() => {
    const interval = setInterval(() => {
      setGauges(prev => prev.map(g => ({
        ...g,
        value: Math.max(5, Math.min(95, g.value + (Math.random() - 0.5) * 3)),
      })));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getIconColor = (value: number) => {
    if (value <= 25) return 'text-neon-red';
    if (value <= 45) return 'text-neon-amber';
    if (value <= 55) return 'text-neon-gold';
    return 'text-neon-green';
  };

  return (
    <DashboardCard 
      title="Fear & Greed Meters" 
      subtitle="Market sentiment indicators"
      isLive
      className="h-full"
    >
      <div className="flex h-full items-center justify-around gap-4">
        {gauges.map(gauge => (
          <div key={gauge.id} className="flex flex-col items-center">
            <div className={`mb-2 ${getIconColor(gauge.value)}`}>
              {gauge.icon}
            </div>
            <GaugeMeter value={Math.round(gauge.value)} size={110} />
            <div className="mt-2 text-center">
              <div className="font-mono text-[10px] font-medium text-foreground uppercase">{gauge.label}</div>
              <div className="font-mono text-[9px] text-muted-foreground">{gauge.sublabel}</div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
