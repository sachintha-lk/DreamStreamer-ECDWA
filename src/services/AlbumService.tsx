import axios from 'axios';
import { Album } from '../types/AlbumTypes';
import { getAuthHeaders} from '../context/Auth/userPool';

const API_BASE_URL= "https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1";

export const fetchAlbums = async (): Promise<Album[]> => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/albums`, headers);    
    return response.data.map((album: any) => ({
        album_id: album.id.toString(),
        album_name: album.album_name,
        artist_id: album.artist_id,
        artist_name: album.artist_name,
        genre_id: album.genre_id,
        genre_name: album.genre_name,
        year: album.year,
        album_art_url: album.album_art_url,
        artist_image_url: album.artist_image_url,
        track_count: album.track_count
    }));
};

export const getAlbum = async (id: string): Promise<any> => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/albums/${id}`,  headers );
    
    const album = response.data;
    console.log("album eka me", album);
    return {
        album_id: album.id.toString(),
        album_name: album.album_name,
        artist_id: album.artist_id,
        artist_name: album.artist_name,
        genre_id: album.genre_id,
        genre_name: album.genre_name,
        year: album.year,
        album_art_url: album.album_art_url,
        artist_image_url: album.artist_image_url,
        tracks: album.tracks.map((track: any) => ({
            track_id: track.track_id,
            track_name: track.track_name,
            mp3_url: track.mp3_url
        }))
    };
};

export const deleteAlbum = async (id: string): Promise<void> => {
    const headers = await getAuthHeaders();
    await axios.delete(`${API_BASE_URL}/albums/${id}`,  headers );
};

export const addAlbum = async (albumName: string, year: number, artist_id: string, genre_id: string, album_art_url: string): Promise<void> => {
    const headers = await getAuthHeaders();
    await axios.post(`${API_BASE_URL}/albums`, {
        name: albumName,
        year: year,
        artist_id: artist_id,
        genre_id: genre_id,
        album_art_url: album_art_url
    },  headers );
};

export const updateAlbum = async (id: string, albumName: string, artist_id: string, genre_id: string, album_art_url: string, year: number): Promise<void> => {
    const headers = await getAuthHeaders();
    await axios.put(`${API_BASE_URL}/albums/${id}`, {
        name: albumName,
        year: year,
        artist_id: artist_id,
        genre_id: genre_id,
        album_art_url: album_art_url
    },headers);

    // console.log(`AlbumService: Updated album ${id} - name: ${albumName}, artist: ${artist_id}, genre: ${genre_id}, year: ${year}, album_art_url: ${album_art_url}`);
};