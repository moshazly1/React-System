import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../context/Usercontext";
import LodingScreen from "../../../combonants/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin() {
  //Get Current User
  const context = useContext(User);
  const token = context.auth.tokin;

  const [loading, setloading] = useState(true);
  //Cookie
  const Cookie = new Cookies();

  const gettocken = Cookie.get("Bearer");

  // set Refrash token
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: {
              Authorization: "Bearer " + gettocken,
            },
          })
          .then((data) => {
            Cookie.set("Bearer", data.data.token, {
              path: "/",
            });

            context.setAuth((prev) => {
              return {
                userdetalse: data.data.user,
                tokin: data.data.token,
              };
            });
          });
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    }
    !token ? refresh() : setloading(false);
  }, []);

  return loading ? <LodingScreen /> : <Outlet />;
}
