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
            colorPrimary: isDarkMode ? "#4c6ef5" : "#4c6ef5",
            colorText: isDarkMode ? "#e0e0e0" : "#333333",
            colorBgBase: isDarkMode ? "#1e1e2f" : "#f8f9fa",
            colorBgContainer: isDarkMode ? "#2b2b3c" : "#ffffff",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
