import Navbar from '@/components/Navbar';
import SidebarPlayerView from '@/components/SidebarPlayerView';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="ml-60 p-8">
      <SidebarPlayerView/>
      <Navbar />
      <div className="mt-4">
          {children}
      </div>
    </div>
  );
}

export default MainLayout;
