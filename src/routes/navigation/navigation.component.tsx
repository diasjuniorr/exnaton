import { Outlet, useNavigate } from "react-router-dom";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              EXNATON
            </Typography>
          </span>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Navigation;
