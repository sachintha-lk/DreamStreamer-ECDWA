import { useAuth } from '@/context/Auth/AuthContext'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DarkLightModeToggle } from './dark-light-mode-toggle';

function Navbar() {

  const { user, isAdmin, attributes } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(
  );
  
  useEffect(() => {
    // console.log("attributes: ", attributes);
    if (attributes) {
      
      console.log("ar: ", attributes);

      const name = attributes.find((attr) => attr.getName() === 'name');
      if (name) {
        setName(name.getValue());
        console.log("name: ", name);
      }
    }
  }, [attributes]);
 
  return (
    <div>
        <div className="flex items-center justify-between mb-4">
        <div className="space-x-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            DreamStreamer
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          {}

          {user ? (
            <>
              <div className="px-4 py-2 text-sm">Welcome {name}!</div>
              <DarkLightModeToggle />

              <Button variant="outline" onClick={() => { user.signOut(); window.location.reload(); }}>
                Logout
              </Button>
            </>
          ) : (
            <>
                <DarkLightModeToggle />
                <Button variant="secondary" onClick={() => navigate('/login')}>Login</Button>
            </> 
          )}
          
          </div>
          
        </div>
      </div>
    
  )
}

export default Navbar
