import { useNavigate } from "react-router-dom";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Buttons/Button";

const FormRegister = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    const form = document.getElementById("register");
    const formData = new FormData(form);
    // Log formData entries
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // Check if passwords match
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Succes: ", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <form action="" id="register">
      <InputForm
        label="Username"
        type="text"
        placeholder="example"
        name="username"
      />
      <InputForm
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        name="email"
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="********"
        name="password"
      />
      <InputForm
        label="Confirm Password"
        type="password"
        placeholder="********"
        name="confirmPassword"
      />
      <Button
        variant="bg-blue-500 hover:bg-blue-700 w-full"
        onClick={handleRegister}
      >
        Register
      </Button>
    </form>
  );
};
export default FormRegister;
