import React, { useContext, useEffect, useState } from "react";
import { User } from "../../Website/context/Usercontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateUser() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [rpassword, setrpassword] = useState("");
  const [accsept, setAccsept] = useState(false);
  const [EmailError, setEmailError] = useState(false);

  const context = useContext(User);
  const token = context.auth.tokin;

  const navG = useNavigate();
  const id = window.location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setname(data[0].name);
        setemail(data[0].email);
      });
  }, []);

  async function Submitt(e) {
    e.preventDefault();
    setAccsept(true);
    try {
      let ras = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: rpassword,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      navG("/dashborad/users");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccsept(true);
    }
  }

  return (
    <>
      <h1>Update User</h1>
      <div>
        <div>
          <div className="register ">
            <form onSubmit={Submitt}>
              <label htmlFor="name">Name:</label>
              <input
                value={name}
                onChange={(e) => setname(e.target.value)}
                id="name"
                type={"text"}
                placeholder="Name..."
                required
              ></input>
              {name.length < 2 && accsept && (
                <p className="error">Name must be more than 2 char</p>
              )}
              <label htmlFor="email">Email:</label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                id="email"
                type={"email"}
                placeholder="email..."
                required
              ></input>
              {accsept && EmailError && (
                <p className="error">Email is Aaready been taken</p>
              )}
              <label htmlFor="pass">Password:</label>
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                id="pass"
                type={"password"}
                placeholder="Password..."
                required
              ></input>
              {password.length < 8 && accsept && (
                <p className="error">Password Mast be more than 8 char</p>
              )}

              <label htmlFor="rpass">Repeat Password:</label>
              <input
                value={rpassword}
                onChange={(e) => setrpassword(e.target.value)}
                id="rpass"
                type={"password"}
                placeholder="Repeat Password..."
                required
              ></input>
              {rpassword !== password && accsept && (
                <p className="error">password dose not match </p>
              )}
              <div style={{ textAlign: "center" }}>
                <button type={"submit"}>Update User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
