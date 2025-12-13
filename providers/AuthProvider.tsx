import { registerLogoutListener } from "@/services/auth/authEvents";
import { clearTokens, getAccessToken } from "@/services/auth/saveTokens";
import { useRouter } from "expo-router";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshAuthState: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadAuthState = async () => {
    try {
      const token = await getAccessToken();
      setIsAuthenticated(!!token);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthState();
  }, []);

  useEffect(() => {
    registerLogoutListener(signOut);
  }, []);

  const signOut = async () => {
    await clearTokens();
    setIsAuthenticated(false);
    router.replace("/(auth)/login-screen");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        signOut,
        refreshAuthState: loadAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
