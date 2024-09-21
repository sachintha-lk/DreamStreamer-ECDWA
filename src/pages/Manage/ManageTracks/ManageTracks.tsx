import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Track } from './TrackTypes';
import { fetchTracks, deleteTrack, addTrack, updateTrack } from '../../../services/TrackService';
import TrackTable from './TrackTable';
import AddTrackDialog from './AddTrackDialog';
import { useToast } from '@/components/ui/use-toast';
import { fetchAudioUploadPresignedURL } from '@/services/S3GetPresignedURLService';

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

    const handleAddTrack = async (trackName: string, albumId: string, audio: File) => {

        console.log("Trying to add track:", trackName, albumId, audio);
        let audioFileName = '';

        if (audio) {
            const fileType = audio.type;
            if (fileType !== "audio/mpeg" &&  fileType !== "audio/mp3") {
                toast({
                    title: "Error",
                    description: "Invalid file type. Please upload a MP3 File",
                    variant: "destructive",
                });
                console.error("Invalid file type. Please upload a MP3 File");
                return;
            }
        }

        // get presigned URL
        const response = await fetchAudioUploadPresignedURL();
        const presignedURL = response.data?.uploadURL;
        

        if (!presignedURL) {
            throw new Error("Error getting presigned URL");
        }

        audioFileName = response.data?.filename;
        console.log("Uploading file to S3:", presignedURL, audioFileName);

        // Upload the file to S3
        const uploadResponse = await fetch(presignedURL, {
            method: 'PUT',
            body: audio,
        });

        if (!uploadResponse.ok) {
            throw new Error("Error uploading audio file");
        }

        await addTrack(trackName, albumId, audioFileName)
        
        toast({
            title: "Success",
            description: "Track added successfully",
        });
        
        await loadTracks();
    };

    const handleUpdateTrack = async (id: string, trackName: string, album_id: string, existingAudioFileURL: string, newAudioFile: File | null) => {
        
        // if the name is empty, show an error
        if (!trackName) {
            toast({
                title: "Error",
                description: "Track name is required",
                variant: "destructive",
            });
            return;
        }

        let audioFileURL = '';
        if (newAudioFile) {
            const fileType = newAudioFile.type;
            if (fileType !== "audio/mpeg" &&  fileType !== "audio/mp3") {
                toast({
                    title: "Error",
                    description: "Invalid file type. Please upload a MP3 File",
                    variant: "destructive",
                });
                console.error("Invalid file type. Please upload a MP3 File");
                return;
            }

            // get presigned URL
            const response = await fetchAudioUploadPresignedURL();
            const presignedURL = response.data?.uploadURL;
            if (!presignedURL) {
                throw new Error("Error getting presigned URL");
            }

            audioFileURL = response.data?.filename;
            console.log("Uploading file to S3:", presignedURL, audioFileURL);

            // Upload the file to S3
            const uploadResponse = await fetch(presignedURL, {
                method: 'PUT',
                body: newAudioFile,
            });

            if (!uploadResponse.ok) {
                throw new Error("Error uploading audio file");
            }
        } else {
            audioFileURL = existingAudioFileURL;
        }

        await updateTrack(id, trackName, album_id, audioFileURL);
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