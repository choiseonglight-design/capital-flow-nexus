import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MoneyMoveVisualizer } from '@/components/dashboard/MoneyMoveVisualizer';
import { CryptoTracker } from '@/components/dashboard/CryptoTracker';
import { KoreaMarketMonitor } from '@/components/dashboard/KoreaMarketMonitor';
import { SafeAssetsTracker } from '@/components/dashboard/SafeAssetsTracker';
import { GlobalIndices } from '@/components/dashboard/GlobalIndices';
import { NewsSentiment } from '@/components/dashboard/NewsSentiment';
import { InsightSummary } from '@/components/dashboard/InsightSummary';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background grid effect */}
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern opacity-20" />
      
      {/* Gradient overlays */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      <div className="pointer-events-none fixed left-0 top-0 h-[500px] w-[500px] bg-gradient-radial from-primary/5 to-transparent" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[400px] w-[400px] bg-gradient-radial from-neon-gold/5 to-transparent" />

      {/* Content */}
      <div className="relative flex min-h-screen flex-col">
        <DashboardHeader />

        {/* Main Dashboard Grid */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="mx-auto max-w-[1920px]">
            {/* Bento Grid Layout */}
            <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {/* Row 1 */}
              {/* Money Move Visualizer - Large centerpiece */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 row-span-2">
                <MoneyMoveVisualizer />
              </div>

              {/* Crypto Tracker */}
              <div className="col-span-1 row-span-2">
                <CryptoTracker />
              </div>

              {/* Korea Market Monitor */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 row-span-2">
                <KoreaMarketMonitor />
              </div>

              {/* Row 2 - Already filled by row-span-2 items above */}

              {/* Row 3 */}
              {/* Safe Assets Tracker */}
              <div className="col-span-1">
                <SafeAssetsTracker />
              </div>

              {/* Global Indices */}
              <div className="col-span-1">
                <GlobalIndices />
              </div>

              {/* News Sentiment - Taller */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 row-span-2">
                <NewsSentiment />
              </div>

              {/* Empty space filler or additional widget */}
              <div className="col-span-1 hidden xl:block" />
            </div>

            {/* AI Insight Summary - Full width at bottom */}
            <div className="mt-4">
              <InsightSummary />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/30 px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] text-muted-foreground">
              © 2024 Capital Flow Master Board. Data for demonstration purposes only.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-muted-foreground">
                Powered by advanced market analytics
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
