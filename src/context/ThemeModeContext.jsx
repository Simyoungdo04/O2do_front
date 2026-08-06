import { createContext, useContext, useMemo, useState } from "react";
import { pointPalettes, DEFAULT_POINT_THEME } from "../styles/themes";
import { buildTheme } from "../styles/Theme";

const STORAGE_KEY = "pointTheme";
const MODE_STORAGE_KEY = "themeMode";

const ThemeModeContext = createContext(null);

const readStoredThemeKey = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored && pointPalettes[stored] ? stored : DEFAULT_POINT_THEME;
};

const readStoredMode = () => {
  const stored = localStorage.getItem(MODE_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function ThemeModeProvider({ children }) {
  const [themeKey, setThemeKeyState] = useState(readStoredThemeKey);
  const [mode, setModeState] = useState(readStoredMode);

  const setThemeKey = (key) => {
    if (!pointPalettes[key]) return;
    localStorage.setItem(STORAGE_KEY, key);
    setThemeKeyState(key);
  };

  const setMode = (nextMode) => {
    if (nextMode !== "light" && nextMode !== "dark") return;
    localStorage.setItem(MODE_STORAGE_KEY, nextMode);
    setModeState(nextMode);
  };

  const toggleMode = () => setMode(mode === "dark" ? "light" : "dark");

  const theme = useMemo(() => buildTheme(themeKey, mode), [themeKey, mode]);

  return (
    <ThemeModeContext.Provider
      value={{ themeKey, setThemeKey, mode, setMode, toggleMode, theme, palettes: pointPalettes }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeModeContext);
