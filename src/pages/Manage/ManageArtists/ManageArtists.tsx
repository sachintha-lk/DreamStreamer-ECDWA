import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Artist } from './ArtistTypes';
import { fetchArtists, deleteArtist, addArtist, updateArtist } from '../../../services/ArtistService';
import ArtistTable from './ArtistTable';
import AddArtistDialog from './AddAritstDialog';
import { useToast } from '@/components/ui/use-toast';
import { fetchImageUploadPresignedURL } from '@/services/S3GetPresignedURLService';
import MainLayout from '@/layout/MainLayout';

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
                description: "Error retrieving artists",
                variant: "destructive",
            });
            setLoading(false);
        }
    };

    const handleDeleteArtist = async (id: string) => {
        try {
            await deleteArtist(id);
            setArtists(artists.filter((artist) => artist.id !== id));
            await loadArtists();
        } catch (error) {
            console.error("Error deleting artist:", error);
            toast({
                title: "Error",
                description: "Error deleting artist",
                variant: "destructive",
            });
        }
    };

    const handleAddArtist = async (artistName: string, artistImage: File | null) => {
        try {
            let artist_image_filename = '';

            if (artistImage) {
                const fileType = artistImage.type;
                if (fileType !== "image/png" && fileType !== "image/jpeg" && fileType !== "image/jpg") {
                    toast({
                        title: "Error",
                        description: "Invalid file type. Please upload a PNG, JPEG or JPG file.",
                        variant: "destructive",
                    });
                    return;
                }

                // Get the presigned URL for image upload
                const response = await fetchImageUploadPresignedURL(fileType, "artist_image");
                const presignedURL = response.data?.uploadURL;

                if (!presignedURL) {
                    throw new Error("Error getting presigned URL");
                }

                artist_image_filename = response.data?.filename;

                // Upload the artist image
                const uploadResponse = await fetch(presignedURL, {
                    method: 'PUT',
                    body: artistImage,
                    headers: {
                        'Content-Type': fileType,
                    },
                });

                if (!uploadResponse.ok) {
                    throw new Error(`Error uploading file: ${uploadResponse.statusText}`);
                }
            }

            // Add the artist with the image filename
            await addArtist(artistName, artist_image_filename);

            toast({
                title: "Success",
                description: "Artist added successfully",
            });
            await loadArtists();
        } catch (error) {
            console.error("Error adding artist:", error);
            toast({
                title: "Error",
                description: "Error adding artist",
                variant: "destructive",
            });
        }
    };

    const handleUpdateArtist = async (id: string, artistName: string, oldArtistImage: string, newArtistImage: File | null) => {
        try {
            let artistImageURL = oldArtistImage;

            if (newArtistImage) {
                const fileType = newArtistImage.type;
                if (fileType !== "image/png" && fileType !== "image/jpeg" && fileType !== "image/jpg") {
                    toast({
                        title: "Error",
                        description: "Invalid file type. Please upload a PNG,JPEG or JPG file.",
                        variant: "destructive",
                    });
                    return;
                }

                // Get the presigned URL for image upload
                const response = await fetchImageUploadPresignedURL(fileType, "artist_image");
                const presignedURL = response.data?.uploadURL;

                if (!presignedURL) {
                    throw new Error("Error getting presigned URL");
                }

                artistImageURL = response.data?.filename;

                // Upload the artist image
                const uploadResponse = await fetch(presignedURL, {
                    method: 'PUT',
                    body: newArtistImage,
                    headers: {
                        'Content-Type': fileType,
                    },
                });

                if (!uploadResponse.ok) {
                    throw new Error(`Error uploading file: ${uploadResponse.statusText}`);
                }
            }

            await updateArtist(id, artistName, artistImageURL);
            await loadArtists();
        } catch (error) {
            console.error("Error updating artist:", error);
            toast({
                title: "Error",
                description: "Error updating artist",
                variant: "destructive",
            });
        }
    };

    return (
        <MainLayout>
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
        </MainLayout>
    );
};

export default ManageArtists;
