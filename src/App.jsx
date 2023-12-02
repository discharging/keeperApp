import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UserContext from "./context/UserContext";

function App() {
  const notes = useState(null);
  const ProtectedRoute = ({ children }) => {
    const { currentToken } = useContext(AuthContext);
    if (!currentToken.token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={notes}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
