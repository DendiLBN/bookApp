import { Layout, Menu } from "antd";

import {
  leftMenuItems,
  middleMenuItems,
  rightMenuItems,
} from "@/layouts/header/states/menu-items";
import "@/assets/layouts-styles/header.css";

const { Header } = Layout;

export const LandingPageHeader = () => (
  <Header className="header">
    <div className="header-content">
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
      <Menu
        mode="horizontal"
        theme="light"
        items={rightMenuItems}
        className="right-menu"
      />
    </div>
  </Header>
);
