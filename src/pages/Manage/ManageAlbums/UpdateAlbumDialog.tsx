import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Genre } from '../ManageGenres/GenreTypes';
import { Artist } from '../ManageArtists/ArtistTypes';
import { fetchArtists } from '@/services/ArtistService';
import { fetchGenres } from '@/services/GenreService';
import { Album } from './AlbumTypes';

interface UpdateAlbumDialogProps {
    onUpdate: (id: string, albumName: string, year: string,  selectedArtistID: string, selectedGenreID: string, initialAlbumArtURL: string, newAlbumArt: File | null) => Promise<void>;
    initialAlbum: Album | null;
}

const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

const UpdateAlbumDialog: React.FC<UpdateAlbumDialogProps> = ({ onUpdate, initialAlbum }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [albumName, setAlbumName] = useState(initialAlbum?.album_name || '');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const [selectedArtistID, setSelectedArtistID] = useState(initialAlbum?.artist_id || '');
    const [selectedGenreID, setSelectedGenreID] = useState(initialAlbum?.genre_id || '');
    const [year, setYear] = useState(String(initialAlbum?.year) || '');
    const [artists, setArtists] = useState<Artist[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [newAlbumArt, setNewAlbumArt] = useState<File | null>(null);


    useEffect(() => {
        if (isOpen) {
            // Fetch data only when the modal opens
            fetchArtists().then((data) => {
                setArtists(data);
            }).catch((error) => {
                console.log(error);
            });
    
            fetchGenres().then((data) => {
                setGenres(data);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [isOpen]); 

    // useEffect(() => {
    //     if (initialAlbum) {
    //         setAlbumName(initialAlbum.album_name);
    //         setSelectedArtistID(initialAlbum.artist_id);
    //         setSelectedGenreID(initialAlbum.genre_id);
    //         setYear(initialAlbum.year.toString());
    //     }
    // }, [initialAlbum]);

    const handleUpdate = async () => {
        if (!albumName) {
            setMessage({ type: 'error', message: 'Album name is required' });
            return;
        }
        if (!initialAlbum) {
            setMessage({ type: 'error', message: 'No album selected for update' });
            return;
        }
        try {
            await onUpdate(initialAlbum.album_id, albumName, year, selectedArtistID, selectedGenreID, initialAlbum.album_art_url || '', newAlbumArt);
            
            // console.log("updateDialog id" + initialAlbum.id + "name" + albumName + "artist" + selectedArtistID + "genre" + selectedGenreID + "year" + year + "album_art_url" + initialAlbum.album_art_url + "newAlbumArt" + newAlbumArt);
            setMessage({ type: 'success', message: 'Album updated successfully' });
            setTimeout(() => setIsOpen(false), 500);
        } catch (error: any) {
            setMessage({ type: 'error', message: error.response?.data?.message || 'An error occurred while updating the album' });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setAlbumName(initialAlbum?.album_name || '');
                setMessage(null);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Album</DialogTitle>
                    <DialogDescription>
                        Update Album with id: {initialAlbum?.album_id}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={albumName}
                            onChange={(e) => setAlbumName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    {message && (
                        <div className={`text-${message.type === 'error' ? 'red' : 'green'}-500`}>
                            {message.message}
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="year" className="text-right">Year</Label>
                        <Input
                            id="year"
                            className={`col-span-3 ${message?.type === 'error' ? 'border-red-500' : ''}`}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                 </div>

                <div className="grid grid-cols-4 items-center gap-4">

                    <Label htmlFor="name" className="text-right">Genre</Label>

                    <Select onValueChange={ (value) => setSelectedGenreID(value) } defaultValue={String(initialAlbum?.genre_id)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Genre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Genres</SelectLabel>
                                
                                {genres.map((genre) => (
                                    <SelectItem key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Artist</Label>

                        <Select onValueChange={ (value) => setSelectedArtistID(value) } defaultValue={String(initialAlbum?.artist_id)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Artist" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Artists</SelectLabel>                                    
                                    {artists.map((artist) => (
                                        <SelectItem key={artist.id} value={artist.id}>
                                            {artist.name}
                                        </SelectItem>
                                    ))}
                    
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        selectedID: {selectedArtistID} defaultID: {initialAlbum?.artist_id} euqal: {selectedArtistID === initialAlbum?.artist_id}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <img src={`${S3_BUCKET_URL}${initialAlbum?.album_art_url}`} alt="Album Art" className="w-20 h-20" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture" className='block'>Upload New Picture</Label>
                        <Input 
                            id="picture" 
                            type="file" 
                            accept=".png, .jpeg, .jpg" 
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setNewAlbumArt(file);
                                    // console.log(file);
                                }
                            }} 
                        />
                    </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleUpdate}>
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateAlbumDialog;