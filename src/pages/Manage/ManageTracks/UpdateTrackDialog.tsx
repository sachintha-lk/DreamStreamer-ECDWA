import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchAlbums } from '@/services/AlbumService';
import { useToast } from '@/components/ui/use-toast';
import { Album } from '../../../types/AlbumTypes';
import { Track } from '../../../types/TrackTypes';

interface UpdateTrackDialogProps {
    onUpdate: (id: string, trackName: string, album_id: string, existingAudioFileURL: string, newAudioFile: File | null) => Promise<void>;
    initialTrack: Track | null;
}

const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

const UpdateTrackDialog: React.FC<UpdateTrackDialogProps> = ({ onUpdate, initialTrack }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [trackName, setTrackName] = useState(initialTrack?.name || '');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const [selectedAlbumID, setSelectedAlbumID] = useState(initialTrack?.album_id || ''); //
    const [albums, setAlbums] = useState<Album[]>([]);
    const [audio, setAudio] = useState<File | null>(null);

    const {toast} = useToast();
    

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

    const handleUpdate = async () => {
        if (!trackName) {
            setMessage({ type: 'error', message: 'Track name is required' });
            return;
        }
        if (!initialTrack) {
            setMessage({ type: 'error', message: 'No track selected for update' });
            return;
        }
        try {
            await onUpdate(initialTrack.id, trackName, selectedAlbumID, initialTrack.audioFileURL, audio!);
            setMessage({ type: 'success', message: 'Track updated successfully' });
            setTimeout(() => setIsOpen(false), 500);
        } catch (error: any) {
            setMessage({ type: 'error', message: error.response?.data?.message || 'An error occurred while updating the track' });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setTrackName(initialTrack?.name || '');
                setMessage(null);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Track</DialogTitle>
                    <DialogDescription>
                        Update Track with id: {initialTrack?.id}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={trackName}
                            onChange={(e) => setTrackName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    {message && (
                        <div className={`text-${message.type === 'error' ? 'red' : 'green'}-500`}>
                            {message.message}
                        </div>
                    )}
                </div>
                <div>
                
                <Label htmlFor="name" className="text-right">Album </Label>
            
                <Select onValueChange={(value) => setSelectedAlbumID(value)} defaultValue={String(initialTrack?.album_id)}>
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
                <div>
                    <audio controls>
                        <source src={S3_BUCKET_URL + initialTrack?.audioFileURL} 
                        type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="grid w-full max-w-sm items-center gap-4">
                    <Label htmlFor="picture">Upload New Audio</Label>
                    <br/>
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
                <DialogFooter>
                    <Button type="submit" onClick={handleUpdate}>
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateTrackDialog;