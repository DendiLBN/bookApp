import { Layout, Menu } from "antd";

import {
  middleMenuItems,
  rightMenuItems,
} from "@/layouts/header/states/menu-items";
import "@/assets/layouts-styles/header.css";

import { ThemeButton } from "assets/theme/themeButton";

const { Header } = Layout;

export const LandingPageHeader = () => (
  <Header className="header">
    <div className="header-content">
      <Menu
        mode="horizontal"
        theme="light"
        items={middleMenuItems}
        className="mid-menu"
      />
      <ThemeButton />
      <Menu
        mode="horizontal"
        theme="light"
        items={rightMenuItems}
        className="right-menu"
      />
    </div>
  </Header>
);
