// lib/axios.ts
import axios from "axios";

// Helper to get token from localStorage
function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
}

// Helper to clear auth data and redirect to login
function clearAuthAndRedirect() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    
    // Only redirect if not already on auth pages
    if (!window.location.pathname.startsWith('/auth/')) {
      const currentPath = window.location.pathname + window.location.search;
      window.location.href = `/auth/signin?returnUrl=${encodeURIComponent(currentPath)}`;
    }
  }
}

// Create Axios instance
export const serverRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
});

// Request interceptor to attach token
serverRequest.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["x-access-token"] = token;
  }

  return config;
});

// Response interceptor to handle auth errors
serverRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token is invalid or expired
      clearAuthAndRedirect();
    }
    return Promise.reject(error);
  }
);
