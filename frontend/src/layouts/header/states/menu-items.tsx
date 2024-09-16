import { Link } from "react-router-dom";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  SnippetsFilled,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { ThemeButton } from "assets/theme/theme-button";

export const leftMenuItems: MenuProps["items"] = [
  {
    key: "home",
    label: <Link to="/home">Home</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: "bookList",
    label: <Link to="/book">List your books</Link>,
    icon: <SnippetsFilled />,
  },
];

export const middleMenuItems: MenuProps["items"] = [
  {
    key: "theme-button",
    label: <ThemeButton />,
  },
];

export const rightMenuItems: MenuProps["items"] = [
  {
    key: "account-login",
    label: <Link to="/auth/login">Sign In</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "account-register",
    label: <Link to="/auth/register">Sing up</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "shoppingCart",
    label: <Link to="/shoppingCart">Shopping Cart</Link>,
    icon: <ShoppingCartOutlined />,
  },
];
