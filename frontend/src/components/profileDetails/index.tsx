import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addMessage } from "../../store/slices/globalSlice";
import FormInput from "../form/input";
import { useLinks } from "../context/link";
import Footer from "../link/footer";
import LinkService from "../../services/links"
import ProfilePictureUploader from "./profilePictureUploader";

const ProfileDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const { control, errors, handleSubmit } = useLinks();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await LinkService.createLink(data);
      // Simulate API call
      dispatch(
        addMessage({
          type: "success",
          message: "Profile updated successfully.",
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        addMessage({
          type: "error",
          message: "Error updating profile.",
        })
      );
    } finally {
      setLoading(false);
    }
  };

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
      <Box onSubmit={handleSubmit?.(onSubmit)} component="form" noValidate>
        <Box
          style={{ background: "#f9f9f9" }}
          padding={"10px 20px"}
          borderRadius={"7px"}
        >
          <FormInput
            name="firstName"
            control={control}
            errors={errors}
            label={"First name"} // {{ edit_3 }}
            placeholder="e.g. John"
            disabled={loading} // {{ edit_4 }}
          />

          <FormInput
            name="lastName"
            control={control}
            errors={errors}
            label={"Last name"}
            placeholder="e.g. Appleseed"
            disabled={loading} // {{ edit_5 }}
          />

          <FormInput
            name="email"
            control={control}
            errors={errors}
            label={"Email address"}
            disabled={loading} // {{ edit_6 }}
          />
        </Box>
        <Footer loading={loading}/>
      </Box>
    </Box>
  );
};

export default ProfileDetails;
