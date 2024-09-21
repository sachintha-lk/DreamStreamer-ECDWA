import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';

interface TrackDeleteConfirmationProps {
    id: string;
    name: string;
    onConfirm: (id: string) => void;
}

const TrackDeleteConfirmationDialog: React.FC<TrackDeleteConfirmationProps> = ({ id, name, onConfirm }) => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the Track {name}.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onConfirm(id)}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);

export default TrackDeleteConfirmationDialog;
