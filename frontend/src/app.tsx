import React from "react";
import MainRoutes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
import AlertNotification from "./components/alertNotification";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainRoutes />
        <AlertNotification />
      </Provider>
      <CssBaseline />
    </ThemeProvider>
  );
}
