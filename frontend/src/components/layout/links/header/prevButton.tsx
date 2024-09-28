import { Box, Button, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { useWatch } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLinks } from "../../../context/link";

export default function PrevButton() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const { control } = useLinks();

  const id = useWatch({ name: "id", control });

  const isDisabled = !id

  return (
    <Box>
      {isMobile ? (
        <Tooltip title={isDisabled ? "Please save the links first" : ""}>
          <span>
            <IconButton
              onClick={() => navigate("/preview")}
              color="primary"
              disabled={isDisabled}
              style={{
                color: theme.palette.primary.main,
              }}
            >
              <IoEyeOutline />
            </IconButton>
          </span>
        </Tooltip>
      ) : (
        <Tooltip title={isDisabled ? "Please save the links first" : ""}>
          <span>
            <Button
              variant="outlined"
              onClick={() => navigate("/preview")}
              startIcon={<IoEyeOutline />}
              disabled={isDisabled}
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
          </span>
        </Tooltip>
      )}
    </Box>
  );
}
