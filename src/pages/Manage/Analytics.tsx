import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layout/MainLayout';
import { Music, Album, AudioLines, Mic2 } from 'lucide-react';
import { emailReport, getAnalytics } from '@/services/AnalyticsService';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AnalyticsData } from '@/types/AnalyticsTypes';
import { Button } from '@/components/ui/button';

const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

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

  const emailReportHandler = async () => { 
    emailReport().then((data) => { // data is the respose.data which has data msg and status
      toast({
        title: 'Email Report Sent',
        description: data.message,
        variant: 'default',
      });
    }).catch((error) => {
      toast({
        title: 'Error',
        description: error.response.data.message,
        variant: 'destructive',
      });
    });
  };
      
  return (
    <MainLayout>  
      <h1 className='text-3xl font-bold'>Analytics</h1>
      <p className='text-muted-foreground'>
        Analytics about music in DreamStreamer
      </p>
      <Button variant='default' className='my-4' onClick={
        () => emailReportHandler()
      }>
        Email Report
      </Button>
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
      <div>
        <h1 className='text-2xl font-semibold mt-8'>Music Play Statistics</h1>
        <p className='text-muted-foreground'>
          Statistics about music play in DreamStreamer
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-2">

        <Card className=" shadow-sm">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold mb-3">Most Played Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analytics.most_played_genres.map((genre) => (
                <li key={genre.genre_name} className="flex justify-between text-sm border-b pb-2">
                  <span>{genre.genre_name}</span>
                  <span className="font-medium text-xl">{genre.total_plays}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

      

        <Card className=" shadow-sm">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold mb-3">Most Played Artists</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analytics.most_played_artists.map((artist) => (
                <li key={artist.artist_name} className="flex justify-between items-center text-sm border-b pb-2">
                  <div className="flex items-center space-x-2">
                    <img src={`${S3_BUCKET_URL}${artist.artist_image_url}`} alt={artist.artist_name} className="w-8 h-8 rounded-full" />
                    <span>{artist.artist_name}</span>
                  </div>
                  <span className="font-medium text-xl">{artist.total_plays}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold mb-3">Most Played Albums</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analytics.most_played_albums.map((album) => (
                <li key={album.album_name} className="flex justify-between text-sm border-b pb-2">
                  <img src={`${S3_BUCKET_URL}${album.album_art_url}`} className="w-8 h-8" />
                  <span>{album.album_name}</span>
                  <img src={`${S3_BUCKET_URL}${album.artist_image_url}`} className="w-8 h-8 rounded-full" />
                  
                  <span className="font-medium text-xl">{album.total_plays}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className=" shadow-sm">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold mb-3">Most Played Tracks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analytics.most_played_tracks.map((track) => (
                <li key={track.track_name} className="flex justify-between text-sm border-b pb-2">
                  <span>
                  <img src={`${S3_BUCKET_URL}${track.album_art_url}`} className="w-8 h-8" />
                  </span>
                
                  <span className='overflow-ellipsis'>{track.track_name}</span>
                  <span>
                    <span>{}</span>
                    <img src={`${S3_BUCKET_URL}${track.artist_image_url}`} className="w-8 h-8 rounded-full" />
                  </span>
                  <span className="font-medium text-xl">{track.total_plays}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        </div>

      </div>
   
    </MainLayout>
    
  );
}

export default Analytics;
