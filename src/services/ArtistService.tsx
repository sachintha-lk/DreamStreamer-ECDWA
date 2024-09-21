import axios from 'axios';
import { Artist } from '../pages/Manage/ManageArtists/ArtistTypes';

const API_BASE_URL= "https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1"

export const fetchArtists = async (): Promise<Artist[]> => {
    const response = await axios.get(`${API_BASE_URL}/artists`);
    return response.data.map((artist: any) => ({
        id: artist.id.toString(),
        name: artist.name,
        artist_image: artist.artist_image_url,
    }));
};

export const deleteArtist = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/artists/${id}`);
};

export const addArtist = async (artistName: string, artist_image_filename: string ): Promise<void> => {
    await axios.post(`${API_BASE_URL}/artists`, { name: artistName, artistImgURL: artist_image_filename });
};

export const updateArtist = async (id: string, artistName: string, artistImageURL: string): Promise<void> => {
    await axios.put(`${API_BASE_URL}/artists/${id}`, { name: artistName , artistImgURL: artistImageURL });
};