import { Route, Routes } from "react-router-dom";
import { Books } from "@/landing-page/pages/Books";

import { Home } from "../pages/Home";

export const LandingPageRouting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Books" element={<Books />} />
    {/* <Route path="*" element={<NotFound />} /> {} */}
  </Routes>
  // TODO ADD JUST IN CASE NOTFOUND ERROR
);
