import { Link } from "react-router-dom";

import { Button, Layout, Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  SnippetsFilled,
  LogoutOutlined,
} from "@ant-design/icons";

import "@/assets/styles/global/header.css";

const { Header } = Layout;

const menuItems: MenuProps["items"] = [
  {
    key: "home",
    label: <Link to="/Home">Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "AboutMe",
    label: <Link to="/Books">Books</Link>,
    icon: <SnippetsFilled />,
  },
];

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
// TODO Logout state!
