export type Artist = {
    id: string;
    name: string;
    artist_image: string;
};

export type AddArtistMessage = {
    type: "success" | "error";
    message: string;
};