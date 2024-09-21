import { Box, Typography } from "@mui/material";
import NoLinksIcon from "../../../assets/NoLinksIcon";

const GetStartedComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgcolor="#f9f9f9"
      p={3}
      borderRadius={4}
      gap={"24px"}
      padding={"50px"}
    >
      <NoLinksIcon/>
      <Typography variant="h4" component="h1" gutterBottom fontSize={"2rem"} color={"#333"}>
        Let’s get you started
      </Typography>

      {/* Description */}
      <Typography variant="body1" sx={{ mb: 2 }} color={"#737373"} fontSize={"1rem"}>
        Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!
      </Typography>
    </Box>
  );
};

export default GetStartedComponent;