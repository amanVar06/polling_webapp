import { useState, useEffect } from "react";
import { setToken, call } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  addError,
  selectError,
} from "./features/slices/rootSlice";
import decode from "jwt-decode";
import Auth from "./components/Auth";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  // if (localStorage.jwtToken) {
  //   setToken(localStorage.jwtToken);
  //   try {
  //     dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  //   } catch (err) {
  //     dispatch(setCurrentUser({}));
  //     dispatch(addError(err));
  //   }
  // }

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
  return (
    <div>
      <Auth authType={"login"} />
      <ErrorMessage error={error} />
    </div>
  );
};

export default App;
