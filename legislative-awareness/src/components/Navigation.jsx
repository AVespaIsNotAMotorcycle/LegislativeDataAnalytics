import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-light bg-white">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Legislative Analytics
          </Link>


          {/* Code taken from technomoro*/}
          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  {/* <span class="sr-only">(current)</span> */}
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/local-info" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/local-info">
                  Local
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/data" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/data">
                  Data
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/information" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/information">
                  Information
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);