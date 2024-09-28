import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface PreviewLayoutProps {
  children: ReactNode;
}

export default function PreviewLayout({ children }: PreviewLayoutProps) {
  return (
    <>
      <Box
        data-testid="background-box" // Added data-testid
        minHeight={"50vh"}
        style={{
          background: "#623CFE",
          borderBottomRightRadius: "25px",
          borderBottomLeftRadius: "25px",
        }}
        position={"absolute"}
        top={0}
        width={"100vw"}
        left={0}
      />
      <Box
        data-testid="content-box" // Added data-testid
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
        width={"100vw"}
      >
        {children}
      </Box>
    </>
  );
}
