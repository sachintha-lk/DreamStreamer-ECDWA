import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layout/MainLayout';
import { Music, Album, AudioLines, Mic2 } from 'lucide-react';
import { getAnalytics } from '@/services/AnalyticsService';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AnalyticsData } from '@/types/AnalyticsTypes';

function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    latest_plays: [],
    most_played_tracks: [],
    most_played_albums: [],
    most_played_artists: [],
    most_played_genres: [],
    total_play_count: 0,
    total_genres: 0,
    total_tracks: 0,
    total_albums: 0,
    total_artists: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsData = await getAnalytics();
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        toast({
          title: 'Error',
          description: 'Error retrieving analytics',
          variant: 'destructive',
        });
      }
    };

    fetchAnalytics();
  }, []);


  return (
    <MainLayout>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Genres</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total_genres}</div>
            <p className="text-xs text-muted-foreground">Total genres</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artists</CardTitle>
            <Mic2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total_artists}</div>
            <p className="text-xs text-muted-foreground">Total artists</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Albums</CardTitle>
            <Album className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total_albums}</div>
            <p className="text-xs text-muted-foreground">Total albums</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracks</CardTitle>
            <AudioLines className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total_tracks}</div>
            <p className="text-xs text-muted-foreground">Total tracks</p>
          </CardContent>
        </Card>
        {/* Total Play Count */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Play Count</CardTitle>
          </CardHeader>
          <CardContent>
        <div className="text-2xl font-bold">{analytics.total_play_count}</div>
        <p className="text-xs text-muted-foreground">Total plays across all tracks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2 mt-8">


        {/* Most Played Genres */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Most Played Genres</CardTitle>
          </CardHeader>
          <CardContent>
        <ul className="mt-2">
          {analytics.most_played_genres.map((genre) => (
            <li key={genre.genre_name} className="flex justify-between">
          <span>{genre.genre_name}</span>
          <span>{genre.total_plays}</span>
            </li>
          ))}
        </ul>
          </CardContent>
        </Card>

        {/* Most Played Tracks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Most Played Tracks</CardTitle>
          </CardHeader>
          <CardContent>
        <ul className="mt-2">
          {analytics.most_played_tracks.map((track) => (
            <li key={track.track_name} className="flex justify-between">
          <span>{track.track_name}</span>
          <span>{track.total_plays}</span>
            </li>
          ))}
        </ul>
          </CardContent>
        </Card>

        {/* Most Played Artists */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Most Played Artists</CardTitle>
          </CardHeader>
          <CardContent>
        <ul className="mt-2">
          {analytics.most_played_artists.map((artist) => (
            <li key={artist.artist_name} className="flex justify-between">
          <span>{artist.artist_name}</span>
          <span>{artist.total_plays}</span>
            </li>
          ))}
        </ul>
          </CardContent>
        </Card>

        {/* Most Played Albums */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Most Played Albums</CardTitle>
          </CardHeader>
          <CardContent>
        <ul className="mt-2">
          {analytics.most_played_albums.map((album) => (
            <li key={album.album_name} className="flex justify-between">
          <span>{album.album_name}</span>
          <span>{album.total_plays}</span>
            </li>
          ))}
        </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
    
  );
}

export default Analytics;
