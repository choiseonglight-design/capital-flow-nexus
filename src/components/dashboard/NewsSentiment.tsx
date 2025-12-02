import { DashboardCard } from './DashboardCard';
import { newsKeywords } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Newspaper, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function NewsSentiment() {
  const maxCount = Math.max(...newsKeywords.map((k) => k.count));

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-3 w-3 text-neon-green" />;
      case 'negative':
        return <TrendingDown className="h-3 w-3 text-neon-red" />;
      default:
        return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-neon-green/10 border-neon-green/30 text-neon-green';
      case 'negative':
        return 'bg-neon-red/10 border-neon-red/30 text-neon-red';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  // Calculate overall sentiment
  const positiveCount = newsKeywords.filter((k) => k.sentiment === 'positive').length;
  const negativeCount = newsKeywords.filter((k) => k.sentiment === 'negative').length;
  const overallSentiment =
    positiveCount > negativeCount ? 'Bullish' : positiveCount < negativeCount ? 'Bearish' : 'Neutral';

  return (
    <DashboardCard
      title="Korea News Sentiment"
      subtitle="Trending topics from Korean markets"
      isLive
      className="row-span-2"
    >
      <div className="flex h-full flex-col">
        {/* Overall Sentiment */}
        <div className="mb-3 flex items-center justify-between rounded-lg bg-secondary/40 p-2.5">
          <div className="flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Market Sentiment</span>
          </div>
          <span
            className={cn(
              'font-mono text-sm font-bold',
              overallSentiment === 'Bullish'
                ? 'text-neon-green'
                : overallSentiment === 'Bearish'
                ? 'text-neon-red'
                : 'text-foreground'
            )}
          >
            {overallSentiment.toUpperCase()}
          </span>
        </div>

        {/* Keyword Cloud / List */}
        <div className="flex-1 space-y-1.5 overflow-y-auto">
          {newsKeywords.map((keyword, index) => {
            const barWidth = (keyword.count / maxCount) * 100;

            return (
              <div
                key={keyword.word}
                className="group relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Rank */}
                <span className="w-5 font-mono text-[10px] text-muted-foreground">
                  #{index + 1}
                </span>

                {/* Keyword with bar */}
                <div className="relative flex-1">
                  <div
                    className={cn(
                      'absolute inset-y-0 left-0 rounded-r opacity-20 transition-all duration-300 group-hover:opacity-30',
                      keyword.sentiment === 'positive'
                        ? 'bg-neon-green'
                        : keyword.sentiment === 'negative'
                        ? 'bg-neon-red'
                        : 'bg-muted-foreground'
                    )}
                    style={{ width: `${barWidth}%` }}
                  />
                  <span className="relative font-mono text-xs font-medium text-foreground">
                    {keyword.word}
                  </span>
                </div>

                {/* Count & Sentiment */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {keyword.count}
                  </span>
                  {getSentimentIcon(keyword.sentiment)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sentiment Breakdown */}
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border/50 pt-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-neon-green" />
              <span className="font-mono text-lg font-bold text-neon-green">
                {positiveCount}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">Positive</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Minus className="h-3 w-3 text-muted-foreground" />
              <span className="font-mono text-lg font-bold text-foreground">
                {newsKeywords.length - positiveCount - negativeCount}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">Neutral</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingDown className="h-3 w-3 text-neon-red" />
              <span className="font-mono text-lg font-bold text-neon-red">
                {negativeCount}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">Negative</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
