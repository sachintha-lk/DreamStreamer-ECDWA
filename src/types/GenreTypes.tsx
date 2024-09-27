import { Album } from "./AlbumTypes";
export type Genre = {
    id: string;
    name: string;
};

export type AddGenreMessage = {
    type: "success" | "error";
    message: string;
};
export interface GenreDetailed {
    genre_id: number | null;
    genre_name: string | null;
    albums: Album[];
}
