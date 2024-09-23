// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';
// import { useEffect, useState } from 'react';

// const AdminRoute = ({ isAdminRoute }: { isAdminRoute?: boolean }) => {
//   const { user } = useAuth();
//   const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkAdmin = async () => {
//       if (user) {
//         user.getSession(async (err: Error, session: any) => {
//           if (err) {
//             console.error(err);
//             return;
//           }
//           const groups = session.getIdToken().payload['cognito:groups'];
//           if (groups && groups.includes('Admin')) {
//             setIsAdmin(true);
//             console.log('Admin thama yako');
//           } else {
//             setIsAdmin(false);
//             console.log('Admin newei yako');

//           }
//         });
//       } else {
//         setIsAdmin(false);
//         console.log(user);
//         console.log('ko yako user');

//       }
//     };

//     checkAdmin();
//   }, [user]);

//   if (isAdmin === null) {
//     return <div>Loading...</div>;
//   }

//   if (!user || (isAdminRoute && !isAdmin)) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default AdminRoute;


import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/Auth/AuthContext';
import { useEffect, useState } from 'react';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

const AdminRoute = ({ isAdminRoute }: { isAdminRoute?: boolean }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    console.log("admin route: user : ", user);
    if (user === null) {
      return; // Wait until the user state is resolved
    
    }

    const checkAdmin = () => {
      user.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          console.error(err);
          setIsAdmin(false);
          return;
        }
        const groups = session.getIdToken().payload['cognito:groups'];
        setIsAdmin(groups?.includes('Admin') || false);
      });
    };

    checkAdmin();
  }, [user]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (!user || (isAdminRoute && !isAdmin)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;


