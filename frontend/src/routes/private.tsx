import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LinksProvider } from "../components/context/link";
import LinksPage from "../pages/links";

export default function PrivateRoutes() {
  return (
    <LinksProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </BrowserRouter>
    </LinksProvider>
  );
}
