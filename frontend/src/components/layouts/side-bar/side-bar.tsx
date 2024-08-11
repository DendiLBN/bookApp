import { Layout, Menu } from "antd";
import "@/assets/styles/global/side-bar.css";
import logo from "@/components/layouts/side-bar/logo.jpg";
import { itemsSideBar } from "components/states/Items-side-bar";

import { useState } from "react";

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
