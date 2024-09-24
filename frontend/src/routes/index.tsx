import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import { LinksProvider } from "../components/context/link";
import LinksPage from "../pages/links";
import PreviewCardPage from "../pages/preview";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LinksProvider />}>
          <Route path="/links" element={<LinksPage />} />
          <Route path={"/preview"} element={<PreviewCardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
