import { createContext, useContext } from 'react';
import { CognitoUser, CognitoUserAttribute, CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';

type State = {
  user: CognitoUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  attributes: CognitoUserAttribute[] | null;
  signUp: (name: string, password: string, email: string) => Promise<Error | ISignUpResult>;
  signIn: (username: string, password: string) => Promise<Error | CognitoUserSession>;
  signOut: () => void;
};


const AuthContext = createContext<State | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export default AuthContext;
