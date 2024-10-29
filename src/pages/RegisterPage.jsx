import { useState } from "react";
import { ThemeContext } from "../App";
import Authlayout from "../components/Layouts/AuthLayouts";
import FormRegister from "../components/Fragments/FormRegister";
import "../components/Elements/ToggleTheme/Theme.css";
import ToggleDarkMode from "../components/Elements/ToggleTheme/Theme";
import PropTypes from "prop-types";

const RegisterPage = (props) => {
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
      <div className={`register-page`} id={theme}>
        {children}
        <div className="flex justify-center min-h-screen items-center">
          <Authlayout title="Register" type="register">
            <FormRegister />
          </Authlayout>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

RegisterPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RegisterPage;
