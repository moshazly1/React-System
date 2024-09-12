// import axios from "axios";
// import React, { useContext, useEffect } from "react";
// import "./index.css";
// import { User } from "../../pages/Website/context/Usercontext";
// export default function Forms(props) {
//   const [name, setname] = React.useState("");
//   const [email, setemail] = React.useState("");
//   const [password, setpassword] = React.useState("");
//   const [rpassword, setrpassword] = React.useState("");
//   const [EmailError, setEmailError] = React.useState("");
//   const usernow = useContext(User);
//   console.log(usernow);
//   const styleRegister = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: "40px",
//   };
//   const form = {
//     boxShadow: "0px 2px 15px rgb(0 0 0 / 10%)",
//     width: "400px",
//   };
//   const button = {
//     width: "100%",
//   };
//   useEffect(() => {
//     setname(props.name);
//     setemail(props.email);
//   }, [props.name, props.email]);

//   async function submit(e) {
//     e.preventDefault();

//     try {
//       let ras = await axios.post(`http://127.0.0.1:8000/api/register`, {
//         name: name,
//         email: email,
//         password: password,
//         password_confirmation: rpassword,
//       });

//       const tokin = ras.data.data.token;
//       const userdetalse = ras.data.data.user;

//       usernow.setAuth({ tokin, userdetalse });
//     } catch (err) {
//       setEmailError(err.response.status);
//     }
//   }
//   return (
//     <div className="register" style={props.styleRegister && styleRegister}>
//       <form style={props.styleRegister && form} onSubmit={submit}>
//         <label htmlFor="name">Name:</label>
//         <input
//           value={name}
//           onChange={(e) => setname(e.target.value)}
//           id="name"
//           type={"text"}
//           placeholder="Name..."
//         ></input>
//         {/* {name === "" && accsept && (
//           <p className="error">User Name is Requerd</p>
//         )} */}
//         <label htmlFor="email">Email:</label>
//         <input
//           value={email}
//           onChange={(e) => setemail(e.target.value)}
//           id="email"
//           type={"email"}
//           placeholder="email..."
//         ></input>
//         {/* {accsept && EmailError === 422 && (
//           <p className="error">Email is Aaready been taken</p>
//         )} */}
//         <label htmlFor="pass">Password:</label>
//         <input
//           value={password}
//           onChange={(e) => setpassword(e.target.value)}
//           id="pass"
//           type={"password"}
//           placeholder="Password..."
//         ></input>
//         {/* {password.length < 8 && accsept && (
//           <p className="error">Password Mast be more than 8 char</p>
//         )} */}

//         <label htmlFor="rpass">Repeat Password:</label>
//         <input
//           value={rpassword}
//           onChange={(e) => setrpassword(e.target.value)}
//           id="rpass"
//           type={"password"}
//           placeholder="Repeat  Password..."
//         ></input>
//         {/* {rpassword !== password && accsept && (
//           <p className="error">password dose not match </p>
//         )} */}
//         <div style={{ textAlign: "center" }}>
//           <button style={props.buttonstyle && button} type={"submit"}>
//             {props.button}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
