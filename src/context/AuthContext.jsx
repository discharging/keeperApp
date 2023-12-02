import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentToken, setCurrentToken] = useState({
    token: JSON.parse(localStorage.getItem("token")) || null,
  });
  const logout = () => {
    localStorage.removeItem("token");
    return true;
  };
  const login = async (inputs) => {
    try {
      const response = await fetch(
        "https://keeperappapi-production.up.railway.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputs),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      localStorage.setItem("token", JSON.stringify(data));

      setCurrentToken(data);
      return data.newUser;
      // Navigate to "/" once login is successful
    } catch (error) {
      console.error("Error during login:", error.message);
      // Handle the error, e.g., show a user-friendly message
    }
  };

  return (
    <AuthContext.Provider value={{ currentToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
