'use client'

import { useEffect, useRef } from 'react'

interface ResponsiveAdProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  className?: string
  adStyle?: React.CSSProperties
}

const ResponsiveAd: React.FC<ResponsiveAdProps> = ({
  adSlot,
  adFormat = 'auto',
  className = '',
  adStyle = {}
}) => {
  const adRef = useRef<HTMLModElement>(null)
  const isLoaded = useRef(false)

  useEffect(() => {
    if (isLoaded.current) return

    const loadAd = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          window.adsbygoogle.push({})
          isLoaded.current = true
        }
      } catch (error) {
        console.error('Error loading responsive ad:', error)
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!process.env.NEXT_PUBLIC_ADSENSE_ID) {
    return null
  }

  const defaultStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: 'auto',
    ...adStyle
  }

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default ResponsiveAd