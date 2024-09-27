import axios from 'axios';
import { Artist, ArtistDetailed } from '../types/ArtistTypes';
// import { Album } from '@/types/AlbumTypes';
import { getAuthHeaders } from '@/context/Auth/userPool';

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;

export const fetchArtists = async (): Promise<Artist[]> => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/artists`, headers);
    return response.data.map((artist: any) => ({
        id: artist.id.toString(),
        name: artist.name,
        artist_image: artist.artist_image_url,
    }));
};

export const getArtist = async (id: string): Promise<ArtistDetailed> => {
    const headers = await getAuthHeaders();
    const response = await axios.get(`${API_BASE_URL}/artists/${id}`, headers);
    const artist = response.data;
    

    console.log("at service", artist);
    return {
        artist_id: artist[0].artist_id.toString(),
        artist_name: artist[0].artist_name,
        artist_image_url: artist[0].artist_image_url,
        albums: artist[0].albums.map((album: any) => ({
            album_id: album.album_id.toString(),
            album_name: album.album_name,
            year: album.album_year,
            genre_name: album.genre_name,
            album_art_url: album.album_art_url,
        })),
    };
}

export const deleteArtist = async (id: string): Promise<void> => {
    const headers = await getAuthHeaders();
    await axios.delete(`${API_BASE_URL}/artists/${id}`, headers);
};

export const addArtist = async (artistName: string, artist_image_filename: string ): Promise<void> => {
    const headers = await getAuthHeaders();
    await axios.post(`${API_BASE_URL}/artists`, { name: artistName, artistImgURL: artist_image_filename }, headers);
};

export const updateArtist = async (id: string, artistName: string, artistImageURL: string): Promise<void> => {
    const headers = await getAuthHeaders();
    await axios.put(`${API_BASE_URL}/artists/${id}`, { name: artistName , artistImgURL: artistImageURL }, headers);
};