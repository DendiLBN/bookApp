import React, { useEffect, useState, useCallback } from "react";
import { LogoutOutlined } from "@ant-design/icons";

import { Button } from "antd";

import { ACCESS_TOKEN } from "@/common/consts/local-storage";

export const LogoutButton: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  }, []);

  return isLoggedIn ? (
    <Button icon={<LogoutOutlined />} onClick={logout}>
      Logout
    </Button>
  ) : null;
};
