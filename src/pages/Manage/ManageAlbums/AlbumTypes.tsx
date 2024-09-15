export type Album = {
    id: string;
    name: string;
};

export type AddAlbumMessage = {
    type: "success" | "error";
    message: string;
};