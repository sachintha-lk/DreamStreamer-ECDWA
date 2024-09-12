import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AddArtistMessage } from './ArtistTypes';
import { useToast } from '@/components/ui/use-toast';

interface AddArtistDialogProps {
    onAdd: (artistName: string) => Promise<void>;
}

const AddArtistDialog: React.FC<AddArtistDialogProps> = ({ onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [artistName, setArtistName] = useState('');
    const [message, setMessage] = useState<AddArtistMessage | null>(null);
    const {toast} = useToast();

    const handleAdd = async () => {
        if (!artistName) {
            setMessage({ type: 'error', message: 'Artist name is required' });
            toast({
                title: "Error",
                description: `Artist Name is required`,
                variant: "destructive"
              });
            return;
        }

        try {
            await onAdd(artistName);
            setMessage({ type: 'success', message: 'Artist added successfully' });
            toast({
                title: "Artist added successfully",
                description: `Artist ${artistName} was added successfully`,

              });
            setArtistName('');
            setTimeout(() => setIsOpen(false), 500);
        } catch (error: any) {
            setMessage({ type: 'error', message: error.response?.data?.message || 'An error occurred while adding the artist' });
            toast({
                title: "Error",
                description: `An error occurred while adding the artist: ${error.response?.data?.message} `,
                variant: "destructive"
              });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setArtistName('');
                setMessage(null);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="default"  className='inline-block'>Add Artist</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Add New Artist</DialogTitle>
                    <DialogDescription>Add a new artist to the list of artists.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input
                            id="name"
                            className={`col-span-3 ${message?.type === 'error' ? 'border-red-500' : ''}`}
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                        />
                        {message && (
                            <p className={`col-span-4 text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                {message.message}
                            </p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleAdd}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddArtistDialog;