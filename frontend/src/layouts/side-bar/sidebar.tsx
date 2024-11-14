import { useState } from "react";
import { Avatar, Layout, Menu } from "antd";

import { itemsSideBar } from "@/layouts/side-bar/consts/items-side-bar";

import "@/assets/layouts-styles/sidebar.css";

import { selectIsLoggedIn } from "@/store/reducers/auth";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import useUser from "@/common/users/useUser";

const { Sider } = Layout;

export const LandingPageSideBar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const { user } = useUser();

  if (!user?.firstName) {
    return;
  }

  return (
    isLoggedIn && (
      <Sider
        className="landing__page-sidebar"
        theme="light"
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        width={200}
        trigger={true}
      >
        <div style={{ textAlign: "center", padding: "10px" }}>
          {/* TODO Add user avatar */}
          <Avatar size={64} icon={<UserOutlined />} /> {/* Default avatar */}
          <p style={{ marginTop: "10px" }}>{user.firstName}</p>
        </div>
        <Menu
          mode="inline"
          style={{ borderInlineEnd: "none" }}
          theme="light"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          items={itemsSideBar}
        />

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div onClick={toggleCollapsed} style={{ cursor: "pointer" }}>
            {collapsed ? "▶" : "◁"}
          </div>
        </div>
      </Sider>
    )
  );
};
