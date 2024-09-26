import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AddTrackMessage } from '../../../types/TrackTypes';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Album } from '../../../types/AlbumTypes';
import { fetchAlbums } from '@/services/AlbumService';

interface AddTrackDialogProps {
    onAdd: (TrackName: string, albumId: string, audioFile: File) => Promise<void>;
}

const AddTrackDialog: React.FC<AddTrackDialogProps> = ({ onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [TrackName, setTrackName] = useState('');
    const [message, setMessage] = useState<AddTrackMessage | null>(null);

    const [selectedAlbumID, setSelectedAlbumID] = useState('');
    const [albums, setAlbums] = useState<Album[]>([]);
    const [audio, setAudio] = useState<File | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        fetchAlbums().then((data) => {
            console.log(data);
            setAlbums(data);
        }).catch((error) => {
            console.log(error);
            toast({
                title: "Error",
                description: `An error occurred while fetching albums: ${error.response?.data?.message} `,
                variant: "destructive"
              });
        });

    }, [isOpen]);

    const {toast} = useToast();

    const handleAdd = async () => {
        if (!TrackName) {
            setMessage({ type: 'error', message: 'Track name is required' });
            toast({
                title: "Error",
                description: `Track Name is required`,
                variant: "destructive"
              });
            return;
        }

        try {
            await onAdd(TrackName, selectedAlbumID, audio!);
            setMessage({ type: 'success', message: 'Track added successfully' });
            toast({
                title: "Track added successfully",
                description: `Track ${TrackName} was added successfully`,

              });
            setTrackName('');
            setTimeout(() => setIsOpen(false), 500);
        } catch (error: any) {
            setMessage({ type: 'error', message: error.response?.data?.message || 'An error occurred while adding the Track' });
            toast({
                title: "Error",
                description: `An error occurred while adding the Track: ${error.response?.data?.message} `,
                variant: "destructive"
              });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setTrackName('');
                setMessage(null);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="default"  className='inline-block'>Add Track</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Add New Track</DialogTitle>
                    <DialogDescription>Add a new Track to the list of Tracks.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input
                            id="name"
                            className={`col-span-3 ${message?.type === 'error' ? 'border-red-500' : ''}`}
                            value={TrackName}
                            onChange={(e) => setTrackName(e.target.value)}
                        />
                        {message && (
                            <p className={`col-span-4 text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                {message.message}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">

                    <Label htmlFor="name" className="text-right">Album</Label>

                    <Select onValueChange={ (value) => setSelectedAlbumID(value) } >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Album" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Album</SelectLabel>
                                
                                {albums.map((album) => (
                                    <SelectItem key={album.album_id} value={album.album_id}>
                                        {album.album_name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-4">
                        <Label htmlFor="picture">Audio</Label>
                        <Input 
                            id="audio" 
                            type="file" 
                            accept=".mp3" 
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setAudio(file);
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

export default AddTrackDialog;