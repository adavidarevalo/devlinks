import { Box, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function PrevButton() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate("/preview")}>
      {isMobile ? (
        <IconButton
          color="primary"
          style={{
            color: theme.palette.primary.main,
          }}
        >
          <IoEyeOutline />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          startIcon={<IoEyeOutline />}
          sx={{
            fontSize: "13px",
            fontWeight: "600",
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            textTransform: "none",
            cursor: "pointer",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#F3E8FF" },
          }}
        >
          {"Preview"}
        </Button>
      )}
    </Box>
  );
}
