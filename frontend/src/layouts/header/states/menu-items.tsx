import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  SnippetsFilled,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

export const middleMenuItems: MenuProps["items"] = [
  {
    key: "home",
    label: <Link to="/Home">Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "bookList",
    label: <Link to="/Book">List your books</Link>,
    icon: <SnippetsFilled />,
  },
];
export const rightMenuItems: MenuProps["items"] = [
  {
    key: "account",
    label: <Link to="/LoginForm">Sign In</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "shoppingCart",
    label: <Link to="/ShoppingCart">Shopping Cart</Link>,
    icon: <ShoppingCartOutlined />,
  },
];
