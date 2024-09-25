import React from 'react'
import { Box, Avatar, Typography, Card, CardContent, Stack } from '@mui/material';
import { Link } from '../context/link';
import CardPlatform from '../cardPlatform';

interface CardContentViewProps {
  avatarUrl: string
  name: string
  email: string
  links: Link[]
}

export default function CardContentView({avatarUrl, name, email, links}: CardContentViewProps) {
  return (
    <Box zIndex={10}>
    <Card
        sx={{
            mt: "10px",
          p: 2,
          width: '300px',
          borderRadius: '16px',
          boxShadow: 3,
          textAlign: 'center',
          backgroundColor: 'white',
        }}
        // zIndex={10}
      >
        <Avatar
          src={avatarUrl || "https://via.placeholder.com/150"}
          alt="Profile Picture"
          sx={{ width: 100, height: 100, mx: 'auto', border: '3px solid #6c3bff' }}
        />
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          {name || ""}
        </Typography>
        <Typography 
        fontSize={".875rem"}
        fontWeight={"400"}
        variant="h6" component="div">
          {email || ""}
        </Typography>
       

        <CardContent>
          <Stack spacing={2}>
            {links.map(link => (
              <CardPlatform
              key={link.platform}
              link={link}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
      </Box>
  )
}
