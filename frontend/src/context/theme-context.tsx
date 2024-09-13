import { useState, ReactNode, createContext } from "react";
import { ConfigProvider, theme } from "antd";

export type TThemeContextProps = {
  isDarkMode: boolean;
  handleToggleTheme: () => void;
};

export const ThemeContext = createContext<TThemeContextProps | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const handleToggleTheme = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, handleToggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: isDarkMode ? "#1DA57A" : "#1890ff",
            colorText: isDarkMode ? "#ffffff" : "#000000",
            colorBgBase: isDarkMode ? "#333333" : "#ffffff",
            colorBgContainer: isDarkMode ? "#444444" : "#f0f0f0",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
