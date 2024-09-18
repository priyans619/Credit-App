import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';

//context state
interface AuthContextType {
  currentUser: User | null;
  logout: () => Promise<void>;
}

// context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Logout function
  const logout = async () => {
    await signOut(auth);
  };

  // context value
  const value = {
    currentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


