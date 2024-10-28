import { Link } from "react-router-dom";
const Authlayout = (props) => {
    const {children, title, type} = props
  return (
    <div className="w-full max-w-xs">
      <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
      <p className="font-medium text-slate-500 mb-8">
        Welcome, Please Enter Your Details
      </p>
      {children}
      <Navigation type={type}/>
    </div>
  );
};

const Navigation = ({type}) => {
  if (type === "login") {
    return (
      <p className="text-sm font-semibold mt-5 text-center">
        Don't have an account? {" "}
        <Link to={"/register"} className="text-blue-500 font-bold">Register</Link>
      </p>
    )
  } else {
    return (
      <p className="text-sm font-semibold mt-5 text-center">
        Already have an account ? {" "}
        <Link to={"/login"} className="text-blue-500 font-bold">Login</Link>
      </p>
    )
  }
}
export default Authlayout