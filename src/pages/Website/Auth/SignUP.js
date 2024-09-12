import React, { useContext, useState } from "react";
import axios from "axios";
import "./Login.css";
import Header from "../../../combonants/Header";
import { User } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [rpassword, setrpassword] = useState("");
  const [accsept, setAccsept] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const navG = useNavigate();

  //cooke
  const cookie = new Cookies();

  const user = useContext(User);
  console.log(user);

  async function Submitt(e) {
    e.preventDefault();
    setAccsept(true);
    try {
      let ras = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: rpassword,
      });

      const tokin = ras.data.data.token;
      cookie.set("Bearer", tokin, {
        path: "/",
      });
      const userdetalse = ras.data.data.user;
      user.setAuth({ tokin, userdetalse });
      navG("/dashborad");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccsept(true);
    }
  }
  return (
    <div>
      <Header />
      <div className="parent login">
        <div className="register login ">
          <form onSubmit={Submitt}>
            <label htmlFor="name">Name:</label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              id="name"
              type={"text"}
              placeholder="Name..."
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
              placeholder="Repeat  Password..."
            ></input>
            {rpassword !== password && accsept && (
              <p className="error">password dose not match </p>
            )}
            <div style={{ textAlign: "center" }}>
              <button type={"submit"}>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
