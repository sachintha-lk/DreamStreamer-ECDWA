import React, { createContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Track } from '@/types/TrackTypes';
import { recordPlayEvent } from '@/services/AnalyticsService';

interface MusicPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  trackProgress: number;
  setTrackProgress: (progress: number) => void;
  duration: number;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const defaultValue: MusicPlayerContextType = {
  currentTrack: null,
  isPlaying: false,
  playTrack: () => {},
  pauseTrack: () => {},
  resumeTrack: () => {},
  trackProgress: 0,
  setTrackProgress: () => {},
  duration: 0,
  audioRef: { current: null },
};

export const MusicPlayerContext = createContext<MusicPlayerContextType>(defaultValue);

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setTrackProgress(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playTrack = (track: Track) => {
    const audio = audioRef.current;
    if (currentTrack?.id !== track.id) {
      setCurrentTrack(track);
      audio.src = track.audioFileURL;
      audio.load();
      recordPlayEvent(track.id);
    }
    audio.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        resumeTrack,
        trackProgress,
        setTrackProgress,
        duration,
        audioRef,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};