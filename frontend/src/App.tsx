import React from "react";
import { Provider } from "react-redux";

import { Layout } from "antd";

import { BrowserRouter } from "react-router-dom";

import { store } from "./common/store";

import { LandingPageContent } from "@/layouts/content/content";
import { LandingPageHeader } from "@/layouts/header/header";
import LandingPageFooter from "./layouts/footer/footer";
import { ThemeProvider } from "./context/theme-context";

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <LandingPageHeader />
        <Layout>
          <LandingPageContent />
        </Layout>
        <LandingPageFooter />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
