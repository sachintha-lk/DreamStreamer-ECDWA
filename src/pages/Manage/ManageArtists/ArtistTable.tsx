import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Artist } from './ArtistTypes';
import ArtistDeleteConfirmationDialog from './ArtistDeleteConfirmationDialog';
import UpdateArtistDialog from './UpdateArtistDialog';

interface ArtistTableProps {
    artists: Artist[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, name: string) => Promise<void>;
}

const ArtistTable: React.FC<ArtistTableProps> = ({ artists, onDelete, onUpdate }) => (
    <Table className=''>
        <TableCaption>Artists</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className='min-w-min'>Artist ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className='min-w-min'>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {artists.map((artist) => (
                <TableRow className='' key={artist.id}>
                    <TableCell className='py-1 min-w-min'>{artist.id}</TableCell>
                    <TableCell className='py-1'>{artist.name}</TableCell>
                    <TableCell className='py-1 min-w-min flex gap-2'>
                        <UpdateArtistDialog
                            initialArtist={artist}
                            onUpdate={onUpdate}
                        />
                        <ArtistDeleteConfirmationDialog
                            id={artist.id}
                            name={artist.name}
                            onConfirm={onDelete}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default ArtistTable;