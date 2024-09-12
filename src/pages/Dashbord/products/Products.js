import axios from "axios";
import { useContext, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "../../../combonants/Forms/index.css";
import { User } from "../../Website/context/Usercontext";

export default function Products() {
  const [product, setproduct] = React.useState([]);
  const [runUseEffect, setRun] = React.useState(0);
  const context = useContext(User);
  const token = context.auth.tokin;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      // .then((res) => res.json())
      .then((data) => {
        setproduct(data.data);
      })
      .catch((err) => console.log(err));
  }, [runUseEffect]);

  async function deleteUser(id) {
    try {
      const res = axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if ((await res).status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const ShowProduct = product.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td> {product.description}</td>
      <td>
        <Link to={`${product.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ color: "#74afb9", fontSize: "20px", paddingRight: "4px" }}
          ></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          onClick={() => deleteUser(product.id)}
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
            <th>Title</th>
            <th>Descreption</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{ShowProduct}</tbody>
      </table>
    </div>
  );
}
