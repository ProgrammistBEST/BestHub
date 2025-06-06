"use client";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { RefineThemes } from "@refinedev/mui";
import Cookies from "js-cookie";
import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { createTheme } from "@mui/material/styles";

const YellowTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFD700", // Желтый
    },
    secondary: {
      main: "#FFA500", // Оранжевый
    },
    background: {
      default: "#FFFDE7", // Светло-желтый фон
      paper: "#FFF8E1",
    },
  },
});

const PinkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF69B4", // Розовый
    },
    secondary: {
      main: "#FF1493", // Ярко-розовый
    },
    background: {
      default: "#FFF0F5", // Светло-розовый фон
      paper: "#FFE4E1",
    },
  },
});

const GreenTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#388E3C", // Зеленый
    },
    secondary: {
      main: "#1B5E20", // Темно-зеленый
    },
    background: {
      default: "#E8F5E9", // Светло-зеленый фон
      paper: "#C8E6C9",
    },
  },
});

const TealTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00c3ff", // Бирюзовый
    },
    secondary: {
      main: "#004D40", // Темно-бирюзовый
    },
    background: {
      default: "#E0F2F1", // Светло-бирюзовый фон
      paper: "#B2DFDB",
    },
  },
});

const RedTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF0000",
    },
    secondary: {
      main: "#8B0000",
    },
    background: {
      default: "#FFF0F0",
      paper: "#FFE4E1",
    },
  },
});

type ColorModeContextType = {
  mode: string;
  setMode: () => void;
  setColorTheme: (themeName: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

type ColorModeContextProviderProps = {
  defaultMode?: string;
};

export const ColorModeContextProvider: React.FC<
  PropsWithChildren<ColorModeContextProviderProps>
> = ({ children, defaultMode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState(defaultMode || "light");
  const [colorTheme, setColorTheme] = useState("blue");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const systemTheme = useMediaQuery(`(prefers-color-scheme: dark)`);

  useEffect(() => {
    if (isMounted) {
      const theme = Cookies.get("theme") || (systemTheme ? "dark" : "light");
      setMode(theme);
    }
  }, [isMounted, systemTheme]);

  const toggleTheme = () => {
    const nextTheme = mode === "light" ? "dark" : "light";
    setMode(nextTheme);
    Cookies.set("theme", nextTheme);
  };

  const changeColorTheme = (themeName: string) => {
    setColorTheme(themeName);
    Cookies.set("colorTheme", themeName);
  };

  const getTheme = () => {
    switch (colorTheme) {
      case "yellow":
        return mode === "light"
          ? YellowTheme
          : createTheme({
              ...YellowTheme,
              palette: {
                ...YellowTheme.palette,
                mode: "dark",
                background: {
                  default: "#121212", // Темный фон
                  paper: "#1e1e1e", // Фон карточек
                },
                text: {
                  primary: "#ffffff", // Белый текст
                  secondary: "#b0b0b0", // Серый текст
                },
              },
            });
      case "pink":
        return mode === "light"
          ? PinkTheme
          : createTheme({
              ...PinkTheme,
              palette: {
                ...PinkTheme.palette,
                mode: "dark",
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#b0b0b0",
                },
              },
            });
      case "red":
        return mode === "light"
          ? RedTheme
          : createTheme({
              ...RedTheme,
              palette: {
                ...RedTheme.palette,
                mode: "dark",
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#b0b0b0",
                },
              },
            });
      case "green":
        return mode === "light"
          ? GreenTheme
          : createTheme({
              ...GreenTheme,
              palette: {
                ...GreenTheme.palette,
                mode: "dark",
                background: {
                  default: "#1e1e1e",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#b0b0b0",
                },
              },
            });
      case "teal":
        return mode === "light"
          ? TealTheme
          : createTheme({
              ...TealTheme,
              palette: {
                ...TealTheme.palette,
                mode: "dark",
                background: {
                  default: "#1e1e1e",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#b0b0b0",
                },
              },
            });
      default:
        return mode === "light" ? RefineThemes.Blue : RefineThemes.BlueDark;
    }
  };

  return (
    <ColorModeContext.Provider
      value={{
        setMode: toggleTheme,
        mode,
        setColorTheme: changeColorTheme,
      }}
    >
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
