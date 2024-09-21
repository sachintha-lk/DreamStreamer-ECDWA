import { DarkLightModeToggle } from '@/components/dark-light-mode-toggle';
import Navbar from '@/components/Navbar';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-full'>
        <Navbar/>

        <div className='m-2'>
            {children}
        </div>
    </div>
  );
}

export default MainLayout;
