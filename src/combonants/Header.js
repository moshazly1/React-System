import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function handelLogOut() {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      cookie.remove("Bearer");
      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container shadow">
      <nav className="d-flex p2 ">
        <div className="d-flex">
          <Link className="rigister-nav" to="/">
            Home
          </Link>
          <Link className="rigister-nav" to="about">
            About
          </Link>
        </div>
        <div className="d-flex">
          {!token ? (
            <>
              <Link
                to="/register"
                style={{ textAlign: "center" }}
                className="rigister-nav"
              >
                Register
              </Link>
              <Link
                to="/login"
                style={{ textAlign: "center" }}
                className="rigister-nav"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashborad"
                style={{ textAlign: "center" }}
                className="rigister-nav"
              >
                Dashboard
              </Link>

              <div className="rigister-nav" onClick={handelLogOut}>
                Log Out
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
