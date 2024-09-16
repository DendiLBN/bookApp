import { Button } from "antd";

import { useThemeContext } from "@/context/hooks/use-theme-context";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export const ThemeButton: React.FC = () => {
  const { isDarkMode, handleToggleTheme } = useThemeContext();

  return (
    <Button
      onClick={handleToggleTheme}
      style={{
        border: "none",
        boxShadow: "none",
        borderRadius: "0px",
      }}
    >
      Theme Change {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
    </Button>
  );
};
