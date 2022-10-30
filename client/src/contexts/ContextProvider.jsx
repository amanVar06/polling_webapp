import { createContext, useContext, useState } from "react";
import { call, setToken } from "../services/api";
import {
  setCurrentUser,
  removeError,
  addError,
} from "../features/slices/rootSlice";
import { useSelector, useDispatch } from "react-redux";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();

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

  function logout() {
    localStorage.clear();
    setToken(null);
    dispatch(setCurrentUser({}));
    dispatch(removeError());
  }

  return (
    <StateContext.Provider
      value={{
        authUser,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
