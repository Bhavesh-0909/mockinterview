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
  login: (userData: User, token: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

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
        const token = localStorage.getItem('authToken');
        if (token) {
          // Validate token with your backend
          const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/validate-token`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            method: 'POST',
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData.user);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('authToken');
            if (response.status === 401) {
              console.log('Token expired or invalid');
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Remove potentially corrupted token
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);


  // Direct login with user data and token (for OTP flow)
  const login = async (userData: User, token: string): Promise<boolean> => {
    try {
      // Validate the provided data
      if (!userData || !token) {
        setError('Invalid user data or token');
        return false;
      }

      localStorage.setItem('authToken', token);
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
      const token = localStorage.getItem('authToken');
      
      // Optional: Call logout endpoint to invalidate token on server
      if (token) {
        try {
          await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/logout`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          // Non-critical error - continue with local logout
          console.warn('Server logout failed:', error);
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage and user state
      localStorage.removeItem('authToken');
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