import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Artist } from './ArtistTypes';
import ArtistDeleteConfirmationDialog from './ArtistDeleteConfirmationDialog';
import UpdateArtistDialog from './UpdateArtistDialog';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"

interface ArtistTableProps {
    artists: Artist[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, name: string) => Promise<void>;
}

const S3_BUCKET_URL =  "https://dreamstreamer-uploads.s3.us-east-1.amazonaws.com/";

const ArtistTable: React.FC<ArtistTableProps> = ({ artists, onDelete, onUpdate }) => (
    <Table className=''>
        <TableCaption>Artists</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className='min-w-min'>Artist ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className='min-w-min'>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {artists.map((artist) => (
                <TableRow className='' key={artist.id}>
                    <TableCell className='py-1 min-w-min'>{artist.id}</TableCell>
                    <TableCell className='py-1'>{artist.name}</TableCell>
                    <TableCell className='py-1 min-w-min'>

                    <HoverCard>
                            <HoverCardTrigger>
                            <img 
                                src={
                                    `${S3_BUCKET_URL}${artist.artist_image}`
                                    || "https://via.placeholder.com/150"} 
                                alt={artist.name} 
                                className="w-10 h-10" 
                                loading="lazy" 
                            />
                            </HoverCardTrigger>
                            <HoverCardContent>
                            <img 
                                src={
                                    `${S3_BUCKET_URL}${artist.artist_image}`
                                    || "https://via.placeholder.com/150"} 
                                alt={artist.name} 
                                className="w-30 h-30" 
                                loading="lazy" 
                            />
                            </HoverCardContent>
                        </HoverCard>

                        <img 
                            
                        />
                    </TableCell>
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