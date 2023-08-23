// Sidebar.js

import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
    return (
        <div className="Sidebar">
            <Link to="/">
                <div className="icon">Icon1</div>
            </Link>
            <Link to="/tasktable">
                <div className="icon">Icon2</div>
            </Link>
        </div>
    );
}

export default Sidebar;
