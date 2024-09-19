import React from "react";
import MainRoutes from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";
import AlertNotification from "./components/alertNotification";

export default function App() {
  return (
    <Provider store={store}>
      <MainRoutes />
      <AlertNotification />
    </Provider>
  );
}
