import BottomBar from '@/components/BottomBar';
import Navbar from '@/components/Navbar';
import SidebarPlayerView from '@/components/sidebar/Sidebar';
import { MusicPlayerProvider } from '@/context/MusicPlayer/MusicPlayerContext';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="ml-60 p-8">
      <MusicPlayerProvider>
      <div className="">
        <SidebarPlayerView/>
        <Navbar />
        <div className="mt-4 mb-12">
            {children}
        </div>
        <BottomBar />
      </div>
    </MusicPlayerProvider>
    </div>
  );
}

export default MainLayout;
