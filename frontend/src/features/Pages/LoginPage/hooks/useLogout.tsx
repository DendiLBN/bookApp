import React, { useEffect, useState, useCallback } from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

export const LogoutButton: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  }, []);

  return isLoggedIn ? (
    <Button icon={<LogoutOutlined />} onClick={logout}>
      Logout
    </Button>
  ) : null;
};
