// types/adsense.d.ts
// Create this file in your types folder or add to your global types

declare global {
  interface Window {
    adsbygoogle: {
      loaded?: boolean;
      push: (obj: Record<string, any>) => void;
    }[];
  }
}

// AdSense related types
export interface AdSenseConfig {
  client: string;
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  responsive?: boolean;
}

export interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export {};