import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface UpdateTrackDialogProps {
    onUpdate: (trackId: string, trackName: string) => Promise<void>;
    initialTrack: { id: string; name: string } | null;
}

const UpdateTrackDialog: React.FC<UpdateTrackDialogProps> = ({ onUpdate, initialTrack }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [trackName, setTrackName] = useState(initialTrack?.name || '');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

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
            await onUpdate(initialTrack.id, trackName);
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