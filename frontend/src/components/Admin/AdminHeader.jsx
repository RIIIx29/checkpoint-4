import { NavLink } from "react-router-dom";
import Logo from "../src/Assets/logo";
import "../src/Admin.scss";

function AdminHeader() {
  return (
    <header className="adminHeader">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <h1>ADMINISTRATION</h1>
    </header>
  );
}

export default AdminHeader;
