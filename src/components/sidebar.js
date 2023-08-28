// Sidebar.js

import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { IoSpeedometerSharp } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
function Sidebar() {
  return (
    <div className="Sidebar">
      <Link to="/welcome">
        <div>
          <IoSpeedometerSharp className="icon-svg" />
        </div>
      </Link>
      <Link to="/tasktable">
        <AiOutlineMenu className="icon-svg1" />
      </Link>
    </div>
  );
}

export default Sidebar;
