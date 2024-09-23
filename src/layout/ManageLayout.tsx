import BottomBar from '@/components/BottomBar';
import Navbar from '@/components/Navbar';
import SidebarPlayerView from '@/components/sidebar/Sidebar';
import React from 'react';

const Manage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="ml-60 p-8">
      <div className="">
        <SidebarPlayerView/>
        <Navbar />
        <div className="mt-4">
            {children}
        </div>
        <BottomBar />
      </div>
    </div>
  );
}

export default Manage;
