import React, { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
  style?: React.CSSProperties;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  dataAdSlot, 
  dataAdFormat = 'auto', 
  className = '',
  style = {}
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const loadAd = (): void => {
      try {
        // Check if the ad container exists and has dimensions
        if (adRef.current) {
          const rect = adRef.current.getBoundingClientRect();
          
          // Only load if container has proper dimensions
          if (rect.width > 0 && rect.height > 0) {
            // Use type assertion to avoid TypeScript conflicts
            const win = window as any;
            if (typeof window !== 'undefined' && win.adsbygoogle && !isAdLoaded) {
              win.adsbygoogle.push({});
              setIsAdLoaded(true);
            }
          }
        }
      } catch (error) {
        console.error('AdSense loading error:', error);
        setHasError(true);
      }
    };

    // Delay execution to ensure DOM is fully rendered
    const timer = setTimeout(loadAd, 500);

    // Cleanup timer
    return () => {
      clearTimeout(timer);
    };
  }, [isAdLoaded]);

  // Get container dimensions based on ad format
  const getAdDimensions = (): React.CSSProperties => {
    const baseDimensions: React.CSSProperties = {
      display: 'block',
      width: '100%',
      ...style
    };

    switch (dataAdFormat) {
      case 'horizontal':
        return {
          ...baseDimensions,
          minHeight: '90px',
          height: '90px'
        };
      case 'vertical':
        return {
          ...baseDimensions,
          minHeight: '600px',
          height: '600px'
        };
      case 'rectangle':
        return {
          ...baseDimensions,
          minHeight: '280px',
          height: '280px'
        };
      default:
        return {
          ...baseDimensions,
          minHeight: '90px'
        };
    }
  };

  // Show placeholder if there's an error
  if (hasError) {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`} 
           style={getAdDimensions()}>
        <span className="text-gray-500 text-sm">Ad placeholder</span>
      </div>
    );
  }

  return (
    <div className={`ad-wrapper ${className}`} style={{ width: '100%', ...getAdDimensions() }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getAdDimensions()}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000'}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;