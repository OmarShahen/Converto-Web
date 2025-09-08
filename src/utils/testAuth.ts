// Test utility for authentication system
// This file can be used to test the authentication flow

export const testAuthFlow = () => {
  console.log("=== Authentication System Test ===");
  
  // Test 1: Check if user can access protected route without token
  console.log("1. Testing access without token...");
  const hasToken = localStorage.getItem("accessToken");
  const hasUser = localStorage.getItem("user");
  
  console.log(`Token exists: ${!!hasToken}`);
  console.log(`User data exists: ${!!hasUser}`);
  
  // Test 2: Test redirect URL construction
  console.log("2. Testing redirect URL construction...");
  const currentPath = window.location.pathname + window.location.search;
  const loginUrl = `/auth/signin?returnUrl=${encodeURIComponent(currentPath)}`;
  console.log(`Current path: ${currentPath}`);
  console.log(`Login URL would be: ${loginUrl}`);
  
  // Test 3: Test token validation
  console.log("3. Testing authentication status...");
  const isAuthenticated = Boolean(hasUser && hasToken);
  console.log(`User is authenticated: ${isAuthenticated}`);
  
  console.log("=== Test Complete ===");
  return {
    hasToken: !!hasToken,
    hasUser: !!hasUser,
    isAuthenticated,
    currentPath,
    loginUrl
  };
};