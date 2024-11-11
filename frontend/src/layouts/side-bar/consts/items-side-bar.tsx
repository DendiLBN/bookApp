import { MenuProps } from "antd";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const itemsSideBar: MenuProps["items"] = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "2",
    icon: <SettingOutlined />,
    label: "Settings",
    children: [
      {
        key: "3",
        style: { paddingLeft: "10px" },
        label: <Link to="/auth/change-password">Change Password</Link>,
        icon: <UserOutlined />,
      },
      {
        key: "4",
        style: { paddingLeft: "10px" },
        icon: <UserOutlined />,
        label: "Change Avatar",
      },
    ],
  },
];
