import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { IoCameraOutline, IoTrashOutline } from "react-icons/io5"; // {{ edit_1 }}
import { useLinks } from '../context/link';

const ProfilePictureUploader: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hover, setHover] = useState<boolean>(false); // {{ edit_2 }}

  const {setValue} = useLinks()

  

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg'];
      if (!validTypes.includes(file.type)) {
        console.error("Invalid file type. Please upload a PNG or JPG image.");
        return;
      }

      // Validate image dimensions
      const img = new Image();
      img.onload = () => {
        // Proceed with the existing logic
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result?.toString();
          if (base64String) {
            const jsonPayload = {
              filename: file.name,
              content: base64String.replace(/^data:image\/[a-z]+;base64,/, ""), // Image content without base64 prefix
              contentType: file.type,
            };

            setValue("avatar", jsonPayload)
          }
        };
        reader.readAsDataURL(file);
        const url = URL.createObjectURL(file);
        setImageUrl(url);
      };
      img.src = URL.createObjectURL(file); // Load image to check dimensions
    }
  };

  const handleDeleteImage = () => { // {{ edit_3 }}
    setImageUrl(null);
    setValue("avatar", undefined)
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      bgcolor="white"
      borderRadius={2}
      boxShadow={1}
      marginBlock={"20px"}
      sx={{ width: '100%', maxWidth: 600 }}
    >
      {/* Profile Picture Text */}
      <Typography 
      variant="body1" 
      fontWeight={400}
      style={{ color: "#737373"}}
      color="textSecondary">
        Profile picture
      </Typography>

      {/* Upload Image Section */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        bgcolor="#F3F0FF"
        width={200}
        height={200}
        borderRadius={2}
        textAlign="center"
        sx={{ 
          border: '2px dashed #A3A3A3',
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative', // {{ edit_4 }}
          '&:hover': { // {{ edit_5 }}
            cursor: 'pointer',
          }
        }}
        onMouseEnter={() => setHover(true)} // {{ edit_6 }}
        onMouseLeave={() => setHover(false)} // {{ edit_7 }}
      >
        {imageUrl && hover && ( // {{ edit_8 }}
          <IconButton 
            onClick={handleDeleteImage} 
            sx={{ position: 'absolute', top: 10, right: 10 }} // {{ edit_9 }}
            color="secondary"
          >
            <IoTrashOutline />
          </IconButton>
        )}
        <input
          accept="image/png, image/jpeg"
          style={{ display: 'none' }}
          id="upload-button"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="upload-button">
          <IconButton color="primary" component="span">
            <IoCameraOutline fontSize="large" />
          </IconButton>
          <Typography variant="body2" color="primary">
            + Upload Image
          </Typography>
        </label>
      </Box>

      {/* Image size information */}
      <Typography 
      variant="body2" 
      color="textSecondary" 
      sx={{ marginLeft: 2 }}
      fontSize={".75rem"}
      style={{ color: "#737373"}}
      textAlign={"start"}
      >
        Image must be below 1024x1024px. Use PNG or JPG format.
      </Typography>
    </Box>
  );
};

export default ProfilePictureUploader;
