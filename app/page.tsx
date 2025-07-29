"use client"
import React, { useState, useRef, useEffect } from 'react';
import QuoteOfTheDay from './components/quoteoftheday';
import AdBanner from './components/AdBanner'
import ResponsiveAd from './components/ResponsiveAd'
import Link from 'next/link';


interface Track {
  id: number;
  title: string;
  artist: string;
  plays: string;
  youtubeId: string;
  duration: number;
}

interface Playlist {
  id: number;
  title: string;
  description: string;
  tracks: number;
  duration: string;
}

// YouTube Player API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(70);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [isRepeated, setIsRepeated] = useState<boolean>(false);
  const [playerState, setPlayerState] = useState<'idle' | 'loading' | 'ready' | 'playing' | 'paused'>('idle');
  const [player, setPlayer] = useState<any>(null);
  const [apiReady, setApiReady] = useState<boolean>(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Add this state at the top of your component (inside your Home function)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // All Lofi Girl live stream tracks (24/7 streams only)
  const tracks: Track[] = [
    {
      id: 1,
      title: "lofi hip hop radio 📚 - beats to relax/study to",
      artist: "Lofi Girl",
      plays: "2.1B",
      youtubeId: "jfKfPfyJRdk", // Main 24/7 study stream
      duration: 0 // Live stream, no duration
    },
    {
      id: 2,
      title: "synthwave radio 🌌 - beats to chill/game to",
      artist: "Lofi Girl",
      plays: "1.2M",
      youtubeId: "4xDzrJKXOOY", // Synthwave 24/7 stream
      duration: 0 // Live stream, no duration
    },
    {
      id: 3,
      title: "summer lofi radio ☀️ - beats to relax/chill to",
      artist: "Lofi Girl",
      plays: "38M",
      youtubeId: "7NOSDKb0HlU", // Summer themed stream
      duration: 0 // Live stream, no duration
    }
  ];

  const featuredPlaylists: Playlist[] = [
    {
      id: 1,
      title: "Study Sessions",
      description: "Perfect beats for continuous focus and concentration",
      tracks: 5,
      duration: "∞"
    },
    {
      id: 2,
      title: "Sleep & Chill",
      description: "Relaxing vibes for bedtime and unwinding",
      tracks: 3,
      duration: "∞"
    },
    {
      id: 3,
      title: "Gaming Vibes",
      description: "Synthwave and chill beats for gaming sessions",
      tracks: 2,
      duration: "∞"
    },
    {
      id: 4,
      title: "Seasonal Moods",
      description: "Themed streams for every season and holiday",
      tracks: 5,
      duration: "∞"
    }
  ];

  const currentTrackData: Track = tracks[currentTrack];
  const isPlaying = playerState === 'playing';
  const isReady = playerState === 'ready' || playerState === 'playing' || playerState === 'paused';

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
      };
    } else {
      setApiReady(true);
    }
  }, []);

  // Initialize YouTube player
  useEffect(() => {
    if (apiReady && !player) {
      const newPlayer = new window.YT.Player('youtube-player', {
        height: '315',
        width: '560',
        videoId: currentTrackData.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          fs: 1,
          playsinline: 1
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        }
      });
      setPlayer(newPlayer);
    }
  }, [apiReady]);

  // Player event handlers
  const onPlayerReady = (event: any) => {
    setPlayerState('ready');
    event.target.setVolume(volume);
    setDuration(event.target.getDuration() || 0);
  };

  const onPlayerStateChange = (event: any) => {
    const state = event.data;

    if (state === window.YT.PlayerState.PLAYING) {
      setPlayerState('playing');
      startProgressTracking();
    } else if (state === window.YT.PlayerState.PAUSED) {
      setPlayerState('paused');
      stopProgressTracking();
    } else if (state === window.YT.PlayerState.ENDED) {
      setPlayerState('ready');
      stopProgressTracking();
      if (isRepeated) {
        player.seekTo(0);
        player.playVideo();
      }
    } else if (state === window.YT.PlayerState.BUFFERING) {
      setPlayerState('loading');
    } else if (state === window.YT.PlayerState.CUED) {
      setPlayerState('ready');
    }
  };

  const onPlayerError = (event: any) => {
    const errorCode = event.data;
    console.error('YouTube player error:', errorCode);

    // Handle different error types
    switch (errorCode) {
      case 2:
        console.error('Invalid video ID');
        break;
      case 5:
        console.error('HTML5 player error');
        break;
      case 100:
        console.error('Video not found or private');
        break;
      case 101:
      case 150:
        console.error('Video embedding not allowed by owner');
        // Try to skip to next track if embedding is blocked
        setTimeout(() => {
          nextTrack();
        }, 2000);
        break;
      default:
        console.error('Unknown YouTube error:', errorCode);
    }

    setPlayerState('idle');
    stopProgressTracking();
  };

  const startProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    progressIntervalRef.current = setInterval(() => {
      if (player && typeof player.getCurrentTime === 'function') {
        setCurrentTime(player.getCurrentTime());
        if (duration === 0 && typeof player.getDuration === 'function') {
          setDuration(player.getDuration());
        }
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Update volume when changed
  useEffect(() => {
    if (player && typeof player.setVolume === 'function') {
      player.setVolume(volume);
    }
  }, [volume, player]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopProgressTracking();
    };
  }, []);

  const togglePlay = () => {
    if (!player) return;

    if (playerState === 'playing') {
      player.pauseVideo();
    } else if (playerState === 'ready' || playerState === 'paused') {
      player.playVideo();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration || !isReady || !player) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    player.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setVolume(percentage * 100);
  };

  const nextTrack = () => {
    const wasPlaying = playerState === 'playing';
    stopProgressTracking();

    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrack(randomIndex);
    } else {
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    }

    // Load new video
    if (player && typeof player.loadVideoById === 'function') {
      player.loadVideoById(tracks[isShuffled ? Math.floor(Math.random() * tracks.length) : (currentTrack + 1) % tracks.length].youtubeId);

      // If was playing, auto-start the new track after load
      if (wasPlaying) {
        setTimeout(() => {
          if (player && typeof player.playVideo === 'function') {
            player.playVideo();
          }
        }, 1000);
      }
    }
  };

  const prevTrack = () => {
    const wasPlaying = playerState === 'playing';
    stopProgressTracking();

    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);

    // Load new video
    if (player && typeof player.loadVideoById === 'function') {
      const newIndex = (currentTrack - 1 + tracks.length) % tracks.length;
      player.loadVideoById(tracks[newIndex].youtubeId);

      // If was playing, auto-start the new track after load
      if (wasPlaying) {
        setTimeout(() => {
          if (player && typeof player.playVideo === 'function') {
            player.playVideo();
          }
        }, 1000);
      }
    }
  };

  const playTrack = (index: number) => {
    setCurrentTrack(index);
    stopProgressTracking();

    // Load and play the selected track
    if (player && typeof player.loadVideoById === 'function') {
      player.loadVideoById(tracks[index].youtubeId);
      setTimeout(() => {
        if (player && typeof player.playVideo === 'function') {
          player.playVideo();
        }
      }, 1000);
    }
  };

  const formatTime = (time: number): string => {
    if (!time || isNaN(time)) return '0:00';
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode
        ? 'bg-slate-900/80 border-slate-700/50'
        : 'bg-white/80 border-gray-200/50'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              <span className={`text-xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                ChillTube
              </span>
            </div>

            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-8">
                <a href="/" className={`transition-colors duration-300 ${isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}>
                  Home
                </a>
                <a href="#playlists" onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('playlists');
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                  }
                }} className={`transition-colors duration-300 ${isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}>
                  Playlists
                </a>
                <a href="#quote" onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('quote');
                  if (element) {
                    element.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                  }
                }} className={`transition-colors duration-300 ${isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}>
                  Todays Quote
                </a>
                <a href="#" className={`transition-colors duration-300 ${isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}>
                  About
                </a>
              </nav>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isDarkMode
                  ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  // Sun icon for switching to light mode
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                ) : (
                  // Moon icon for switching to dark mode
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Header Ad Banner */}
      <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner
          dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER || '1234567890'}
          dataAdFormat="horizontal"
          className="mb-6"
        />
      </div>

      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode
        ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-black'
        : 'bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200'
        }`}>

        {/* Hero Section */}
        <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Find Your Flow
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Enjoy all of Lofi 24/7 live streams - from study beats to seasonal vibes, synthwave to coffee shop jazz
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={togglePlay}
                  disabled={!apiReady || !player}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {!apiReady ? 'Loading Player...' :
                    playerState === 'loading' ? 'Buffering...' :
                      isPlaying ? 'Pause Stream' : 'Start Listening'}
                </button>
              </div>
            </div>

            {/* YouTube Player */}
            <div className="relative max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm border border-purple-500/30 p-4">

                {/* Video Player */}
                <div className="mb-4 flex justify-center">
                  <div className="relative rounded-lg overflow-hidden shadow-lg">
                    <div id="youtube-player" className="w-full max-w-xs h-32"></div>
                    {!apiReady && (
                      <div className="absolute inset-0 bg-slate-800 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-white text-sm">Loading...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-3">
                  {/* Track Info */}
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-white">{currentTrackData?.title || 'Loading...'}</h3>
                    <p className="text-purple-300 text-sm">{currentTrackData?.artist || 'Lofi Girl'}</p>
                    <p className="text-gray-400 text-xs">
                      {playerState === 'loading' ? 'Buffering...' :
                        playerState === 'playing' ? '🔴 Live' :
                          playerState === 'ready' ? 'Ready' :
                            !apiReady ? 'Initializing...' :
                              'Click play'}
                    </p>
                  </div>

                  {/* Progress Bar - Only show if not live stream */}
                  {duration > 0 && (
                    <div className="w-full max-w-xs space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <div
                        className="w-full bg-gray-700 rounded-full h-1 cursor-pointer group"
                        onClick={handleProgressClick}
                      >
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full relative transition-all duration-300"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        >
                          <div className="absolute -right-0.5 -top-0.5 w-2 h-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Live Stream Indicator */}
                  {duration === 0 && playerState !== 'idle' && (
                    <div className="flex items-center space-x-1 text-red-400">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">LIVE</span>
                    </div>
                  )}

                  {/* Player Controls */}
                  <div className="flex items-center space-x-4">
                    {/* Previous */}
                    <button
                      onClick={prevTrack}
                      disabled={!apiReady || !player}
                      className="text-gray-400 hover:text-white transition-colors p-1 hover:scale-110 transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                      </svg>
                    </button>

                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      disabled={!apiReady || !player}
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {playerState === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : isPlaying ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Next */}
                    <button
                      onClick={nextTrack}
                      disabled={!apiReady || !player}
                      className="text-gray-400 hover:text-white transition-colors p-1 hover:scale-110 transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Additional Controls */}
                  <div className="flex items-center space-x-4">
                    {/* Volume */}
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      </button>
                      <div
                        className="w-16 bg-gray-700 rounded-full h-1 cursor-pointer"
                        onClick={handleVolumeChange}
                      >
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
                          style={{ width: `${volume}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 w-6">{Math.round(volume)}%</span>
                    </div>

                    {/* Repeat (only show if not live stream) */}
                    {duration > 0 && (
                      <button
                        onClick={() => setIsRepeated(!isRepeated)}
                        className={`p-1 hover:scale-110 transform duration-200 ${isRepeated ? 'text-purple-400' : 'text-gray-400 hover:text-purple-400'} transition-colors`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Current Time Display */}
                  {currentTime > 0 && (
                    <div className="text-xs text-gray-400">
                      {formatTime(currentTime)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Below Hero Ad Banner */}
          <div className="max-w-4xl mx-auto mt-12 px-4">
            <AdBanner
              dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE || '5566778899'}
              dataAdFormat="rectangle"
              className="flex justify-center"
            />
          </div>
        </section>

        <div id="quote">
          <QuoteOfTheDay />
        </div>

        {/* Ad Banner after Quote Section */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <AdBanner
            dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || '0987654321'}
            dataAdFormat="horizontal"
            className="mb-6"
          />
        </div>

        {/* All Tracks Section */}
        <section id="playlists" className="py-16 mt-10 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">All Lofi Streams</h2>
              <p className="text-gray-400 text-lg">Complete collection of 24/7 live streams from the official Lofi Girl channel</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <div
                    key={track.id}
                    onClick={() => playTrack(index)}
                    className={`flex items-center p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border transition-all duration-200 group cursor-pointer ${currentTrack === index
                      ? 'border-purple-500/70 bg-slate-700/70'
                      : 'border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-700/50'
                      }`}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`text-lg font-bold w-8 text-center ${currentTrack === index ? 'text-purple-300' : 'text-purple-400'}`}>
                        {index + 1}
                      </div>
                      <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        {currentTrack === index && isPlaying ? (
                          <svg className="w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          </svg>
                        ) : currentTrack === index && playerState === 'loading' ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium transition-colors truncate ${currentTrack === index
                          ? 'text-purple-300'
                          : 'text-white group-hover:text-purple-400'
                          }`}>
                          {track.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{track.artist}</p>
                        <div className="flex items-center mt-1 space-x-3">
                          {currentTrack === index && isPlaying && (
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                              <span className="text-xs text-red-400">LIVE</span>
                            </div>
                          )}
                          <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded-full">
                            24/7 LIVE STREAM
                          </span>
                          {(track.title.includes('🎃') || track.title.includes('🎄') || track.title.includes('🌸') || track.title.includes('☀️') || track.title.includes('❄️')) && (
                            <span className="text-xs text-pink-400 bg-pink-500/20 px-2 py-1 rounded-full">
                              SEASONAL
                            </span>
                          )}
                          {track.title.includes('synthwave') && (
                            <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full">
                              SYNTHWAVE
                            </span>
                          )}
                          {track.title.includes('coffee') && (
                            <span className="text-xs text-amber-400 bg-amber-500/20 px-2 py-1 rounded-full">
                              JAZZ
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-sm mb-1">
                        {track.plays} plays
                      </div>
                      <div className="text-gray-500 text-xs">
                        {track.duration === 0 ? 'Live Stream' : formatTime(track.duration)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ad in Middle of Playlists Section */}
          <div className="max-w-4xl mx-auto mt-12 px-4">
            <AdBanner
              dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_INLINE || '5566778899'}
              dataAdFormat="rectangle"
              className="flex justify-center"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose LofiDose?</h2>
              <p className="text-gray-400 text-lg">Everything you need for the perfect listening experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">24/7 Live Stream</h3>
                <p className="text-gray-400">Continuous lofi music from the famous Lofi Girl channel</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Focus Mode</h3>
                <p className="text-gray-400">Minimize distractions with our focus-optimized player interface</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">High Quality Stream</h3>
                <p className="text-gray-400">Crystal clear audio quality directly from YouTube</p>
              </div>
            </div>
          </div>

          {/* Ad after Features Section */}
          <div className="max-w-4xl mx-auto mt-12 px-4">
            <AdBanner
              dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || '0987654321'}
              dataAdFormat="horizontal"
              className="mb-6"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Rhythm?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join millions of listeners enjoying all 15 official Lofi Girl 24/7 streams - from classic study beats to seasonal vibes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={togglePlay}
                disabled={!apiReady || !player}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!apiReady ? 'Loading Player...' :
                  playerState === 'loading' ? 'Buffering Stream...' :
                    isPlaying ? 'Pause Stream' : 'Start Your Journey'}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-700">
          {/* Footer Ad Banner */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <AdBanner
              dataAdSlot={process.env.NEXT_PUBLIC_AD_SLOT_FOOTER || '1122334455'}
              dataAdFormat="horizontal"
              className="mb-6"
            />
          </div>

          {/* Footer Links */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-1">
                <h3 className="text-white font-semibold text-lg mb-4">ChillTube</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Your destination for inspiration and entertainment. Stream quality content and get daily motivation.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.081.34-.09.354-.293 1.195-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.74-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contactus" className="text-gray-400 hover:text-white transition-colors text-sm">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/disclamer" className="text-gray-400 hover:text-white transition-colors text-sm">
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Empty Column for Balance */}
              <div></div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left text-gray-400">
                  <p>&copy; 2024 ChillTube. All rights reserved.</p>
                  <p className="text-sm mt-1">Streaming inspirational content and daily motivation</p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-end items-center mt-4 md:mt-0 space-x-6">
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Terms
                  </Link>
                  <Link href="/disclamer" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Disclaimer
                  </Link>
                  <Link href="/contactus" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>

    </div>
  );
}