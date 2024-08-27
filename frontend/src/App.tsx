import React from "react";
import { Layout } from "antd";

import { BrowserRouter } from "react-router-dom";

import { LandingPageContent } from "@/layouts/content/content";
import { LandingPageSideBar } from "layouts/side-bar/side-bar";
import { LandingPageHeader } from "@/layouts/header/header";
import LandingPageFooter from "./layouts/footer/footer";

const App: React.FC = () => (
  <BrowserRouter>
    <LandingPageHeader />
    <Layout>
      <LandingPageSideBar />
      <LandingPageContent />
    </Layout>
    <LandingPageFooter />
  </BrowserRouter>
);

export default App;
