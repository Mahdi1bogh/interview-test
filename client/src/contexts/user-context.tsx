"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
    setUser(null);
    setIsLoading(false);
    router.push("/login");
  }, [router]);

  const fetchUser = useCallback(
    async (token: string) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching user:", error);
        await logout();
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [logout]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`,
          { email, password }
        );
        const { accessToken } = response.data;
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
        }

        const userData = await fetchUser(accessToken);
        if (userData) {
          console.log("userData", userData);
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(userData));
          }
          setUser(userData);
          router.push("/admin");
        }
      } catch (error) {
        console.error("Login error:", error);
        setIsLoading(false);
        throw error;
      }
    },
    [fetchUser, router]
  );

  const checkAuth = useCallback(async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const userData = await fetchUser(token);
        setUser(userData);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [logout]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfoInitial = localStorage.getItem("user");
      if (userInfoInitial) {
        setUser(JSON.parse(userInfoInitial));
      }
      setIsLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
