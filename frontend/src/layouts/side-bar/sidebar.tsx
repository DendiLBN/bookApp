import { useState } from "react";
import { Layout, Menu } from "antd";

import { itemsSideBar } from "@/layouts/side-bar/consts/items-side-bar";

import "@/assets/layouts-styles/sidebar.css";

import { selectIsLoggedIn } from "@/store/reducers/auth";
import { useSelector } from "react-redux";

const { Sider } = Layout;

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    isLoggedIn && (
      <Sider
        className="landing-page-sidebar"
        theme="light"
        defaultCollapsed
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        style={{ maxHeight: "645px", overflow: "auto" }}
      >
        <Menu
          mode="inline"
          theme="light"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={itemsSideBar}
        />
      </Sider>
    )
  );
};
