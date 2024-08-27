import { useState } from "react";

import { Layout, Menu } from "antd";

import { itemsSideBar } from "@/layouts/side-bar/states/items-side-bar";

import "@/assets/layouts-styles/side-bar.css";

const { Sider } = Layout;

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
    >
      <div className="logo"></div>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={itemsSideBar}
      />
    </Sider>
  );
};
