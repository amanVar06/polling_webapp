import React from "react";
import Polls from "../components/Polls";
import ErrorMessage from "../components/ErrorMessage";
import { useSelector } from "react-redux";
import { selectError } from "../features/slices/rootSlice";

const Homepage = () => {
  const error = useSelector(selectError);
  return (
    <div>
      <ErrorMessage error={error} />
      <Polls />
    </div>
  );
};

export default Homepage;
