import MainLayout from '@/layout/MainLayout';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumDetailed } from '../../types/AlbumTypes';
import { getAlbum } from '@/services/AlbumService';
import { Input } from '@/components/ui/input';
import { PlayIcon } from 'lucide-react';
import { MusicPlayerContext } from '@/context/MusicPlayer/MusicPlayerContext';
import { Track } from '@/types/TrackTypes';
import { Button } from '@/components/ui/button';
// import { fetchTracks } from '@/services/TrackService';


const S3_BUCKET_URL = import.meta.env.VITE_S3_BUCKET_URL;

const AlbumViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumDetailed | null>(null);
  const [filterTrack, setFilterTrack] = useState('');

  const { playTrack } = useContext(MusicPlayerContext);


  useEffect(() => {
    if (!id) return;

    getAlbum(id)
      .then((data) => {
        setAlbum(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!album) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  // Filter tracks based on search input
  const filteredTracks = album.tracks.filter((track: any) => // todo: fix any
    track.track_name.toLowerCase().includes(filterTrack.toLowerCase())
  );

  const handlePlayClick = (track: any) => {

    /* 
    id: string;
    name: string;
    album_id: string;
    album_name: string;
    album_art_url: string;
    artist_id: string;
    artist_name: string;
    artist_image_url: string;
    genre_id: string;
    genre_name: string;
    audioFileURL: string; */

    const trackToPlay : Track = {
        id: track.track_id,
        name: track.track_name,
        album_id: album.album_id,
        album_name: album.album_name,
        album_art_url: album.album_art_url || '',
        artist_id: album.artist_id,
        artist_name: album.artist_name,
        artist_image_url: album.artist_image_url || '',
        genre_id: album.genre_id,
        genre_name: album.genre_name,
        audioFileURL: track.mp3_url

     };

     playTrack(trackToPlay);

    console.log("Playing track: ", trackToPlay);
    console.log("Playing 234234track: ", trackToPlay);

    }

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center text-center">
          <img
            src={`${S3_BUCKET_URL}${album.album_art_url}`}
            alt={album.album_name}
            className="w-32 h-32 rounded-lg object-cover shadow-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{album.album_name}</h1>
          <p className="text-gray-600">
            {album.artist_name} • {album.genre_name} • {album.year}
          </p>
          <div className="mt-4">
            <Button variant={"default"} className='font-semibold'>Purchase Album</Button>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Tracks</h2>
            <div className="flex items-center space-x-2 w-64"> 
              <Input
                type="text"
                placeholder="Filter tracks"
                value={filterTrack}
                onChange={(e) => setFilterTrack(e.target.value)}
                className="p-2 rounded border w-full" 
              />
            </div>
          </div>

          <div className="grid gap-2">
            {filteredTracks.map((track: any, index: number) => ( // todo: fix any
              <div
                key={track.track_id}
                className="flex justify-between items-center p-4 rounded-lg shadow-sm dark:hover:bg-stone-950 transition duration-300"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 text-sm">{index + 1}</span>
                  <div className="flex flex-col">
                    <h3 className="font-semibold">{track.track_name}</h3>
                    <p className="text-xs text-gray-600">{album.artist_name}</p>
                  </div>
                </div>
                <button className="">
                  <PlayIcon className="w-6 h-6" onClick={() => handlePlayClick(track)} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AlbumViewPage;
