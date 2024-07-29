import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"

import Login from "./pages/Login"
import { DarkLightModeToggle } from "./components/dark-light-mode-toggle"
 

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute top-3 right-3 z-10">
          <DarkLightModeToggle/>
      </div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="login" element={<Login />} />
        
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </ThemeProvider>
  )
}

export default App
