import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Album } from './AlbumTypes';
import { fetchAlbums, deleteAlbum, addAlbum, updateAlbum } from '../../../services/AlbumService';
import AlbumTable from './AlbumTable';
import AddAlbumDialog from './AddAlbumDialog';
import { useToast } from '@/components/ui/use-toast';
import { fetchImageUploadPresignedURL } from '@/services/S3GetPresignedURLService';
import MainLayout from '@/layout/MainLayout';

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
                description: "Error retrieving albums",
                variant: "destructive",
            });
            setLoading(false);
        }
    };

    const handleDeleteAlbum = async (id: string) => {
        try {
            await deleteAlbum(id);
            setAlbums(albums.filter((album) => album.album_id !== id));
            await loadAlbums();
        } catch (error) {
            console.error("Error deleting album:", error);
            toast({
                title: "Error",
                description: "Error deleting album",
                variant: "destructive",
            });
        }
    };

    const handleAddAlbum = async (albumName: string, artistId: string, genreId: string, year: string, albumArt: File | null) => {
        try {
            // Validate file type
            let album_art_filename = '';

            if (albumArt) {
                const fileType = albumArt.type;
                if (fileType !== "image/png" && fileType !== "image/jpeg" && fileType !== "image/jpg") {
                    toast({
                        title: "Error",
                        description: "Invalid file type. Please upload a PNG or JPEG file.",
                        variant: "destructive",
                    });
                    return;
                }

                // Get the presigned URL
                const response = await fetchImageUploadPresignedURL(fileType, "album_art");
                
                const presignedURL = response.data?.uploadURL;
                console.log("res data",response.data);
                console.log("presigned",presignedURL);
                if (!presignedURL) {
                    throw new Error("Error getting presigned URL");
                }

                album_art_filename = response.data?.filename;
                // Upload the file
                const uploadResponse = await fetch(presignedURL, {
                    method: 'PUT',
                    body: albumArt,
                    headers: {
                        'Content-Type': fileType,
                    },
                });

                if (!uploadResponse.ok) {
                    throw new Error(`Error uploading file: ${uploadResponse.statusText}`);
                }
            }

            // Add the album
            await addAlbum(albumName, parseInt(year), artistId, genreId, album_art_filename);

            toast({
                title: "Success",
                description: "Album added successfully",
            });
            await loadAlbums();
        } catch (error) {
            console.error("Error adding album:", error);
            toast({
                title: "Error",
                description: "Error adding album",
                variant: "destructive",
            });
        }
    };

    const handleUpdateAlbum = async (id: string, albumName: string, year: string,  selectedArtistID: string, selectedGenreID: string, initialAlbumArtURL: string, newAlbumArt: File | null) => {
        try {
            // check if album name, year, artist and genre are empty
            if (!albumName) {
                toast({
                    title: "Error",
                    description: "Album name is required",
                    variant: "destructive",
                });
                return;
            }
            if (!year || year == '') {
                toast({
                    title: "Error",
                    description: "Year is required",
                    variant: "destructive",
                });
                return;
            }
            if (!selectedArtistID) {
                toast({
                    title: "Error",
                    description: "Artist is required",
                    variant: "destructive",
                });
                return;
            }
            if (!selectedGenreID) {
                toast({
                    title: "Error",
                    description: "Genre is required",
                    variant: "destructive",
                });
                return;
            }

            // Validate file type
            let album_art_filename = '';

            if (newAlbumArt) {
                const fileType = newAlbumArt.type;
                if (fileType !== "image/png" && fileType !== "image/jpeg" && fileType !== "image/jpg") {
                    toast({
                        title: "Error",
                        description: "Invalid file type. Please upload a PNG or JPEG file.",
                        variant: "destructive",
                    });
                    return;
                }

                // Get the presigned URL
                const response = await fetchImageUploadPresignedURL(fileType, "album_art");
                const presignedURL = response.data?.uploadURL;
                if (!presignedURL) {
                    throw new Error("Error getting presigned URL");
                }

                album_art_filename = response.data?.filename;
                // Upload the file
                const uploadResponse = await fetch(presignedURL, {
                    method: 'PUT',
                    body: newAlbumArt,
                    headers: {
                        'Content-Type': fileType,
                    },
                });

                if (!uploadResponse.ok) {
                    throw new Error(`Error uploading file: ${uploadResponse.statusText}`);
                }
            } else {
                album_art_filename = initialAlbumArtURL;
            }         

            await updateAlbum(id, albumName, selectedArtistID, selectedGenreID, album_art_filename, Number(year));
            console.log("MangeAlbums id: "+ id + " album name: "+ albumName + " artist id: "+ selectedArtistID + " genre id: "+ selectedGenreID + " album art: "+ album_art_filename + " year: "+ year);
            await loadAlbums();
        } catch (error) {
            console.error("Error updating album:", error);
            toast({
                title: "Error",
                description: "Error updating album",
                variant: "destructive",
            });
        }
    };

    return (
        <MainLayout>
            <div className='m-3 flex justify-between gap-2'>
                <h1 className='text-2xl font-semibold'>Manage Albums</h1>
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
        </MainLayout>
    );
};

export default ManageAlbums;
