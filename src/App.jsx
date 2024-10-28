import React, { createContext, useState } from "react";
import ToggleDarkMode from "./components/Elements/ToggleTheme/Theme";
import "./components/Elements/ToggleTheme/Theme.css";
import Welcome from "./pages/Welcome";
import ButtonLink from "./components/Elements/Buttons/ButtonLink";

export const ThemeContext = createContext("dark");

const App = () => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    console.log(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Welcome>
          <ToggleDarkMode size={40} />
          <ButtonLink to={"/login"}>Get Started</ButtonLink>
        </Welcome>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
