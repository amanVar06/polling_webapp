import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { call, setToken } from "../services/api";
import {
  setCurrentUser,
  addError,
  removeError,
  selectAuth,
} from "../features/slices/rootSlice";

const Auth = ({ authType }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   async function getResults() {
  //     const result = await call("post", "auth/login", {
  //       username: "username",
  //       password: "password",
  //     });

  //     console.log(result);
  //   }

  //   getResults();
  // }, []);

  async function authUser(path, data) {
    try {
      const { token, ...user } = await call("post", `auth/${path}`, data);
      localStorage.setItem("jwtToken", token);
      setToken(token);
      dispatch(setCurrentUser(user));
      dispatch(removeError());
    } catch (err) {
      const error = err.response.data;
      dispatch(addError(error.message));
      localStorage.clear();
      setToken(null);
      dispatch(setCurrentUser({}));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    authUser(authType || "login", { username, password });
    // getResults("login", { username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label" htmlFor="username">
          username{" "}
        </label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
          className="form-input"
        />
        <label className="form-label" htmlFor="password">
          password{" "}
        </label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          className="form-input"
        />
        <div className="buttons_center">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;

/**
 * export const logout = () => {
  return dispatch => {
    localStorage.clear();
    API.setToken(null);
    dispatch(setCurrentUser({}));
    dispatch(removeError());
  };
};

export const authUser = (path, data) => {
  return async dispatch => {
    try {
      const { token, ...user } = await API.call('post', `auth/${path}`, data);
      localStorage.setItem('jwtToken', token);
      API.setToken(token);
      dispatch(setCurrentUser(user));
      dispatch(removeError());
    } catch (err) {
      const { error } = err.response.data;
      dispatch(addError(error));
    }
  };
};
 */
