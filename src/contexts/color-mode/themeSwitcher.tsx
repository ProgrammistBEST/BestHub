import React, { useContext } from "react";
import { ColorModeContext } from ".";

const ThemeSwitcher = () => {
  const { setColorTheme } = useContext(ColorModeContext);

  return (
    <div>
      <button onClick={() => setColorTheme("blue")}>Blue Theme</button>
      <button onClick={() => setColorTheme("yellow")}>Yellow Theme</button>
      <button onClick={() => setColorTheme("pink")}>Pink Theme</button>
      <button onClick={() => setColorTheme("red")}>Red Theme</button>
    </div>
  );
};

export default ThemeSwitcher;
