import { ReactNode, useState, useCallback, useMemo } from 'react';
import { CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './userPool';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CognitoUser | null>(null);

  const signUp = useCallback(
    (username: string, password: string, email: string) => {
      return new Promise((resolve, reject) => {
        Pool.signUp(
          username,
          password,
          [new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'name', Value: username })],
          [],
          (err, data) => {
            if (err) {
              reject(err);
            } else if (data) {
              setUser(data.user);
              resolve(data);
            }
          }
        );
      });
    },
    []
  );

  const signIn = useCallback(
    (username: string, password: string) => {
      return new Promise((resolve, reject) => {
        const user = new CognitoUser({ Username: username, Pool });
        const authDetails = new AuthenticationDetails({ Username: username, Password: password });

        user.authenticateUser(authDetails, {
          onSuccess: (result) => {
            console.log('Sign in success', result);
            setUser(user);
            resolve(result);
          },
          onFailure: (err) => {
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
      setUser(null);
    }
  }, []);

  const values = useMemo(() => ({ user, signUp, signIn, signOut }), [user, signUp, signIn, signOut]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
