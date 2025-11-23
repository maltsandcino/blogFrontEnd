import { NavLink, useLocation } from "react-router-dom";
import "./Nav.css";
import { useState, useEffect } from "react";

function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    let pageTitle = "Blogrosoft";

    if (path === "/" || path === "/home" || path === "") pageTitle = "Blogrosoft Home";
    else if (path === "/signup") pageTitle = "Sign-Up";

    if (pageTitle !== "Unknown Page") {
      document.title = `${pageTitle}`;
    }
  }, [location]);

  return (
    <div className="full-width-flex-row">
      <div className="nav-name-title">
        <span className="nav-title">Blogrosoft</span>
      </div>
      <NavLink
        key="Home"
        to="/"
        onClick={() => setOpen(false)}
        className={({ isActive }) => `pageLink ${isActive ? "active" : ""} navLink`}
        viewTransition
      >
        Home
      </NavLink>
    </div>
  );
}

export default Nav;
