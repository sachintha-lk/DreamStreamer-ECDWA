import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AddGenreMessage } from './GenreTypes';
import { useToast } from '@/components/ui/use-toast';

interface AddGenreDialogProps {
    onAdd: (genreName: string) => Promise<void>;
}

const AddGenreDialog: React.FC<AddGenreDialogProps> = ({ onAdd }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [genreName, setGenreName] = useState('');
    const [message, setMessage] = useState<AddGenreMessage | null>(null);
    const {toast} = useToast();

    const handleAdd = async () => {
        if (!genreName) {
            setMessage({ type: 'error', message: 'Genre name is required' });
            toast({
                title: "Error",
                description: `Genre Name is required`,
                variant: "destructive"
              });
            return;
        }

        try {
            await onAdd(genreName);
            setMessage({ type: 'success', message: 'Genre added successfully' });
            toast({
                title: "Genre added successfully",
                description: `Genre ${genreName} was added successfully`
                });
            setGenreName('');
            setTimeout(() => setIsOpen(false), 500);
        } catch (error: any) {
            setMessage({ type: 'error', message: error.response?.data?.message || 'An error occurred while adding the genre' });
            toast({
                title: "Error",
                description: `An error occurred while adding the genre: ${error.response?.data?.message} `,
                variant: "destructive"
              });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
                setGenreName('');
                setMessage(null);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="default"  className='inline-block'>Add Genre</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[300px]">
                <DialogHeader>
                    <DialogTitle>Add New Genre</DialogTitle>
                    <DialogDescription>Add a new genre to the list of genres.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input
                            id="name"
                            className={`col-span-3 ${message?.type === 'error' ? 'border-red-500' : ''}`}
                            value={genreName}
                            onChange={(e) => setGenreName(e.target.value)}
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

export default AddGenreDialog;