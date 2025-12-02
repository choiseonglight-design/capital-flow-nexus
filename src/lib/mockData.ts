// Mock data for the Capital Flow Master Board

export interface AssetData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  high24h?: number;
  low24h?: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export interface FlowData {
  from: string;
  to: string;
  amount: number;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

export interface NewsKeyword {
  word: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

// Crypto data
export const cryptoData: AssetData[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 97842.50, change: 2341.20, changePercent: 2.45, volume: '32.4B', high24h: 98500, low24h: 95200 },
  { symbol: 'ETH', name: 'Ethereum', price: 3456.78, change: -45.32, changePercent: -1.29, volume: '18.7B', high24h: 3520, low24h: 3410 },
];

// Korean market data
export const koreaMarketData: AssetData[] = [
  { symbol: 'KOSPI', name: 'KOSPI Index', price: 2456.78, change: 23.45, changePercent: 0.96, volume: '8.2T KRW' },
  { symbol: 'KOSDAQ', name: 'KOSDAQ Index', price: 712.34, change: -5.67, changePercent: -0.79, volume: '4.1T KRW' },
];

// Safe assets data
export const safeAssetsData: AssetData[] = [
  { symbol: 'XAU/USD', name: 'Gold', price: 2634.50, change: 18.30, changePercent: 0.70 },
  { symbol: 'US10Y', name: 'US 10Y Yield', price: 4.32, change: 0.05, changePercent: 1.17 },
  { symbol: 'USD/KRW', name: 'USD/KRW', price: 1398.50, change: -2.30, changePercent: -0.16 },
  { symbol: 'DXY', name: 'Dollar Index', price: 106.42, change: 0.23, changePercent: 0.22 },
];

// Global indices
export const globalIndicesData: AssetData[] = [
  { symbol: 'SPX', name: 'S&P 500', price: 6032.45, change: 42.18, changePercent: 0.70 },
  { symbol: 'NDX', name: 'NASDAQ', price: 21478.90, change: -89.34, changePercent: -0.41 },
  { symbol: 'DJI', name: 'Dow Jones', price: 44910.65, change: 156.78, changePercent: 0.35 },
];

// Generate chart data for indices
export function generateChartData(baseValue: number, points: number = 24, volatility: number = 0.02): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  let value = baseValue;
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * volatility * baseValue;
    value += change;
    const hour = i.toString().padStart(2, '0');
    
    data.push({
      time: `${hour}:00`,
      value: Number(value.toFixed(2)),
      open: Number((value - Math.random() * volatility * baseValue).toFixed(2)),
      high: Number((value + Math.random() * volatility * baseValue * 0.5).toFixed(2)),
      low: Number((value - Math.random() * volatility * baseValue * 0.5).toFixed(2)),
      close: Number(value.toFixed(2)),
    });
  }
  
  return data;
}

// Capital flow data
export const capitalFlowData: FlowData[] = [
  { from: 'Stocks', to: 'Safe Assets', amount: 2.4, sentiment: 'bearish' },
  { from: 'Bonds', to: 'Crypto', amount: 1.8, sentiment: 'bullish' },
  { from: 'Cash', to: 'Stocks', amount: 3.1, sentiment: 'bullish' },
  { from: 'Real Estate', to: 'Bonds', amount: 0.9, sentiment: 'neutral' },
];

// Asset allocation percentages for heatmap
export const assetAllocation = [
  { name: 'US Stocks', value: 35, change: 2.3, category: 'risk-on' },
  { name: 'Korea Stocks', value: 12, change: -1.5, category: 'risk-on' },
  { name: 'Crypto', value: 8, change: 4.2, category: 'risk-on' },
  { name: 'Gold', value: 15, change: 1.8, category: 'safe' },
  { name: 'Bonds', value: 18, change: 0.5, category: 'safe' },
  { name: 'USD Cash', value: 7, change: -0.8, category: 'safe' },
  { name: 'Real Estate', value: 5, change: -2.1, category: 'risk-on' },
];

// News sentiment keywords
export const newsKeywords: NewsKeyword[] = [
  { word: 'Samsung', count: 847, sentiment: 'positive' },
  { word: 'Interest Rate', count: 623, sentiment: 'negative' },
  { word: 'AI Chips', count: 512, sentiment: 'positive' },
  { word: 'Battery', count: 489, sentiment: 'positive' },
  { word: 'Export', count: 445, sentiment: 'neutral' },
  { word: 'Inflation', count: 398, sentiment: 'negative' },
  { word: 'Hyundai', count: 356, sentiment: 'positive' },
  { word: 'Tech Rally', count: 312, sentiment: 'positive' },
  { word: 'Won Weakness', count: 287, sentiment: 'negative' },
  { word: 'SK Hynix', count: 276, sentiment: 'positive' },
  { word: 'Fed Policy', count: 234, sentiment: 'neutral' },
  { word: 'Trade Surplus', count: 198, sentiment: 'positive' },
];

// AI Insight messages
export const marketInsights = [
  "Capital is rotating from Tech Stocks to Safe Assets due to rising treasury yields.",
  "Risk-On sentiment detected: Crypto and Growth stocks showing strong inflows.",
  "Korean Won weakness driving foreign capital outflows from KOSPI.",
  "Gold rallying as inflation expectations rise; defensive positioning increasing.",
  "Bitcoin breaking resistance; institutional flows accelerating into digital assets.",
];

export function getRandomInsight(): string {
  return marketInsights[Math.floor(Math.random() * marketInsights.length)];
}

// Simulate real-time price updates
export function simulatePriceUpdate(price: number, volatility: number = 0.001): number {
  const change = (Math.random() - 0.5) * volatility * price;
  return Number((price + change).toFixed(2));
}
