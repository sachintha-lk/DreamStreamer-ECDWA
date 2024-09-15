import axios from 'axios';
import { Album } from './AlbumTypes';

const API_BASE_URL= "https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1"

export const fetchAlbums = async (): Promise<Album[]> => {
    const response = await axios.get(`${API_BASE_URL}/albums`);
    return response.data.map((album: any) => ({
        id: album.id.toString(),
        name: album.name,
    }));
};

export const deleteAlbum = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/albums/${id}`);
};

export const addAlbum = async (albumName: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/albums`, { name: albumName });
};

export const updateAlbum = async (id: string, albumName: string): Promise<void> => {
    await axios.put(`${API_BASE_URL}/albums/${id}`, { name: albumName });
};