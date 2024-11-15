import { MenuProps } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  BookOutlined,
  BellOutlined,
  HeartFilled,
  BookFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const itemsSideBar: MenuProps["items"] = [
  {
    key: "dashboard",
    icon: <BookOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
    children: [
      {
        key: "order-history",
        style: { paddingLeft: "10px" },
        label: <Link to="/profile/order-history">Order History</Link>,
        icon: <BookFilled />,
      },

      {
        key: "favorites",
        style: { paddingLeft: "10px" },
        label: <Link to="/profile/favorites">Favorites</Link>,
        icon: <HeartFilled />,
      },
    ],
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Account Settings",
    children: [
      {
        key: "change-password",
        style: { paddingLeft: "10px" },
        label: <Link to="/auth/change-password">Change Password</Link>,
        icon: <UserOutlined />,
      },
      {
        key: "change-avatar",
        style: { paddingLeft: "10px" },
        label: <Link to="/auth/change-avatar">Change Avatar</Link>,
        icon: <UserOutlined />,
      },
      {
        key: "notifications",
        style: { paddingLeft: "10px" },
        label: <Link to="/settings/notifications">Notifications</Link>,
        icon: <BellOutlined />,
      },
    ],
  },
];
