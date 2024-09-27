import { Album } from "./AlbumTypes";

export type Artist = {
    id: string;
    name: string;
    artist_image: string;
};


export type ArtistDetailed = {
    artist_id: string;
    artist_name: string;
    artist_image_url: string;
    albums: Album[];
};

export type AddArtistMessage = {
    type: "success" | "error";
    message: string;
};