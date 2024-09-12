export type Artist = {
    id: string;
    name: string;
};

export type AddArtistMessage = {
    type: "success" | "error";
    message: string;
};