import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AddAlbumMessage } from './AlbumTypes';
import { useToast } from '@/components/ui/use-toast';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Artist } from '../ManageArtists/ArtistTypes';
import { Genre } from '../ManageGenres/GenreTypes';
import { fetchArtists }  from '../../../services/ArtistService';
import { fetchGenres }  from '../../../services/GenreService';

import {useEffect} from 'react';

interface AddAlbumDialogProps {
    onAdd: (AlbumName: string, selectedArtistID: string, selectedGenreID: string, year: string, albumArt: File | null) => Promise<void>;
}

const AddAlbumDialog: React.FC<AddAlbumDialogProps> = ({ onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [AlbumName, setAlbumName] = useState('');
    const [selectedArtistID, setSelectedArtistID] = useState('');
    const [selectedGenreID, setSelectedGenreID] = useState('');
    const [message, setMessage] = useState<AddAlbumMessage | null>(null);
    const [year, setYear] = useState('');
    const [albumArt, setAlbumArt] = useState<File | null>(null);
    
    const {toast} = useToast();
    const [artists, setArtists] = useState<Artist[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        fetchArtists().then((data) => {
            console.log(data);
            setArtists(data);
        }).catch((error) => {
            console.log(error);
            toast({
                title: "Error",
                description: `An error occurred while fetching artists: ${error.response?.data?.message} `,
                variant: "destructive"
              });
        });

        fetchGenres().then((data) => {
            console.log(data);
            setGenres(data);
        }).catch((error) => {
            console.log(error);
            toast({
                title: "Error",
                description: `An error occurred while fetching genres: ${error.response?.data?.message} `,
                variant: "destructive"
              });
        });
    }, []);

    const handleAdd = async () => {
        if (!AlbumName) {
            setMessage({ type: 'error', message: 'Album name is required' });
            toast({
                title: "Error",
                description: `Album Name is required`,
                variant: "destructive"
              });
            return;
        }

        try {
            await onAdd(AlbumName, selectedArtistID, selectedGenreID, year, albumArt);
            setMessage({ type: 'success', message: 'Album added successfully' });
            toast({
                title: "Album added successfully",
                description: `Album ${AlbumName} was added successfully`,

              });
            setAlbumName('');
            setTimeout(() => setIsOpen(false), 500);
        } catch (error: any) {
            setMessage({ type: 'error', message: error.response?.data?.message || 'An error occurred while adding the Album' });
            toast({
                title: "Error",
                description: `An error occurred while adding the Album: ${error.response?.data?.message} `,
                variant: "destructive"
              });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setAlbumName('');
                setMessage(null);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="default"  className='inline-block'>Add Album</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Add New Album</DialogTitle>
                    <DialogDescription>Add a new Album to the list of Albums.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input
                            id="name"
                            className={`col-span-3 ${message?.type === 'error' ? 'border-red-500' : ''}`}
                            value={AlbumName}
                            onChange={(e) => setAlbumName(e.target.value)}
                        />
                        {message && (
                            <p className={`col-span-4 text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                {message.message}
                            </p>
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

                    <Select onValueChange={ (value) => setSelectedGenreID(value) } >
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

                        <Select onValueChange={ (value) => setSelectedArtistID(value) } >
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
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input 
                            id="picture" 
                            type="file" 
                            accept=".png, .jpeg" 
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setAlbumArt(file);
                                    // console.log(file);
                                }
                            }} 
                        />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleAdd}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddAlbumDialog;