import { createContext, useContext, useState } from "react";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    try {
      const decoded = jwtDecode(token);

      return decoded;
    } catch (error) {
      localStorage.removeItem("token");

      return null;
    }
  });

  // LOGIN

  const login = (token) => {
    // store token only

    localStorage.setItem("token", token);

    // decode token to get user info

    const decodedUser = jwtDecode(token);

    setUser(decodedUser);
  };

  // LOGOUT

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
