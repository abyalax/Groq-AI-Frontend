import { useEffect, useState } from "react";
import "../App.css"
import Button from "../components/Elements/Buttons/Button";

function Dashboard() {

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const endpoint = "http://localhost:3000/api/v1/users";
  const [users, setUsers] = useState([]);
  const fetchUser = async () => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      if (Array.isArray(res.data)) {
        console.log("Success:", res.data);

        setUsers(res.data);
      } else {
        console.error("Data format is incorrect", data);
      }
      console.log(users.length);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    console.log(users);
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-blue-500 my-4">Dashboard Admin</h1>
      <table className="table-auto min-w-[800px] p-2 text-center rounded-lg">
        <thead className="bg-gray-200  p-2">
          <tr className="">
            <th className="p-2">No</th>
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
            <th className="p-2" colSpan={3}>Kelola</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-gray-100 ">
              <td className="p-1">{user.id}</td>
              <td className="p-1">{user.nama}</td>
              <td className="p-1">{user.email}</td>
              <td className="p-1"> <Button onClick={() => handleDelete(user.id)}>Delete</Button> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
