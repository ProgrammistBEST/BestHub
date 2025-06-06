import React, { useContext } from "react";
import { ColorModeContext } from ".";
import { IconButton, Stack } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const themes = [
  { name: "blue", color: "#2196f3" },
  { name: "yellow", color: "#ffeb3b" },
  { name: "pink", color: "#e91e63" },
  { name: "red", color: "red" },
  { name: "green", color: "green" },
  { name: "teal", color: "#009688" },
];

const ThemeSwitcher = () => {
  const { setColorTheme } = useContext(ColorModeContext);

  return (
    <Stack direction="row" spacing={1} sx={{ mr: 15 }}>
      {themes.map((theme) => (
        <IconButton
          key={theme.name}
          onClick={() => setColorTheme(theme.name)}
          title={`Переключить на ${theme.name} тему`}
          sx={{
            "&:hover": {},
          }}
        >
          <CircleIcon
            sx={{
              fontSize: 20,
              color: theme.color,
            }}
          />
        </IconButton>
      ))}
    </Stack>
  );
};

export default ThemeSwitcher;
