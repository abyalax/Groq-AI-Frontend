import { useContext } from "react";
import { ThemeContext } from "../App";
import "../components/Elements/ToggleTheme/Theme.css";
import PropTypes from "prop-types";

const Welcome = (props) => {
  const { theme } = useContext(ThemeContext);
  const {children} = props
  return (
    <div className={`${theme}`}>
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen" style={{margin:"0px",padding:"0px"}}>
      <h2 className="text-6xl font-bold text-blue-700 mb-4 text-center my-2">
        Welcome To my React App <br /> <br />GROQ|AI
      </h2>
      {children}
    </div>
    </div>
  );
};

Welcome.propTypes = {
  children: PropTypes.node,
}

export default Welcome