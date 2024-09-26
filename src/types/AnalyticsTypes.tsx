export type MostPlayedTrack = {
    track_name: string;
    total_plays: number;
    album_art_url: string;
    artist_image_url: string;
  };
  
  export type MostPlayedAlbum = {
    album_name: string;
    total_plays: number;
    album_art_url: string;
    artist_image_url: string;
  };
  
  export type MostPlayedArtist = {
    artist_name: string;
    total_plays: number;
    artist_image_url: string;
  };
  
  export type MostPlayedGenre = {
    genre_name: string;
    total_plays: number;
  };
  
  export type AnalyticsData = {
    latest_plays: MostPlayedTrack[];
    most_played_tracks: MostPlayedTrack[];
    most_played_albums: MostPlayedAlbum[];
    most_played_artists: MostPlayedArtist[];
    most_played_genres: MostPlayedGenre[];
    total_play_count: number;
    total_genres: number;
    total_tracks: number;
    total_albums: number;
    total_artists: number;
  };