// import { CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';
// import { ReactNode, createContext, useContext, useState, useCallback, useMemo } from 'react';
// import Pool from './userPool';

// type State = {
//   user: CognitoUser | null;
//   signUp: (username: string, password: string, email: string) => Promise<any>;
//   signIn: (username: string, password: string) => Promise<any>;
//   signOut: () => void;
// };

// const AuthContext = createContext<State | undefined>(undefined);

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within a AuthProvider');
//   }
//   return context;
// };

// const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<State['user']>(null);

//   const signUp = useCallback(
//     (username: string, password: string, email: string) => {
//       return new Promise((resolve, reject) => {
//         Pool.signUp(
//           username,
//           password,
//           [new CognitoUserAttribute({ Name: 'email', Value: email })],
//           [],
//           (err, data) => {
//             if (err) {
//               reject(err);
//             } else if (data) {
//               // Successful sign-up, set user state
//               setUser(data.user);
//               resolve(data);
//             }
//           }
//         );
//       });
//     },
//     []
//   );

//   const signIn = useCallback(
//     (username: string, password: string) => {
//       return new Promise((resolve, reject) => {
//         const user = new CognitoUser({ Username: username, Pool });
//         const authDetails = new AuthenticationDetails({ Username: username, Password: password });

//         user.authenticateUser(authDetails, {
//           onSuccess: (result) => {
//             setUser(user); // Set user state upon successful login
//             resolve(result);
//           },
//           onFailure: (err) => {
//             reject(err);
//           },
//         });
//       });
//     },
//     []
//   );

//   const signOut = useCallback(() => {
//     const currentUser = Pool.getCurrentUser();
//     if (currentUser) {
//       currentUser.signOut();
//       setUser(null); // Clear user state on sign-out
//     }
//   }, []);

//   const values = useMemo(() => ({ user, signUp, signIn, signOut }), [user, signUp, signIn, signOut]);

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };

// export { AuthProvider, useAuth };
