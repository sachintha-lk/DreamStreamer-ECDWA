export type Genre = {
    id: string;
    name: string;
};

export type AddGenreMessage = {
    type: "success" | "error";
    message: string;
};