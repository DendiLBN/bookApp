import React from "react";
import { Layout } from "antd";

import { BrowserRouter } from "react-router-dom";

import { LandingPageContent } from "@/layouts/content/content";
import { LandingPageSideBar } from "layouts/side-bar/side-bar";
import { LandingPageHeader } from "@/layouts/header/header";

const App: React.FC = () => (
  <BrowserRouter>
    <LandingPageHeader />
    <Layout>
      <LandingPageSideBar />
      <LandingPageContent />
    </Layout>
  </BrowserRouter>
);

export default App;
