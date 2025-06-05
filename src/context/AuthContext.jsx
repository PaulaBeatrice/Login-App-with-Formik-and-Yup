import { createContext, useContext, useState } from "react";

// Create a context for authentication that will be shared across components
const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  // State to track if the user is authenticated
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Define login and logout functions
  const login = () => setAuthenticated(true); 
  const logout = () => setAuthenticated(false);

  return (
    // Provide the authentication state and functions to all child components
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  ); 
};
// Custom hook to easily access the AuthContext in any component
export const useAuth = () => useContext(AuthContext);
