import MainLayout from '@/layout/MainLayout';
import React, { useEffect, useState } from 'react';
import { fetchGenres } from '@/services/GenreService';
import { Input } from '@/components/ui/input';
import { Genre } from '@/types/GenreTypes';
import { Link } from 'react-router-dom';

const DisplayAllGenres: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getAllGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    getAllGenres();
  }, []);

  const filteredGenres = genres.filter(genre =>
    genre.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">All Genres</h1>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Filter by genre name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded border w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGenres.map((genre) => (
            <Link to={`/genres/${genre.id}`} key={genre.id}>
              <div
                className="rounded-lg shadow-md overflow-hidden transition-shadow duration-300"
                style={{
                  background: 'linear-gradient(to right, #6EE7B7, #3B82F6)',
                  padding: '20px',
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {genre.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DisplayAllGenres;
