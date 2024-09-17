import axios from 'axios';
import { Album } from '../pages/Manage/ManageAlbums/AlbumTypes';

const API_BASE_URL= "https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1"

export const fetchAlbums = async (): Promise<Album[]> => {
    const response = await axios.get(`${API_BASE_URL}/albums`);
    return response.data.map((album: any) => ({
        id: album.id.toString(),
        album_name: album.album_name,
        artist_name: album.artist_name,
        genre_name: album.genre_name,
        year: album.year,
        album_art_url: album.album_art_url,
        artist_image_url: album.artist_image_url
        
    }));
};

export const deleteAlbum = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/albums/${id}`);
};

export const addAlbum = async (albumName: string, year: number, artist_id: string, genre_id: string, album_art: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/albums`, {
        name: albumName ,
        year: year,
        artist_id: artist_id,
        genre_id: genre_id,
        album_art_url: album_art
    });
};

export const updateAlbum = async (id: string, albumName: string): Promise<void> => {
    await axios.put(`${API_BASE_URL}/albums/${id}`, { name: albumName });
};