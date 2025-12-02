import { useState, useEffect } from 'react';
import { DashboardCard } from './DashboardCard';
import { newsKeywords } from '@/lib/mockData';

interface BubbleData {
  word: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  x: number;
  y: number;
  size: number;
}

export function KeywordBubbleCloud() {
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);

  useEffect(() => {
    // Generate bubble positions
    const maxCount = Math.max(...newsKeywords.map(k => k.count));
    const minSize = 35;
    const maxSize = 85;
    
    const generateBubbles = (): BubbleData[] => {
      const result: BubbleData[] = [];
      const positions: { x: number; y: number; r: number }[] = [];
      
      // Sort by count descending for better placement
      const sorted = [...newsKeywords].sort((a, b) => b.count - a.count);
      
      sorted.forEach((keyword, i) => {
        const size = minSize + ((keyword.count / maxCount) * (maxSize - minSize));
        const radius = size / 2;
        
        // Try to find non-overlapping position
        let x = 0, y = 0;
        let attempts = 0;
        let placed = false;
        
        while (!placed && attempts < 100) {
          x = radius + Math.random() * (100 - size);
          y = radius + Math.random() * (100 - size);
          
          // Check for overlap
          const overlaps = positions.some(pos => {
            const dx = x - pos.x;
            const dy = y - pos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < (radius + pos.r + 2);
          });
          
          if (!overlaps) {
            placed = true;
            positions.push({ x, y, r: radius });
          }
          attempts++;
        }
        
        // If couldn't place, just use random position
        if (!placed) {
          x = radius + Math.random() * (100 - size);
          y = radius + Math.random() * (100 - size);
        }
        
        result.push({
          word: keyword.word,
          count: keyword.count,
          sentiment: keyword.sentiment,
          x,
          y,
          size,
        });
      });
      
      return result;
    };
    
    setBubbles(generateBubbles());
  }, []);

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return { bg: 'bg-neon-green/20', border: 'border-neon-green/50', text: 'text-neon-green' };
    if (sentiment === 'negative') return { bg: 'bg-neon-red/20', border: 'border-neon-red/50', text: 'text-neon-red' };
    return { bg: 'bg-neon-blue/20', border: 'border-neon-blue/50', text: 'text-neon-blue' };
  };

  const getSentimentGlow = (sentiment: string) => {
    if (sentiment === 'positive') return '0 0 20px hsl(145 100% 50% / 0.4)';
    if (sentiment === 'negative') return '0 0 20px hsl(0 100% 60% / 0.4)';
    return '0 0 20px hsl(185 100% 50% / 0.4)';
  };

  // Calculate sentiment breakdown
  const positive = newsKeywords.filter(k => k.sentiment === 'positive').length;
  const negative = newsKeywords.filter(k => k.sentiment === 'negative').length;
  const neutral = newsKeywords.filter(k => k.sentiment === 'neutral').length;

  return (
    <DashboardCard 
      title="News Heatmap" 
      subtitle="Korean economic keywords by volume"
      isLive
      className="h-full"
    >
      <div className="flex h-full flex-col">
        {/* Sentiment Legend */}
        <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-neon-green" />
              <span className="font-mono text-[10px] text-muted-foreground">Positive ({positive})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-neon-red" />
              <span className="font-mono text-[10px] text-muted-foreground">Negative ({negative})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-neon-blue" />
              <span className="font-mono text-[10px] text-muted-foreground">Neutral ({neutral})</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">Bubble size = Mention volume</span>
        </div>

        {/* Bubble Cloud */}
        <div className="relative flex-1 min-h-[200px]">
          {bubbles.map((bubble) => {
            const colors = getSentimentColor(bubble.sentiment);
            const isHovered = hoveredBubble === bubble.word;
            
            return (
              <div
                key={bubble.word}
                className={`absolute flex items-center justify-center rounded-full border-2 cursor-pointer transition-all duration-300 ${colors.bg} ${colors.border}`}
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  width: bubble.size,
                  height: bubble.size,
                  transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.15)' : 'scale(1)'}`,
                  boxShadow: isHovered ? getSentimentGlow(bubble.sentiment) : 'none',
                  zIndex: isHovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredBubble(bubble.word)}
                onMouseLeave={() => setHoveredBubble(null)}
              >
                <div className="text-center px-1">
                  <div className={`font-mono font-semibold leading-tight ${colors.text}`} style={{ fontSize: Math.max(8, bubble.size / 6) }}>
                    {bubble.word}
                  </div>
                  {isHovered && (
                    <div className="font-mono text-[9px] text-foreground mt-0.5">
                      {bubble.count.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Keywords List */}
        <div className="mt-3 border-t border-border pt-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            {newsKeywords.slice(0, 5).map((keyword, i) => {
              const colors = getSentimentColor(keyword.sentiment);
              return (
                <div 
                  key={keyword.word}
                  className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 ${colors.border} ${colors.bg}`}
                >
                  <span className="font-mono text-[10px] font-bold text-muted-foreground">#{i + 1}</span>
                  <span className={`font-mono text-[10px] font-semibold ${colors.text}`}>{keyword.word}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
