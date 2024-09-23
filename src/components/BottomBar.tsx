import { useContext } from 'react';
import { MusicPlayerContext } from '../context/MusicPlayer/MusicPlayerContext';
import { PlayIcon, PauseIcon, RewindIcon, FastForwardIcon } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const BottomBar = () => {
  const {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    resumeTrack,
    trackProgress,
    setTrackProgress,
    duration,
    audioRef,
  } = useContext(MusicPlayerContext);

  const togglePlayPause = () => {
    if (currentTrack) {
      isPlaying ? pauseTrack() : resumeTrack();
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newTime = value[0];
    setTrackProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-3 px-4 shadow-md z-50 flex items-center justify-between space-x-6">
      <div className="flex items-center space-x-4">
        {currentTrack?.album_art_url && currentTrack.album_art_url.trim() ? (
          <img
            src={currentTrack.album_art_url}
            alt={currentTrack.name}
            className="w-12 h-12 rounded-md"
          />
        ) : (
          <div className="w-12 h-12 rounded-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 flex items-center justify-center">
            <p className="text-white text-2xl font-bold">
              {currentTrack?.album_name?.charAt(0) || ''}
            </p>
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{currentTrack?.name || 'No Track Playing'}</span>
          <span className="text-xs text-gray-400">{currentTrack?.artist_name || ''}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:bg-gray-700 p-2 rounded-md">
          <RewindIcon className="w-6 h-6 text-gray-300" />
        </button>
        <button onClick={togglePlayPause} className="hover:bg-gray-700 p-2 rounded-md">
          {isPlaying ? (
            <PauseIcon className="w-8 h-8 text-white" />
          ) : (
            <PlayIcon className="w-8 h-8 text-white" />
          )}
        </button>
        <button className="hover:bg-gray-700 p-2 rounded-md">
          <FastForwardIcon className="w-6 h-6 text-gray-300" />
        </button>
      </div>
      <div className="flex flex-1 items-center space-x-3">
        <span className="text-xs text-gray-400">{formatTime(trackProgress)}</span>
        <Slider
          value={[trackProgress]}
          onValueChange={handleSliderChange}
          max={duration || 100}
          step={1}
          className="flex-1"
        />
        <span className="text-xs text-gray-400">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default BottomBar;