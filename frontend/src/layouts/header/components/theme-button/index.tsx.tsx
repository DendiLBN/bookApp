import { Switch } from "antd";

import { MoonOutlined, SunOutlined } from "@ant-design/icons";

import { useThemeContext } from "@/common/contexts/hooks/use-theme-context";

export const ThemeButton: React.FC = () => {
  const { isDarkMode, handleToggleTheme } = useThemeContext();

  return (
    <>
      <Switch
        checked={isDarkMode}
        onChange={handleToggleTheme}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
      />
    </>
  );
};
