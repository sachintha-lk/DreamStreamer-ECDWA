import { createContext, useContext } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';

type State = {
  user: CognitoUser | null;
  signUp: (name: string, password: string, email: string) => Promise<any>;
  signIn: (username: string, password: string) => Promise<any>;
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
