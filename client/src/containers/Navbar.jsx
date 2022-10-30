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
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="register">Register</Link>
        </li>
        <li>
          <Link to="login">Log In</Link>
        </li>
        <li>
          <Link to="test">Test</Link>
        </li>
        <li>
          <p style={{ cursor: "pointer" }} onClick={logout}>
            Log out
          </p>
        </li>
      </ul>
      {auth.isAuthenticated && <p>Logged in as {auth.user.username}</p>}
    </div>
  );
};

export default Navbar;
