import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

/**
 * Custom hook for authentication management
 * Provides user state and authentication methods
 */
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    setIsLoading(false);

    const handleLogout = () => {
      logout();
    };

    EventBus.on("logout", handleLogout);

    return () => {
      EventBus.remove("logout", handleLogout);
    };
  }, []);

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

  return {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
  };
};
