import { AnalyticsData } from '@/types/AnalyticsTypes';
import axios from 'axios';

const API_BASE_URL= "https://q85cqy4ld4.execute-api.us-east-1.amazonaws.com/dev/v1"

export const recordPlayEvent = async (trackId: string): Promise<void> => {
    await axios.post(`${API_BASE_URL}/analytics/playevent`, { trackId });   
};

export const getAnalytics = async (): Promise<AnalyticsData> => {
  const response = await axios.get(`${API_BASE_URL}/analytics`);
  
  return {
    latest_plays: response.data.latest_plays.map((track: any) => ({
      track_name: track.track_name,
      album_name: track.album_name,
      artist_name: track.artist_name,
      last_played: track.last_played,
      album_art_url: track.album_art_url,
      artist_image_url: track.artist_image_url,
    })),
    most_played_tracks: response.data.most_played_tracks.map((track: any) => ({
      track_name: track.track_name,
      total_plays: track.total_plays,
      album_art_url: track.album_art_url,
      artist_image_url: track.artist_image_url,
    })),
    most_played_albums: response.data.most_played_albums.map((album: any) => ({
      album_name: album.album_name,
      total_plays: album.total_plays,
      album_art_url: album.album_art_url,
      artist_image_url: album.artist_image_url,
    })),
    most_played_artists: response.data.most_played_artists.map((artist: any) => ({
      artist_name: artist.artist_name,
      total_plays: artist.total_plays,
      artist_image_url: artist.artist_image_url,
    })),
    most_played_genres: response.data.most_played_genres.map((genre: any) => ({
      genre_name: genre.genre_name,
      total_plays: genre.total_plays,
    })),
    total_play_count: response.data.total_play_count,
    total_genres: response.data.total_genres,
    total_tracks: response.data.total_tracks,
    total_albums: response.data.total_albums,
    total_artists: response.data.total_artists,
  };
};
