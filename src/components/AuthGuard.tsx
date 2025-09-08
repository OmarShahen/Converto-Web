"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import PageLoader from "./PageLoader";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const { isAuthenticated, isLoading, redirectToLogin } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, isLoading, redirectToLogin]);

  if (isLoading) {
    return fallback || <PageLoader />;
  }

  if (!isAuthenticated) {
    return fallback || <PageLoader />;
  }

  return <>{children}</>;
};
