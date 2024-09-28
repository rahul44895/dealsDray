import React, { useContext } from "react";
import companyLogo from "../../Assests/logo_B2R.png";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../Context/Authentication/Authentication";
import Cookie from "js-cookie";

export default function Navbar() {
  const username = localStorage.getItem("f_userName") || "Guest User";
  const { logout } = useContext(AuthenticationContext);

  return (
    <div
      className="p-2 d-flex justify-content-between align-items-center gap-2 mb-3"
      style={{
        boxShadow: "1px 1px 20px black",
      }}
    >
      <div className="d-flex align-items-center " style={{ padding: "1em" }}>
        <Link to={"/"}>
          <div className="d-flex align-items-center gap-2">
            <img
              src={companyLogo}
              alt="logo"
              style={{ height: "50px", width: "50px", objectFit: "contain" }}
            />
            <h4>Deals Dray</h4>
          </div>
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={"/"}>
            <div style={{ padding: "1em" }}>Home</div>
          </Link>
          <Link to={"/employee"}>
            <div style={{ padding: "1em" }}>Employee List</div>
          </Link>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <div>{username}</div>
        {Cookie.get("token") ? (
          <button className="btn btn-warning" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-warning">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
