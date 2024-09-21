export type Track = {
    id: string;
    name: string;
    album_id: string;
    audioFileURL: string;
};

export type AddTrackMessage = {
    type: "success" | "error";
    message: string;
};