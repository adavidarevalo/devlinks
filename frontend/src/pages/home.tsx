import { Box, Button, Container, Stack, Typography } from '@mui/material';
import DevlinksLogoLg from '../assets/DevlinksLogoLg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthRedirect from '../hook/useAuthRedirect';
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();

  // Disable scroll on desktop when the component mounts
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 900; // Check if it's a desktop
      document.body.style.overflow = isDesktop ? 'hidden' : ''; // Disable scroll on desktop
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener and reset body overflow
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = ''; // Reset overflow on unmount
    };
  }, []);

  useAuthRedirect()

  const pageVariants = {
    initial: { opacity: 0, y: -100 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 1,
  };


  const imageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 },
  };

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} sx={{ minHeight: '100vh' }}>
      <Container
        sx={{
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
         <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    > 
        <Box display={"flex"} justifyContent={"center"}>
          <Stack sx={{ maxWidth: 'lg', width: '100%' }} >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '190px',
                  height: { xs: '20%', md: '38%' },
                  bottom: 4,
                  left: 0,
                  backgroundColor: 'primary.main',
                  zIndex: -1,
                  opacity: "0.2"
                },
              }}
              fontSize={"2.25rem"}
              fontWeight={"700"}
              color='#1A202C'
            >
              Create with
            </Typography>
            <Box>
              <DevlinksLogoLg width='350' height='100px' />
            </Box>

            <Typography variant="body1" color="text.secondary" fontSize={"1rem"} marginBlock={"10px 30px"} maxWidth={"600px"}>
              Is a powerful and user-friendly application designed to help you effortlessly manage your links while providing a seamless user experience across devices. 
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: '9999px' }}
                style={{
                  fontWeight: "600",
                  fontSize: "1rem"
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: '9999px' }}
                style={{
                  fontWeight: "600",
                  fontSize: "1rem"
                }}
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            </Stack>
          </Stack>
        </Box>
      </motion.div>
      </Container>
      <Box sx={{ flex: 1, position: 'relative', width: '100%', height: '100vh' }}>
      <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={imageVariants}
      transition={pageTransition}
    >
        <img
          alt="Login Image"
          src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        />
        </motion.div>
      </Box>
    </Stack>
  );
}
