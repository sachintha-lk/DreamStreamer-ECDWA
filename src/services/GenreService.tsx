import axios from 'axios';
import { Genre } from '../types/GenreTypes';
import { getAuthHeaders } from '@/context/Auth/userPool';

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;

export const fetchGenres = async (): Promise<Genre[]> => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/genres`, headers);
    return response.data.map((genre: any) => ({
        id: genre.id.toString(),
        name: genre.name,
    }));
};

export const getGenre = async (id: string): Promise<Genre> => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/genres/${id}`, headers);
    const genre = response.data[0];
    return {
        id: genre.id.toString(),
        name: genre.name
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
