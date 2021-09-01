import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink exact to="/" activeStyle={activeStyle}>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      {" | "}
      <NavLink to="/authors" activeStyle={activeStyle}>
        Authors
      </NavLink>
      {" | "}
      <NavLink to="/test" activeStyle={activeStyle}>
        testArea
      </NavLink>
    </nav>
  );
}

export default Header;
