import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Track } from './TrackTypes';
import { fetchTracks, deleteTrack, addTrack, updateTrack } from './ManageTrackService';
import TrackTable from './TrackTable';
import AddTrackDialog from './AddTrackDialog';
import { useToast } from '@/components/ui/use-toast';

const ManageTracks: React.FC = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        loadTracks();
    }, []);

    const loadTracks = async () => {
        try {
            const fetchedTracks = await fetchTracks();
            setTracks(fetchedTracks);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tracks:", error);
            toast({
                title: "Error",
                description: `Error retreiving tracks`,
                variant: "destructive"
              });
            setLoading(false);
        }
    };

    const handleDeleteTrack = async (id: string) => {
        try {
            await deleteTrack(id);
            setTracks(tracks.filter((track) => track.id !== id));
        } catch (error) {
            console.error("Error deleting track:", error);
            toast({
                title: "Error",
                description: `Error deleting track`,
                variant: "destructive"
              });
        }
    };

    const handleAddTrack = async (trackName: string) => {
        await addTrack(trackName);
        await loadTracks();
    };

    const handleUpdateTrack = async (id: string, trackName: string) => {
        await updateTrack(id, trackName);
        await loadTracks();
    }

    return (
        <div>
            <div className='m-3 flex justify-between gap-2'>
                <h1 className='text-2xl font-semibold'>Manage Track</h1>
                <AddTrackDialog onAdd={handleAddTrack} />
            </div>
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                    <Skeleton className="h-8 w-min" />
                </div>
            ) : (
                <TrackTable tracks={tracks} onDelete={handleDeleteTrack} onUpdate={handleUpdateTrack} />
            )}
        </div>
    );
};

export default ManageTracks;