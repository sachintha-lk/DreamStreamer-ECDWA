import { Button } from "@/components/ui/button"
import { 
  Home, 
  // Search,
  Mic2, 
  DiscAlbum, 
  AudioLines, 
  Music, 
  ChartAreaIcon 
} from "lucide-react"

import { useAuth } from '@/context/Auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SidebarPlayerView() {
    const { isAdmin } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-card p-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Discover
        </h2>
        <div className="space-y-2">
          <Button variant={ 
            location.pathname  === '/dashboard' ? 'secondary' : 'ghost'
            } 
          className="w-full justify-start" onClick={() => navigate('/dashboard')} >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant={ 
            location.pathname.startsWith('/artists') ? 'secondary' : 'ghost'
            } 
            className="w-full justify-start" onClick={() => navigate('/artists')} >
            <Mic2 className="mr-2 h-4 w-4" />
             Artists
          </Button>
          <Button variant={
            location.pathname.startsWith('/albums') ? 'secondary' : 'ghost'
          } className="w-full justify-start" onClick={() => navigate('/albums')} >
            <DiscAlbum className="mr-2 h-4 w-4" />
            Albums
          </Button>
          <Button variant={
            location.pathname.startsWith('/genres') ? 'secondary' : 'ghost'
          } className="w-full justify-start"  onClick={() => navigate('/genres')} >
            <Music className="mr-2 h-4 w-4" />
            Genres
          </Button>
          <Button variant={
            location.pathname.startsWith('/tracks') ? 'secondary' : 'ghost'
          } className="w-full justify-start" onClick={() => navigate('/tracks')} >
            <AudioLines className="mr-2 h-4 w-4" />
            Tracks
          </Button>
        </div>
      </div>

      {isAdmin && (
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Manage
        </h2>
        <div className="space-y-1">
            <Button variant={
              location.pathname.startsWith('/dashboard/analytics') ? 'secondary' : 'ghost'
            } className="w-full justify-start" onClick={() => navigate('/dashboard/analytics')} >
                <ChartAreaIcon className="mr-2 h-4 w-4"/>
                View Analytics
            </Button>

            <Button variant={
              location.pathname.startsWith('/dashboard/genres') ? 'secondary' : 'ghost'
            } className="w-full justify-start" onClick={() => navigate('/dashboard/genres')}>
              <Music className="mr-2 h-4 w-4" />
              Manage Genres
            </Button>
            <Button variant={
              location.pathname.startsWith('/dashboard/artists') ? 'secondary' : 'ghost'
            } className="w-full justify-start" onClick={() => navigate('/dashboard/artists')}>
                <Mic2 className="mr-2 h-4 w-4" />
                Manage Artists
            </Button>
            <Button variant={
              location.pathname.startsWith('/dashboard/albums') ? 'secondary' : 'ghost'
            } className="w-full justify-start" onClick={() => navigate('/dashboard/albums')}>
                <DiscAlbum className="mr-2 h-4 w-4" />
                Manage Albums
            </Button>
            <Button variant={
              location.pathname.startsWith('/dashboard/tracks') ? 'secondary' : 'ghost'
            } className="w-full justify-start" onClick={() => navigate('/dashboard/tracks')}>
                <AudioLines className="mr-2 h-4 w-4" />
                Manage Tracks
            </Button>
           
        </div>

      </div>
      )}

    </aside>
  )
}
