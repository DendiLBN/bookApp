import { Switch } from "antd";
import { useThemeContext } from "@/context/hooks/use-theme-context";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export const ThemeButton: React.FC = () => {
  const { isDarkMode, handleToggleTheme } = useThemeContext();

  return (
    <>
      Theme switch {"  "}
      <Switch
        checked={isDarkMode}
        onChange={handleToggleTheme}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
      />
    </>
  );
};
