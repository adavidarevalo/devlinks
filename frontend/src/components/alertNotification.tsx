import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { resetMessage } from "../store/slices/globalSlice";

export default function AlertNotification() {
  const global = useSelector((state: RootState) => state.global.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Snackbar
      open={!!global.message}
      autoHideDuration={5000}
      onClose={() => dispatch(resetMessage())}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Position bottom-right
    >
      <Alert
        onClose={() => dispatch(resetMessage())}
        severity={global.type}
        sx={{ width: "100%" }}
      >
        {global.message}
      </Alert>
    </Snackbar>
  );
}
