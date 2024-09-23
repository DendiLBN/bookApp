import { Layout, Menu } from "antd";

import {
  leftMenuItems,
  middleMenuItems,
  rightMenuItems,
} from "@/layouts/header/states/menu-items";
import "@/assets/layouts-styles/header.css";
import { LogoutButton } from "@/features/Pages/LoginPage/hooks/useLogoutUser";

const { Header } = Layout;

export const LandingPageHeader = () => (
  <Header className="header">
    <div className="header__content">
      <Menu
        mode="horizontal"
        theme="light"
        items={leftMenuItems}
        className="left-menu"
      />
      <Menu
        mode="horizontal"
        theme="light"
        items={middleMenuItems}
        className="middle-menu"
      />
      <LogoutButton />
      <Menu
        mode="horizontal"
        theme="light"
        items={rightMenuItems}
        className="right-menu"
      />
    </div>
  </Header>
);
