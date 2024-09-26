import AlbumCarousel from "@/components/AlbumCarousel"
import ArtistCarousel from "@/components/ArtistCarousel"
import TrackCarousel from "@/components/TrackCarousel"
import MainLayout from "@/layout/MainLayout"
import { useEffect, useState } from "react"
import { Artist } from "../types/ArtistTypes"
import { Album } from "../types/AlbumTypes"
import { Track } from "../types/TrackTypes"
import { fetchArtists } from "@/services/ArtistService"
import { toast } from "@/components/ui/use-toast"
import { fetchAlbums } from "@/services/AlbumService"
import { fetchTracks } from "@/services/TrackService"

function Dashboard() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  const fetchData = async () => {
    try {
      fetchArtists().then((data) => {
        // console.log(data);
        setArtists(data);
      }).catch((error) => {
        console.log(error);
        toast({
            title: "Error",
            description: `An error occurred while fetching artists: ${error.response?.data?.message} `,
            variant: "destructive"
          });
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: `An error occurred while fetching artists: ${error.message}`,
        variant: "destructive"
      });
    }

    fetchAlbums().then((data) => {
      // console.log(data);
      setAlbums(data);
    }
    ).catch((error) => {
      console.log(error);
      toast({
          title: "Error",
          description: `An error occurred while fetching albums: ${error.response?.data?.message} `,
          variant: "destructive"
        });
    });

    fetchTracks().then((data) => {
      // console.log(data);
      setTracks(data);
    }
    ).catch((error : any) => {
      console.log(error);
      toast({
          title: "Error",
          description: `An error occurred while fetching tracks: ${error.response?.data?.message} `,
          variant: "destructive"
        });
    });
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <MainLayout>
        <div className="mx-4">
            <h1 className="text-2xl font-semibold mt-3 mx-4">Artists</h1>
            <ArtistCarousel artists={artists} />

            <h1 className="text-2xl font-semibold mt-3 mx-4">Albums</h1>
            <AlbumCarousel albums={albums}/>
            
            <h1 className="text-2xl font-semibold mt-3 mx-4">Tracks</h1>
            <TrackCarousel tracks={tracks} />
        </div>

    </MainLayout>  
  )
}

export default Dashboard
