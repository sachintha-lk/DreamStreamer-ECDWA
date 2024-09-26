import { ReactNode, useState, useCallback, useMemo, useEffect } from 'react';
import { CognitoUser, CognitoUserAttribute, AuthenticationDetails, CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import { userPool as Pool } from './userPool';
import AuthContext from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {toast} = useToast();
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [attributes, setAttributes] = useState<CognitoUserAttribute[] | null>(null);


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
          checkIfAdmin(currentUser);
          fetchUserAttributes(currentUser);

          // console.log("session", session);
          // console.log("attr", attributes);
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
              setAttributes(null);
              reject(err);

             
      
            } else if (data) {
              setUser(data.user);
              console.log("sign up success", data);
              setIsAuthenticated(true);
              checkIfAdmin(data.user);
              fetchUserAttributes(data.user);
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
            checkIfAdmin(user);
            fetchUserAttributes(user);
            resolve(result);
          },
          onFailure: (err) => {
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUser(null);
            setAttributes(null);

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
      setIsAdmin(false);
      setUser(null);
      setAttributes(null);
      
    }
  }, []);

  const checkIfAdmin = useCallback((currentUser: CognitoUser) => {
    const currentSession = currentUser.getSignInUserSession();
    const groups = currentSession?.getIdToken().payload['cognito:groups'];

    if (groups) {
      setIsAdmin(groups.includes('admin'));
    }
  }, []);

  const fetchUserAttributes = useCallback((currentUser: CognitoUser) => {
    currentUser.getUserAttributes((err, attributes) => {
      if (err) {
        console.error("Error fetching user attributes: ", err);
      } else {
        console.log("user attributes", attributes);
        if (attributes) {
          setAttributes(attributes);
          console.log("attributes", attributes);
        } else {
          setAttributes(null);
        }
      }
    });
  }, []);


  const values = useMemo(() => ({ user, isAuthenticated, isAdmin, attributes, signUp, signIn, signOut }), [user, isAuthenticated, isAdmin, attributes, signUp, signIn, signOut]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
