import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Track } from '../../../types/TrackTypes';
import TrackDeleteConfirmationDialog from './TrackDeleteConfirmationDialog';
import UpdateTrackDialog from './UpdateTrackDialog';

interface TrackTableProps {
    tracks: Track[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, trackName: string, album_id: string, existingAudioFileURL: string, newAudioFile: File | null) => Promise<void>;
}

const TrackTable: React.FC<TrackTableProps> = ({ tracks, onDelete, onUpdate }) => (
    <Table className=''>
        <TableCaption>Tracks</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className='min-w-min'>Track ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Album</TableHead>    
                <TableHead>Genre</TableHead>        
                <TableHead className='min-w-min'>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {tracks.map((track) => (
                <TableRow className='' key={track.id}>
                    <TableCell className='py-1 min-w-min'>{track.id}</TableCell>
                    <TableCell className='py-1'>{track.name}</TableCell>
                    <TableCell className='py-1'>{track.artist_name}</TableCell>
                    <TableCell className='py-1'>{track.album_name}</TableCell>
                    <TableCell className='py-1'>{track.genre_name}</TableCell>
                    <TableCell className='py-1 min-w-min flex gap-2'>
                        <UpdateTrackDialog
                            initialTrack={track}
                            onUpdate={onUpdate}
                        />
                        <TrackDeleteConfirmationDialog
                            id={track.id}
                            name={track.name}
                            onConfirm={onDelete}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default TrackTable;