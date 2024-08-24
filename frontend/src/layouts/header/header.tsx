import { Layout, Menu } from "antd";

import { menuItems } from "@/layouts/header/states/menu-items";
import "@/assets/layouts-styles/header.css";

const { Header } = Layout;

export const LandingPageHeader = () => (
  <Header className="landing-page__header">
    <Menu
      className="landing-page__menu"
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={["Home"]}
      items={menuItems}
    />
  </Header>
);
