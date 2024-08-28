import { Route, Routes } from "react-router-dom";

import { Home } from "@/pages/Home/Home";
import { Book } from "@/pages/Book/Books";
import { Account } from "@/pages/Account/Account";

export const LandingPageRouting = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/Book" element={<Book />} />
    <Route path="/AccountView" element={<Account />} />
    {/* <Route path="*" element={<NotFound />} /> {} */}
  </Routes>
  // TODO ADD JUST IN CASE NOTFOUND ERROR
);
