import React from "react";
import { Layout } from "antd";

import { BrowserRouter } from "react-router-dom";

import { LandingPageContent } from "@/layouts/content/content";
import { LandingPageHeader } from "@/layouts/header/header";
import LandingPageFooter from "./layouts/footer/footer";

const App: React.FC = () => (
  <BrowserRouter>
    <LandingPageHeader />
    <Layout>
      <LandingPageContent />
    </Layout>
    <LandingPageFooter />
  </BrowserRouter>
);

export default App;
