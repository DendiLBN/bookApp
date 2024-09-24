import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import {
  leftMenuItems,
  middleMenuItems,
  rightMenuItems,
} from "@/layouts/header/states/menu-items";
import "@/assets/layouts-styles/header.css";
import { LogoutButton } from "@/features/Pages/LoginPage/hooks/useLogoutUser";
import { selectIsLoggedIn } from "@/common/store/reducers/user";

const { Header } = Layout;

export const LandingPageHeader = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Header className="header">
      <div className="header__content">
        <Menu
          mode="horizontal"
          theme="light"
          items={leftMenuItems}
          className="left-menu"
        />
        <Menu
          mode="horizontal"
          theme="light"
          items={middleMenuItems}
          className="middle-menu"
        />

        {isLoggedIn && <LogoutButton />}

        {!isLoggedIn && (
          <Menu
            mode="horizontal"
            theme="light"
            items={rightMenuItems}
            className="right-menu"
          />
        )}
      </div>
    </Header>
  );
};
