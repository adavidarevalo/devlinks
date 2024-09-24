import { Box } from "@mui/material";
import CustomizeLinksLayout from "../components/layout/links";
import LinkForm from "../components/link";
import ProfileDetails from "../components/profileDetails";
import { useLinks } from "../components/context/link";

export default function LinksPage() {
  const { view } = useLinks();
  return (
    <Box style={{ height: "100vh" }}>
      <CustomizeLinksLayout>
        <>
        {view === "profile" && <ProfileDetails />}
        {view === "links" && <LinkForm />}
        </>
      </CustomizeLinksLayout>
    </Box>
  );
}
