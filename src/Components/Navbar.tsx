import React from "react";
import HelpIcon from "./HelpIcon";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>
        <HelpIcon id={1} />
        2D Finite Element Learning Tool.
      </h2>
    </div>
  );
};

export default Navbar;
