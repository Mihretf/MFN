import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";

export { useTheme } from "next-themes";

// MUI theme — always light mode to match site design
const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#AE8F05",
    },
    secondary: {
      main: "#AE8F05",
    },
    background: {
      default: "#F2F0EB",
      paper: "#FFFFF0",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "0.75rem",
          fontWeight: 600,
        },
      },
    },
  },
});

// Wrapper for entire app — forces light theme globally, disables system preference
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"   // ← always light, prevents dark mode class from ever being set
      enableSystem={false}
    >
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextThemesProvider>
  );
}
