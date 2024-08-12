import { Link } from "react-router-dom";

import { HomeOutlined, SnippetsFilled } from "@ant-design/icons";
import { MenuProps } from "antd";

export const menuItems: MenuProps["items"] = [
  {
    key: "home",
    label: <Link to="/Home">Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "AboutMe",
    label: <Link to="/Book">Books</Link>,
    icon: <SnippetsFilled />,
  },
];
