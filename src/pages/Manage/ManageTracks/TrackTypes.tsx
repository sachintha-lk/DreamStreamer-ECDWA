export type Track = {
    id: string;
    name: string;
};

export type AddTrackMessage = {
    type: "success" | "error";
    message: string;
};