import { Layout, Menu } from "antd";

import {
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
        items={middleMenuItems}
        className="mid-menu"
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
