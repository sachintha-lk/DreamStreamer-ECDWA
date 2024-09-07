import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"

import Login from "./pages/Login"
import { DarkLightModeToggle } from "./components/dark-light-mode-toggle"
import SignUp from "./pages/SignUp"
import { Toaster } from "@/components/ui/toaster"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated"
import Dashboard from "./pages/Dashboard"
import MainLayout from "./layout/MainLayout"
import {Manage} from "./layout/ManageLayout"
import ManageGenres from "./pages/Manage/ManageGenres/ManageGenres"
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<div>
         
        </div>} />
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
          <Route path="dashboard/manage" element={<ManageGenres/>} />
          
        

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
