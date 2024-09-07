import { DarkLightModeToggle } from '@/components/dark-light-mode-toggle';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <div className="absolute top-3 right-3 z-10">
          <DarkLightModeToggle/>
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}

export default AuthLayout;
