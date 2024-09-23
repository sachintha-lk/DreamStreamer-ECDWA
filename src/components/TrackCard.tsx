import React, { useContext } from 'react';
import { PlayCircleIcon } from 'lucide-react';
import { Track } from '../pages/Manage/ManageTracks/TrackTypes';
import { MusicPlayerContext } from '../context/MusicPlayer/MusicPlayerContext';

type TrackCardProps = {
  track: Track;
};

const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const { playTrack } = useContext(MusicPlayerContext);

  const handlePlayClick = () => {
    const trackWithFullURL = {
      ...track,
      audioFileURL: `${S3_BUCKET_URL}${track.audioFileURL}`,
      album_art_url: track.album_art_url ? `${S3_BUCKET_URL}${track.album_art_url}` : '',
    };
    playTrack(trackWithFullURL);
  };

  return (
    <div className="track-card relative p-4 shadow-lg rounded-lg">
      <div className="relative">
        {track.album_art_url ? (
          <img
            src={`${S3_BUCKET_URL}${track.album_art_url}`}
            alt={track.album_name}
            className="w-36 h-36 rounded-md"
          />
        ) : (
          <div className="w-36 h-36 rounded-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 flex items-center justify-center">
            <p className="text-white text-4xl font-bold">
              {track.album_name?.charAt(0) || 'A'}
            </p>
          </div>
        )}

        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-md cursor-pointer"
          onClick={handlePlayClick} // Trigger play function on click
        >
          <PlayCircleIcon className="w-10 h-10 text-white" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">{track.name}</p>
        <p className="text-sm text-gray-500">{track.artist_name}</p>
        <p className="text-sm text-gray-400 italic">{track.album_name}</p>
      </div>
    </div>
  );
};

export default TrackCard;
