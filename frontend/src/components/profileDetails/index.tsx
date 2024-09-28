import React from "react";
import { Box, Typography } from "@mui/material";
import FormInput from "../form/input";
import { useLinks } from "../context/link";
import Footer from "../link/footer";
import ProfilePictureUploader from "./profilePictureUploader";

const ProfileDetails = () => {
  const { linkLoading, control, errors, handleSubmit, onLinkSubmit } = useLinks();

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        fontSize={"2rem"}
        fontWeight={700}
        color={"#333"}
        textAlign={"justify"}
      >
        Profile Details
      </Typography>
      <Typography
        variant="body1"
        align="center"
        gutterBottom
        fontSize={"1rem"}
        color="#737373"
        fontWeight={400}
        textAlign={"justify"}
      >
        Add your details to create a personal touch to your profile.
      </Typography>

      <ProfilePictureUploader/>

      {/* Form starts here */}
      <Box onSubmit={handleSubmit?.(onLinkSubmit)} component="form" noValidate>
        <Box
          style={{ background: "#f9f9f9" }}
          padding={"10px 20px"}
          borderRadius={"7px"}
          marginBottom={"20px"}
        >
          <FormInput
            name="firstName"
            control={control}
            errors={errors}
            label={"First name"} // {{ edit_3 }}
            placeholder="e.g. John"
            disabled={linkLoading} // {{ edit_4 }}
          />

          <FormInput
            name="lastName"
            control={control}
            errors={errors}
            label={"Last name"}
            placeholder="e.g. Appleseed"
            disabled={linkLoading} // {{ edit_5 }}
          />

          <FormInput
            name="email"
            control={control}
            errors={errors}
            label={"Email address"}
            disabled={linkLoading} // {{ edit_6 }}
          />
        </Box>
        <Footer loading={linkLoading}/>
      </Box>
    </Box>
  );
};

export default ProfileDetails;
