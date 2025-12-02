import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { CapitalGravityMap } from '@/components/dashboard/CapitalGravityMap';
import { KoreanCoreZone } from '@/components/dashboard/KoreanCoreZone';
import { GlobalImpactFactors } from '@/components/dashboard/GlobalImpactFactors';
import { SentimentGauges } from '@/components/dashboard/SentimentGauges';
import { KeywordBubbleCloud } from '@/components/dashboard/KeywordBubbleCloud';
import { RealAssetsFooter } from '@/components/dashboard/RealAssetsFooter';
import { InsightSummary } from '@/components/dashboard/InsightSummary';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background grid effect - cockpit style */}
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern opacity-[0.03]" />
      
      {/* Gradient overlays - subtle atmospheric lighting */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      <div className="pointer-events-none fixed left-0 top-0 h-[600px] w-[600px] bg-gradient-radial from-primary/3 to-transparent" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[500px] w-[500px] bg-gradient-radial from-neon-amber/3 to-transparent" />

      {/* Content */}
      <div className="relative flex min-h-screen flex-col">
        <DashboardHeader />

        {/* Main Dashboard Grid - Tactical Command Center Layout */}
        <main className="flex-1 p-3 lg:p-4">
          <div className="mx-auto max-w-[1920px]">
            {/* Bento Grid Layout */}
            <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              
              {/* Zone A: Korean Core (Top Left) */}
              <div className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 row-span-2">
                <KoreanCoreZone />
              </div>

              {/* Zone B: Global Impact Factors (Top Right of Korean Core) */}
              <div className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 row-span-2">
                <GlobalImpactFactors />
              </div>

              {/* Capital Gravity Map - Centerpiece */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 row-span-2">
                <CapitalGravityMap />
              </div>

              {/* Zone C: Fear & Greed Meters */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 row-span-1">
                <SentimentGauges />
              </div>

              {/* News Keyword Heatmap */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 row-span-2">
                <KeywordBubbleCloud />
              </div>

              {/* Real Assets & Housing Footer */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 row-span-1">
                <RealAssetsFooter />
              </div>
            </div>

            {/* AI Insight Summary - Full width at bottom */}
            <div className="mt-3">
              <InsightSummary />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/30 px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] text-muted-foreground">
              © 2024 Tactical Macro Command Center. Real-time capital flow visualization.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] text-muted-foreground">
                Korea-centric global macro intelligence
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse" />
                <span className="font-mono text-[9px] text-neon-green">LIVE</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
