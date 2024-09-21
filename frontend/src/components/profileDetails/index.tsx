import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { FiUpload } from "react-icons/fi";
import FormInput from "../form/input";
import { useLinks } from "../context/link";
import Footer from "../link/form/footer";

const ProfileDetails = () => {
  const [profilePic, setProfilePic] = useState(null);

  const { control, errors, handleSubmit } = useLinks();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle form submission logic here
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fafafa",
          padding: 3,
          borderRadius: 2,
          marginBottom: 2,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <Box
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#e0e0e0",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FiUpload size={40} color="#888" />
            </Box>
          )}
          <Typography variant="caption" display="block" gutterBottom>
            Image must be below 1024x1024px. Use PNG or JPG format.
          </Typography>
        </Box>

        <Button
          variant="contained"
          component="label"
          sx={{ backgroundColor: "#E6E6FA" }}
        >
          Upload Image
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
          />
        </Button>
      </Box>

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
            label={"Last name"}
            placeholder="e.g. John"
          />

          <FormInput
            name="lastName"
            control={control}
            errors={errors}
            label={"Last name"}
            placeholder="e.g. Appleseed"
          />

          <FormInput
            name="email"
            control={control}
            errors={errors}
            label={"Email address"}
          />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default ProfileDetails;
