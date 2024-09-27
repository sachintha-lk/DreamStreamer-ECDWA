import MainLayout from '@/layout/MainLayout';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GenreDetailed } from '../../types/GenreTypes'; // Ensure you have the correct type for Genre
import { getGenre } from '@/services/GenreService'; // Ensure this service is created
import { Input } from '@/components/ui/input';

const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

const GenreViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [genre, setGenre] = useState<GenreDetailed | null>(null);
  const [filterAlbum, setFilterAlbum] = useState('');

  useEffect(() => {
    if (!id) return;

    getGenre(id)
      .then((data) => {
        setGenre(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!genre) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  // Filter albums based on input
  const filteredAlbums = genre.albums.filter((album) =>
    album.album_name.toLowerCase().includes(filterAlbum.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mt-4">{genre.genre_name}</h1>
        </div>

        {/* Genre Albums */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Albums in {genre.genre_name}</h2>
            <Input
              type="text"
              placeholder="Filter by album name"
              value={filterAlbum}
              onChange={(e) => setFilterAlbum(e.target.value)}
              className="p-2 rounded border"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAlbums.map((album) => (
              <Link to={`/albums/${album.album_id}`} key={album.album_id}>
                <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="w-40 h-40">
                    <img
                      src={album.album_art_url ? `${S3_BUCKET_URL}${album.album_art_url}` : '/default-album-art.jpg'}
                      alt={album.album_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <h3 className="font-bold text-sm">{album.album_name}</h3>
                    <p className="text-xs text-gray-600">{album.year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GenreViewPage;
