import React, { useContext, useState } from "react";
import axios from "axios";
import "./Login.css";
import Header from "../../../combonants/Header";
import { User } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [accsept, setAccsept] = useState(false);
  const [Err, setErr] = useState(false);
  const navG = useNavigate();
  //Cookie
  const cookie = new Cookies();

  const user = useContext(User);
  console.log(user);

  async function Submitt(e) {
    e.preventDefault();
    setAccsept(true);
    try {
      let ras = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });

      const tokin = ras.data.data.token;

      cookie.set("Bearer", tokin, {
        path: "/",
      });
      const userdetalse = ras.data.data.user;
      user.setAuth({ tokin, userdetalse });
      navG("/dashborad");
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
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
            <label htmlFor="email">Email:</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              id="email"
              type={"email"}
              placeholder="email..."
            ></input>

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

            <div style={{ textAlign: "center" }}>
              <button type={"submit"}>Login</button>
            </div>
            {accsept && Err && <p className="error">Wrong Email Or Password</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
