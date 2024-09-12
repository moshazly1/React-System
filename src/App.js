import { Route, Routes } from "react-router-dom";
//Dashbord
import Dashborad from "./pages/Dashbord/Dashbourd";
//Users
import Users from "./pages/Dashbord/Users/Users";
// import Create from "./pages/Dashbord/Users/Create";
import UpdateUser from "./pages/Dashbord/Users/UpdateUser";
//website
import Home from "./pages/Website/Home";
import About from "./pages/Website/About";
//Auth
import SignUp from "./pages/Website/Auth/SignUP";
import Login from "./pages/Website/Auth/Login";
import RequerAuth from "./pages/Website/Auth/RequerAuth";
import PersistLogin from "./pages/Website/Auth/PersiestLogin";
import CreateUser from "./pages/Dashbord/Users/CreateUser";
import Products from "./pages/Dashbord/products/Products";
import NewProduct from "./pages/Dashbord/products/NewProduct";
import UpdateProduct from "./pages/Dashbord/products/UpdateProduct";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequerAuth />}>
            <Route path="/dashborad" element={<Dashborad />}>
              <Route path="users" element={<Users />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<NewProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
