import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  useMediaQuery,
} from "@mui/material";
import { FiLink } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";

import DevlinksLogoLg from "../../../../assets/DevlinksLogoLg";
import DevLinksLogoSm from "../../../../assets/DevLinksLogoSm";
import NavButton from "./nav_button";
import PrevButton from "./prevButton";

const Header: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      style={{
        backgroundColor: "#fff", // White background
        borderRadius: "8px", // Rounded corners
        padding: isMobile ? "2px 15px" : "2px",
        maxWidth: "100%", // Ensuring it stays responsive
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow effect
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 0,
          alignItems: "center",
        }}
      >
        {isMobile ? <DevLinksLogoSm /> : <DevlinksLogoLg />}
        <Box sx={{ display: "flex", gap: "16px" }}>
          <NavButton icon={<FiLink />} name={"links"} label="Links" />
          <NavButton
            icon={<FaRegCircleUser />}
            name={"profile"}
            label="Profile Details"
          />
        </Box>
        <PrevButton/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
