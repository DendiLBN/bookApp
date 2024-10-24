import { MenuProps } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  KeyOutlined,
} from "@ant-design/icons";

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
        label: "Change Password",
        icon: <KeyOutlined />,
      },
      {
        key: "4",
        icon: <UserOutlined />,
        label: "Update Avatar",
      },
    ],
  },
];
