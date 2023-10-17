import React from "react";
import { MdWindow } from "react-icons/md";
import AuthDetails from "./AuthDetails";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <aside className="menu-container">
      <div>
        <div class=" ">
          <Link
            class="menu-icon"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <MdWindow />
          </Link>
          <ul className="dropdown-menu drop-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link className="dropdown-item" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/About">
                About
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/Login">
                Sign In
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/Contact">
                Contacts
              </Link>
            </li>
          </ul>
        </div>
    
      </div>
      <div className="user">
        <Link
          to="/SignUp"
          type="button"
          className=""
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Create Account"
        >
          <AuthDetails />
        </Link>
      </div>
    </aside>
  );
};

export default SideMenu;
