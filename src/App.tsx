import { Routes, Route } from "react-router-dom"
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
import { TabsDemo } from "./pages/Manage/Manage"
import MainLayoutWithSideBar from "./layout/MainLayoutWithPlayer"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<MainLayoutWithSideBar/>} />
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
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="dashboard/manage" element={<TabsDemo/>} />
          <Route path="dashboard/genres" element={<ManageGenres/>} />
          <Route path="dashboard/artists" element={<ManageArtists/>} />
          <Route path="dashboard/albums" element={<ManageAlbums/>} />
          <Route path="dashboard/tracks" element={<ManageTracks/>} />


          
        

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
