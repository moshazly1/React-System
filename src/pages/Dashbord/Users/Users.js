import axios from "axios";
import { useContext, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "../../../combonants/Forms/index.css";
import { User } from "../../Website/context/Usercontext";

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [runUseEffect, setRun] = React.useState(0);
  const context = useContext(User);
  const token = context.auth.tokin;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      // .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  async function deleteUser(id) {
    try {
      const res = axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if ((await res).status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch {
      console.log("none");
    }
  }

  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td> {user.email}</td>
      <td>
        <Link to={`${user.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "#74afb9", fontSize: "20px", paddingRight: "4px" }}
          ></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          onClick={() => deleteUser(user.id)}
          style={{
            color: "red",
            fontSize: "20px",
            paddingRight: "4px",
            cursor: "pointer",
          }}
        ></i>
      </td>
    </tr>
  ));

  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}
