import { useEffect, useState } from 'react';
import { DashboardCard } from './DashboardCard';
import { getRandomInsight } from '@/lib/mockData';
import { Brain, RefreshCw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function InsightSummary() {
  const [insight, setInsight] = useState(getRandomInsight());
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const refreshInsight = () => {
    setIsTyping(true);
    setDisplayedText('');
    const newInsight = getRandomInsight();
    setInsight(newInsight);

    // Typing animation
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < newInsight.length) {
        setDisplayedText(newInsight.slice(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 20);
  };

  useEffect(() => {
    refreshInsight();
    const interval = setInterval(refreshInsight, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardCard
      title="AI Market Analyst"
      subtitle="Real-time market intelligence"
      className="col-span-3"
    >
      <div className="flex items-start gap-4">
        {/* AI Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-neon-purple/20 pulse-blue">
          <Brain className="h-6 w-6 text-primary" />
        </div>

        {/* Insight Text */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-neon-gold" />
            <span className="font-mono text-xs uppercase tracking-wider text-neon-gold">
              Market Insight
            </span>
          </div>
          <p className="mt-2 min-h-[2.5rem] font-mono text-sm leading-relaxed text-foreground">
            {displayedText}
            {isTyping && (
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary" />
            )}
          </p>
        </div>

        {/* Refresh Button */}
        <button
          onClick={refreshInsight}
          disabled={isTyping}
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50 transition-all hover:bg-secondary hover:border-primary',
            isTyping && 'opacity-50 cursor-not-allowed'
          )}
        >
          <RefreshCw
            className={cn('h-4 w-4 text-muted-foreground', isTyping && 'animate-spin')}
          />
        </button>
      </div>
    </DashboardCard>
  );
}
