import { createContext, useContext, useMemo, useState } from "react";
import { pointPalettes, DEFAULT_POINT_THEME } from "../styles/themes";
import { buildTheme } from "../styles/Theme";

const STORAGE_KEY = "pointTheme";

const ThemeModeContext = createContext(null);

const readStoredThemeKey = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored && pointPalettes[stored] ? stored : DEFAULT_POINT_THEME;
};

export function ThemeModeProvider({ children }) {
  const [themeKey, setThemeKeyState] = useState(readStoredThemeKey);

  const setThemeKey = (key) => {
    if (!pointPalettes[key]) return;
    localStorage.setItem(STORAGE_KEY, key);
    setThemeKeyState(key);
  };

  const theme = useMemo(() => buildTheme(themeKey), [themeKey]);

  return (
    <ThemeModeContext.Provider value={{ themeKey, setThemeKey, theme, palettes: pointPalettes }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeModeContext);
