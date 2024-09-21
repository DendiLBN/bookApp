import React from "react";
import { Provider } from "react-redux";

import { Layout } from "antd";

import { BrowserRouter } from "react-router-dom";

import { store } from "./common/store";

import { LandingPageContent } from "@/layouts/content/content";
import { LandingPageHeader } from "@/layouts/header/header";
import LandingPageFooter from "./layouts/footer/footer";
import { ThemeProvider } from "./context/theme-context";
import { LandingPageSideBar } from "./layouts/side-bar/side-bar";
import { AntdNotificationProvider } from "./context/antd-notification-context"; //

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider>
      <AntdNotificationProvider>
        <BrowserRouter>
          <LandingPageHeader />
          <Layout>
            <LandingPageSideBar />
            <LandingPageContent />
          </Layout>
          <LandingPageFooter />
        </BrowserRouter>
      </AntdNotificationProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
