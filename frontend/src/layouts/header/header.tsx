import { Button, Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { menuItems } from "@/layouts/header/states/menu-items";
import "@/assets/styles/header.css";

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
    <Button icon={<LogoutOutlined />}>Logout</Button>
  </Header>
);
