import React from "react";
import { Box } from "@mui/material";
import CustomizeLinksLayout from "../components/layout/links";
import LinkForm from "../components/link/form";
import { LinksProvider } from "../components/context/link";
import ProfileDetails from "../components/profileDetails";

export default function ProfilePage() {
  return (
    <Box style={{ height: "100vh" }}>
      <LinksProvider>
        <CustomizeLinksLayout>
          <ProfileDetails />
        </CustomizeLinksLayout>
      </LinksProvider>
    </Box>
  );
}
