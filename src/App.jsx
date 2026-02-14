import { useEffect, useState } from "react";
import Home from "./pages/mainPages/Home";
import { ThemeProvider } from "./components";
import "./App.css";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const handleToggleTheme = (isDark) => {
    setThemeMode(isDark ? "dark" : "light");
  };

  return (
    <ThemeProvider mode={themeMode}>
      <Home themeMode={themeMode} onToggleTheme={handleToggleTheme} />
    </ThemeProvider>
  );
};

export default App;
