import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface UpdateAlbumDialogProps {
    onUpdate: (albumId: string, albumName: string) => Promise<void>;
    initialAlbum: { id: string; album_name: string } | null;
}

const UpdateAlbumDialog: React.FC<UpdateAlbumDialogProps> = ({ onUpdate, initialAlbum }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [albumName, setAlbumName] = useState(initialAlbum?.album_name || '');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

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
            await onUpdate(initialAlbum.id, albumName);
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
                        Update Album with id: {initialAlbum?.id}
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