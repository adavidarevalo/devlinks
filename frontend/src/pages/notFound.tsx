// NotFound.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {

  const handleGoHome = () => {
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f5f5f5"
      p={3}
    >
      <Typography variant="h1" component="h2" color={"#623CFE"}>
        404
      </Typography>
      <Typography variant="h6">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome} style={{ marginTop: 20 }}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
