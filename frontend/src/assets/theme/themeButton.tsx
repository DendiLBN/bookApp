import { Button, Card } from "antd";

import { useThemeContext } from "@/context/hooks/use-theme-context";

export const ThemeButton: React.FC = () => {
  const { isDarkMode, handleToggleTheme } = useThemeContext();

  return (
    <Card
      size="small"
      style={{
        color: isDarkMode ? "#ffffff" : "#000000",
        width: "max-content",
        height: "max-content",
        border: "none",
        boxShadow: "none",
        padding: "4px",
        borderRadius: "0px",
      }}
    >
      <Button onClick={handleToggleTheme}>
        Change Theme to {isDarkMode ? "Light" : "Dark"}
      </Button>
    </Card>
  );
};
