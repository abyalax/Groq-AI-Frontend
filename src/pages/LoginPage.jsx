import React, { useState } from "react";
import { ThemeContext } from "../App";
import Authlayout from "../components/Layouts/AuthLayouts";
import FormLogin from "../components/Fragments/FormLogin";
import "../components/Elements/ToggleTheme/Theme.css";
import ToggleDarkMode from "../components/Elements/ToggleTheme/Theme";
const LoginPage = (props) => {
  const [theme, setTheme] = useState("dark");
  const { children } = props;
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    console.log(theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="absolute top-5 right-5">
        <ToggleDarkMode size={50} />
      </div>
      <div className={`login-page`} id={theme}>
        <div className="flex justify-center min-h-screen items-center">
          <Authlayout title="Login" type="login">
            <FormLogin />
            {children}
          </Authlayout>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
export default LoginPage;
