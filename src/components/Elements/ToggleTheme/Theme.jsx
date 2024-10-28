import React, { useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "../../../App";

const ToggleDarkMode = (props) => {
  const { size } = props;
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <DarkModeSwitch
      style={{ margin: "10px" }}
      checked={theme === "dark"}
      onChange={toggleTheme}
      size={size}
    />
  );
};

export default ToggleDarkMode;
