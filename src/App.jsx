import { useEffect, useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components";
import createMainRouter from "./navigations/MainNavigator";
import "./App.css";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const handleToggleTheme = (isDark) => {
    setThemeMode(isDark ? "dark" : "light");
  };

  const router = useMemo(
    () => createMainRouter({ themeMode, onToggleTheme: handleToggleTheme }),
    [themeMode]
  );

  return (
    <ThemeProvider mode={themeMode}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
