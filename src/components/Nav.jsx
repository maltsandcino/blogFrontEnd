import { NavLink, useLocation } from "react-router-dom";
import "./Nav.css";
import { useState, useEffect } from "react";
import Login from "./Login"
import Header from "./Header"

function Nav({setUsername, setUserId, setToken, token, userId, userName}) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
   

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    let pageTitle = "Blogrosoft";

    if (path === "/" || path === "/home" || path === "") pageTitle = "Blogrosoft Home";
    else if (path === "/signup") pageTitle = "Sign-Up";

    if (pageTitle !== "Unknown Page") {
      document.title = `${pageTitle}`;
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setToken(null);
    setUsername(null);
    setUserId(null);
  }

  return (<>
    {userName && <Header userName={userName} />}
    
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
      {token && (
  <NavLink
    key="Blog"
    to="/Blog"
    onClick={() => setOpen(false)}
    className={({ isActive }) => `pageLink ${isActive ? "active" : ""} navLink`}
    viewTransition
  >
    My Blog
  </NavLink>
)}
      {!token ? (
      <a onClick={() => setShowLogin(true)} className="login-trigger pageLink navLink">
        Login
      </a>  
    ) : (
        <a onClick={handleLogout}
          role="button"           
          tabIndex={0}
          className="login-trigger pageLink navLink">
        Logout
      </a>
      )
      }
      {!token && (
    <NavLink
        key="Signup"
        to="/signup"
        onClick={() => setOpen(false)}
        className={({ isActive }) => `pageLink ${isActive ? "active" : ""} navLink`}
        viewTransition
    >
        Signup
    </NavLink>
    )}
      {/* Modal Below. This should actually be part of a separate component */}
      {showLogin && (
        <Login setShowLogin={setShowLogin} setToken={setToken} setUsername={setUsername} setUserId={setUserId} />
        )}
    </div>
    </>
  );
}

export default Nav;
