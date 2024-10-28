import { useNavigate } from "react-router-dom"
import InputForm from "../Elements/Input/InputForm"
import Button from "../Elements/Buttons/Button"
const FormLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const form = document.getElementById("login");
    const formData = new FormData(form);

    try {
      if (formData.get("email") === "admin@gmail.com" && formData.get("password") === "admin") {
        alert("login sebagai admin")
        navigate("/dashboard");
        return
      }
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      }
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      if (response.status === true) {
        console.log("Success:", response);
        localStorage.setItem('userId', response.data.id);
        navigate("/groq");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form action="" id="login">
      <InputForm label="Email" type="email" placeholder="example@gmail.com" name="email" />
      <InputForm label="Password" type="password" placeholder="********" name="password" />
      <Button variant="bg-blue-500 hover:bg-blue-700 w-full" onClick={handleLogin}>Login</Button>
    </form>
  )
}
export default FormLogin