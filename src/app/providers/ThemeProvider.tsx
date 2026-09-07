import React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";

export { useTheme } from "next-themes";

// Inner component to consume next-themes state and provide it to MUI
function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useNextTheme();

  const muiTheme = React.useMemo(
    () =>
      createTheme({
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
          fontFamily: "inherit",
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
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <MuiThemeWrapper>{children}</MuiThemeWrapper>
    </NextThemesProvider>
  );
}
