import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2"; // Import Grid2 for layout
import { useMediaQuery } from "@mui/material";
import Header from "./header";
import PhonePreview from "./phonePreview";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface CustomizeLinksLayoutProps {
  children: React.ReactNode;
}

const CustomizeLinksLayout = ({ children }: CustomizeLinksLayoutProps) => {
  const isMobile = useMediaQuery("(max-width:890px)");

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: isMobile ? "0px" : "20px",
      }}
    >
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={12}>
          <Header />
        </Grid>

        <Grid size={isMobile ? 12 : 5} display={isMobile ? "none" : "grid"} >
          <PhonePreview />
        </Grid>
        <Grid size={isMobile ? 12 : 7}>
          <Item
            style={{
              borderRadius: "8px",
              background: "white",
              minHeight: isMobile ? "calc(100vh - 100px)" : "710px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {children}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomizeLinksLayout;
