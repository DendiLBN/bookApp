import { useContext } from "react";
import { ThemeContext, TThemeContextProps } from "../theme-context";

export const useThemeContext = (): TThemeContextProps => {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProviderWrapper");
  }
  return ctx;
};
