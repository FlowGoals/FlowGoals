import React, { useMemo, useState } from 'react';
import { Prisma, User } from '@prisma/client';
import AuthContext from './AuthContext';
import { loginUser } from '../services/axiosService';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = async (userData: Prisma.UserCreateInput) => {
    const { username, password } = userData;
    try {
      const currentUser = await loginUser({ username, password });
      setUser(currentUser);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logout = () => {
    setUser(undefined);
  };

  const authContextValue = useMemo(() => ({
    user,
    login,
    logout,
  }), [user, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
