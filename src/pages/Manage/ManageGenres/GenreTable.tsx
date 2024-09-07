import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Genre } from './GenreTypes';
import GenreDeleteConfirmationDialog from './GenreDeleteConfirmationDialog';
import UpdateGenreDialog from './UpdateGenreDialog';

interface GenreTableProps {
    genres: Genre[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, name: string) => Promise<void>;
}

const GenreTable: React.FC<GenreTableProps> = ({ genres, onDelete, onUpdate }) => (
    <Table>
        <TableCaption>Genres</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Genre ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {genres.map((genre) => (
                <TableRow className='' key={genre.id}>
                    <TableCell>{genre.id}</TableCell>
                    <TableCell>{genre.name}</TableCell>
                    <TableCell>
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