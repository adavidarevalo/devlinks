import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import { LinksProvider } from "../components/context/link";
import LinksPage from "../pages/links";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/links" element={
            <LinksProvider>
              <React.Suspense fallback={<div>Loading...</div>}>
                <LinksPage />
              </React.Suspense>
            </LinksProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}
