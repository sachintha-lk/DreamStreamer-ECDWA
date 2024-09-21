import axios from 'axios';
import { Track } from '../pages/Manage/ManageTracks/TrackTypes';

const API_BASE_URL= "https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1"

export const fetchTracks = async (): Promise<Track[]> => {
    const response = await axios.get(`${API_BASE_URL}/tracks`);
    return response.data.map((track: any) => ({
        id: track.track_id.toString(),
        name: track.track_name,
        album_id: track.album_id,
        album_name: track.album_name,
        album_art_url: track.album_art_url,
        artist_id: track.artist_id,
        artist_name: track.artist_name,
        artist_image_url: track.artist_image_url,
        audioFileURL: track.mp3_url,
        genre_id: track.genre_id,
        genre_name: track.genre_name
    }));
};

export const deleteTrack = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tracks/${id}`);
};
export const addTrack = async (trackName: string, album_id: string, audioFileURL: string): Promise<void> => {
    try {
        console.log("Adding track:", trackName, album_id, audioFileURL);
        await axios.post(`${API_BASE_URL}/tracks`, { name: trackName, album_id: album_id, mp3_url: audioFileURL });
    } catch (e : any) {
        throw new Error(`Failed to add track: ${e.response?.data?.message || e.message}`);
    }
};

export const updateTrack = async (id: string, trackName: string, album_id: string, audioFileURL: string): Promise<void> => {
    // try {
        await axios.put(`${API_BASE_URL}/tracks/${id}`, {
            name: trackName,
            album_id: album_id,
            mp3_url: audioFileURL
        });

        // if (response.status !== 200) {
        //     throw new Error(`Failed to update track: ${response.statusText}`);
        // }
    // } catch (e: any) {
    //     throw e;
    // }
};