import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [user, setUser] = useState({
    userId: localStorage.getItem('userId') || null,
    username: localStorage.getItem('username') || '',
  });

  const login = (userId, username) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    setIsLoggedIn(true);
    setUser({ userId, username });
  };

  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUser({ userId: null, username: '' });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
