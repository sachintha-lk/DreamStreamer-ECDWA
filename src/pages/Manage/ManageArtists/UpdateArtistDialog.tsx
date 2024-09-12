import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface UpdateArtistDialogProps {
    onUpdate: (artistId: string, artistName: string) => Promise<void>;
    initialArtist: { id: string; name: string } | null;
}

const UpdateArtistDialog: React.FC<UpdateArtistDialogProps> = ({ onUpdate, initialArtist }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [artistName, setArtistName] = useState(initialArtist?.name || '');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleUpdate = async () => {
        if (!artistName) {
            setMessage({ type: 'error', message: 'Artist name is required' });
            return;
        }
        if (!initialArtist) {
            setMessage({ type: 'error', message: 'No artist selected for update' });
            return;
        }
        try {
            await onUpdate(initialArtist.id, artistName);
            setMessage({ type: 'success', message: 'Artist updated successfully' });
            setTimeout(() => setIsOpen(false), 500);
        } catch (error: any) {
            setMessage({ type: 'error', message: error.response?.data?.message || 'An error occurred while updating the artist' });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setArtistName(initialArtist?.name || '');
                setMessage(null);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Artist</DialogTitle>
                    <DialogDescription>
                        Update Artist with id: {initialArtist?.id}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={artistName}
                            onChange={(e) => setArtistName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    {message && (
                        <div className={`text-${message.type === 'error' ? 'red' : 'green'}-500`}>
                            {message.message}
                        </div>
                    )}
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

export default UpdateArtistDialog;