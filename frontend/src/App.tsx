import React from "react";
import { Layout } from "antd";

import { BrowserRouter } from "react-router-dom";

import { LandingPageContent } from "@/landing-page/layouts/content/content";
// import { LandingPageFooter } from "@/landing-page/layouts/footer/footer";
import { LandingPageSideBar } from "@/landing-page/layouts/side-bar/side-bar";
import { LandingPageHeader } from "@/landing-page/layouts/header/header";

const App: React.FC = () => (
  <BrowserRouter>
    <LandingPageHeader />
    <Layout>
      <LandingPageSideBar />
      <LandingPageContent />
    </Layout>
    {/* <LandingPageFooter /> */}
  </BrowserRouter>
);

export default App;
