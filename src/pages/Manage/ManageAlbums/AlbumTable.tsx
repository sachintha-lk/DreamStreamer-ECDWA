import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Album } from './AlbumTypes';
import AlbumDeleteConfirmationDialog from './AlbumDeleteConfirmationDialog';
import UpdateAlbumDialog from './UpdateAlbumDialog';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

interface AlbumTableProps {
    albums: Album[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, name: string) => Promise<void>;
}

const S3_BUCKET_URL =  "https://dreamstreamer-uploads.s3.us-east-1.amazonaws.com/";

const AlbumTable: React.FC<AlbumTableProps> = ({ albums, onDelete, onUpdate }) => (
    <Table className=''>
        <TableCaption>Albums</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className='min-w-min'>Album ID</TableHead>
                <TableHead>Album Name</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Album Art</TableHead>
                <TableHead>Action</TableHead>
                
            </TableRow>
        </TableHeader>
        <TableBody>
            {albums.map((album) => (
                
                console.log(album),
                console.log(album.album_name),
                <TableRow className='' key={album.id}>
                    <TableCell className='py-1 min-w-min'>{album.id}</TableCell>
                    <TableCell className='py-1'>{album.album_name}</TableCell>
                    <TableCell className='py-1'>{album.artist_name}</TableCell>
                    <TableCell className='py-1'>{album.genre_name}</TableCell>
                    <TableCell className='py-1 min-w-min'>{album.year}</TableCell>
                    <TableCell className='py-1 min-w-min'>
                        <HoverCard>
                            <HoverCardTrigger>
                            <img 
                                src={
                                    `${S3_BUCKET_URL}${album.album_art_url}`
                                    || "https://via.placeholder.com/150"} 
                                alt={album.album_name} 
                                className="w-10 h-10" 
                                loading="lazy" 
                            />
                            </HoverCardTrigger>
                            <HoverCardContent>
                            <img 
                                src={
                                    `${S3_BUCKET_URL}${album.album_art_url}`
                                    || "https://via.placeholder.com/150"} 
                                alt={album.album_name} 
                                className="w-40 h-40" 
                            />
                            </HoverCardContent>
                        </HoverCard>
                    </TableCell>


                    <TableCell className='py-1 min-w-min flex gap-2'>
                        <UpdateAlbumDialog
                            initialAlbum={album}
                            onUpdate={onUpdate}
                        />
                        <AlbumDeleteConfirmationDialog
                            id={album.id}
                            name={album.album_name}
                            onConfirm={onDelete}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default AlbumTable;