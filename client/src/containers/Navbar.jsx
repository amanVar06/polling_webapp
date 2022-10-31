import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuth,
  setCurrentUser,
  removeError,
} from "../features/slices/rootSlice";
import { setToken } from "../services/api";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  function logout() {
    localStorage.clear();
    setToken(null);
    dispatch(setCurrentUser({}));
    dispatch(removeError());
  }

  return (
    <div className="navbar">
      <div className="container">
        <ul className="navbar-container">
          <li>
            <Link className="navbar-brand" to="/">
              Home
            </Link>
          </li>
          {!auth.isAuthenticated && (
            <>
              <li>
                <Link className="navbar-item" to="register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="navbar-item" to="login">
                  Log In
                </Link>
              </li>
            </>
          )}
          {auth.isAuthenticated && (
            <>
              <li>
                <Link className="navbar-item" to="polls/new">
                  Create Poll
                </Link>
              </li>
              <li>
                <p className="navbar-item" onClick={logout}>
                  Log out
                </p>
              </li>
            </>
          )}
        </ul>
        {auth.isAuthenticated && (
          <p className="navbar-user">Logged in as {auth.user.username}</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
