import Groq from "./Groq";
import ToggleDarkMode from "../components/Elements/ToggleTheme/Theme";
import { useState } from "react";
import { ThemeContext } from "../App";

const GroqPage = () => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    console.log(theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Groq>
          <ToggleDarkMode size={40} />
        </Groq>
      </div>
    </ThemeContext.Provider>
  );
};
export default GroqPage;
