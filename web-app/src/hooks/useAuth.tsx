import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

interface AuthContextType {
  currentUser: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  logout: () => void;
  updateUser: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component - wraps the app to provide authentication state
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize user from localStorage only once on mount
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);
  }, []);

  // Set up EventBus logout listener
  useEffect(() => {
    const handleLogout = () => {
      AuthService.logout();
      setCurrentUser(undefined);
      navigate("/auth/login");
    };

    EventBus.on("logout", handleLogout);

    return () => {
      EventBus.remove("logout", handleLogout);
    };
  }, [navigate]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      if (response.status) {
        setCurrentUser(response.result);
        return { success: true, data: response };
      }
      return { success: false, error: response.message };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate("/auth/login");
  }, [navigate]);

  const updateUser = useCallback((userData: any) => {
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const isAuthenticated = !!currentUser;

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook for authentication management
 * Provides user state and authentication methods
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
