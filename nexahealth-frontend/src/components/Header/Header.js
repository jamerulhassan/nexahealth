import React from "react";
import { Link } from "react-router-dom";

const Header = ({loginStatus}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        
        {/* App Name */}
        <Link className="navbar-brand fw-bold" to="/">
          NexaHealth
        </Link>

        {/* Right side buttons */}
        <div className="ms-auto d-flex gap-2">
          <Link to="/" className="btn btn-outline-light btn-sm">
            Home
          </Link>
        {loginStatus ? 
          <>
            <Link
              to="/logout"
              className="btn btn-light btn-sm"
            >
              Logout
            </Link>

            <Link
              to="/signout"
              className="btn btn-success btn-sm"
            >
              Signout
            </Link>
            </>
            :
            <>
            <Link
              to="/signup"
              className="btn btn-success btn-sm"
            >
              Signup
            </Link>
          </>
          }
          
        </div>

      </div>
    </nav>
  );
};

export default Header;
