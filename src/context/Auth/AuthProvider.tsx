import { ReactNode, useState, useCallback, useMemo, useEffect } from 'react';
import { CognitoUser, CognitoUserAttribute, AuthenticationDetails, CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import Pool from './userPool';
import AuthContext from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {toast} = useToast();
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    const currentUser = Pool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          console.error("Session retrieval error:", err);
        } else {
          console.log("Restoring session:", session);
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      });
    } else {
      console.log("No current user found");
      setUser(null);
    }
  }, []);

  const signUp = useCallback(
    (name: string, password: string, email: string) : Promise<Error | ISignUpResult> => { 
      return new Promise((resolve, reject) => {
        Pool.signUp(
          email,
          password,
          [new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'name', Value: name })],
          [],
          (err, data) => {
            if (err) {
              console.log("sign up error", err);
              
              toast({
                  title: err.name,
                  description: err.message,
                  variant: "destructive",
              })
              setIsAuthenticated(false);
              reject(err);

             
      
            } else if (data) {
              setUser(data.user);
              console.log("sign up success", data);
              setIsAuthenticated(true);
              resolve(data);
            }
          }
        );
      });
    },
    []
  );

  const signIn = useCallback(
    (username: string, password: string) : Promise<CognitoUserSession> => {
          return new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username: username, Pool });
        const authDetails = new AuthenticationDetails({ Username: username, Password: password });

        user.authenticateUser(authDetails, {
          onSuccess: (result) => {
            console.log('Sign in success', result);
            setUser(user);
            setIsAuthenticated(true);

            resolve(result);
          },
          onFailure: (err) => {
            setIsAuthenticated(false);

            toast({
              title: err.name,
              description: err.message,
              variant: "destructive",
            });
         
            reject(err);
          },
        });
      });
    },
    []
  );

  const signOut = useCallback(() => {
    const currentUser = Pool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const values = useMemo(() => ({ user, isAuthenticated, signUp, signIn, signOut }), [user, isAuthenticated, signUp, signIn, signOut]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
