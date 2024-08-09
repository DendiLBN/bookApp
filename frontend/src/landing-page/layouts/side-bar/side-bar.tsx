import { useState } from "react";
import { Layout, Menu } from "antd";
import "@/assets/styles/global/side-bar.css";
import logo from "@/landing-page/layouts/side-bar/logo.jpg";
import { itemsSideBar } from "@/landing-page/states/Items-side-bar";

const { Sider } = Layout;

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

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
