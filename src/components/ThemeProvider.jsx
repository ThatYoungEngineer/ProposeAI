import { ConfigProvider, theme as antdTheme } from "antd";
import colors from "../constants/colors";
import "antd/dist/reset.css";

const ThemeProvider = ({ mode, children }) => {
  const isDark = mode === "dark";

  const themeTokens = {
    colorPrimary: isDark ? colors.dark.accent : colors.light.accent,
    colorText: isDark ? "#e2e8f0" : "#0f172a",
    colorBgBase: isDark ? "#0b1220" : "#f6f8fb",
    colorBgContainer: isDark ? "#0f172a" : "#ffffff",
    colorBorder: isDark ? "#1f2937" : "#e2e8f0",
    borderRadius: 12,
    fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: themeTokens,
        components: {
          Card: { paddingLG: 24 },
          Button: { controlHeight: 40 },
          Input: { controlHeight: 40 },
          Select: { controlHeight: 40 },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
