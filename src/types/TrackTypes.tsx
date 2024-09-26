export type Track = {
    id: string;
    name: string;
    album_id: string;
    album_name: string;
    album_art_url: string;
    artist_id: string;
    artist_name: string;
    artist_image_url: string;
    genre_id: string;
    genre_name: string;
    audioFileURL: string;
};

export type AddTrackMessage = {
    type: "success" | "error";
    message: string;
};