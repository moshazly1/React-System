import TopBar from "../../combonants/TopBar";
import SidBar from "../../combonants/SidBar";
import { Outlet } from "react-router-dom";
import "./dashbord.css";
export default function Dashborad() {
  return (
    <div>
      <TopBar />
      <div className="content-flex">
        <SidBar />
        <div style={{ width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
