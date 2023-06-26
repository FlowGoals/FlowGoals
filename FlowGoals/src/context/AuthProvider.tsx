import React, { useMemo, useState } from 'react';
import { User } from '@prisma/client';
import AuthContext from './AuthContext';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (userData: User) => {
    setUser(userData);
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
