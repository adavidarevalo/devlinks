import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import { LinksProvider } from "../components/context/link";
import LinksPage from "../pages/links";
import PreviewCardPage from "../pages/preview";
import PreviewDetailsPage from "../pages/previewDetails";
import NotFound from "../pages/notFound";
import HomePage from "../pages/home";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LinksProvider />}>
          <Route path="/links" element={<LinksPage />} />
          <Route path={"/preview"} element={<PreviewCardPage />} />
        </Route>
        <Route path="/links/:id" element={<PreviewDetailsPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
