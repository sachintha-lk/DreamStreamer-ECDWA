import { Button } from "@/components/ui/button"
import { Home, Search, Mic2, DiscAlbum, AudioLines, Music, ChartAreaIcon } from "lucide-react"
// import auth context and check if user is admin
import { useAuth } from '@/context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SidebarPlayerView() {
    // get user from auth context
    const { isAdmin } = useAuth();

    const navigate = useNavigate();

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-card p-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Discover
        </h2>
        <div className="space-y-2">
          <Button variant="secondary" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Mic2 className="mr-2 h-4 w-4" />
             Artists
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <DiscAlbum className="mr-2 h-4 w-4" />
            Albums
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Music className="mr-2 h-4 w-4" />
            Genres
          </Button>
          <Button variant="ghost" className="w-full justify-start">
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
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard/analytics')} >
                <ChartAreaIcon className="mr-2 h-4 w-4"/>
                View Analytics
            </Button>

            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard/genres')}>
              <Music className="mr-2 h-4 w-4" />
              Manage Genres
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard/artists')}>
                <Mic2 className="mr-2 h-4 w-4" />
                Manage Artists
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard/albums')}>
                <DiscAlbum className="mr-2 h-4 w-4" />
                Manage Albums
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard/tracks')}>
                <AudioLines className="mr-2 h-4 w-4" />
                Manage Tracks
            </Button>
           
        </div>

      </div>
      )}

    </aside>
  )
}
