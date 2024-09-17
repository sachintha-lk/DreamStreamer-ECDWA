import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Artist } from './ArtistTypes';
import { fetchArtists, deleteArtist, addArtist, updateArtist } from '../../../services/ArtistService';
import ArtistTable from './ArtistTable';
import AddArtistDialog from './AddAritstDialog';
import { useToast } from '@/components/ui/use-toast';

const ManageArtists: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        loadArtists();
    }, []);

    const loadArtists = async () => {
        try {
            const fetchedArtists = await fetchArtists();
            setArtists(fetchedArtists);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching artists:", error);
            toast({
                title: "Error",
                description: `Error retreiving artists`,
                variant: "destructive"
              });
            setLoading(false);
        }
    };

    const handleDeleteArtist = async (id: string) => {
        try {
            await deleteArtist(id);
            setArtists(artists.filter((artist) => artist.id !== id));
        } catch (error) {
            console.error("Error deleting artist:", error);
            toast({
                title: "Error",
                description: `Error deleting artist`,
                variant: "destructive"
              });
        }
    };

    const handleAddArtist = async (artistName: string) => {
        await addArtist(artistName);
        await loadArtists();
    };

    const handleUpdateArtist = async (id: string, artistName: string) => {
        await updateArtist(id, artistName);
        await loadArtists();
    }

    return (
        <div>
            <div className='m-3 flex justify-between gap-2'>
                <h1 className='text-2xl font-semibold'>Manage Artist</h1>
                <AddArtistDialog onAdd={handleAddArtist} />
            </div>
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                </div>
            ) : (
                <ArtistTable artists={artists} onDelete={handleDeleteArtist} onUpdate={handleUpdateArtist} />
            )}
        </div>
    );
};

export default ManageArtists;