import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FiLink } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";

import DevlinksLogoLg from "../../../assets/DevlinksLogoLg";
import DevLinksLogoSm from "../../../assets/DevLinksLogoSm";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: "#fff", // White background
        borderRadius: "8px", // Rounded corners
        padding: "2px",
        maxWidth: "100%", // Ensuring it stays responsive
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow effect
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 0,
          alignItems: "center"
        }}
      >
        {/* Left Logo */}
          {isMobile ? <DevLinksLogoSm /> : <DevlinksLogoLg />}
  
        {/* Center Links (Visible only on larger screens) */}
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Button
            startIcon={<FiLink />}
            sx={{
              fontSize: "13px",
              backgroundColor: "#F3E8FF",
              color: "#8338EC",
              padding: "6px 12px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#E9D5FF" },
            }}
          >
            {isMobile ? "" : "Links"}
          </Button>
          <Button 
          sx={{
            fontSize: "13px",
            fontWeight: "600",
            padding: "6px 12px",
            // backgroundColor: "#F3E8FF",
            color: "#737373",
            textTransform: "none",
          }}
          startIcon={<FaRegCircleUser />}>
            {isMobile ? "" : "Profile Details"}
          </Button>
        </Box>

        {/* Right Preview Button */}
        <Button
          variant="outlined"
          startIcon={<IoEyeOutline />}
          sx={{
            fontSize: "13px",
            fontWeight: "600",
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            textTransform: "none",
            cursor: "pointer",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#F3E8FF" },
          }}
        >
            {isMobile ? "" : "Preview"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
