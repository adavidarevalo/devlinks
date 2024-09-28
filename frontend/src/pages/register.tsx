import React from "react";
import { Box, Container, Typography } from "@mui/material";
import DevlinksLogoLg from "../assets/DevlinksLogoLg";
import { motion } from 'framer-motion';
import RegisterForm from "../components/register/form";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../hook/useAuthRedirect";

export default function RegisterPage() {
  const navigate = useNavigate();
  useAuthRedirect()

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F7F7F7",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        style={{
          cursor: "pointer"
        }}
      >
        <Box
          sx={{
            marginBottom: "40px",
          }}
          onClick={() => navigate("/")}
        >
          <DevlinksLogoLg />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 480,
            p: 3,
            borderRadius: 2,
            bgcolor: "#FFFFFF",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Create account
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, mb: 3, textAlign: "center" }}
          >
            Let's get you started sharing your links!
          </Typography>
          <RegisterForm />
        </Box>
      </Box>
      </motion.div>
    </Container>
  );
}
