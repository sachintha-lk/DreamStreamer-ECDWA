import axios from 'axios';
import { Genre, GenreDetailed } from '@/types/GenreTypes';
import { getAuthHeaders } from '@/context/Auth/userPool';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchGenres = async (): Promise<Genre[]> => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/genres`, headers);

    return response.data.map((genre: any) => ({
        id: genre.id.toString(),
        name: genre.name,
    }));
};

export const getGenre = async (id: string): Promise<GenreDetailed> => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/genres?id=${id}`,headers);

    const genreData = response.data;

    return {
        genre_id: genreData.genre_id,
        genre_name: genreData.genre_name,
        albums: genreData.albums.map((album: any) => (
            console.log("album in genre", album),
            
            {
            album_id: album.album_id.toString(),
            album_name: album.album_name,
            artist_id: album.artist_id.toString(),
            artist_name: album.artist_name,
            genre_id: genreData.genre_id,
            genre_name: genreData.genre_name,
            year: album.year,
            album_art_url: album.album_art_url,
            artist_image_url: album.artist_image_url,
        })),
    };
};


export const addGenre = async (genreName: string): Promise<void> => {
    const headers = await getAuthHeaders();
    await axios.post(`${API_BASE_URL}/genres`, { genre_name: genreName }, headers);
};

export const updateGenre = async (id: string, genreName: string): Promise<void> => {
    const headers = await getAuthHeaders();
    await axios.put(`${API_BASE_URL}/genres/${id}`, { genre_name: genreName }, headers);
};

export const deleteGenre = async (id: string): Promise<void> => {
    const headers = await getAuthHeaders();
    await axios.delete(`${API_BASE_URL}/genres/${id}`, headers);
};
