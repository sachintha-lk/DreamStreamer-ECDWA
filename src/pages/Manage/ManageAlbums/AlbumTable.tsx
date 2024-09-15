import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Album } from './AlbumTypes';
import AlbumDeleteConfirmationDialog from './AlbumDeleteConfirmationDialog';
import UpdateAlbumDialog from './UpdateAlbumDialog';

interface AlbumTableProps {
    albums: Album[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, name: string) => Promise<void>;
}

const AlbumTable: React.FC<AlbumTableProps> = ({ albums, onDelete, onUpdate }) => (
    <Table className=''>
        <TableCaption>Albums</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className='min-w-min'>Album ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className='min-w-min'>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {albums.map((album) => (
                <TableRow className='' key={album.id}>
                    <TableCell className='py-1 min-w-min'>{album.id}</TableCell>
                    <TableCell className='py-1'>{album.name}</TableCell>
                    <TableCell className='py-1 min-w-min flex gap-2'>
                        <UpdateAlbumDialog
                            initialAlbum={album}
                            onUpdate={onUpdate}
                        />
                        <AlbumDeleteConfirmationDialog
                            id={album.id}
                            name={album.name}
                            onConfirm={onDelete}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default AlbumTable;