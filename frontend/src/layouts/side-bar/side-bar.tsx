import { useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";

import { selectIsLoggedIn } from "@/common/store/reducers/user";

import { itemsSideBar } from "@/layouts/side-bar/states/items-side-bar";

import "@/assets/layouts-styles/side-bar.css";

const { Sider } = Layout;

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
    >
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
