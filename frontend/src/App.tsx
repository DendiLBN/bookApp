import React from "react";

import { Layout } from "antd";

import { BrowserRouter } from "react-router-dom";

import { LandingPageContent } from "@/layouts/content/content";
import { LandingPageHeader } from "@/layouts/header/header";
import LandingPageFooter from "./layouts/footer/footer";
import { ThemeProvider } from "./context/theme-context";

const App: React.FC = () => (
  <ThemeProvider>
    <BrowserRouter>
      <LandingPageHeader />
      <Layout>
        <LandingPageContent />
      </Layout>
      <LandingPageFooter />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
