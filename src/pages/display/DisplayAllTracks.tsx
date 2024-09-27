import MainLayout from '@/layout/MainLayout';
import React, { useEffect, useState } from 'react';
import { fetchTracks } from '@/services/TrackService';
import { Input } from '@/components/ui/input';
import TrackCard from '@/components/TrackCard';
import { Track } from '@/types/TrackTypes';

const DisplayAllTracks: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getTracks = async () => {
      try {
        const data = await fetchTracks();
        setTracks(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTracks();
  }, []);
const filteredTracks = tracks.filter((track) =>
    track.name.toLowerCase().includes(filter.toLowerCase()) ||
    track.genre_name.toLowerCase().includes(filter.toLowerCase()) ||
    track.artist_name.toLowerCase().includes(filter.toLowerCase())
);

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">All Tracks</h1>
        <Input
          type="text"
          placeholder="Filter by track name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded border mt-4 mb-4"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DisplayAllTracks;
