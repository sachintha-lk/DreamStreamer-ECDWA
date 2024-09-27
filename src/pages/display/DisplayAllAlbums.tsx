import MainLayout from '@/layout/MainLayout';
import { useEffect, useState } from 'react';
import { fetchAlbums } from '@/services/AlbumService'; 
import AlbumCard from '@/components/AlbumCard'; 
import { Input } from '@/components/ui/input';
import { Album } from '@/types/AlbumTypes';

const DisplayAllAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]); 
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getAllAlbums = async () => {
      try {
        const data = await fetchAlbums();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    getAllAlbums();
  }, []);

  const filteredAlbums = albums.filter(album =>
    album.album_name.toLowerCase().includes(filter.toLowerCase()) ||
    album.artist_name.toLowerCase().includes(filter.toLowerCase()) ||
    album.genre_name.toLowerCase().includes(filter.toLowerCase()) ||
    album.year.toString().includes(filter)
  );

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">All Albums</h1>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Filter by album name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded border w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAlbums.map((album) => (
            <AlbumCard
              key={album.album_id}
              album={album} 
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DisplayAllAlbums;
