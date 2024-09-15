import axios from 'axios';
import { Track } from './TrackTypes';

const API_BASE_URL= "https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1"

export const fetchTracks = async (): Promise<Track[]> => {
    const response = await axios.get(`${API_BASE_URL}/tracks`);
    return response.data.map((track: any) => ({
        id: track.id.toString(),
        name: track.name,
    }));
};

export const deleteTrack = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/tracks/${id}`);
};

export const addTrack = async (trackName: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/tracks`, { name: trackName });
};

export const updateTrack = async (id: string, trackName: string): Promise<void> => {
    await axios.put(`${API_BASE_URL}/tracks/${id}`, { name: trackName });
};