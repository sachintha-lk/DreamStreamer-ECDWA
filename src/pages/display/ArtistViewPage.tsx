import MainLayout from '@/layout/MainLayout';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArtistDetailed } from '../../types/ArtistTypes';
import { getArtist } from '@/services/ArtistService';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select.tsx';

const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

const ArtistViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<ArtistDetailed | null>(null);
  const [filterGenre, setFilterGenre] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    if (!id) return;

    getArtist(id)
      .then((data) => {
        setArtist(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!artist) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  // Combine filters
  const filteredAlbums = artist.albums.filter((album) => {
    const matchesGenre = selectedGenre ? album.genre_name.toLowerCase() === selectedGenre.toLowerCase() : true;
    const matchesInput = album.album_name.toLowerCase().includes(filterGenre.toLowerCase());
    return matchesGenre && matchesInput;
  });

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center text-center">
          <img
            src={`${S3_BUCKET_URL}${artist.artist_image_url}`}
            alt={artist.artist_name}
            className="w-32 h-32 rounded-full object-cover shadow-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{artist.artist_name}</h1>
        </div>

        {/* Artist Albums */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Albums by {artist.artist_name}</h2>
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Filter by album name"
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="p-2 rounded border"
              />
             
              <Select onValueChange={ (value) => setSelectedGenre(value) } >
                  <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                          <SelectLabel>Genre</SelectLabel>                                    
                          { Array.from(new Set(artist.albums.map(album => album.genre_name))).map((genre) => (
                            <SelectItem key={genre} value={genre}>
                                  {genre}
                              </SelectItem>
                          ))}
          
                      </SelectGroup>
                  </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAlbums.map((album) => (
            <Link to={`/albums/${album.album_id}`}>
            <div key={album.album_id} className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="w-40 h-40">
                <img
                  src={album.album_art_url ? `${S3_BUCKET_URL}${album.album_art_url}` : '/default-album-art.jpg'}
                  alt={album.album_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2 text-center">
                <h3 className="font-bold text-sm">{album.album_name}</h3>
                <p className="text-xs text-gray-600">{album.genre_name} • {album.year}</p>
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

export default ArtistViewPage;
