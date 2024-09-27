import MainLayout from '@/layout/MainLayout';
import React, { useEffect, useState } from 'react';
import { fetchArtists } from '@/services/ArtistService'; // Your method to fetch all artists
import { ArtistCard } from '@/components/ArtistCard';
import { Input } from '@/components/ui/input';

const ArtistListPage: React.FC = () => {
  const [artists, setArtists] = useState<any[]>([]); // Replace 'any' with your artist type
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchArtistsWrapper = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtistsWrapper();
  }, []);

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">All Artists</h1>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Filter by artist name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded border w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              name={artist.name}
              artist_image={artist.artist_image}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ArtistListPage;
