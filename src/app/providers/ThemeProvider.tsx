import React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Inner component to consume next-themes state and provide it to MUI
function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useNextTheme();

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === "dark" ? "dark" : "light",
          primary: {
            main: resolvedTheme === "dark" ? "#f0d082" : "#1a3c34", // Using the project's elegant gold/green
          },
          secondary: {
            main: "#d4af37",
          },
          background: {
            default: resolvedTheme === "dark" ? "#111827" : "#f5f5f5", // Tailwind gray-900 / gray-50
            paper: resolvedTheme === "dark" ? "#1f2937" : "#ffffff", // Tailwind gray-800 / white
          },
        },
        typography: {
          fontFamily: "inherit", // Blend seamlessly with Tailwind fonts
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 700 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "0.5rem",
                fontWeight: 600,
              },
            },
          },
        },
      }),
    [resolvedTheme]
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

// Wrapper for entire app
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <MuiThemeWrapper>{children}</MuiThemeWrapper>
    </NextThemesProvider>
  );
}
