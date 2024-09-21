import Navbar from "@/components/Navbar"
import SidebarPlayerView from "@/components/SidebarPlayerView"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

export default function MainLayoutWithSideBar() {
  return (
    <div className="ml-60 p-8">
        <SidebarPlayerView/>
      {/* Navigation Bar */}
      <Navbar />

      {/* Playlist Grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      
      </div>
    </div>
  )
}

// {[...Array(6)].map((_, i) => (
//   <div key={i} className="relative group rounded-md overflow-hidden">
//     <img
//       src={`/placeholder.svg?height=150&width=150`}
//       alt={`Playlist ${i + 1}`}
//       className="object-cover transition-all hover:scale-105"
//       width={150}
//       height={150}
//     />
//     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
//       <Button
//         size="icon"
//         variant="secondary"
//         className="opacity-0 group-hover:opacity-100"
//       >
//         <Play className="h-6 w-6" />
//       </Button>
//     </div>
//     <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//       <h3 className="font-semibold">Playlist {i + 1}</h3>
//     </div>
//   </div>
// ))}
