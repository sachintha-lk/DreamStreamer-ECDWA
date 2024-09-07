import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface UpdateGenreDialogProps {
    onUpdate: (genreId: string, genreName: string) => Promise<void>;
    initialGenre: { id: string; name: string } | null;
}

const UpdateGenreDialog: React.FC<UpdateGenreDialogProps> = ({ onUpdate, initialGenre }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [genreName, setGenreName] = useState(initialGenre?.name || '');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleUpdate = async () => {
        if (!genreName) {
            setMessage({ type: 'error', message: 'Genre name is required' });
            return;
        }
        if (!initialGenre) {
            setMessage({ type: 'error', message: 'No genre selected for update' });
            return;
        }
        try {
            await onUpdate(initialGenre.id, genreName);
            setMessage({ type: 'success', message: 'Genre updated successfully' });
            setTimeout(() => setIsOpen(false), 500);
        } catch (error: any) {
            setMessage({ type: 'error', message: error.response?.data?.message || 'An error occurred while updating the genre' });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setGenreName(initialGenre?.name || '');
                setMessage(null);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">Update Genre</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Genre</DialogTitle>
                    <DialogDescription>
                        Update Genre with id: {initialGenre?.id}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={genreName}
                            onChange={(e) => setGenreName(e.target.value)}
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

export default UpdateGenreDialog;