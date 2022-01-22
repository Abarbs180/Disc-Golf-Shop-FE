import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  const AuthValues = useContext(AuthContext);

  return (
    <div style={{ height: "26px" }}>
      <nav>
        <ul>
          <li className="nav-item">
            <Link to="/" className="item-link" style={{ marginLeft: "25px" }}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="item-link">
              Products
            </Link>
          </li>
          <li className="nav-item">Contact</li>
        </ul>
        <ul className="right-nav">
          {!AuthValues.isLoggedIn && (
            <li className="nav-item">
              <Link to="/user/register" className="item-link">
                Create Account
              </Link>
            </li>
          )}
          {!AuthValues.isLoggedIn && (
            <li className="nav-item">
              <Link to="/user/login" className="item-link">
                Login
              </Link>
            </li>
          )}
          {AuthValues.isLoggedIn && (
            <li className="nav-item">
              <Link to="/cart" className="item-link">
                Cart
              </Link>
            </li>
          )}
          {AuthValues.isLoggedIn && (
            <li className="nav-item">
              <Link
                to="/user/login"
                onClick={() => {
                  AuthValues.setToken(null);
                  AuthValues.setIsLoggedIn(false);
                }}
                className="item-link"
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
