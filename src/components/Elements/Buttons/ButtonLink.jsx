import { Link } from "react-router-dom";
const ButtonLink = (props) => {
    const {children = "custom", variant = "bg-blue-500 hover:bg-blue-700", to} = props;
    return (
      <Link to={to} className ={`${variant} text-white font-bold mx-1 py-2 px-4 rounded-md`}>
        {children}
      </Link>
    );
  }
export default ButtonLink;