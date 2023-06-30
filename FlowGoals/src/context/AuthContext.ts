import { createContext } from 'react';
import { Prisma, User } from '@prisma/client';

interface AuthContextType {
  user?: User;
  login: (userData: Prisma.UserCreateInput) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
