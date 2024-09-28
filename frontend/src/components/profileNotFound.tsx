import { Box, Button, Card } from "@mui/material";
import React from "react";
import SadAnimation from "./../assets/sadAnimation.gif";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProfileNotFound() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      zIndex={10}
    >
      <Card
        sx={{
          mt: "10px",
          p: 2,
          width: "300px",
          borderRadius: "16px",
          boxShadow: 3,
          textAlign: "center",
          backgroundColor: "white",
          minHeight: "300px",
        }}
      >
        <Box mb={2} fontSize="h6.fontSize" fontWeight="bold">
          Links not found
        </Box>
        <motion.img
          src={SadAnimation}
          alt={"Sad Gift"}
          loading="lazy"
          style={{ maxWidth: "275px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          style={{ marginTop: 20 }}
        >
          Go to Home
        </Button>
      </Card>
    </Box>
  );
}
