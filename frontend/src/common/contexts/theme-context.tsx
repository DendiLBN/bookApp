import { createContext, ReactNode, useState } from "react";

export type TThemeContextProps =
  | {
      isDarkMode: boolean;
      handleToggleTheme: () => void;
      previous: string;
    }
  | undefined;

export const ThemeContext = createContext<TThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isDarkMode") || "false"),
  );

  const handleToggleTheme = () => {
    const setNewValue = !isDarkMode;
    localStorage.setItem("isDarkMode", JSON.stringify(setNewValue));
    setIsDarkMode(setNewValue);
  };

  const previous = isDarkMode ? "light" : "dark";

  return (
    <ThemeContext.Provider value={{ isDarkMode, handleToggleTheme, previous }}>
      <div className="app-shell" data-theme={isDarkMode ? "dark" : "light"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
