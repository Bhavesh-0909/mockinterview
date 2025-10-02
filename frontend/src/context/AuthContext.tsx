import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  fullname: string;
  contact?: string;
  resumelink?: string;
  college: string;
  credits: number;
  avatarlink: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;secure;samesite=strict`;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if auth cookie exists
        const authToken = getCookie('token');
        
        if (authToken) {
          // Validate token with your backend
          const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/validate-token`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
          });
          
          if (response.ok) {
            const userData = await response.json();
            console.log('User data from token validation:', userData);
            setUser(userData.user);
          } else {
            deleteCookie('token');
            if (response.status === 401) {
              console.log('Token expired or invalid');
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Remove potentially corrupted token
        deleteCookie('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Direct login with user data and token (for OTP flow)
  const login = async (userData: User): Promise<boolean> => {
    try {
      // Validate the provided data
      if (!userData) {
        setError('Invalid user data');
        return false;
      }
      setUser(userData);
      setError(null);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setError('Failed to login user');
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      const authToken = getCookie('token');
      
      if (authToken) {
        try {
          await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/auth/logout`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include',
          });
        } catch (error) {
          console.warn('Server logout failed:', error);
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear cookie and user state
      deleteCookie('token');
      setUser(null);
      setError(null);
      setIsLoading(false);
    }
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Provide user helper methods
  const value = {
    user,
    login,
    logout,
    isLoading,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper function to get user display name
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return '';
  return user.fullname || user.email.split('@')[0] || 'User';
};

// Helper function to get user initials
export const getUserInitials = (user: User | null): string => {
  if (!user) return '';
  
  if (user.fullname) {
    return user.fullname
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  
  return user.email.charAt(0).toUpperCase();
};