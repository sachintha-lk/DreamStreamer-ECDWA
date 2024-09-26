import axios from 'axios';
import { Genre } from '../types/GenreTypes';

const API_BASE_URL= "https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1"

export const fetchGenres = async (): Promise<Genre[]> => {
    const response = await axios.get(`${API_BASE_URL}/genres`);
    return response.data.map((genre: any) => ({
        id: genre.id.toString(),
        name: genre.name,
    }));
};

export const deleteGenre = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/genres/${id}`);
};

export const addGenre = async (genreName: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/genres`, { genre_name: genreName });
};

export const updateGenre = async (id: string, genreName: string): Promise<void> => {
    await axios.put(`${API_BASE_URL}/genres/${id}`, { genre_name: genreName });
};