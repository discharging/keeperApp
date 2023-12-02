import React, { useContext } from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      navigate("/login");
    } else {
      return <h1>Error</h1>;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <HighlightIcon fontSize="medium" />
            Keeper
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "black",
              color: "blue",
              border: "none",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
