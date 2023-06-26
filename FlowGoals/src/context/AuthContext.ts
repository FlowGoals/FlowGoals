import { createContext } from 'react';
import { User } from '@prisma/client';

interface AuthContextType {
  user?: User;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
