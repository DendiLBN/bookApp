import { Layout, Menu } from "antd";

import { menuItems } from "@/layouts/header/states/menu-items";
import "@/assets/layouts-styles/header.css";

const { Header } = Layout;

export const LandingPageHeader = () => (
  <Header>
    <Menu
      className="landing-page__menu"
      mode="horizontal"
      theme="light"
      defaultSelectedKeys={["Home"]}
      items={menuItems}
    />
  </Header>
);
