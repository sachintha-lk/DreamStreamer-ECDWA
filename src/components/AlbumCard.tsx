import React from 'react';
import { Album } from '../types/AlbumTypes';

export type AlbumCardProps = {
    album: Album;
};

const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <div className="album-card relative p-2 rounded-lg">
      <div className="relative">
        {album.album_art_url ? (
          <img src={`${S3_BUCKET_URL}${album.album_art_url}`} alt={album.album_name} className="w-36 h-36 rounded-md" />
        ) : (
          <div className="w-36 h-36 rounded-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 flex items-center justify-center">
            <p className="text-white text-4xl font-bold">
                {album.album_name?.charAt(0) || "A"}
            </p>
          </div>
        )}
    
      </div>

      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">{album.album_name}</p>
        <p className="text-sm text-gray-500">{album.artist_name}</p>
        <p className="text-sm text-gray-400 italic">{album.year}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
