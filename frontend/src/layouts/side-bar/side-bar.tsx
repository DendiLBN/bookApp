import { useState } from "react";

import { Layout, Menu } from "antd";

import logo from "@/assets/images/logo.jpg";

import { itemsSideBar } from "@/layouts/side-bar/states/items-side-bar";

import "@/assets/layouts-styles/side-bar.css";

const { Sider } = Layout;

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
      <div className="logo">
        <img src={logo} alt="Logo" style={{ width: "100%", height: "auto" }} />
      </div>
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={itemsSideBar}
      />
    </Sider>
  );
};
