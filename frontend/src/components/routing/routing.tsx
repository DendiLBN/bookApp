import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { Book } from "../pages/Books";

export const LandingPageRouting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Book" element={<Book />} />
    {/* <Route path="*" element={<NotFound />} /> {} */}
  </Routes>
  // TODO ADD JUST IN CASE NOTFOUND ERROR
);
