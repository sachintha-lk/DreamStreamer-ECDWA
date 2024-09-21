export type Album = {
    id: string;
    album_name: string;
    artist_id: string;
    artist_name: string;
    genre_id: string;
    genre_name: string;
    year: number;
    album_art_url: string | null;
    artist_image_url: string | null;
};

export type AddAlbumMessage = {
    type: "success" | "error";
    message: string;
};