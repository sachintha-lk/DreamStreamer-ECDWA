import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Genre } from '../../../types/GenreTypes';
import GenreDeleteConfirmationDialog from './GenreDeleteConfirmationDialog';
import UpdateGenreDialog from './UpdateGenreDialog';

interface GenreTableProps {
    genres: Genre[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, name: string) => Promise<void>;
}

const GenreTable: React.FC<GenreTableProps> = ({ genres, onDelete, onUpdate }) => (
    <Table className=''>
        <TableCaption>Genres</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className='min-w-min'>Genre ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className='min-w-min'>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {genres.map((genre) => (
                <TableRow className='' key={genre.id}>
                    <TableCell className='py-1 min-w-min'>{genre.id}</TableCell>
                    <TableCell className='py-1'>{genre.name}</TableCell>
                    <TableCell className='py-1 min-w-min flex gap-2'>
                        <UpdateGenreDialog
                            initialGenre={genre}
                            onUpdate={onUpdate}
                        />
                        <GenreDeleteConfirmationDialog
                            id={genre.id}
                            name={genre.name}
                            onConfirm={onDelete}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default GenreTable;