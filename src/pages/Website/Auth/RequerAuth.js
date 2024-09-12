import { useContext } from "react";
import { User } from "../context/Usercontext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequerAuth() {
  const user = useContext(User);
  const location = useLocation();

  return user.auth.userdetalse ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={"Login"} />
  );
}
