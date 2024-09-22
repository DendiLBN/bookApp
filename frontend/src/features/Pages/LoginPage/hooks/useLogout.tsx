import { LogoutOutlined } from "@ant-design/icons";

import { Button } from "antd";

import { useDispatch } from "react-redux";

import { setIsLoggedIn } from "@/common/store/reducers/user";

import { removeTokens } from "@/common/utils/removeTokens";

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    removeTokens();
    dispatch(setIsLoggedIn(false));
  };

  return (
    <Button icon={<LogoutOutlined />} onClick={handleOnClick}>
      Logout
    </Button>
  );
};
