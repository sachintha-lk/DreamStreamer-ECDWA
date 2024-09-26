import { Album } from "./AlbumTypes";

export type Artist = {
    id: string;
    name: string;
    artist_image: string;
};


//     // Structure the data for a single artist
// const response = rows.reduce((acc, row) => {
//     // Check if the artist is already in the accumulator
//     let artist = acc.find(a => a.artist_id === row.artist_id);
//     if (!artist) {
//         artist = {
//             artist_id: row.artist_id,
//             artist_name: row.artist_name,
//             artist_image_url: row.artist_image_url,
//             albums: []
//         };
//         acc.push(artist);
//     }

//     // Check if the album already exists for this artist
//     if (row.album_id) {
//         const album = {
//             album_id: row.album_id,
//             album_name: row.album_name,
//             album_year: row.album_year,
//             genre_name: row.genre_name,
//             album_art_url: row.album_art_url
//         };
//         artist.albums.push(album);
//     }
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