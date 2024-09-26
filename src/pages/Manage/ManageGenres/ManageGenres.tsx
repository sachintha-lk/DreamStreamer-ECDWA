import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Genre } from '../../../types/GenreTypes';
import { fetchGenres, deleteGenre, addGenre, updateGenre } from '../../../services/GenreService';
import GenreTable from './GenreTable';
import AddGenreDialog from './AddGenreDialog';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/layout/MainLayout';

const ManageGenres: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        loadGenres();
    }, []);

    const loadGenres = async () => {
        try {
            const fetchedGenres = await fetchGenres();
            setGenres(fetchedGenres);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching genres:", error);
            toast({
                title: "Error",
                description: `Error retreiving genres`,
                variant: "destructive"
              });

            setLoading(false);
        }
    };

    const handleDeleteGenre = async (id: string) => {
        try {
            await deleteGenre(id);
            setGenres(genres.filter((genre) => genre.id !== id));
        } catch (error) {
            console.error("Error deleting genre:", error);
            toast({
                title: "Error",
                description: `Error deleting genre`,
                variant: "destructive"
              });
        }
    };

    const handleAddGenre = async (genreName: string) => {
        await addGenre(genreName);
        await loadGenres();
    };

    const handleUpdateGenre = async (id: string, genreName: string) => {
        await updateGenre(id, genreName);
        await loadGenres();
    }

    return (
        <MainLayout>
            <div className='m-3 flex justify-between gap-2'>
                <h1 className='text-2xl font-semibold'>Manage Genres</h1>
                <AddGenreDialog onAdd={handleAddGenre} />
            </div>
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                </div>
            ) : (
                <GenreTable genres={genres} onDelete={handleDeleteGenre} onUpdate={handleUpdateGenre} />
            )}
        </MainLayout>
    );
};

export default ManageGenres;