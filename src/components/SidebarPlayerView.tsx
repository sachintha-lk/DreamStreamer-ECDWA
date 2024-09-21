import { Button } from "@/components/ui/button"
import { Home, Search, Library, Plus, Heart, Mic2, DiscAlbum, AudioLines, Music } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SidebarPlayerView() {
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

      {/* <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Library
        </h2>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Create Playlist
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Heart className="mr-2 h-4 w-4" />
            Liked Songs
          </Button>
        </div>
      </div>

      <div className="py-2">
        <h2 className="relative px-7 text-lg font-semibold tracking-tight">
          Playlists
        </h2>
        <ScrollArea className="h-[300px] px-1">
          <div className="space-y-1 p-2">
            {playlists?.map((playlist, i) => (
              <Button
                key={`${playlist}-${i}`}
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                <LayoutList className="mr-2 h-4 w-4" />
                {playlist}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div> */}
    </aside>
  )
}
