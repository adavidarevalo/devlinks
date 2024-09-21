import { Button, IconButton, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import { useLinks } from "../../../context/link";

interface NavButtonProps {
  icon: ReactNode;
  name: "links" | "profile";
  label: string;
}

export default function NavButton({ icon, name, label }: NavButtonProps) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { view, setView } = useLinks();

  return (
    <>
      {isMobile ? (
        <IconButton
          color="primary"
          style={{
            color: view === name ? "#8338EC" : "#737373",
            backgroundColor: view === name ? "#F3E8FF" : "white",
          }}
          onClick={() => setView(name)}
        >
          {icon}
        </IconButton>
      ) : (
        <Button
          startIcon={icon}
          sx={{
            fontSize: "13px",
            backgroundColor: view === name ? "#F3E8FF" : "none",
            color: view === name ? "#8338EC" : "#737373",
            padding: "6px 12px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#E9D5FF", color: "#8338EC" },
          }}
          onClick={() => setView(name)}
        >
          {label}
        </Button>
      )}
    </>
  );
}
