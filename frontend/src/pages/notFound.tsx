import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
      <Button variant="contained" color="primary" onClick={() => navigate("/")} style={{ marginTop: 20 }}>
        Go to Home
      </Button>
    </Box>
    </motion.div>
  );
};

export default NotFound;
