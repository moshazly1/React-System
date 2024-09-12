import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { User } from "../../Website/context/Usercontext";

export default function UpdateProduct() {
  const [title, setTitel] = useState("");
  const [Descreption, setDescreption] = useState("");
  const [image, setImage] = useState("");
  console.log(image);
  const [accsept, setAccsept] = useState(false);
  const id = window.location.pathname.split("/").slice(-1)[0];
  const context = useContext(User);
  const token = context.auth.tokin;

  const navG = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })

      .then((data) => {
        console.log(data);
        setTitel(data.data[0].title);
        setDescreption(data.data[0].description);
      })
      .catch((err) => console.log(err));
  }, []);
  async function Submitt(e) {
    e.preventDefault();
    setAccsept(true);
    try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("description", Descreption);
      formdata.append("image", image);
      let ras = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,

        formdata,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      navG("/dashborad/products");
    } catch (err) {
      console.log(err);
      setAccsept(true);
    }
  }
  return (
    <div>
      <div>
        <div className="register ">
          <form onSubmit={Submitt}>
            <label htmlFor="name">Title:</label>
            <input
              value={title}
              onChange={(e) => setTitel(e.target.value)}
              id="name"
              type={"text"}
              placeholder="Title..."
              required
            ></input>
            {title.length < 1 && accsept && (
              <p className="error">Title must be more than 2 char</p>
            )}
            <label htmlFor="email">Descreption:</label>
            <input
              value={Descreption}
              onChange={(e) => setDescreption(e.target.value)}
              id="email"
              type={"text"}
              placeholder="Descreption..."
              required
            ></input>
            {/* {accsept && EmailError && (
              <p className="error">Email is Aaready been taken</p>
            )} */}
            <label htmlFor="pass">Image:</label>
            <input
              onChange={(e) => setImage(e.target.files.item(0))}
              id="pass"
              type={"file"}
              placeholder="Password..."
              required
            ></input>
            {/* {password.length < 8 && accsept && (
              <p className="error">Password Mast be more than 8 char</p>
            )} */}

            <div style={{ textAlign: "center" }}>
              <button type={"submit"}>Update Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
