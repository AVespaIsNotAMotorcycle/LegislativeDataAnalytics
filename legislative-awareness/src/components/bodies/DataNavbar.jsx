import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function Navigation() {
  return (
    <div>
     
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
