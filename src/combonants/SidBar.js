import { NavLink } from "react-router-dom";

export default function SidBar() {
  return (
    <div className="side-bar">
      <NavLink to="/dashborad/users" className="item-link">
        <i className="fa-solid fa-users"></i> Users
      </NavLink>

      <NavLink to="/dashborad/user/create" className="item-link">
        <i className="fa-solid fa-user-plus"></i> New User
      </NavLink>

      <NavLink to="/dashborad/products/" className="item-link">
        <i className="fa-solid fa-brands fa-product-hunt"></i> Products
      </NavLink>

      <NavLink to="/dashborad/product/create" className="item-link">
        <i className="fa-solid fa-plus"></i> New Product
      </NavLink>
    </div>
  );
}
