"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setUser, logout as logoutAction } from "@/store/userSlice";
import { serverRequest } from "@/lib/axios";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
}

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const storedUser = localStorage.getItem("user");

        if (!token) {
          setIsLoading(false);
          return;
        }

        // If we have a user in Redux but no stored user, clear everything
        if (!storedUser && user) {
          dispatch(logoutAction());
          localStorage.removeItem("accessToken");
          setIsLoading(false);
          return;
        }

        // If we have stored user data but no Redux user, restore it
        if (storedUser && !user) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(setUser(parsedUser));
        }

        // Token validation is handled by axios interceptors
        // If we reach here, we have both token and user data
      } catch (error) {
        console.error("Auth check failed:", error);
        dispatch(logoutAction());
        localStorage.removeItem("accessToken");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, user]);

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("accessToken");
    router.push("/auth/signin");
  };

  const redirectToLogin = (returnUrl?: string) => {
    const currentPath = window.location.pathname + window.location.search;
    const loginUrl = returnUrl 
      ? `/auth/signin?returnUrl=${encodeURIComponent(returnUrl)}`
      : `/auth/signin?returnUrl=${encodeURIComponent(currentPath)}`;
    
    router.push(loginUrl);
  };

  const isAuthenticated = Boolean(user && localStorage.getItem("accessToken"));

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    redirectToLogin,
  };
};