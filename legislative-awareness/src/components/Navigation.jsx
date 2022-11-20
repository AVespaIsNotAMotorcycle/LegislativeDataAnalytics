import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-light bg-white">
        <div className="container">
          <Link className="link" to="/">
            <h3>Legislative Awareness</h3>
          </Link>

          {/* Code taken from technomoro */}
          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/local-info">
                  Local
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/data" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/data">
                  Data
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/information" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/information">
                  Information
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

const NavigationBar = withRouter(Navigation);

export default NavigationBar;

Navigation.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
