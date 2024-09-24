import React from 'react';
import { Box, Button, Avatar, Typography, Card, CardContent, Stack } from '@mui/material';
import { FaGithub } from "react-icons/fa";

const PreviewCardPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          bgcolor: '#6c3bff',
        }}
      >
        <Button variant="outlined" color="inherit">
          Back to Editor
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#6c3bff', color: 'white' }}>
          Share Link
        </Button>
      </Box>

      {/* Profile Card */}
      <Card
        sx={{
          mt: -8,
          p: 2,
          width: '300px',
          borderRadius: '16px',
          boxShadow: 3,
          textAlign: 'center',
          backgroundColor: 'white',
        }}
      >
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
          sx={{ width: 100, height: 100, mx: 'auto', border: '3px solid #6c3bff' }}
        />
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          David Arevalo
        </Typography>

        <CardContent>
          <Stack spacing={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#f54242', color: 'white' }}
              startIcon={<FaGithub />}
              fullWidth
            >
              GitLab
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#1DA1F2', color: 'white' }}
              startIcon={<FaGithub />}
              fullWidth
            >
              Twitter
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#FF0000', color: 'white' }}
              startIcon={<FaGithub />}
              fullWidth
            >
              YouTube
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#9146FF', color: 'white' }}
              startIcon={<FaGithub />}
              fullWidth
            >
              Twitch
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PreviewCardPage;
