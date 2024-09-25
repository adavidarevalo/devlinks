import { Box } from "@mui/material";
import PreviewHeader from "../components/preview/header";
import CardContentView from "../components/preview/cardContent";
import { useLinks } from "../components/context/link";

const PreviewCardPage = () => {
  const { avatar, getValues } = useLinks();

  return (
    <>
      <Box
        minHeight={"50vh"}
        style={{
          background: "#623CFE",
          borderBottomRightRadius: "25px", // Customize the radius value
          borderBottomLeftRadius: "25px",
        }}
        position={"absolute"}
        top={0}
        width={"100vw"}
        left={0}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
        width={"100vw"}
      >
        {/* Header Section */}
        <PreviewHeader />

        {/* Profile Card */}
        <CardContentView
          avatarUrl={avatar}
          name={`${getValues("firstName")} ${getValues("lastName")}`}
          email={getValues("email")}
          links={getValues("links")}
        />
      </Box>
    </>
  );
};

export default PreviewCardPage;
