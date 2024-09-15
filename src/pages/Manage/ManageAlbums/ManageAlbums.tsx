import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Album } from './AlbumTypes';
import { fetchAlbums, deleteAlbum, addAlbum, updateAlbum } from './ManageAlbumService';
import AlbumTable from './AlbumTable';
import AddAlbumDialog from './AddAlbumDialog';
import { useToast } from '@/components/ui/use-toast';

const ManageAlbums: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        loadAlbums();
    }, []);

    const loadAlbums = async () => {
        try {
            const fetchedAlbums = await fetchAlbums();
            setAlbums(fetchedAlbums);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching albums:", error);
            toast({
                title: "Error",
                description: `Error retreiving albums`,
                variant: "destructive"
              });
            setLoading(false);
        }
    };

    const handleDeleteAlbum = async (id: string) => {
        try {
            await deleteAlbum(id);
            setAlbums(albums.filter((album) => album.id !== id));
        } catch (error) {
            console.error("Error deleting album:", error);
            toast({
                title: "Error",
                description: `Error deleting album`,
                variant: "destructive"
              });
        }
    };

    const handleAddAlbum = async (albumName: string) => {
        await addAlbum(albumName);
        await loadAlbums();
    };

    const handleUpdateAlbum = async (id: string, albumName: string) => {
        await updateAlbum(id, albumName);
        await loadAlbums();
    }

    return (
        <div>
            <div className='m-3 flex justify-between gap-2'>
                <h1 className='text-2xl font-semibold'>Manage Album</h1>
                <AddAlbumDialog onAdd={handleAddAlbum} />
            </div>
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                </div>
            ) : (
                <AlbumTable albums={albums} onDelete={handleDeleteAlbum} onUpdate={handleUpdateAlbum} />
            )}
        </div>
    );
};

export default ManageAlbums;