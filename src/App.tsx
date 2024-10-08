import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"

import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Toaster } from "@/components/ui/toaster"
import AdminRoute from "./components/AdminRoute"
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated"
import Dashboard from "./pages/Dashboard"
import ManageGenres from "./pages/Manage/ManageGenres/ManageGenres"
import ManageArtists from "./pages/Manage/ManageArtists/ManageArtists"
import ManageAlbums from "./pages/Manage/ManageAlbums/ManageAlbums"
import ManageTracks from "./pages/Manage/ManageTracks/ManageTracks"
import ArtistViewPage from "./pages/display/ArtistViewPage"
import Analytics from "./pages/Manage/Analytics"
import ProtectedRoute from "./components/ProtectedRoute"
import AlbumViewPage from "./pages/display/AlbumViewPage"
import DisplayAllArtists from "./pages/display/DisplayAllArtists"
import DisplayAllAlbums from "./pages/display/DisplayAllAlbums"
import DisplayAllGenres from "./pages/display/DisplayAllGenres"
import DisplayAllTracks from "./pages/display/DisplayAllTracks"
import GenreViewPage from "./pages/display/GenreViewPage"
// import AdminProtectedRoute from "./components/AdminProtectedRoute"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        {/* / redirects to /dashbaord */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route 
          path="login" 
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          } 
        />
        <Route 
          path="signup" 
          element={
            <RedirectIfAuthenticated>
              <SignUp />
            </RedirectIfAuthenticated>
          } 
        />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="artists/" element={<DisplayAllArtists/>}/>
          <Route path="artists/:id" element={<ArtistViewPage/>}/>
          
          <Route path="albums/" element={<DisplayAllAlbums/>}/>
          <Route path="albums/:id" element={<AlbumViewPage/>}/>

          <Route path="genres/" element={<DisplayAllGenres/>}/>
          <Route path="genres/:id" element={<GenreViewPage/>}/>

          <Route path="tracks/" element={<DisplayAllTracks/>}/>

        </Route>

          <Route element={<AdminRoute />}>
            <Route path="dashboard/analytics" element={<Analytics/>} />
            <Route path="dashboard/genres" element={<ManageGenres/>} />
            <Route path="dashboard/artists" element={<ManageArtists/>} />
            <Route path="dashboard/albums" element={<ManageAlbums/>} />
            <Route path="dashboard/tracks" element={<ManageTracks/>} />
          </Route>

        {/* </Route> */}

        {/* Protected routes for admin users */}
        <Route element={<AdminRoute />}>
          <Route path="admin" element={<div>Admin Panel</div>} />
          <Route path="admin/users" element={<div>Admin Users</div>} />
          {/* Other admin routes */}
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Toaster/>
    </ThemeProvider>
  )
}

export default App
